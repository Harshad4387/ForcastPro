const express = require("express");
const router = express.Router();
const { addRawMaterial , addProduct, addProductMaterial } = require("../../controllers/store/inward.controller");


router.post("/inward", addRawMaterial);
router.post("/addproduct", addProduct);
router.post("/addproductandmaterail", addProductMaterial);

module.exports = router;
