const express= require('express');
const Patient =require('../../models/patients');
const asyncHandler = require('express-async-handler')
const httpStatusText = require('../../utils/httpStatusText')

exports.getAllPatientProfiles = asyncHandler (async (req,res)=>{
    
    const { limit, page } = req.query
    const limitNum = limit * 1 || 10
    const pageNum = page * 1 || 1
    const skip = (pageNum - 1) * limitNum;
    const patients = await Patient.find({},{"__v": 0}).skip(skip).limit(limitNum);
    res.status(200).json({ status : httpStatusText.SUCCESS ,length :patients.length  , data : patients});

});

exports.specificPatientProfile = asyncHandler(async (req,res)=>{
    
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);
    res.status(200).json({ status : httpStatusText.SUCCESS , data : patient});

});

exports.updatePatientInfo = asyncHandler( async (req,res)=>
    {
      
        const { patientId } = req.params ;
        const updatedPatient = await Patient.findByIdAndUpdate(patientId , req.body,{new:true});  
        res.status(200).json({ status : httpStatusText.SUCCESS , message:"patient updated successfully", data : updatedPatient});
            
        
});

exports.deletePatientProfile = asyncHandler(async(req,res)=>
    {
       
            const { patientId }= req.params;
            await Patient.findByIdAndDelete(patientId);
            res.status(200).json({ status : httpStatusText.SUCCESS , message:"patient deleted successfully"});
       
});

exports.createPatientProfile = asyncHandler(async(req,res)=>{
        
    const newPatient = new Patient(req.body)
    await newPatient.save();
    res.status(200).json({ status : httpStatusText.SUCCESS , message:"patient deleted successfully" , data : newPatient});
   
});