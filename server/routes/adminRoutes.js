const express = require("express");

const {
  getAdminStats,
  getAdminSports,
  createSport,
  addSlotToSport,
  getAllBookings,
  updateSportStatus,
} = require("../controllers/adminController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", protect, authorizeRoles("admin"), getAdminStats);

router.get("/sports", protect, authorizeRoles("admin"), getAdminSports);

router.get("/bookings", protect, authorizeRoles("admin"), getAllBookings);

router.post("/sports", protect, authorizeRoles("admin"), createSport);

router.post(
  "/sports/:sportSlug/slots",
  protect,
  authorizeRoles("admin"),
  addSlotToSport
);

router.patch(
  "/sports/:sportSlug/status",
  protect,
  authorizeRoles("admin"),
  updateSportStatus
);

module.exports = router;