const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
    },
    Status: {
      type: String,
      enum: {
        values: ["single", "married"],
        message:
          "Marital status must be one of: single or married",
      },
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      lowercase: true,
      trim: true,
    },
    specialty: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

//module.exports = mongoose.model("Doctor", doctorSchema);
const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
