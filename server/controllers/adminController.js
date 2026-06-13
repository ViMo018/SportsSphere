const User = require("../models/User");
const Sport = require("../models/Sport");
const Booking = require("../models/Booking");

async function getAdminStats(req, res) {
  try {
    const totalUsers = await User.countDocuments();
    const totalSports = await Sport.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const activeBookings = await Booking.countDocuments({
      status: "booked",
    });

    const cancelledBookings = await Booking.countDocuments({
      status: "cancelled",
    });

    res.json({
      success: true,
      message: "Admin stats fetched successfully",
      data: {
        totalUsers,
        totalSports,
        totalBookings,
        activeBookings,
        cancelledBookings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while fetching stats",
    });
  }
}

module.exports = {
  getAdminStats,
};