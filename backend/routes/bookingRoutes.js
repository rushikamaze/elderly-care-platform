import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createBooking,
  getMyBookings,
  updateBookingStatus,
  cancelBooking,
  rescheduleBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.get("/my-bookings", authMiddleware, getMyBookings);
router.patch("/:id", authMiddleware, updateBookingStatus);
router.patch("/:id/cancel", authMiddleware, cancelBooking);
router.patch("/:id/reschedule", authMiddleware, rescheduleBooking);

export default router;
