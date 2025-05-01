const { check } = require("express-validator");
const validationMiddleWare = require("../../middelware/validationError");
const Patient = require("../../models/patients");

const checkPatientId = () => {
  return check("patientId")
    .isMongoId()
    .withMessage("invalid id format")
    .custom(async (patientId) => {
      const findPatient = await Patient.findById(patientId);
      if (!findPatient) {
        return Promise.reject(new Error("Patient not exist!"));
      }
      return true;
    });
};

const findPatient = () => {
  return check("email").custom(async (email) => {
    const findEmail = await Patient.findOne({ email });
    if (findEmail) {
      return Promise.reject(new Error("user already exist!"));
    }
    return true;
  });
};

exports.validateDeletePatientProfile = [checkPatientId(), validationMiddleWare];

exports.validateSpecificPatientProfile = [
  checkPatientId(),
  validationMiddleWare,
];

exports.ValidateCreatePatientProfile = [
  check("patientId")
    .optional()
    .isInt()
    .withMessage("Patient ID must be an integer."),

  check("firstName").notEmpty().withMessage("First name is required."),

  check("lastName").notEmpty().withMessage("Last name is required."),

  check("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format."),

  check("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Phone number must be valid."),

  check("dateOfBirth")
    .isISO8601()
    .withMessage("Date of birth must be a valid date."),

  check("age").isInt({ min: 0 }).withMessage("Age must be a positive integer."),

  check("gender")
    .notEmpty()
    .withMessage("Gender is required.")
    .isIn(["male", "female"])
    .withMessage("Gender must be male or female."),

  check("city").optional().isString(),

  check("country").optional().isString(),

  check("zipCode").optional().isInt().withMessage("Zip Code must be a number."),

  check("weight.value")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Weight must be a positive number."),

  check("weight.unit")
    .optional()
    .equals("kg")
    .withMessage("Weight unit must be kg."),

  check("height.value")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Height must be a positive number."),

  check("height.unit")
    .optional()
    .equals("cm")
    .withMessage("Height unit must be cm."),

  check("allergies")
    .optional()
    .isArray()
    .withMessage("Allergies must be an array."),

  check("medicalConditions").optional().isString(),

  check("diseases")
    .optional()
    .isArray()
    .withMessage("Diseases must be an array."),

  check("takesMedications")
    .optional()
    .isBoolean()
    .withMessage("Takes medications must be true or false."),

  check("medications")
    .optional()
    .isArray()
    .withMessage("Medications must be an array."),

  check("bloodType")
    .optional()
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood type."),

  check("bloodPressure").optional().isString(),

  check("bloodSugar").optional().isString(),

  check("heartRate").optional().isString(),

  check("bodyTemperature").optional().isString(),
  findPatient(),
  validationMiddleWare,
];

exports.ValidateUpdatePatientProfile = [
  check("firstName").optional(),

  check("lastName").optional(),

  check("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Phone number must be valid."),

  check("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid date."),

  check("age")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Age must be a positive integer."),

  check("gender")
    .optional()
    .isIn(["male", "female"])
    .withMessage("Gender must be male or female."),

  check("city").optional().isString(),

  check("country").optional().isString(),

  check("zipCode").optional().isInt().withMessage("Zip Code must be a number."),

  check("weight.value")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Weight must be a positive number."),

  check("weight.unit")
    .optional()
    .equals("kg")
    .withMessage("Weight unit must be kg."),

  check("height.value")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Height must be a positive number."),

  check("height.unit")
    .optional()
    .equals("cm")
    .withMessage("Height unit must be cm."),

  check("allergies")
    .optional()
    .isArray()
    .withMessage("Allergies must be an array."),

  check("medicalConditions").optional().isString(),

  check("diseases")
    .optional()
    .isArray()
    .withMessage("Diseases must be an array."),

  check("takesMedications")
    .optional()
    .isBoolean()
    .withMessage("Takes medications must be true or false."),

  check("medications")
    .optional()
    .isArray()
    .withMessage("Medications must be an array."),

  check("bloodType")
    .optional()
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood type."),

  check("bloodPressure").optional().isString(),

  check("bloodSugar").optional().isString(),

  check("heartRate").optional().isString(),

  check("bodyTemperature").optional().isString(),
  checkPatientId(),
  validationMiddleWare,
];
