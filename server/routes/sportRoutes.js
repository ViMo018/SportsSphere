const express = require("express");

const {
  getAllSports,
  getSportById,
  bookSlot,
} = require("../controllers/sportController");

const router = express.Router();

router.get("/", getAllSports);

router.get("/:id", getSportById);

router.patch("/:sportId/slots/:slotId/book", bookSlot);

module.exports = router;