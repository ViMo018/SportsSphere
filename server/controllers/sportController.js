const sports = require("../data/sports");
const AppError = require("../utils/AppError");

function getAllSports(req, res, next) {
  const sportsPreview = sports.map((sport) => {
    const totalSlots = sport.slots.length;

    const availableSlots = sport.slots.filter(
      (slot) => slot.booked < slot.capacity
    ).length;

    return {
      id: sport.id,
      name: sport.name,
      icon: sport.icon,
      venue: sport.venue,
      playersPerTeam: sport.playersPerTeam,
      difficulty: sport.difficulty,
      description: sport.description,
      totalSlots,
      availableSlots,
    };
  });

  res.json({
    success: true,
    count: sportsPreview.length,
    data: sportsPreview,
  });
}

function getSportById(req, res, next) {
  const { id } = req.params;

  const sport = sports.find((sport) => sport.id === id);

  if (!sport) {
    return next(new AppError("Sport not found", 404));
  }

  res.json({
    success: true,
    data: sport,
  });
}

function bookSlot(req, res, next) {
  const { sportId, slotId } = req.params;

  const sport = sports.find((sport) => sport.id === sportId);

  if (!sport) {
    return next(new AppError("Sport not found", 404));
  }

  const slot = sport.slots.find((slot) => slot.id === slotId);

  if (!slot) {
    return next(new AppError("Slot not found", 404));
  }

  if (slot.booked >= slot.capacity) {
    return next(new AppError("Slot is already full", 400));
  }

  slot.booked += 1;

  res.json({
    success: true,
    message: "Slot booked successfully",
    data: sport,
  });
}

module.exports = {
  getAllSports,
  getSportById,
  bookSlot,
};