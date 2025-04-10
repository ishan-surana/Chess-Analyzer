import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Match from './models/Match.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB. Seeding data...");

    // Wipe existing data
    await User.deleteMany({});
    await Match.deleteMany({});

    // Seed user
    const user = new User({
      userId: "220911270",
      password: "Atharva"
    });
    await user.save();

    // Seed match history
    const matches = [
      { userId: "220911270", opponentId: 1001, worstMove: 4 },
      { userId: "220911270", opponentId: 1002, worstMove: 6 },
      { userId: "220911270", opponentId: 1003, worstMove: 3 },
      { userId: "220911270", opponentId: 1004, worstMove: 7 },
      { userId: "220911270", opponentId: 1005, worstMove: 2 },
    ];

    await Match.insertMany(matches);

    console.log("Database seeded successfully.");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Error seeding data:", err);
    mongoose.disconnect();
  });
