const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    slotId: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    booked: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const sportSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    playersPerTeam: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slots: {
      type: [slotSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sport", sportSchema);