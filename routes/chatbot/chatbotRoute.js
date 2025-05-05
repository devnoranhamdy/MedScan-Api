const express = require("express");
const { uploadScan,chatWithBot, getChatHistory,clearChatHistory,} = require("../../controllers/chatbot/chatbotController");
const upload = require("../../middelware/multer");

const router = express.Router();

router.post("/upload/:user_id",  upload.single("scan"), uploadScan);
router.post("/chat/:user_id", chatWithBot);

router.route("/history/:user_id")
.get(getChatHistory)
.put(clearChatHistory);

module.exports = router;
