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

function formatAdminSport(sport) {
  const totalSlots = sport.slots.length;

  const availableSlots = sport.slots.filter(
    (slot) => slot.booked < slot.capacity
  ).length;

  return {
    id: sport.slug,
    name: sport.name,
    icon: sport.icon,
    venue: sport.venue,
    playersPerTeam: sport.playersPerTeam,
    difficulty: sport.difficulty,
    description: sport.description,
    isActive: sport.isActive !== false,
    totalSlots,
    availableSlots,
  };
}

async function getAdminSports(req, res) {
  try {
    const sports = await Sport.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: sports.length,
      data: sports.map((sport) => formatAdminSport(sport)),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while fetching sports",
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
      isActive: true,
      slots: [],
    });

    res.status(201).json({
      success: true,
      message: "Sport created successfully",
      data: formatAdminSport(sport),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while creating sport",
    });
  }
}

async function addSlotToSport(req, res) {
  try {
    const { sportSlug } = req.params;
    const { slotId, time, capacity } = req.body || {};

    if (!slotId || !time || !capacity) {
      return res.status(400).json({
        success: false,
        message: "Slot ID, time and capacity are required",
      });
    }

    if (Number(capacity) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Capacity must be greater than 0",
      });
    }

    const sport = await Sport.findOne({ slug: sportSlug });

    if (!sport) {
      return res.status(404).json({
        success: false,
        message: "Sport not found",
      });
    }

    const slotAlreadyExists = sport.slots.some(
      (slot) => slot.slotId === slotId
    );

    if (slotAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Slot already exists for this sport",
      });
    }

    sport.slots.push({
      slotId,
      time,
      capacity: Number(capacity),
      booked: 0,
    });

    await sport.save();

    res.status(201).json({
      success: true,
      message: "Slot added successfully",
      data: {
        id: sport.slug,
        name: sport.name,
        totalSlots: sport.slots.length,
        addedSlot: {
          id: slotId,
          time,
          capacity: Number(capacity),
          booked: 0,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while adding slot",
    });
  }
}

function formatAdminBooking(booking) {
  return {
    id: booking._id,
    userName: booking.user?.name || "Unknown user",
    userEmail: booking.user?.email || "No email",
    sportName: booking.sportName,
    sportSlug: booking.sportSlug,
    slotId: booking.slotId,
    slotTime: booking.slotTime,
    status: booking.status,
    createdAt: booking.createdAt,
  };
}

async function getAllBookings(req, res) {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings.map((booking) => formatAdminBooking(booking)),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while fetching bookings",
    });
  }
}

async function updateSportStatus(req, res) {
  try {
    const { sportSlug } = req.params;
    const { isActive } = req.body || {};

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    const sport = await Sport.findOne({ slug: sportSlug });

    if (!sport) {
      return res.status(404).json({
        success: false,
        message: "Sport not found",
      });
    }

    sport.isActive = isActive;

    await sport.save();

    res.json({
      success: true,
      message: isActive
        ? "Sport activated successfully"
        : "Sport deactivated successfully",
      data: formatAdminSport(sport),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message || "Something went wrong while updating sport status",
    });
  }
}

module.exports = {
  getAdminStats,
  getAdminSports,
  createSport,
  addSlotToSport,
  getAllBookings,
  updateSportStatus,
};