import express from "express";
import {
  getAllCaregivers,
  getCaregiverById,
} from "../controllers/caregiverController.js";

const router = express.Router();

router.get("/", getAllCaregivers);
router.get("/:id", getCaregiverById);

export default router;
