const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    readTime: {
        type: String,
        default: "5 min read"
    },
    category: {
        type: String
    },
    link: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
