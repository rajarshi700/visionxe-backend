const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Course name
    description: { type: String }, // Course description
    image: { type: String },
    code: { type: String },
    isActive: { type: Boolean, default: true },
    oldPrice: { type: String },
    newPrice: { type: String },
    discount: { type: String },
    discountValue: { type: String },
    discountUnit: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    },
    discountReason: { type: String }, // e.g., Holi Offer, Diwali Sale
    features: {
      type: [String], // Array of strings for course features
      default: [],
    },
    instructor: {
      name: { type: String, required: true },
      profileImages: { type: [String], default: [] }, // multiple images if needed
      highlights: { type: [String], default: [] }, // instructor achievements/features
    },
    demoVideoLink: { type: String }, // YouTube or Vimeo video link
    fullStudyMaterialLink: { type: String }, // Link to full course material (maybe Google Drive, Dropbox)
    classroomStudyMaterialLink: { type: String }, // Link to classroom-specific materials
    brochureDownloadLink: { type: String }, // Brochure PDF file link
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
