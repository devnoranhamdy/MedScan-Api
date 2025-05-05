const express = require("express");
const {
    getAllMedicalAdvices ,
    getSpecificMedicalAdvice ,
    deleteAllMedicalAdvices ,
    deleteSpecificMedicalAdvice

} = require("../../controllers/patient/MedicalAdvicesController");
const {
 
} = require("../../utils/validators/MedicalAdvicesValidator");
const router = express.Router();


router
  .route("/:user_id")
  .get(getAllMedicalAdvices)
  .delete(deleteAllMedicalAdvices)
router
  .route("/:user_id/:medicalAdvice_id")
  .get(getSpecificMedicalAdvice)
  .delete(deleteSpecificMedicalAdvice);

module.exports = router;
