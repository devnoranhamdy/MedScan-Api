const express = require("express");
const {
  getAllDoctorProfiles,
  specificDoctorProfile,
  updateDoctorInfo,
  deleteDoctorProfile,
  createDoctorProfile,
} = require("../../controllers/doctor/doctorProfileController");

const router = express.Router();

router
  .route("/DoctorProfile")
  .get(getAllDoctorProfiles)
  .post(createDoctorProfile);

router
  .route("/DoctorProfile/:DoctorId")
  .get(specificDoctorProfile)
  .put(updateDoctorInfo)
  .delete(deleteDoctorProfile);

const PatientOfDoctorRoute = require("./patientOfDoctorRoutes");
router.use("/:doctorId/PatientOfDoctor", PatientOfDoctorRoute);
router.use("/:doctorId/:PatientOfDoctorId", PatientOfDoctorRoute);

module.exports = router;
