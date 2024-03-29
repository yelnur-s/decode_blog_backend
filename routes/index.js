const express = require('express')
const router = express.Router()
const passport = require('passport')

router.use('/auth', require('./auth'))
// router.use('/user',  passport.authenticate("jwt", {session: false}), permit(0, 3, 2), require('./user'))
router.use('/blogs', require('./blog'))
router.use('/blog-types', require('./blog_type'))
router.use('/comments', require('./comment'))

module.exports = router
