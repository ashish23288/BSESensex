const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  const rootFolder = "/bse-sensex";
  const fullPath = __dirname.substring(0, __dirname.indexOf(rootFolder) + rootFolder.length);
  const distPath = path.join(fullPath + "/dist/bse-sensex/index.html");
  console.log(" Fetching from.." + distPath);
  res.sendFile(distPath);
});

module.exports = router;
