const express = require("express");

const {
  getAdminStats,
  createSport,
} = require("../controllers/adminController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", protect, authorizeRoles("admin"), getAdminStats);

router.post("/sports", protect, authorizeRoles("admin"), createSport);

module.exports = router;