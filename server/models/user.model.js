const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    maritalState: {
        type: String,
        required: true,
    },
    serious_disease: {
        type: String,
        required: true,
    },
    surgery: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    verificationCode: {
        type: String,
    },
    bmi: {
        type: Number,
        required: true
    }
}, { timestamps: true });

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    // delete userObject.verificationCode;
    delete userObject.__v;
    delete userObject.password;
    return userObject;
}

UserSchema.pre('save', async function (next) {
    this.verificationCode = Math.floor(Math.random() * 1000000);
    // this.bmi = (this.weight / (this.height * this.height)).toFixed(2);
    // const salt = await bcrypt.genSalt();
    // this.password = await bcrypt.hash(this.password, salt);
    next();
})


module.exports = mongoose.model('User', UserSchema);



