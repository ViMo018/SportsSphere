const dotenv = require("dotenv");

const connectDB = require("../config/db");
const Sport = require("../models/Sport");
const sports = require("../data/sports");

dotenv.config();

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

    await Sport.deleteMany();

    const sportsToInsert = mapSportsForDatabase();

    await Sport.insertMany(sportsToInsert);

    console.log("Sports data seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
}

seedSports();