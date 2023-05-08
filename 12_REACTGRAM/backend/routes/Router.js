const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));

// Test Route (Postman)
router.get("/", (req, res) => {
  res.send("API Working!");
});

module.exports = router;
