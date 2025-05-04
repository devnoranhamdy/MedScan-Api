const express = require('express');
const router = express.Router();
const axios = require('axios');
const ChatBot = require('../../models/chatbot'); 

// bones
router.get('/send-bones-scan/:chatId', async (req, res) => {
    try {
      const { chatId } = req.params;
  
      // 1. دور على الـ chat في الداتابيز
      const chat = await ChatBot.findOne({ _id: chatId });
      if (!chat || !chat.scan) {
        return res.status(404).json({ message: 'Scan not found for this chat ID.' });
      }
  
      // 2. ابعت رابط الصورة للـ Python AI Model
      const response = await axios.post('http://127.0.0.1:5000/predict_bone', {
        image_path: chat.scan // تأكد من أن الـ scan يحتوي على رابط الصورة الصحيح
      });
  
      // 3. ارجع النتيجة في الـ response
      res.status(200).json({
        prediction: response.data // هنا الـ data القادمة من الـ Python API
      });
  
    } catch (error) {
      console.error('Error sending scan to AI model:', error.message);
      res.status(500).json({ message: 'Something went wrong.' });
    }
});
//skin
 router.get('/send-skin-scan/:chatId', async (req, res) => {
    try {
      const { chatId } = req.params;
      const chat = await ChatBot.findById(chatId);
      if (!chat || !chat.scan) {
        return res.status(404).json({ message: 'Scan not found for this chat ID.' });
      }
  
      const response = await axios.post('http://127.0.0.1:5000/predict_skin', {
        image_path: chat.scan
      });
  
      res.status(200).json({
        prediction: response.data
      });
  
    } catch (error) {
      console.error('Error sending skin scan to AI model:', error.message);
      res.status(500).json({ message: 'Something went wrong.' });
    }
});
//heart
router.post('/send-heart-data', async (req, res) => {
    try {
      const userData = req.body;
  
      const response = await axios.post('http://127.0.0.1:5000/predict_heart', userData);
  
      res.status(200).json({
        prediction: response.data
      });
  
    } catch (error) {
      console.error('Error sending heart data to AI model:', error.message);
      res.status(500).json({ message: 'Something went wrong.' });
    }
});
  
  
  
module.exports = router;
