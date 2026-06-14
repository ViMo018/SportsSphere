const Sport = require("../models/Sport");
const Booking = require("../models/Booking");
const AppError = require("../utils/AppError");

function formatSport(sport) {
  return {
    id: sport.slug,
    name: sport.name,
    icon: sport.icon,
    venue: sport.venue,
    playersPerTeam: sport.playersPerTeam,
    difficulty: sport.difficulty,
    description: sport.description,
    isActive: sport.isActive !== false,
    slots: sport.slots.map((slot) => {
      return {
        id: slot.slotId,
        time: slot.time,
        capacity: slot.capacity,
        booked: slot.booked,
      };
    }),
  };
}

function formatSportPreview(sport) {
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

async function getAllSports(req, res, next) {
  try {
    const sports = await Sport.find({
      isActive: { $ne: false },
    });

    const sportsPreview = sports.map((sport) => formatSportPreview(sport));

    res.json({
      success: true,
      count: sportsPreview.length,
      data: sportsPreview,
    });
  } catch (error) {
    next(error);
  }
}

async function getSportById(req, res, next) {
  try {
    const { id } = req.params;

    const sport = await Sport.findOne({
      slug: id,
      isActive: { $ne: false },
    });

    if (!sport) {
      return next(new AppError("Sport not found", 404));
    }

    res.json({
      success: true,
      data: formatSport(sport),
    });
  } catch (error) {
    next(error);
  }
}

async function bookSlot(req, res, next) {
  try {
    const { sportId, slotId } = req.params;

    const sport = await Sport.findOne({
      slug: sportId,
      isActive: { $ne: false },
    });

    if (!sport) {
      return next(new AppError("Sport not found", 404));
    }

    const slot = sport.slots.find((slot) => slot.slotId === slotId);

    if (!slot) {
      return next(new AppError("Slot not found", 404));
    }

    const existingBooking = await Booking.findOne({
      user: req.user._id,
      sport: sport._id,
      slotId: slot.slotId,
      status: "booked",
    });

    if (existingBooking) {
      return next(new AppError("You have already booked this slot", 400));
    }

    if (slot.booked >= slot.capacity) {
      return next(new AppError("Slot is already full", 400));
    }

    slot.booked += 1;

    await sport.save();

    const booking = await Booking.create({
      user: req.user._id,
      sport: sport._id,
      sportSlug: sport.slug,
      sportName: sport.name,
      slotId: slot.slotId,
      slotTime: slot.time,
      status: "booked",
    });

    res.json({
      success: true,
      message: `Slot booked successfully by ${req.user.name}`,
      data: formatSport(sport),
      booking: formatBooking(booking),
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllSports,
  getSportById,
  bookSlot,
};