const express = require('express');
const router = express.Router();
const userService = require('./../services/user.service');
const sendEmail = require('./../helpers/send-email');
// routes
router.post('/send', sendMail);

module.exports = router;

async function sendMail(req, res, next) {
  const guestemail = req.body.email;
  const message = req.body.message;
  const user_id = req.body.id;
  try {
    const user = await userService.getAccount(user_id);
    await sendEmail({
      to: user.email,
      subject: 'Lost item found',

      html: `<h4>Hi ${user.name}</h4>
                 <p>Your item found by <strong>${guestemail}</strong></p>
                 ${message}`,
      replyTo: guestemail,
    });

    res.status(200).json({
      message: 'Mail sent',
    });
  } catch (err) {
    console.log(err);
    next(err);
  }

  //   const qr = await qrService.findQr(userId);
  //   if (qr) {
  //     res.json(qr);
  //   } else {
  //     try {
  //       var QRsvg = new QRCode({
  //         content: req.get('origin') + '?id=' + userId,
  //         join: true,
  //         container: 'svg-viewbox',
  //         width: 256,
  //         height: 256,
  //         color: '#000000',
  //         background: '#ffffff',
  //       }).svg();

  //       qrService.saveQr(userId, QRsvg).then((savedQr) => {
  //         res.json(savedQr);
  //       });
  //     } catch (err) {
  //       // console.log(err);
  //       next(err);
  //     }
  //   }
}
