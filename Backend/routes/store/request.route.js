const express = require("express");
const router = express.Router();
const {verifyjwt} = require("../../Middleware/auth.middleware");
const  { 
  createRequest , getAllRequests, getAcceptedRequests,collectedMaterial ,validateStockBeforeRequest} = require("../../controllers/store/Request.Controller");
router.post("/send-product-request", verifyjwt ,createRequest );
router.get("/get-all-request", verifyjwt ,getAllRequests )
router.get("/get-all-accepted" , verifyjwt , getAcceptedRequests );
router.post("/check-stock", verifyjwt, validateStockBeforeRequest);

router.put("/collected" , verifyjwt ,collectedMaterial );
module.exports = router;