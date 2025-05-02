const express = require("express");
const { getAllUsers, getSpecificUser, createUser, updateUser, deleteUser } =
require("../../controllers/admin/userController.js");
const {
  validateGetSpecificUser,
  validateCreateUser,
  validateUpdateUser,
  validateDeleteUser,
} = require("../../utils/validators/userValidattor");
const router = express.Router();

router.route("/")
.get(getAllUsers)
.post(validateCreateUser, createUser);

router.route("/:userId")
  .get(validateGetSpecificUser, getSpecificUser)
  .put(validateUpdateUser, updateUser)
  .delete(validateDeleteUser, deleteUser);

module.exports = router;
