const { check } = require("express-validator");
const validationMiddleWare = require("../../middelware/validationError");
const Patient = require("../../models/doctorRecomm");


const checkPatientId = () => {
  return check("PatientId")
    .isMongoId()
    .withMessage("invalid id format")
    .custom(async (PatientId) => {
      const findPatient = await Patient.findById(PatientId);
      if (!findPatient) {
        return Promise.reject(new Error("Patient not exist!"));
      }
      return true;
    });
};
exports.validatespecificDoctorById = [checkPatientId(), validationMiddleWare];

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
