const get = require('lodash/get');
const User = require("../models/users.model");
const { generateOTP } = require("../utils/otp.util");
const { sendEmail } = require("../utils/emailer.util");
const { generateToken } = require("../utils/jwt.util");
const { savePayloadToRedis, getPayloadFromRedis } = require("../utils/redis.util");
const { getQuote } = require("../utils/ai.util");

async function loginHelper({ phone, password }) {
    const userData = await User.findOne(
      { phone },
      { password: 1, email: 1, isActive: 1, fingerprint: 1, role: 1, courses: 1, name: 1, gateYear: 1 }
    ).lean();

    if (!userData) {
        throw new Error("User not found");
    }
    const isActiveUser = get(userData, "isActive", false);
    if(!isActiveUser) {
        throw new Error("User is inactive");
    }
    const dbPassword = get(userData, "password", ''); 
    if(password.toString() !== dbPassword) {
        throw new Error("Invalid password");
    }

    const otp = generateOTP();
    const email = get(userData, "email", '');
    const name = get(userData, "name", '');
    const gateYear = get(userData, "gateYear", '');
    const role = get(userData, "role", '');
    const fingerprint = get(userData, "fingerprint", '');
    const courses = get(userData, "courses", []);
    const userId = get(userData, "_id", '');
    const coursesIdArray = courses.map((course) => course.id.toString());
    const redisPayloadValue = { otp, role, fingerprint, coursesIdArray, name, gateYear, email, userId };
    await sendEmail(email, "Your LMS OTP", `Your OTP is: ${otp}. It will expire in 5 minutes.`);
    await savePayloadToRedis({ key: phone, keyType: "userData", value: JSON.stringify(redisPayloadValue), expireTime: 600 });
}


async function validateOtpHelper({ phone, otp, fingerprint }) {
    let userData = await getPayloadFromRedis({ key: phone, keyType: "userData" });
    if (!userData) {
        throw new Error("Session expired or invalid. Please login again.");
    }
    userData = JSON.parse(userData);
    const { otp: otpfromRedis, role, fingerprint: dbFingerprint, coursesIdArray = [], name, gateYear, email, userId } = userData;
    if (otpfromRedis !== otp.toString()) {
        throw new Error("Invalid OTP");
    }
    if(dbFingerprint && dbFingerprint !== fingerprint.toString()) {
        throw new Error("Unauthorized Device");
    }
    if(!dbFingerprint) {
        await User.updateOne({ phone }, { $set: { fingerprint: fingerprint.toString() } });
    }

    const token = generateToken({ phone, role, coursesIdArray, userId });
    let quote = await getPayloadFromRedis({ key: "quote", keyType: "quote" });
    if(!quote) {
        quote = await getQuote();
        await savePayloadToRedis({ key: "quote", keyType: "quote", value: quote, expireTime: 3600 * 3 });
    }
    const [quoteValue, author] = quote.split(' - ');
    return { token, name, email, gateYear, phone, quote: quoteValue, author };
}


module.exports = { loginHelper, validateOtpHelper };