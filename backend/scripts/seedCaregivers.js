import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Caregiver from "../models/Caregiver.js";
import caregivers from "../../src/data/caregivers.js";

dotenv.config();

const normalizedCaregivers = caregivers.map(({ id, reviews, ...caregiver }) => ({
  ...caregiver,
  price: caregiver.price?.replace(/â‚¹/g, "₹") || "",
  approvalStatus: caregiver.verified ? "Approved" : "Pending",
}));

const seedCaregivers = async () => {
  try {
    await connectDB();

    await Caregiver.deleteMany({});
    await Caregiver.insertMany(normalizedCaregivers);

    console.log(`Seeded ${normalizedCaregivers.length} caregivers successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed caregivers:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seedCaregivers();
