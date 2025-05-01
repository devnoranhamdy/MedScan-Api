const express = require("express");
const {
  getAllDoctorProfiles,
  specificDoctorProfile,
  updateDoctorInfo,
  deleteDoctorProfile,
  createDoctorProfile,
} = require("../../controllers/doctor/doctorProfileController");

const {
  validateDeleteDoctorProfile,
  validateSpecificDoctorProfile,
  validateUpdateDoctorInfo,
  validatecreateDoctorProfile,
} = require("../../utils/validators/doctorProfileValidator");
const router = express.Router();

router
  .route("/")
  .get(getAllDoctorProfiles)
  .post( validatecreateDoctorProfile, createDoctorProfile);

router
  .route("/:doctorId")
  .get(validateSpecificDoctorProfile, specificDoctorProfile)
  .put(validateUpdateDoctorInfo, updateDoctorInfo)
  .delete(validateDeleteDoctorProfile, deleteDoctorProfile);

const PatientOfDoctorRoute = require("./patientOfDoctorRoutes");
router.use("/:doctorId/PatientOfDoctor", PatientOfDoctorRoute);

module.exports = router;
