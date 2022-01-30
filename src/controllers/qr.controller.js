const express = require('express');
const router = express.Router();
// const qrcode = require("qrcode");
var QRCode = require('qrcode-svg');
const qrService = require('../services/qr.service');
var pdf = require('html-pdf');

// routes
router.post('/gen', createQRCode);
router.get('/gen', getQRCode);
router.post('/custom', getCustomQrCode);
router.get('/genereated/:id', getGeneratedQrCode);
router.get('/download/:id', downloadQrCode);
// router.delete("/delete-address", deleteAddress);
// router.put("/update-address", updateAddress);

module.exports = router;

async function createQRCode(req, res, next) {
  // console.log(req.body);
  const userId = req.body.id;
  const qr = await qrService.findQr(userId);
  // console.log(qr);
  if (qr) {
    res.json(qr);
  } else {
    try {
      let origin = req.get('origin');

      origin = origin.replace('http://', 'www.');

      var QRsvg = new QRCode({
        content: origin + '?id=' + userId,
        join: true,
        container: 'svg-viewbox',
        width: 256,
        height: 256,
        color: '#000000',
        background: '#ffffff',
      }).svg();

      qrService.saveQr(userId, QRsvg).then((savedQr) => {
        res.json(savedQr);
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
}
async function getQRCode(req, res, next) {
  try {
    const qr = await qrService.findQr(user_id);

    if (qr) {
      res.json(qr);
    } else {
      res.json({ msg: 'QR code not found' });
    }
  } catch (err) {
    next(err);
  }
}

async function getCustomQrCode(req, res, next) {
  const userId = req.body.id;
  const width = req.body.width ? req.body.width : 256;
  const height = req.body.height ? req.body.height : 256;
  const color = req.body.color ? req.body.color : '#000000';
  const background = req.body.background ? req.body.background : '#ffffff';
  try {
    var QRsvg = new QRCode({
      content: 'Pretty Fox',
      join: true,
      container: 'svg-viewbox',
      width: width,
      height: height,
      color: color,
      background: background,
    }).svg();
    const qr = await qrService.findQr(userId);
    if (qr) {
      qrService.saveQr(userId, QRsvg).then((savedQr) => {
        res.json(savedQr);
      });
    } else {
      qrService.saveQr(userId, QRsvg).then((savedQr) => {
        res.json(savedQr);
      });
    }
  } catch (err) {
    // console.log(err);
    next(err);
  }
}

async function downloadQrCode(req, res, next) {
  console.log(req.params.id);
  const user_id = req.params.id ? req.params.id : '';
  const type = req.query.type ? req.query.type : 'pdf';
  try {
    var options = {
      border: 0,
      format: 'A4',
      type: type,
    };

    const qr = await qrService.findQr(user_id);
    if (qr) {
      const filename = Date.now() + '-' + 'qr_' + user_id + '.pdf';
      pdf
        .create(qr.qr, options)
        .toFile('./temp/' + filename, function (err, res) {
          console.log(res);
        });
    } else {
      res.json({ msg: 'QR code not found' });
    }
  } catch (err) {
    // console.log(err);
    next(err);
  }
}

async function getGeneratedQrCode(req, res, next) {
  try {
    const user_id = req.params.id ? req.params.id : '';
    const qr = await qrService.findQr(user_id);

    if (qr) {
      res.json(qr);
    } else {
      res.json({ msg: 'QR code not found' });
    }
  } catch (err) {
    next(err);
  }
}
