const mongoose = require("mongoose");

const patientOfDoctorSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required."],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },

    // Vitals
    bloodGlucoseLevel: {
      type: String,
      trim: true,
    },
    weight: {
      value: { type: Number, min: 0 },
      unit: { type: String, enum: ["kg"]},
    },
    height: {
      value: { type: Number, min: 0 },
      unit: { type: String, enum: ["cm"]},
    },
    oxygenSaturation: {
      type: Number,
      min: [0, "Cannot be less than 0"],
      max: [100, "Cannot be more than 100"],
    },
    bodyTemperature: {
      type: Number,
    },
    bloodPressure: {
      systolic: { type: Number }, 
      diastolic: { type: Number }, 
    },
    
    // Medications as list
    medications: [
      {
        name: { type: String, required: true },
        dose: { type: String },
        time: { type: Date }, 
      },
    ],

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor reference is required."],
    },
  },{ timestamps: true }
);

module.exports = mongoose.model("PatientOfDoctor", patientOfDoctorSchema);
