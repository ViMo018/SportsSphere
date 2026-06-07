const express = require("express");
const cors = require("cors");
const sports = require("./data/sports");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SportsSphere API is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.get("/api/sports", (req, res) => {
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
});

app.get("/api/sports/:id", (req, res) => {
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
});

app.patch("/api/sports/:sportId/slots/:slotId/book", (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});