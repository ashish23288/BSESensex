const express = require("express");
const router = express.Router();
const stockController = require("../controllers/Sensex");

router.get("/getAllStockes/:pageNo", stockController.getAllStockes);

router.post("/addStock", stockController.addStock);

router.post("/updateStock", stockController.updateStock);

module.exports = router;
