const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Full name of the user
    email: { type: String, required: true }, // Email address (optional)
    phone: { type: Number, unique: true, required: true }, // Phone number (optional)
    password: { type: String, required: true }, // Hashed password
    gateYear: { type: Number, required: true }, // Session year (e.g., "2023-2024")
    fingerprint: { type: String },
    isActive: { type: Boolean, default: true },
    role: { type: String, default: "student" },
    courses: [
      {
        _id: false,
        id: { type: mongoose.Schema.Types.ObjectId }, // Course ID
        name: { type: String }, // Course name for quick access
      }
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
