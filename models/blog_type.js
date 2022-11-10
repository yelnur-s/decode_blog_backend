var mongoose = require("mongoose");

var blogTypeSchema = mongoose.Schema({
    name: String,
    description: String,
    img: { type: String, default: '/img/static/course-default.svg' },
    link: String,
});

module.exports = mongoose.model('BlogType', blogTypeSchema);
