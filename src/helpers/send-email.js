const nodemailer = require('nodemailer');
const config = require('./../../config/config.json');

module.exports = sendEmail;

async function sendEmail({
  to,
  subject,
  html,
  replyTo = '',
  from = config.emailFrom,
}) {
  const transporter = nodemailer.createTransport(config.SMTPCONFIG);
  await transporter.sendMail({ from, replyTo, to, subject, html });
}
