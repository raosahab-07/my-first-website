const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String }, // Present or Date
    isCurrent: { type: Boolean, default: false },
    type: { type: String, enum: ['work', 'education'], default: 'work' },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
