const express = require("express");

const {
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/my-bookings", protect, getMyBookings);

router.patch("/:bookingId/cancel", protect, cancelBooking);

module.exports = router;