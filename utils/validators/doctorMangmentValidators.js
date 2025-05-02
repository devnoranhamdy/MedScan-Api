const { check } = require("express-validator");
const Doctor = require("../../models/doctorRecomm.js");
const ApiError = require("../ApiError.js");
const validationMiddleWare = require("../../middelware/validationError");

const checkDoctortId = () => {
  return check("doctorId")
    .isMongoId()
    .withMessage("invalid id format")
    .custom(async (doctorId) => {
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return Promise.reject(new ApiError("Doctor not exist!", 400));
      }
      return true;
    });
};

exports.validateGetSpecificDoctor = [checkDoctortId(), validationMiddleWare];
exports.validateDeleteDoctor = [checkDoctortId(), validationMiddleWare];
exports.validateCreateDoctor = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  check("specialization").notEmpty().withMessage("Specialization is required"),

  check("fees")
    .optional()
    .matches(/^[0-9]+( ?(EGP|LE))?$/)
    .withMessage(
      "Fees must be a number with optional currency (e.g., 200 EGP)"
    ),

  check("avg_rate")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),

  check("waiting_time")
    .optional()
    .isString()
    .withMessage("Waiting time must be a string"),

  check("clinic_location")
    .notEmpty()
    .withMessage("Clinic location is required"), validationMiddleWare
];
exports.validateUpdateDoctor = [
  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  check("specialization").optional(),

  check("fees")
    .optional()
    .matches(/^[0-9]+( ?(EGP|LE))?$/)
    .withMessage(
      "Fees must be a number with optional currency (e.g., 200 EGP)"
    ),

  check("avg_rate")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),

  check("waiting_time")
    .optional()
    .isString()
    .withMessage("Waiting time must be a string"),

  check("clinic_location").optional(),
  validationMiddleWare,
];
