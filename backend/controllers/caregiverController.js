import Caregiver from "../models/Caregiver.js";

export const getAllCaregivers = async (req, res) => {
  try {
    const caregivers = await Caregiver.find().sort({ createdAt: -1 });
    res.status(200).json(caregivers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch caregivers",
      error: error.message,
    });
  }
};

export const getCaregiverById = async (req, res) => {
  try {
    const caregiver = await Caregiver.findById(req.params.id);

    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

    res.status(200).json(caregiver);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch caregiver",
      error: error.message,
    });
  }
};
