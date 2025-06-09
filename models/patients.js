const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    
    _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
    patientId: {
      type: Number,
      unique: true,
      default: () => Math.floor(Math.random() * 1000000000),
    },

    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
     },
    phone: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    age: {
      type: Number,
      min: [0, "Age cannot be negative."],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "Gender must be male or female.",
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
    zipCode: {
      type: Number,
    },

    weight: {
      value: {
        type: Number,
        min: [0, "Weight cannot be negative."],
      },
      unit: {
        type: String,
        enum: {
          values: ['kg'],
          message: "Weight unit must be kg .",
        },
        default: "kg",
      },
    },
    height: {
      value: {
        type: Number,
        min: [0, "Height cannot be negative."],
      },
      unit: {
        type: String,
        enum: {
          values: ["cm"],
          message: "Height unit must be cm",
        },
        default: "cm",
      },
    },

    allergies: {
      type: [String],
      default: [],
    },
    medicalConditions: {
      type: String,
      trim: true,
    },
    diseases: {
      type: [String],
      default: [],
    },
    takesMedications: {
      type: Boolean,
      default: false,
    },
    medications: {
      type: [String],
      default: [],
    },
    bloodType: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "Blood type must be a valid value (e.g., A+, O-).",
      },
    },

    bloodPressure: {
      type: String,
      trim: true,
    },
    bloodSugar: {
      type: String,
      trim: true,
    },
    heartRate: {
      type: String,
      trim: true,
    },
    bodyTemperature: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
