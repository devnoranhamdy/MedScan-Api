const express = require("express");
const { getAllDoctors, getSpecificDoctor, createDoctor, updateDoctor, deleteDoctor } =
require("../../controllers/admin/doctorMangmentController");
const {
  validateGetSpecificDoctor,
  validateCreateDoctor,
  validateUpdateDoctor,
  validateDeleteDoctor,
} = require("../../utils/validators/doctorMangmentValidators");
const router = express.Router();

router.route("/")
.get(getAllDoctors)
.post(validateCreateDoctor, createDoctor);

router.route("/:doctorId")
  .get(validateGetSpecificDoctor, getSpecificDoctor)
  .put(validateUpdateDoctor, updateDoctor)
  .delete(validateDeleteDoctor, deleteDoctor);

module.exports = router;
