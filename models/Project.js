const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // Could be a URL or simple path string
    },
    tags: {
        type: [String],
        default: []
    },
    link: {
        type: String
    },
    github: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
