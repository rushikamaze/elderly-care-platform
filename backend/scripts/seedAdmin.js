import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const adminEmail = "admin@gmail.com";
const adminPassword = "admin123";

const seedAdmin = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.findOneAndUpdate(
      { email: adminEmail },
      {
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`Admin user is ready: ${adminEmail}`);
    console.log(`Temporary password: ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed admin:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seedAdmin();
