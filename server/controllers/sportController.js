const Sport = require("../models/Sport");
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
    totalSlots,
    availableSlots,
  };
}

async function getAllSports(req, res, next) {
  try {
    const sports = await Sport.find();

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

    const sport = await Sport.findOne({ slug: id });

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

    const sport = await Sport.findOne({ slug: sportId });

    if (!sport) {
      return next(new AppError("Sport not found", 404));
    }

    const slot = sport.slots.find((slot) => slot.slotId === slotId);

    if (!slot) {
      return next(new AppError("Slot not found", 404));
    }

    if (slot.booked >= slot.capacity) {
      return next(new AppError("Slot is already full", 400));
    }

    slot.booked += 1;

    await sport.save();

    res.json({
      success: true,
      message: "Slot booked successfully",
      data: formatSport(sport),
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