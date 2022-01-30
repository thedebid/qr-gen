const db = require('../helpers/db');
const Package = db.Package;

async function findPackages() {
  try {
    const Packages = await Package.findAl();
    return Packages;
  } catch (err) {
    console.log('Error >> ', err);
  }
}

async function savePackage(package) {
  try {
    const savedPackage = await Package.create({
      package,
    });
    return savedPackage;
  } catch (err) {
    console.log('Error >> ', err);
  }
}
// async function updateQr(userId, qr) {
//   try {
//     const updatedQr = await QR.update(
//       { qr: qr },
//       { where: { user_id: userId } }
//     );
//     return updatedQr;
//   } catch (err) {
//     console.log("Error >> ", err);
//   }
// }

// const mapPackageData = (packageDetails) => {};
module.exports = {
  findPackages,
  savePackage,
};
