import mongoose from "mongoose";

const caregiverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    availability: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    languages: {
      type: [String],
      default: [],
    },
    certifications: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: String,
      default: "",
      trim: true,
    },
    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Caregiver = mongoose.model("Caregiver", caregiverSchema);

export default Caregiver;
