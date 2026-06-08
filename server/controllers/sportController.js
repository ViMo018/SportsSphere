const sports = require("../data/sports");

function getAllSports(req, res) {
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

function getSportById(req, res) {
  const { id } = req.params;

  const sport = sports.find((sport) => sport.id === id);

  if (!sport) {
    return res.status(404).json({
      success: false,
      message: "Sport not found",
    });
  }

  res.json({
    success: true,
    data: sport,
  });
}

function bookSlot(req, res) {
  const { sportId, slotId } = req.params;

  const sport = sports.find((sport) => sport.id === sportId);

  if (!sport) {
    return res.status(404).json({
      success: false,
      message: "Sport not found",
    });
  }

  const slot = sport.slots.find((slot) => slot.id === slotId);

  if (!slot) {
    return res.status(404).json({
      success: false,
      message: "Slot not found",
    });
  }

  if (slot.booked >= slot.capacity) {
    return res.status(400).json({
      success: false,
      message: "Slot is already full",
    });
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