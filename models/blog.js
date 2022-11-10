var mongoose = require("mongoose");

var blogSchema = mongoose.Schema({
    title: String,
    description: String,
    shortDescription: String,
    date: {type: Date, default: Date.now},
    views: {type: Number, default: 0},
    img: { type: String, default: '/img/static/course-default.svg' },
    blogType: {type: mongoose.Schema.ObjectId, ref: 'BlogType'},
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    link: String
});

module.exports = mongoose.model('Blog', blogSchema);
