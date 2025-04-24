// require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "visionxeclasses@gmail.com",
    pass: "aaiobceaqoyetpom",
  },
});

transporter.sendMail({
  from: "visionxeclasses@gmail.com",
  to: "retet2022@gmail.com", // replace with your real one
  subject: "Test Email",
  text: "Hello from Vision XE",
})
.then(info => console.log("✅ Sent:", info.response))
.catch(err => console.error("❌ Error:", err.message));
