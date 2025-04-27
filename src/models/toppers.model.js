const mongoose = require("mongoose");

const topperSchema = new mongoose.Schema({
    profilePhoto: { type: String, required: true },
    name: { type: String, required: true },
    rank: { type: String, required: true },
    college: { type: String, required: true },
    phone: { type: String, required: true },
    testimonial: { type: String, required: true },
    bannerImage: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    rating: { type: Number, default: () => Math.random() < 0.5 ? 5 : 4 }
});

const Topper = mongoose.model("Topper", topperSchema);

module.exports = Topper;
