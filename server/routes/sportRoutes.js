const express = require("express");

const {
  getAllSports,
  getSportById,
  bookSlot,
} = require("../controllers/sportController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllSports);

router.get("/:id", getSportById);

router.patch("/:sportId/slots/:slotId/book", protect, bookSlot);

module.exports = router;