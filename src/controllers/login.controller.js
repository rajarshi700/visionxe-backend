const { loginHelper, validateOtpHelper } = require("../helpers/login.helper");


const sendOtp = async (req, res) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({ message: "Phone Number and Password are required" });
        }
        if(typeof phone !== "number" || phone.toString().length !== 10) {
            return res.status(400).json({ message: "Invalid phone number" });
        }

        await loginHelper({ phone, password });
        res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
        console.log(error);
    }
};

const ValidateOtpAndLogin = async (req, res) => {
    try {
        const { phone, otp, fingerprint } = req.body;

        if (!phone || !otp || !fingerprint) {
            return res.status(400).json({ message: "Phone, OTP and fingerprint are required" });
        }
        if(typeof phone !== "number" || phone.toString().length !== 10) {
            return res.status(400).json({ message: "Invalid phone number" });
        }

        const data = await validateOtpHelper({ phone, otp, fingerprint });
        res.status(200).json({ message: "Login successful", data });

    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
        console.log(error);
    }
};


module.exports = {
    sendOtp,
    ValidateOtpAndLogin,
};
