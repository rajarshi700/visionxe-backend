const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Chapter title
    description: { type: String }, // Chapter description,
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Reference to Course
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
