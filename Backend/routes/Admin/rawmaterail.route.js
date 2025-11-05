const express = require("express");
const router = express.Router();
const {getInStockRawMaterialsByCategory,getrawmaterial,getproductsnames} = require("../../controllers/Admin/rawmaterial.controller");

router.get("/rawmaterial/instock" , getInStockRawMaterialsByCategory);
router.get("/getrawmaterailnames",getrawmaterial);
router.get("/getproducts" , getproductsnames);

module.exports = router;

