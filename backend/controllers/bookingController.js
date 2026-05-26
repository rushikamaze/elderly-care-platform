import Booking from "../models/Booking.js";
import Caregiver from "../models/Caregiver.js";
import PatientProfile from "../models/PatientProfile.js";

export const createBooking = async (req, res) => {
  try {
    const { caregiverId, patientProfileId, date, time, price } = req.body;

    if (!caregiverId || !patientProfileId || !date || !time) {
      return res.status(400).json({
        message: "Please fill all required booking fields",
      });
    }

    const caregiver = await Caregiver.findById(caregiverId);
    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

    const patientProfile = await PatientProfile.findById(patientProfileId);
    if (!patientProfile) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    console.log("Logged in user:", req.user.id);
    console.log("Patient owner:", patientProfile.userId.toString());

    if (patientProfile.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to use this patient profile",
      });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      caregiverId,
      patientProfileId,
      date,
      time,
      price: price || caregiver.price,
      status: "Pending",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
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

export const updateBookingStatus = async (req, res) => {
  try {
    const { status, date, time } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
// changed section
    const isUser = booking.userId.toString() === req.user.id.toString();
const isCaregiver = booking.caregiverId.toString() === req.user.id.toString();

if (!isUser && !isCaregiver) {
  return res.status(403).json({
    message: "You are not allowed to update this booking",
  });
}
// end of changed section

    if (status) {
      booking.status = status;
    }

    if (date) {
      booking.date = date;
    }

    if (time) {
      booking.time = time;
    }

    const updatedBooking = await booking.save();

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update booking",
      error: error.message,
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to cancel this booking",
      });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
};

export const rescheduleBooking = async (req, res) => {
  try {
    const { date, time } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to reschedule this booking",
      });
    }

    if (!date || !time) {
      return res.status(400).json({
        message: "Date and time are required to reschedule booking",
      });
    }

    booking.date = date;
    booking.time = time;
    booking.status = "Rescheduled";

    await booking.save();

    res.status(200).json({
      message: "Booking rescheduled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reschedule booking",
      error: error.message,
    });
  }
};
