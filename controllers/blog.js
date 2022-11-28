
const multer = require('multer')
const Blog = require('../models/Blog')

const methods = {
    getAllBlogs: async (page, key) => {
        const blog = await Blog.find().sort({
            views: -1,
        }).limit(3).exec()
        return blog
    },
    getBlogs: async (page, key) => {
        const blog = await Blog.find().exec()
        return blog
    },
    addBlog: async (data) => {
        const {
            title, description, shortDescription, blogType, userId
        } = data

        const blog = new Blog({
            title,
            description,
            shortDescription,
            blogType: blogType,
            user: userId
        })

        await blog.save()
        return blog
    },
    editBlog: async (data) => {
        const {
            _id, title, description, shortDescription, blogType,
        } = data
        const blog = await Blog.findById(_id).exec()
        if (blog) {
            blog.title = title
            blog.description = description
            blog.shortDescription = shortDescription
            blog.blogType = blogType
            await blog.save()
            return blog
        }
    },

    getBlogById: async (id) => await Blog.findById(id).exec(),

    getBlogsByCategoryId: async (categoryId) => await Blog.find({
        ...categoryId ? { blogType: categoryId } : {},
    }).sort({
        date: -1,
    }).exec(),

    getBlogsByUserId: async (userId) => await Blog.find({user: userId}).sort({
        date: -1,
    }).populate('user').populate('blogType').exec(),

    getBlogsById: async (id) => await Blog.find({
        ...id ? { _id: id } : {},
    }).exec(),

    deleteBlog: async (id) => {
        const blog = await Blog.findById(id).exec()
        if (blog) {
            await Blog.remove({ _id: id }).exec()
        }
        return true
    },
}

module.exports = methods
