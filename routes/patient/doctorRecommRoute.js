const express = require("express");
const doctor_recomendation_controler = require("../../controllers/patient/doctorRecommController");
const router = express.Router();
const verifyToken = require("../../middelware/verifyToken");
const verifyRole = require("../../middelware/verifyRole");
const{validatespecificDoctorById}= require('../../utils/validators/doctorRecommValidator')

router.get("/doctors", doctor_recomendation_controler.showAllDoctors);
router.get(
  "/doctors_by_specialty",
  doctor_recomendation_controler.showDoctorsBySpecialty
);
router.get(
  "/doctors_by_city",
  doctor_recomendation_controler.showDoctorsByCity
);
router.get(
  "/doctors_by_city_and_specialty",
  doctor_recomendation_controler.showDoctorsByCityAndSpecialty
);

router.get('/searchDoctor/:doctorId' ,validatespecificDoctorById, doctor_recomendation_controler.specificDoctorById )

module.exports = router;
