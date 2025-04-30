const express = require("express");
const { body, validationResult } = require("express-validator");
const chatbotController = require("../../controllers/chatbot/chatbotController");
const upload = require("../../middelware/multer");
const verifyToken = require("../../middelware/verifyToken");
const medScan = require("../../chatbot");
const run = express.Router();

const router = express.Router();

router.post("/upload", upload.single("scan"), chatbotController.uploadScans);
router.post("/MedScan", verifyToken, run);

module.exports = router;
