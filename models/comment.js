var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    date: {type: Date, default: Date.now},
    blog: {type: mongoose.Schema.ObjectId, ref: 'Blog'},
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Comment', commentSchema);
