import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caregiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Caregiver",
      required: true,
    },
    patientProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientProfile",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled", "Rescheduled"],
      default: "Pending",
    },
    price: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
