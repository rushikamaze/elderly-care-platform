import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import caregiverRoutes from "./routes/caregiverRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";




dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/caregivers", caregiverRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/caregivers", (req, res) => {
  res.send("Caregivers route working");
});


/* app.use("/api/bookings", (req, res) => {
  res.send("Bookings route working");
}); */

/* app.use("/api/admin", (req, res) => {
  res.send("Admin route working");
}); */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
