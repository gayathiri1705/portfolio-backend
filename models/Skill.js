const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true, // e.g., 'Frontend', 'Backend', 'Tools'
    },
    level: {
        type: Number, // Optional: e.g., 0-100 or 1-5
    }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
