const Clinic = require('../models/clinic.model')
const create = async (req, res) => {
    try {
        const clinic = await Clinic.create(req.body)
        res.status(201).json({
            message: 'Clinic created successfully',
            clinic
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'something went wrong',
            error
        })
    }
}

const getAll = async (req, res) => {
    try {
        const clinics = await Clinic.find()
        res.status(200).json({
            message: 'Clinics retrieved successfully',
            clinics
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'something went wrong',
            error
        })
    }
}

module.exports = {
    create,
    getAll
}