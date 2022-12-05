const express = require('express')
const router = express.Router()
const fetch = require('../controllers')
const asyncMiddleware = require('../utils/async')
const validateBlogInput = require('../validation/blog')
const multer = require("multer");
const passport = require("passport")
const upload = multer({dest: 'public/images/temp'})
const path = require("path");



router.get('/api', asyncMiddleware(async (req, res, next) => {
    const blogs = await fetch.blogType.getBlogs()
    res.status(200).send(blogs)
}))


router.get('/byCategory', asyncMiddleware(async  function (req, res) {
    let categoryId = req.query.categoryId;

    let blogs = await fetch.blog.getBlogsByCategoryId(categoryId);
    res.status(200).send(blogs)
}));

router.get('/byUser', asyncMiddleware(async  function (req, res) {
    let userId = req.query.userId;

    let blogs = await fetch.blog.getBlogsByUserId(userId);
    res.status(200).send(blogs)
}));

router.get('/byId', asyncMiddleware(async  function (req, res) {
    let id = req.query._id;
    let blog = await fetch.blog.getBlogsById(id);
    console.log(blog);
    res.status(200).send(blog)
}));

router.get('/', asyncMiddleware(async (req, res, next) => {
    let key = req.query.key;
    const blogs = await fetch.blog.getBlogs(key)
    res.status(200).send(blogs)
}))

router.post('/', passport.authenticate("jwt", {session: false}), asyncMiddleware(async (req, res, next) => {
    const {isValid, errors} = validateBlogInput(req.body)
    if(isValid) {
        const result = await fetch.blog.addBlog({...req.body, userId: req.user._id})
        console.log(result);

        res.status(200).send({result})
    } else {
        res.status(400).send(errors)
    }
}))

router.put('/', passport.authenticate("jwt", {session: false}), asyncMiddleware(async (req, res, next) => {
    const {isValid, errors} = validateBlogInput(req.body)
    if(isValid) {

        const result = await fetch.blog.editBlog(req.body)
        res.status(200).send({result})
    } else {
        res.status(400).send(errors)
    }

}))

router.delete('/:id', passport.authenticate("jwt", {session: false}), asyncMiddleware(async (req, res, next) => {
    await fetch.blog.deleteBlog(req.params.id)
    res.status(200).end()
}))

router.put('/:id/image', passport.authenticate("jwt", {session: false}), upload.single('img'), asyncMiddleware(async (req, res, next) => {
    const blog = await fetch.blog.getBlogById(req.params.id)
    const result = await fetch.image.moveuploadedfile(req.file, '/images/blog', blog)
    res.status(200).send(result)
}))

module.exports = router



