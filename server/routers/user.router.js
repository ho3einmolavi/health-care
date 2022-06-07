const router = require('express').Router()
const mongoose = require('mongoose')
const userController = require('../controllers/user.controller')

router.post('/signup', (req, res, next) => {
    if (req.body.email && req.body.name && req.body.password) {
        req.body.email = req.body.email.toLowerCase()
        next()
    } else {
        return res.status(400).json({
            message: 'Invalid request'
        })
    }

}, userController.signup)

router.post('/verify', (req, res, next) => {
    if (mongoose.isValidObjectId(req.body.userId) && req.body.verificationCode) {
        next()
    }
    else {
        return res.status(400).json({
            message: 'Invalid request'
        })
    }
}, userController.verifyEmail)

router.post('/login', (req, res, next) => {
    if (req.body.email && req.body.password) {
        req.body.email = req.body.email.toLowerCase()
        next()
    }
    else {
        return res.status(400).json({
            message: 'Invalid request'
        })
    }
}, userController.login)

router.get('/:userId', userController.getUser)



module.exports = router
