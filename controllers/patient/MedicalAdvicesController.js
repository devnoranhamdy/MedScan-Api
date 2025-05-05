const express= require('express');
const ChatBot = require ('../../models/chatbot')
const asyncHandler = require('express-async-handler')
const httpStatusText = require('../../utils/httpStatusText')


exports.getAllMedicalAdvices = asyncHandler (async (req,res)=>{
    
    const { limit, page } = req.query
    const limitNum = limit * 1 || 10
    const pageNum = page * 1 || 1
    const skip = (pageNum - 1) * limitNum;
    const { user_id } = req.params;

    const chatData = await ChatBot.findOne({ user_id }).skip(skip).limit(limitNum);
    if (!chatData || !chatData.advices.length) {
      return res.status(404).json({status: "error", message: "No medical advices found for this user.",});
    }
  
    res.status(200).json({status: httpStatusText.SUCCESS , medicalAdvices: chatData.advices});

});

exports.getSpecificMedicalAdvice = asyncHandler(async (req, res) => {
    const { user_id, medicalAdvice_id } = req.params;
  
    const chatData = await ChatBot.findOne({ user_id });
    if (!chatData || !chatData.advices.length) {
      return res.status(404).json({ status: "error", message: "No medical advices found for this user."});}
  
    const advice = chatData.advices.find( advice => advice._id.toString() === medicalAdvice_id );
    res.status(200).json({ status: httpStatusText.SUCCESS, data: advice,});
});
  
exports.deleteAllMedicalAdvices = asyncHandler(async(req,res)=>
    {
       
            const { user_id  }= req.params;
            const chatData = await ChatBot.findOne({ user_id })
            if (!chatData || !chatData.advices.length) {
            return res.status(404).json({status: "error", message: "No medical advices found for this user.",});
            }
            chatData.advices = []  ;
            await chatData.save(); 
  
         res.status(200).json({ status : httpStatusText.SUCCESS , message:"All medical advices deleted successfully"});
       
});

exports.deleteSpecificMedicalAdvice = asyncHandler(async(req,res)=>
    {
        const { user_id, medicalAdvice_id } = req.params;
        const chatData = await ChatBot.findOne({ user_id });
        if (!chatData || !chatData.advices.length) {
          return res.status(404).json({  status: "error", message: "No medical advices found for this user.", });
        }
      
        chatData.advices = chatData.advices.filter(advice => advice._id.toString() !== medicalAdvice_id);
         await chatData.save(); 
        res.status(200).json({ status: httpStatusText.SUCCESS, message: "Medical advice deleted successfully.", });
       
});
