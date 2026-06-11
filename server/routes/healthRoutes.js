const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

function getDatabaseStatus() {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return states[mongoose.connection.readyState] || "unknown";
}

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
    database: getDatabaseStatus(),
  });
});

module.exports = router;