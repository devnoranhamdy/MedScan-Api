const express= require('express');
const Doctor= require('../../models/doctor');
const asyncHandler = require('express-async-handler')
const httpStatusText = require('../../utils/httpStatusText')


exports.getAllDoctorProfiles = asyncHandler (async (req,res)=>{
    
    const { limit, page } = req.query
    const limitNum = limit * 1 || 10
    const pageNum = page * 1 || 1
    const skip = (pageNum - 1) * limitNum;
    const Doctors = await Doctor.find({},{"__v": 0}).skip(skip).limit(limitNum);
    res.status(200).json({ status : httpStatusText.SUCCESS , message:"Doctor updated successfully", data : Doctors});

});
exports.specificDoctorProfile = asyncHandler(async (req,res)=>{
    
    const { doctorId } = req.params;
    const Doctor = await Doctor.findById(doctorId);
    res.status(200).json({ status : httpStatusText.SUCCESS , message:"Doctor updated successfully", data : Doctor});

});
exports.updateDoctorInfo = asyncHandler( async (req,res)=>
    {
        const { doctorId } = req.params ;
        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId , req.body,{new:true});  
        res.status(200).json({ status : httpStatusText.SUCCESS , message:"Doctor updated successfully", data : updatedDoctor});
            
        
    });
exports.deleteDoctorProfile = asyncHandler(async(req,res)=>
    {
       
            const { doctorId }= req.params;
            await Doctor.findByIdAndDelete(doctorId);
            res.status(200).json({ status : httpStatusText.SUCCESS , message:"Doctor deleted successfully"});
       
   });
exports.createDoctorProfile = asyncHandler(async(req,res)=>{
        
    const newDoctor = new Doctor(req.body)
    await newDoctor.save();
    res.status(200).json({ status : httpStatusText.SUCCESS , message:"Doctor deleted successfully" , data : newDoctor});
   
});