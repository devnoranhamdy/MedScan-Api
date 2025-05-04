const express = require("express");
const httpStatusText = require("../../utils/httpStatusText.js");
const cloudinary = require("../../config/cloudinaryConfig.js");
const multer = require("multer");
const upload = require("../../middelware/multer.js");
const chatbot = require("../../models/chatbot.js");
const asyncHandler = require('express-async-handler')

const uploadScans = asyncHandler(async (req, res) => {
  
    const result = await cloudinary.uploader.upload(req.file.path);
    const newScan = new chatbot({ scan: result.secure_url });
    newScan.save();
    res.status(200).json({ status: httpStatusText.SUCCESS,  message: "Uploaded!", data: result,});
});

module.exports = {
  uploadScans,
};
