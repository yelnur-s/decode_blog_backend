
const Comment = require('../models/comment')

const methods = {
    getCommentsByBlogId: async (id) => {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const comments = await Comment.find({blog: id}).populate('user').exec()
            return comments
        } else {
            return []
        }
        
    },
    addComment: async (data) => {
        const {
            text, blogId, userId
        } = data

        const comment = new Comment({
            text,
            blog: blogId,
            user: userId
        })

        await comment.save()
        return comment
    },
    deleteComment: async (id) => {
        const comment = await Comment.findById(id).exec()
        if (comment) {
            await Comment.remove({ _id: id }).exec()
        }
        return true
    },
}

module.exports = methods
