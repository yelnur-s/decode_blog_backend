/* eslint-disable no-return-await */
const BlogType = require('../models/blog_type')

const methods = {
    getBlogType: async () => {
        const blogTypes = await BlogType.find().exec()
        return blogTypes
    },

    addBlogType: async (data) => {
        const { name, description, link } = data

        const blogType = new BlogType({
            name,
            description,
            link,
        })

        console.log('ASD')
        await blogType.save()
        return blogType
    },

    editBlogType: async (data) => {
        const {
            name, description, _id, link,
        } = data
        const blogType = await BlogType.findById(_id).exec()
        if (blogType) {
            blogType.name = name
            blogType.description = description
            blogType.link = link
            await blogType.save()
            return blogType
        }
    },

    getBlogTypeById: async (id) => await BlogType.findById(id).exec(),

    deleteBlogType: async (id) => {
        const blogType = await BlogType.findById(id).exec()
        if (blogType) {
            await BlogType.remove({ _id: id }).exec()
        }
        return true
    },
}

module.exports = methods
