const { check } = require("express-validator");
const validationMiddleWare = require("../../middelware/validationError");
const Doctor = require("../../models/doctor");

const checkDoctorId = () => {
  return check("DoctorId")
    .isMongoId()
    .withMessage("invalid id format")
    .custom(async (DoctorId) => {
      const findDoctor = await Doctor.findById(DoctorId);
      if (!findDoctor) {
        return Promise.reject(new Error("doctor not exist!"));
      }
      return true;
    });
};
exports.validateDeleteDoctorProfile = [checkDoctorId(), validationMiddleWare];

exports.validateSpecificDoctorProfile = [checkDoctorId(), validationMiddleWare];

exports.validateUpdateDoctorInfo = [
  check("firstName").isString().withMessage("First name must be a string."),

  check("lastName").isString().withMessage("Last name must be a string."),

  check("Status")
    .optional()
    .isIn(["single", "married"])
    .withMessage("Marital status must be 'single' or 'married'."),

  check("city").optional().isString().withMessage("City must be a string."),

  check("country")
    .optional()
    .isString()
    .withMessage("Country must be a string."),

  check("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid date."),

  check("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Phone number must be valid."),

  check("email").isEmail().withMessage("Email must be valid."),

  check("specialty")
    .optional()
    .isString()
    .withMessage("Specialty must be a string."),
  checkDoctorId(),
  validationMiddleWare,
];
exports.validatecreateDoctorProfile = [
  check("firstName")
    .notEmpty()
    .withMessage("First name is required.")
    .isString()
    .withMessage("First name must be a string."),

  check("lastName")
    .notEmpty()
    .withMessage("Last name is required.")
    .isString()
    .withMessage("Last name must be a string."),

  check("Status")
    .optional()
    .isIn(["single", "married"])
    .withMessage("Marital status must be 'single' or 'married'."),

  check("city").optional().isString().withMessage("City must be a string."),

  check("country")
    .optional()
    .isString()
    .withMessage("Country must be a string."),

  check("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid date."),

  check("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Phone number must be valid."),

  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email must be valid."),

  check("specialty")
    .optional()
    .isString()
    .withMessage("Specialty must be a string."),
  validationMiddleWare,
];
