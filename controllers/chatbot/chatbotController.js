const express = require("express");
const httpStatusText = require("../../utils/httpStatusText.js");
const cloudinary = require("../../config/cloudinaryConfig.js");
const multer = require("multer");
const upload = require("../../middelware/multer.js");
const ChatBot = require("../../models/chatbot.js");
const asyncHandler = require('express-async-handler')
const {GoogleGenerativeAI} = require("@google/generative-ai");
const { generationConfig, promptText } = require("../../config/geminiConfig.js");
const mongoose = require('mongoose');
require("dotenv").config();


const chatSessions = {};
/*
exports.uploadScan = asyncHandler(async (req, res) => {
  const userId = req.params.user_id;

  if (!userId) {
    return res.status(401).json({ status: httpStatusText.FAIL, message: "Unauthorized" });
  }

  // التأكد من وجود ملف مرفوع
  if (!req.file) {
    return res.status(400).json({ status: httpStatusText.FAIL, message: "No file uploaded" });
  }

  // رفع الصورة على Cloudinary
  const result = await cloudinary.uploader.upload(req.file.path);


  if (result && result.secure_url) {
    // تحديث الـ ChatBot وحفظ رابط الصورة في حقل scan_url
    const updatedDoc = await ChatBot.findOneAndUpdate(
      { user_id: userId },
      { 
        $push: { 
          scans: { 
            scan_url: result.secure_url,  // استخدام scan_url بدلاً من secure_url
            uploadedAt: new Date()        // تاريخ الرفع
          }
        }
      },
      { upsert: true, new: true }
    );


    // الرد بالمعلومات مع رابط الصورة
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "Scan uploaded successfully!",
      data: updatedDoc,
    });
  } else {
    throw new Error('No scan_url returned from Cloudinary');
  }
});

exports.chatWithBot = asyncHandler(async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const userMessage = req.body.message;
  const firstName = req.decodedToken?.firstName || "User";
  const user_id = req.params.user_id || req.decodedToken?.id;

  if (!user_id) {
    return res.status(400).json({ status: "error", message: "user_id is required" });
  }


  let chat = chatSessions[user_id];

  if (!chat) {
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash-001' });
    const prompt = promptText(firstName);

    chat = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
        {
          role: "model",
          parts: [{ text: "شكرًا، سألتزم بالتعليمات. يمكنك بدء المحادثة الآن 🩺" }],
        },
      ],
    });

    chatSessions[user_id] = chat;
  }

  let result, response, text;
  try {
    result = await chat.sendMessage(userMessage);
    response = await result.response;
    text = await response.text();
  } catch (error) {
    if (error.message.includes("429")) {
      return res.status(429).json({
        status: "error",
        message: "لقد تجاوزت الحد اليومي للطلبات المجانية. يُرجى المحاولة لاحقًا أو التحقق من خطة الاستخدام الخاصة بك.",
      });
    }
    // غير كده اعتبره خطأ عام
    return res.status(500).json({
      status: "error",
      message: "حدث خطأ أثناء محاولة التواصل مع الروبوت الطبي.",
      error: error.message,
    });
  }

  const adviceMatch = text.match(/📝\s*(?:Medical Advice|نصيحة طبية):\s*(?:\n{0,2})?([\s\S]*?)(?:\n{2,}|$)/i);
  const adviceContent = adviceMatch?.[1]?.trim();

  const newMessage = {
    role: 'user',
    content: userMessage,
    timestamp: new Date(),
  };

  const botReplyMessage = {
    role: 'bot',
    content: text,
    timestamp: new Date(),
  };

  let chatDoc = await ChatBot.findOne({ user_id });

  if (!chatDoc) {
    chatDoc = await ChatBot.create({ user_id, messages: [], scans: [], advices: [] });
  }

  chatDoc.messages.push(newMessage, botReplyMessage);

  if (adviceContent) {
    chatDoc.advices.push({
      title: "Medical Advice",
      content: adviceContent,
      dateGiven: new Date(),
    });
  }

  await chatDoc.save();

  res.status(200).json({ status: "success", reply: text });
});
*/

exports.chatWithBot = asyncHandler(async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const firstName = req.decodedToken?.firstName || "User";
  const user_id = req.params.user_id || req.decodedToken?.id;

  if (!user_id) {
    return res.status(400).json({ status: "error", message: "user_id is required" });
  }

  let imageUrl = null;

  // ارفع الصورة إن وُجدت
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    if (result && result.secure_url) {
      imageUrl = result.secure_url;

      // حفظ الصورة في قاعدة البيانات
      await ChatBot.findOneAndUpdate(
        { user_id },
        {
          $push: {
            scans: {
              scan_url: imageUrl,
              uploadedAt: new Date(),
            },
          },
        },
        { upsert: true, new: true }
      );
    } else {
      return res.status(500).json({ status: "error", message: "فشل رفع الصورة" });
    }
  }

  // كون الرسالة اللي هتتبعت للتشات بوت
  let userMessage = req.body.message;

  if (!userMessage && imageUrl) {
    userMessage = `📸 تم رفع صورة أشعة جديدة، يرجى تحليلها من خلال الرابط التالي:\n${imageUrl}`;
  }

  if (!userMessage) {
    return res.status(400).json({
      status: "error",
      message: "الرسالة النصية أو الصورة مطلوبة للتفاعل مع التشات بوت.",
    });
  }

  // تحضير جلسة المحادثة
  let chat = chatSessions[user_id];

  if (!chat) {
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash-001' });
    const prompt = promptText(firstName);

    chat = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
        {
          role: "model",
          parts: [{ text: "شكرًا، سألتزم بالتعليمات. يمكنك بدء المحادثة الآن 🩺" }],
        },
      ],
    });

    chatSessions[user_id] = chat;
  }

  let result, response, text;
  try {
    result = await chat.sendMessage(userMessage);
    response = await result.response;
    text = await response.text();
  } catch (error) {
    if (error.message.includes("429")) {
      return res.status(429).json({
        status: "error",
        message: "لقد تجاوزت الحد اليومي للطلبات المجانية. يُرجى المحاولة لاحقًا أو التحقق من خطة الاستخدام الخاصة بك.",
      });
    }
    return res.status(500).json({
      status: "error",
      message: "حدث خطأ أثناء محاولة التواصل مع الروبوت الطبي.",
      error: error.message,
    });
  }

  const adviceMatch = text.match(/📝\s*(?:Medical Advice|نصيحة طبية):\s*(?:\n{0,2})?([\s\S]*?)(?:\n{2,}|$)/i);
  const adviceContent = adviceMatch?.[1]?.trim();

  const newMessage = {
    role: 'user',
    content: userMessage,
    timestamp: new Date(),
  };

  const botReplyMessage = {
    role: 'bot',
    content: text,
    timestamp: new Date(),
  };

  let chatDoc = await ChatBot.findOne({ user_id });

  if (!chatDoc) {
    chatDoc = await ChatBot.create({ user_id, messages: [], scans: [], advices: [] });
  }

  chatDoc.messages.push(newMessage, botReplyMessage);

  if (adviceContent) {
    chatDoc.advices.push({
      title: "Medical Advice",
      content: adviceContent,
      dateGiven: new Date(),
    });
  }

  await chatDoc.save();

  return res.status(200).json({
    status: "success",
    reply: text,
    ...(imageUrl && { scan_uploaded: imageUrl }),
  });
});


exports.getChatHistory = asyncHandler(async (req, res) => {
  
  const userId = req.params.user_id; // req.decodedToken?.id;

  const chatHistory = await ChatBot.findOne({ user_id: userId });

  if (!chatHistory) {
    return res.status(404).json({status: httpStatusText.FAIL,message: "No chat history found for this user.",});
  }

  res.status(200).json({ status: httpStatusText.SUCCESS , data: chatHistory, });
});

exports.clearChatHistory = asyncHandler(async (req, res) => {
  const userId = req.params.user_id; // req.decodedToken?.id;
  const updatedChatHistory = await ChatBot.findOneAndUpdate(
    { user_id: userId },
    { $set: { messages: [], scans: [], advices: [] } }, 
    { new: true } 
  );

  if (!updatedChatHistory) {
    return res.status(404).json({ status: httpStatusText.FAIL,  message: "No chat history found to clear for this user.",});
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, message: "Chat history cleared successfully.",});
 
});





