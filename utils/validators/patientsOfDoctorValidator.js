const { check } = require("express-validator");
const validationMiddleWare = require("../../middelware/validationError");
const Patient = require("../../models/patientOfDoctor");
const Doctor_Profile = require("../../models/doctor");
const ApiError = require ('../ApiError.js')

const checkDoctorId = () => {
  return check("doctorId")
    .isMongoId()
    .withMessage("invalid id format")
    .custom(async (doctorId) => {
      const findDoctor = await Doctor_Profile.findById(doctorId);
      if (!findDoctor) {
        return Promise.reject(new ApiError("doctor not exist!" , 400));
      }
      return true;
    });
};
const checkPatientOfDoctorId = () => {
  return check("PatientOfDoctorId")
    .isMongoId()
    .withMessage("invalid id format")
    .custom(async (PatientOfDoctorId) => {
      const findPatient = await Patient.findById(PatientOfDoctorId);
      if (!findPatient) {
        return Promise.reject(new Error("Patient not exist!"));
      }
      return true;
    });
};

exports.validategetAllPatientsOfDoctor = [
  checkDoctorId(),
  validationMiddleWare,
];

exports.validateSpecificPatientOfDoctor = [
  checkDoctorId(),
  checkPatientOfDoctorId(),
  validationMiddleWare,
];

exports.validateDeletePatientOfDoctor = [
  checkDoctorId(),
  checkPatientOfDoctorId(),
  validationMiddleWare,
];

exports.validateupdatePatientOfDoctor = [
  check("patientName").optional()
    .isLength({ min: 2 })
    .withMessage("Patient name must be at least 2 characters."),

  check("location")
    .optional()
    .isString()
    .withMessage("Location must be a string."),

  check("bloodGlucoseLevel")
    .optional()
    .isString()
    .withMessage("Blood glucose level must be a string."),

  check("weight.value")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Weight must be a positive number."),

  check("weight.unit")
    .optional()
    .isIn(["kg"])
    .withMessage("Weight unit must be 'kg'."),

  check("height.value")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Height must be a positive number."),

  check("height.unit")
    .optional()
    .isIn(["cm"])
    .withMessage("Height unit must be 'cm'."),

  check("oxygenSaturation")
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage("Oxygen saturation must be between 0 and 100."),

  check("bodyTemperature")
    .optional()
    .isFloat()
    .withMessage("Body temperature must be a number."),

  check("bloodPressure.systolic")
    .optional()
    .isInt()
    .withMessage("Systolic pressure must be an integer."),

  check("bloodPressure.diastolic")
    .optional()
    .isInt()
    .withMessage("Diastolic pressure must be an integer."),

  check("medications")
    .optional()
    .isArray()
    .withMessage("Medications must be an array."),

  check("medications.*.dose")
    .optional()
    .isString()
    .withMessage("Dose must be a string."),

  check("medications.*.time")
    .optional()
    .isISO8601()
    .withMessage("Medication time must be a valid date."),
  checkDoctorId(),
  checkPatientOfDoctorId(),
  validationMiddleWare,
];

exports.validatecreatePatientOfDoctor = [
  check("patientName")
    .notEmpty()
    .withMessage("Patient name is required.")
    .isLength({ min: 2 })
    .withMessage("Patient name must be at least 2 characters."),

  check("location")
    .optional()
    .isString()
    .withMessage("Location must be a string."),

  check("bloodGlucoseLevel")
    .optional()
    .isString()
    .withMessage("Blood glucose level must be a string."),

  check("weight.value")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Weight must be a positive number."),

  check("weight.unit")
    .optional()
    .isIn(["kg"])
    .withMessage("Weight unit must be 'kg'."),

  check("height.value")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Height must be a positive number."),

  check("height.unit")
    .optional()
    .isIn(["cm"])
    .withMessage("Height unit must be 'cm'."),

  check("oxygenSaturation")
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage("Oxygen saturation must be between 0 and 100."),

  check("bodyTemperature")
    .optional()
    .isFloat()
    .withMessage("Body temperature must be a number."),

  check("bloodPressure.systolic")
    .optional()
    .isInt()
    .withMessage("Systolic pressure must be an integer."),

  check("bloodPressure.diastolic")
    .optional()
    .isInt()
    .withMessage("Diastolic pressure must be an integer."),

  check("medications")
    .optional()
    .isArray()
    .withMessage("Medications must be an array."),

  check("medications.*.name")
    .notEmpty()
    .withMessage("Medication name is required."),

  check("medications.*.dose")
    .optional()
    .isString()
    .withMessage("Dose must be a string."),

  check("medications.*.time")
    .optional()
    .isISO8601()
    .withMessage("Medication time must be a valid date."),

  validationMiddleWare,
];


