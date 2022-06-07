const User = require('../models/user.model')
const utils = require('../utils')
const signup = async (req, res) => {
    try {
        const isUserExist = await User.findOne({ email: req.body.email })
        if (isUserExist) {
            return res.status(400).json({
                message: 'User already exist'
            })
        }
        const user = await User.create(req.body)

        utils.sendVerificationEmail(user)

        res.status(201).json({
            message: 'User created successfully',
            user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'something went wrong',
            error
        })
    }
}

const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }
        if (user.verificationCode !== req.body.verificationCode) {
            return res.status(400).json({
                message: 'Invalid verification code'
            })
        }

        user.verified = true
        await user.save()
        const accessToken = await utils.assignAccessToken(user)
        return res.status(200).json({
            message: 'User verified successfully',
            accessToken
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'something went wrong',
        })
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }
        console.log(user)
        if (!user.verified) {
            return res.status(400).json({
                message: 'User not verified'
            })
        }

        if (user.password !== req.body.password) {
            return res.status(400).json({
                message: 'Invalid password or email'
            })
        }

        // const accessToken = utils.assignAccessToken(user)

        res.status(200).json({
            message: 'User logged in successfully',
            user
        })


    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'something went wrong',
        })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }
        res.status(200).json({
            message: 'User found',
            user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'something went wrong',
        })
    }
}


module.exports = {
    signup,
    verifyEmail,
    getUser,
    login
}
