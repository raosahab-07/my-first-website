const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true, min: 0, max: 100 },
    icon: { type: String }, // FontAwesome class or SVG
    category: { type: String, required: true }, // e.g., Frontend, Backend, Tools
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
