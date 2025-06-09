const mongoose = require('mongoose');

const doctorRecommendationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      required: [true, " name is required."],

    },
    specialization: {
      type: String,
      trim: true,
      required: [true, "specialization is required."],

    },
    fees: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[0-9]+\s?(EGP|LE)?$/.test(v);

        },
        message: 'Fees must be a number with optional currency (e.g., 200EGP).',
      },
    },
    avg_rate: {
      type: Number,
      min: 0,
      max: 5,
    },
    waiting_time: {
      type: String,
      trim: true,
    },
    clinic_location: {
      type: String,
      trim: true,
    },
    image_url: {
      type: String,
      trim: true,
      
      },
    },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorRecommendationSchema);
