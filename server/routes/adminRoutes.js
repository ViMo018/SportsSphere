const express = require("express");

const {
  getAdminStats,
  createSport,
  addSlotToSport,
  getAllBookings,
} = require("../controllers/adminController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", protect, authorizeRoles("admin"), getAdminStats);

router.get("/bookings", protect, authorizeRoles("admin"), getAllBookings);

router.post("/sports", protect, authorizeRoles("admin"), createSport);

router.post(
  "/sports/:sportSlug/slots",
  protect,
  authorizeRoles("admin"),
  addSlotToSport
);

module.exports = router;