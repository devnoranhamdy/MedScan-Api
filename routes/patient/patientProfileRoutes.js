const express = require("express");
const {
  getAllPatientProfiles,
  specificPatientProfile,
  updatePatientInfo,
  deletePatientProfile,
  createPatientProfile,
} = require("../../controllers/patient/patientProfileController");
const {
  validateDeletePatientProfile,
  validateSpecificPatientProfile,
  ValidateCreatePatientProfile,
  ValidateUpdatePatientProfile,
} = require("../../utils/validators/patientProfileValidator");
const router = express.Router();


router
  .route("/")
  .get(getAllPatientProfiles)
  
router
  .route("/:patientId")
  .get(validateSpecificPatientProfile, specificPatientProfile)
  .put(ValidateUpdatePatientProfile, updatePatientInfo)
  .delete(validateDeletePatientProfile, deletePatientProfile);

module.exports = router;
