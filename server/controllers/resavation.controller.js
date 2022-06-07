const Resavation = require('../models/resavation.model')
const Clinic = require('../models/clinic.model')
const create = async (req, res) => {
    try {
        const resavation = await Resavation.create(req.body)
        res.status(201).json({
            message: 'Resavation created successfully',
            resavation
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'something went wrong',
            error
        })
    }
}

const userResavation = async (req, res) => {
    try {
        let resavations = await Resavation.find({ userId: req.params.userId })
        const clinics_promises = resavations.map((resavation) => {
            return Clinic.findById(resavation.clinicId)
        })
        const results = []
        const clinics = await Promise.all(clinics_promises)
        for (let i = 0; i < resavations.length; i++) {
            results.push({
                ...resavations[i].toObject(),
                clinic: clinics[i].toObject()
            })
        }
        res.status(200).json({
            message: 'Resavation retrieved successfully',
            resavations: results
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
    userResavation
}