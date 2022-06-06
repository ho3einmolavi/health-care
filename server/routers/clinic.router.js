const router = require('express').Router()
const mongoose = require('mongoose')
const clinicController = require('../controllers/clinic.controller')

router.post('/', clinicController.create)
router.get('/', clinicController.getAll)

module.exports = router