const express = require("express");
const router = express.Router();
const addressService = require("../services/address.service");

// routes
router.post("/add-address",createAddress);
router.delete("/delete-address",deleteAddress);
router.put("/update-address",updateAddress);

module.exports = router;

// Function to Insert address 
function createAddress(req, res, next) {
    // console.log(req.body);
    addressService
      .addAddress(req.body)
      .then((result) =>
        res.json({
          message:"Address added successfully!",
          data:result,
        })
      )
      .catch(next);
  }

  // Function to delete address 
function deleteAddress(req, res, next) {
    // console.log(req.body);
    addressService
      .delAddress(req.body)
      .then((result) =>
        res.json({
          message:result,
        })
      )
      .catch(next);
  }

   // Function to update address 
function updateAddress(req, res, next) {
    // console.log(req.body);
    addressService
      .updateAddress(req.body)
      .then((result) =>
        res.json({
          message:result,
        
        })
      )
      .catch(next);
  }
  