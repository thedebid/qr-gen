const db = require("../helpers/db");
const QR = db.Qr;

async function findQr(userId) {
  try {
    const qr = await QR.findOne({
      where: { user_id: userId },
    });
    return qr;
  } catch (err) {
    console.log("Error >> ", err);
  }
}

async function saveQr(userId, qr) {
  try {
    const savedQr = await QR.create({
      user_id: userId,
      qr: qr,
    });
    return savedQr;
  } catch (err) {
    console.log("Error >> ", err);
  }
}
async function updateQr(userId, qr) {
  try {
    const updatedQr = await QR.update(
      { qr: qr },
      { where: { user_id: userId } }
    );
    return updatedQr;
  } catch (err) {
    console.log("Error >> ", err);
  }
}

module.exports = {
  findQr,
  saveQr,
  updateQr,
};
