const { check } = require("express-validator");
const validationMiddleWare = require("../../middelware/validationError");
const Doctor = require("../../models/doctorRecomm");


const checkDoctorId = () => {
  return check("doctorId")
    .isMongoId()
    .withMessage("invalid id format")
    .custom(async (doctorId) => {
      const findDoctor = await Doctor.findById(doctorId);
      if (!findDoctor) {
        return Promise.reject(new Error("Doctor not exist!"));
      }
      return true;
    });
};

const findDoctorByspecialization = () => {
  return check("specialization").custom(async (specialization) => {
    const findDoctor = await Doctor.findOne({ specialization });
    if (!findDoctor) {
      return Promise.reject(new Error('there is no doctors available'));
    }
    return true;
  });
};

const findDoctorByCity= () => {
  return check("clinic_location").custom(async (clinic_location) => {
    const findDoctor = await Doctor.findOne({ clinic_location });
    if (!findDoctor) {
      return Promise.reject(new Error('there is no doctors available'));
    }
    return true;
  });
};

exports.validateSpecificDoctorById = [checkDoctorId(), validationMiddleWare];
exports.validateShowDoctorsBySpecialty= [findDoctorByspecialization(), validationMiddleWare];
exports.validateShowDoctorsBycity= [findDoctorByCity(), validationMiddleWare];

/*exports.doctorRecommendationValidator = [
  check("name")
    .notEmpty()
    .withMessage(" name is required.")
    .isString()
    .withMessage("Name must be a string.")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters."),

  check("specialization")
    .notEmpty()
    .withMessage(" name is required.")
    .isString()
    .withMessage("Specialization must be a string."),

  check("fees")
    .optional()
    .matches(/^[0-9]+(EGP|LE)?$/)
    .withMessage(
      "Fees must be a number with optional currency (e.g., 200EGP)."
    ),

  check("avg_rate")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Average rate must be between 0 and 5."),

  check("waiting_time")
    .optional()
    .isString()
    .withMessage("Waiting time must be a string."),

  check("clinic_location")
    .optional()
    .isString()
    .withMessage("Clinic location must be a string."),

  check("image_url")
    .optional()
    .isURL()
    .withMessage("Image URL must be a valid link.")
    .matches(/\.(jpg|jpeg|png|webp)$/)
    .withMessage("Image must be a valid image format (jpg, png, webp)."),
  validationMiddleWare,
];*/
