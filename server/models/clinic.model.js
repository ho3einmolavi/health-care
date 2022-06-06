const mongoose = require('mongoose');
const ClinicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/magny-beta.appspot.com/o/send-grid-template-images%2Fclinic.jpg?alt=media&token=c87fcbca-aa23-4724-8ea3-68ebd1e048f9"
    },

    city: {
        type: String,
        required: true,
    },

    categories: {
        type: [String],
        required: true,
    },

    description: {
        type: String,
    },

    openHours: {
        type: [String],
        required: true,
    }

}, { timestamps: true });


module.exports = mongoose.model('Clinic', ClinicSchema);



