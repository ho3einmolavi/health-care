const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
sgMail.setApiKey("");


function sendVerificationEmail(user) {
    const msg = {
        to: 'test@example.com',
        from: 'test@example.com', // Use the email address or domain you verified above
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
}

function assignAccessToken(user) {
    const payload = {
        email: user.email,
    }

    const accessToken = jwt.sign(payload, 'secret', { expiresIn: '50d' })

    return accessToken
}

async function comparePassword(password, hash) {
    console.log(password, hash)
    const res = await bcrypt.compare(password, hash);
    console.log(res)
    return res;
}

module.exports = {
    sendVerificationEmail,
    assignAccessToken,
    comparePassword
}