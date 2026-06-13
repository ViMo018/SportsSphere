const express = require("express");

const { getMyBookings } = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/my-bookings", protect, getMyBookings);

module.exports = router;