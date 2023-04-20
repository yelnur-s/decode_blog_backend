const express = require('express')
const router = express.Router()
const fetch = require('../controllers')
const asyncMiddleware = require('../utils/async')
const validateCommentInput = require('../validation/comment')
const passport = require("passport")

router.get('/:blogId', asyncMiddleware(async (req, res, next) => {
    const comments = await fetch.comment.getCommentsByBlogId(req.params.blogId)
    res.status(200).send(comments)
}))


router.post('/', passport.authenticate("jwt", {session: false}), asyncMiddleware(async (req, res, next) => {
    const {isValid, errors} = validateCommentInput(req.body)
    if(isValid) {
        const result = await fetch.comment.addComment({...req.body, userId: req.user._id})
        res.status(200).send(result)
    } else {
        res.status(400).send(errors)
    }
}))


router.delete('/:id', passport.authenticate("jwt", {session: false}), asyncMiddleware(async (req, res, next) => {
    await fetch.comment.deleteComment(req.params.id)
    res.status(200).end()
}))


module.exports = router



