const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Course name
  description: { type: String }, // Course description
  image: { type: String },
  code: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
