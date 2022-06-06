const router = require('express').Router()
const mongoose = require('mongoose')
const resavaionController = require('../controllers/resavation.controller')

router.post('/', resavaionController.create)
router.get('/', resavaionController.userResavation)

module.exports = router