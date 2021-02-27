const express = require("express");
const router = express.Router();
const stockController = require("../controllers/Sensex");

router.get("/:pageNo", stockController.getAllStockes);

router.post("/addStock", stockController.addStock);

module.exports = router;
