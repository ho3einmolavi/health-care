const router = require('express').Router()
const mongoose = require('mongoose')
const resavaionController = require('../controllers/resavation.controller')

router.post('/', (req, res, next) => {
    if (req.body.userId && mongoose.isValidObjectId(req.body.userId) && req.body.date && req.body.clinicId) {
        next()
    }
    else {
        return res.status(400).json({
            message: 'Invalid request'
        })
    }
}, resavaionController.create)
router.get('/:userId', resavaionController.getUserResavations)

module.exports = router