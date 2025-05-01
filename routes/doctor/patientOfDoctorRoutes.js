const express = require("express");
const {
  getAllPatientsOfDoctor,
  createPatientOfDoctor,
  getPatientOfDoctor,
  updatePatientOfDoctor,
  deletePatientOfDoctor,
  nestedRouteForAddDoctorIdToParam,
  
} = require("../../controllers/doctor/patientsOfDoctorController");
const {
  validategetAllPatientsOfDoctor,
  validateSpecificPatientOfDoctor,
  validateDeletePatientOfDoctor,
  validateupdatePatientOfDoctor,
  validatecreatePatientOfDoctor,
} = require("../../utils/validators/patientsOfDoctorValidator");
const router = express.Router({ mergeParams: true });



router
  .route("/")
  .get(validategetAllPatientsOfDoctor, getAllPatientsOfDoctor)
  .post( nestedRouteForAddDoctorIdToParam,validatecreatePatientOfDoctor,  createPatientOfDoctor);

router
  .route("/:PatientOfDoctorId")
  .get(validateSpecificPatientOfDoctor, getPatientOfDoctor)
  .put(validateupdatePatientOfDoctor, updatePatientOfDoctor)
  .delete(validateDeletePatientOfDoctor, deletePatientOfDoctor);

module.exports = router;
