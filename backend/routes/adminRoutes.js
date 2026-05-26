import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  getAllUsers,
  getAllCaregivers,
  approveCaregiver,
  rejectCaregiver,
  getAllBookings,
  updateBookingStatusByAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", authMiddleware, roleMiddleware("admin"), getAllUsers);
router.get("/caregivers", authMiddleware, roleMiddleware("admin"), getAllCaregivers);
router.get("/bookings", authMiddleware, roleMiddleware("admin"), getAllBookings);

router.patch(
  "/caregivers/:id/approve",
  authMiddleware,
  roleMiddleware("admin"),
  approveCaregiver
);

router.patch(
  "/caregivers/:id/reject",
  authMiddleware,
  roleMiddleware("admin"),
  rejectCaregiver
);

router.patch(
  "/bookings/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateBookingStatusByAdmin
);

export default router;
