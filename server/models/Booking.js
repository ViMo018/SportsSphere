const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sport",
      required: true,
    },

    sportSlug: {
      type: String,
      required: true,
    },

    sportName: {
      type: String,
      required: true,
    },

    slotId: {
      type: String,
      required: true,
    },

    slotTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);