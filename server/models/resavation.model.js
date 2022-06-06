const mongoose = require('mongoose');
const ResavationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },

    clinicId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

}, { timestamps: true });


module.exports = mongoose.model('Resavation', ResavationSchema);



