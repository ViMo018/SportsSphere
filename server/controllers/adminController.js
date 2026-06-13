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

async function createSport(req, res) {
  try {
    const {
      slug,
      name,
      icon,
      venue,
      playersPerTeam,
      difficulty,
      description,
    } = req.body || {};

    if (
      !slug ||
      !name ||
      !icon ||
      !venue ||
      !playersPerTeam ||
      !difficulty ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All sport fields are required",
      });
    }

    const existingSport = await Sport.findOne({ slug });

    if (existingSport) {
      return res.status(400).json({
        success: false,
        message: "Sport already exists with this slug",
      });
    }

    const sport = await Sport.create({
      slug,
      name,
      icon,
      venue,
      playersPerTeam,
      difficulty,
      description,
      slots: [],
    });

    res.status(201).json({
      success: true,
      message: "Sport created successfully",
      data: {
        id: sport.slug,
        name: sport.name,
        icon: sport.icon,
        venue: sport.venue,
        playersPerTeam: sport.playersPerTeam,
        difficulty: sport.difficulty,
        description: sport.description,
        totalSlots: sport.slots.length,
        availableSlots: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while creating sport",
    });
  }
}

module.exports = {
  getAdminStats,
  createSport,
};