const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ['web', 'mobile', 'design'] },
    image: { type: String, required: true }, // Cloudinary URL
    techStack: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
