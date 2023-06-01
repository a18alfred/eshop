const nodemailer = require('nodemailer');
require('dotenv').config();
const ejs = require('ejs');
const path = require('path');

const sendMail = async ({
                            to,
                            subject,
                            text,
                            fullName,
                            origin_client,
                            verifyLink,
                        }) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const data = await ejs.renderFile(
        path.join(__dirname, '../emailTemplate/', 'mail.password.ejs'),
        {
            fullName,
            origin_client,
            verifyLink,
        }
    );

    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html: data,
    });

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendMail;
