const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Sport = require("../models/Sport");
const sports = require("../data/sports");

dotenv.config();

const shouldReset = process.argv.includes("--reset");

function mapSportsForDatabase() {
  return sports.map((sport) => {
    return {
      slug: sport.id,
      name: sport.name,
      icon: sport.icon,
      venue: sport.venue,
      playersPerTeam: sport.playersPerTeam,
      difficulty: sport.difficulty,
      description: sport.description,
      slots: sport.slots.map((slot) => {
        return {
          slotId: slot.id,
          time: slot.time,
          capacity: slot.capacity,
          booked: slot.booked,
        };
      }),
    };
  });
}

async function seedSports() {
  try {
    await connectDB();

    const existingSportsCount = await Sport.countDocuments();

    if (existingSportsCount > 0 && !shouldReset) {
      console.log(
        `Seed skipped: database already has ${existingSportsCount} sports`
      );
      console.log("Use npm run seed:reset if you want to reset sports data");

      await mongoose.connection.close();
      process.exit(0);
    }

    if (shouldReset) {
      await Sport.deleteMany();
      console.log("Existing sports deleted");
    }

    const sportsToInsert = mapSportsForDatabase();

    await Sport.insertMany(sportsToInsert);

    console.log("Sports data seeded successfully");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
}

seedSports();