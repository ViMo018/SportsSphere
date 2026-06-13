const Booking = require("../models/Booking");
const Sport = require("../models/Sport");

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

async function cancelBooking(req, res) {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    const sport = await Sport.findById(booking.sport);

    if (!sport) {
      return res.status(404).json({
        success: false,
        message: "Sport not found for this booking",
      });
    }

    const slot = sport.slots.find((slot) => slot.slotId === booking.slotId);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found for this booking",
      });
    }

    if (slot.booked > 0) {
      slot.booked -= 1;
    }

    booking.status = "cancelled";

    await sport.save();
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      data: formatBooking(booking),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while cancelling booking",
    });
  }
}

module.exports = {
  getMyBookings,
  cancelBooking,
};