const express = require("express");
const router = express.Router();
// const qrcode = require("qrcode");
const packageService = require("../services/package.service");

// routes
router.post("/save", createPackage);
router.get("/getALl", getAllPackages);
// router.post("/custom", getCustomQrCode);
// router.get("/genereated/:id", getGeneratedQrCode);
// router.get("/download/:id", downloadQrCode);
// router.delete("/delete-address", deleteAddress);
// router.put("/update-address", updateAddress);

module.exports = router;

async function createPackage(req, res, next) {
  console.log(req.body);
  //   const userId = req.body.id;
  const package = await packageService.savePackage(req.body);
  // console.log(qr);
  if (package) {
    res.json(package);
  } else {
    try {
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
async function getAllPackages(req, res, next) {
  try {
    const packages = await packageService.findPackages();

    if (packages.length > 0) {
      res.json(packages);
    } else {
      res.json({ msg: "Packages not found" });
    }
  } catch (err) {
    next(err);
  }
}
