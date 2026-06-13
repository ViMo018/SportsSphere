const Booking = require("../models/Booking");

function formatBooking(booking) {
  return {
    id: booking._id,
    sportName: booking.sportName,
    sportSlug: booking.sportSlug,
    slotId: booking.slotId,
    slotTime: booking.slotTime,
    status: booking.status,
    createdAt: booking.createdAt,
  };
}

async function getMyBookings(req, res) {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings.map((booking) => formatBooking(booking)),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while fetching bookings",
    });
  }
}

module.exports = {
  getMyBookings,
};