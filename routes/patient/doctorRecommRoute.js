const express = require("express");
const doctor_recomendation_controler = require("../../controllers/patient/doctorRecommController");
const router = express.Router();
const verifyToken = require("../../middelware/verifyToken");
const verifyRole = require("../../middelware/verifyRole");

router.get("/doctors", doctor_recomendation_controler.show_all_doctors);
router.get(
  "/doctors_by_specialty",
  doctor_recomendation_controler.show_doctors_by_specialty
);
router.get(
  "/doctors_by_city",
  doctor_recomendation_controler.show_doctors_by_city
);
router.get(
  "/doctors_by_city_and_specialty",
  doctor_recomendation_controler.show_doctors_by_city_and_specialty
);

module.exports = router;
