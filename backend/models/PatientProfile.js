import mongoose from "mongoose";

const patientProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      default: "",
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContact: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    medicalConditions: {
      type: String,
      default: "",
      trim: true,
    },
    allergies: {
      type: String,
      default: "",
      trim: true,
    },
    medicines: {
      type: String,
      default: "",
      trim: true,
    },
    mobility: {
      type: String,
      default: "",
      trim: true,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const PatientProfile = mongoose.model("PatientProfile", patientProfileSchema);

export default PatientProfile;
