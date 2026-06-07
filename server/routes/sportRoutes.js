const express = require("express");

const router = express.Router();


  // sports array
  const sports = [
  {
    id: 1,
    name: "Football",
    category: "Outdoor",
    playersRequired: 11,
    venue: "Main Ground",
  },
  {
    id: 2,
    name: "Cricket",
    category: "Outdoor",
    playersRequired: 11,
    venue: "Cricket Ground",
  },
  {
    id: 3,
    name: "Badminton",
    category: "Indoor",
    playersRequired: 2,
    venue: "Indoor Court 1",
  },
  {
    id: 4,
    name: "Table Tennis",
    category: "Indoor",
    playersRequired: 2,
    venue: "SAC Room",
  },
  {
    id: 5,
    name: "Chess",
    category: "Indoor",
    playersRequired: 2,
    venue: "SAC Room",
  },
  {
    id: 6,
    name: "Basketball",
    category: "Outdoor",
    playersRequired: 5,
    venue: "Basketball Court",
  },
];

const slots = [
  // slots array
   {
    id: 101,
    sportId: 1,
    day: "Monday",
    time: "5:00 PM - 6:00 PM",
    venue: "Main Ground",
    availableSpots: 6,
  },
  {
    id: 102,
    sportId: 1,
    day: "Wednesday",
    time: "6:00 PM - 7:00 PM",
    venue: "Main Ground",
    availableSpots: 8,
  },
  {
    id: 103,
    sportId: 1,
    day: "Friday",
    time: "5:30 PM - 6:30 PM",
    venue: "Main Ground",
    availableSpots: 4,
  },
  {
    id: 201,
    sportId: 2,
    day: "Tuesday",
    time: "4:00 PM - 6:00 PM",
    venue: "Cricket Ground",
    availableSpots: 10,
  },
  {
    id: 202,
    sportId: 2,
    day: "Saturday",
    time: "7:00 AM - 9:00 AM",
    venue: "Cricket Ground",
    availableSpots: 7,
  },
  {
    id: 301,
    sportId: 3,
    day: "Monday",
    time: "7:00 PM - 8:00 PM",
    venue: "Indoor Court 1",
    availableSpots: 2,
  },
  {
    id: 302,
    sportId: 3,
    day: "Thursday",
    time: "6:00 PM - 7:00 PM",
    venue: "Indoor Court 1",
    availableSpots: 1,
  },
  {
    id: 401,
    sportId: 4,
    day: "Wednesday",
    time: "5:00 PM - 6:00 PM",
    venue: "TT Room",
    availableSpots: 2,
  },
  {
    id: 501,
    sportId: 5,
    day: "Friday",
    time: "4:00 PM - 5:00 PM",
    venue: "Recreation Room",
    availableSpots: 1,
  },
  {
    id: 601,
    sportId: 6,
    day: "Tuesday",
    time: "6:00 PM - 7:00 PM",
    venue: "Basketball Court",
    availableSpots: 5,
  },
];

router.get("/sports", (req, res) => {
  res.status(200).json({
    success: true,
    count: sports.length,
    sports: sports,
  });
});

router.get("/sports/:sportId/slots", (req, res) => {
  const sportId = Number(req.params.sportId);

  const sport = sports.find((sport) => sport.id === sportId);

  if (!sport) {
    return res.status(404).json({
      success: false,
      message: "Sport not found",
    });
  }

  const sportSlots = slots.filter((slot) => slot.sportId === sportId);

  res.status(200).json({
    success: true,
    sport: {
      id: sport.id,
      name: sport.name,
      venue: sport.venue,
    },
    count: sportSlots.length,
    slots: sportSlots,
  });
});

module.exports = router;