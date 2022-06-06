const Resavation = require('../models/resavation.model')
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
        const resavation = await Resavation.find({ userId: req.params.userId })
        res.status(200).json({
            message: 'Resavation retrieved successfully',
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

module.exports = {
    create,
    userResavation
}