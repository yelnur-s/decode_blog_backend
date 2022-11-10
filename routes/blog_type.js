const express = require('express')
const router = express.Router()
const asyncMiddleware = require('../utils/async')
const fetch = require('../controllers')
const validateBlogTypeInput = require('../validation/blog_type')


router.get('/', asyncMiddleware(async (req, res, next) => {
    const blogType = await fetch.blogType.getBlogType()
    res.status(200).send(blogType)
}))

router.post('/', asyncMiddleware(async (req, res, next) => {
    const {isValid, errors} = validateBlogTypeInput(req.body)
    if(isValid) {
        const result = await fetch.blogType.addBlogType(req.body)
        // const result2 = await fetch.image.moveuploadedfile(req.file, '/images/blog',result)
        console.log("RES", result)
        res.status(200).send({result})
    } else {
        res.status(400).send(errors)
    }
}))

router.put('/',  asyncMiddleware(async (req, res, next) => {
    const {isValid, errors} = validateBlogTypeInput(req.body)
    if(isValid) {
        const result = await fetch.blogType.editBlogType(req.body)
        res.status(200).send({result})
    } else {
        res.status(400).send(errors)
    }

}))

router.delete('/:id', asyncMiddleware(async (req, res, next) => {
    await fetch.blogType.deleteBlogType(req.params.id)
    res.status(200).end()
}))


module.exports = router