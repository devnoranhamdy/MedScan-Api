const express = require("express");
const doctorRecomendationControler = require("../../controllers/patient/doctorRecommController");
const router = express.Router();
const verifyToken = require("../../middelware/verifyToken");
const verifyRole = require("../../middelware/verifyRole");
const{validateSpecificDoctorById , validateShowDoctorsBySpecialty ,validateShowDoctorsBycity}= require('../../utils/validators/doctorRecommValidator')

router.get("/", doctorRecomendationControler.showAllDoctors);
router.get("/bySpecialty",doctorRecomendationControler.showDoctorsBySpecialty);
router.get( "/byCity",doctorRecomendationControler.showDoctorsByCity);
router.get("/byCityAndSpecialty",doctorRecomendationControler.showDoctorsByCityAndSpecialty);
router.get('/:doctorId' ,validateSpecificDoctorById, doctorRecomendationControler.specificDoctorById )

module.exports = router;
