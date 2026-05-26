import User from "../models/User.js";
import Caregiver from "../models/Caregiver.js";
import Booking from "../models/Booking.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

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

export const approveCaregiver = async (req, res) => {
  try {
    const caregiver = await Caregiver.findById(req.params.id);

    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

    caregiver.approvalStatus = "Approved";
    caregiver.verified = true;

    await caregiver.save();

    res.status(200).json({
      message: "Caregiver approved successfully",
      caregiver,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve caregiver",
      error: error.message,
    });
  }
};

export const rejectCaregiver = async (req, res) => {
  try {
    const caregiver = await Caregiver.findById(req.params.id);

    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

    caregiver.approvalStatus = "Rejected";
    caregiver.verified = false;

    await caregiver.save();

    res.status(200).json({
      message: "Caregiver rejected successfully",
      caregiver,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reject caregiver",
      error: error.message,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email role")
      .populate("caregiverId")
      .populate("patientProfileId")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

export const updateBookingStatusByAdmin = async (req, res) => {
  try {
    const { status, date, time } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (status) {
      booking.status = status;
    }

    if (date) {
      booking.date = date;
    }

    if (time) {
      booking.time = time;
    }

    await booking.save();

    res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update booking",
      error: error.message,
    });
  }
};
