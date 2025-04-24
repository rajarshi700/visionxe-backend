const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Lecture title,
    description: { type: String }, // Lecture description
    videoLink: { type: String, required: true }, // DRM-protected video link
    pdfLink: { type: String }, // Encoded PDF link (optional)
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true }, // Reference to Chapter
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;