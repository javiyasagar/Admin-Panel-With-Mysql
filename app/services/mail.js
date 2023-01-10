const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    port: 25,
    auth: {
        user: "sagarjaviya.shivinfotech@gmail.com",
        pass: "sagar@123"
    }
})

//  send the mail
const sendOTP = (Email, otp) => {
    const mailSend = {
        to: Email,
        subject: 'OTP for new passwoed',
        html: "OTP for New Password" + "<b>" + " " + otp + "</b>"
    }
    const mail = transport.sendMail(mailSend, function (error) {
        if (error) {
            console.log("Error", error);
        }
        else {
            console.log('Email is sent')
        }
    })
    return mail;
}
module.exports = { sendOTP }
