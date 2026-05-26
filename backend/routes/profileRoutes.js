import express from "express";
import {
  createProfile,
  getMyProfile,
  updateProfile,
} from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProfile);
router.get("/me", authMiddleware, getMyProfile);
router.put("/:id", authMiddleware, updateProfile);

export default router;
