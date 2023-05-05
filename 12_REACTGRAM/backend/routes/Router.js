const express = require("express");
const router = express();

// Test Route (Postman)
router.get("/", (req, res) => {
  res.send("API Working!");
});

module.exports = router;
