const express = require("express");
const router = express.Router();
const {registerProductionWorker} = require("../../controllers/Production/register.controller");

router.post("/register" , registerProductionWorker);

module.exports = router;