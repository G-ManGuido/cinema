const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

function sendMail(optinons) {
    return new Promise((resolve, reject) => {
        const to = optinons.to;
        const subject = optinons.subject;
        const message = optinons.message;

        const messageHtml = optinons.html || message.replaceAll("\n", "<br/>");

        transporter.sendMail({
            from: '"Vienna-Cinema-Palast" <codingfrank73@gmail.com>',
            to,
            subject,
            text: message,
            html: messageHtml,
        }).then((sendMessageInfo) => {
            const isSendSuccessfully = sendMessageInfo.accepted.includes(to);

            if (isSendSuccessfully) {
                resolve();
            } else {
                reject();
            }
        }).catch((err) => {
            console.log("Error during sending email: ", err);
            reject();
        })
    })
}

module.exports = { sendMail }