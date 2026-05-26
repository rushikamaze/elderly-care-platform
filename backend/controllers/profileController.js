import PatientProfile from "../models/PatientProfile.js";

export const createProfile = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      phone,
      emergencyContact,
      address,
      medicalConditions,
      allergies,
      medicines,
      mobility,
      notes,
    } = req.body;

    if (!name || !age || !phone || !emergencyContact || !address) {
      return res.status(400).json({
        message: "Please fill all required profile fields",
      });
    }

    const existingProfile = await PatientProfile.findOne({ userId: req.user.id });

    if (existingProfile) {
      return res.status(400).json({
        message: "Profile already exists for this user",
      });
    }

    const profile = await PatientProfile.create({
      userId: req.user.id,
      name,
      age,
      gender,
      phone,
      emergencyContact,
      address,
      medicalConditions,
      allergies,
      medicines,
      mobility,
      notes,
    });

    res.status(201).json({
      message: "Patient profile created successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create profile",
      error: error.message,
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const profile = await PatientProfile.findOne({ userId: req.user.id });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await PatientProfile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    if (profile.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to update this profile",
      });
    }

    const updatedProfile = await PatientProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};
