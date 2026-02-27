const mongoose = require('mongoose');

// A generic key-value store for single-instance sections like Hero and About
const settingSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true // e.g., 'hero_title', 'about_text'
    },
    value: {
        type: mongoose.Schema.Types.Mixed, // Allows string, object, array, etc.
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
