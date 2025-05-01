const express= require('express');
const asyncHandler = require('express-async-handler')
const httpStatusText = require('../../utils/httpStatusText')
const  PatientOfDoctor = require ('../../models/patientOfDoctor.js')


exports.getAllPatientsOfDoctor = asyncHandler(async(req,res)=>{

        const { limit , page }= req.query ; 
        const numLimit = limit*1 || 10 ;
        const numPage = page*1 || 1 ;
        const skip = (numPage  - 1 )* numLimit ; 
        const AllPatientOfDoctor =  await PatientOfDoctor.find({},{'__v':0}).skip(skip).limit(limit)
        res.status(200).json({ status : httpStatusText.SUCCESS , data : AllPatientOfDoctor })
    
    
});
//nested route
exports.nestedRouteForAddDoctorIdToParam = (req, res, next) => {
        if (!req.body.doctor) {
          req.body.doctor = req.params.doctorId;
        }
        next();
      };
 exports.createPatientOfDoctor = asyncHandler(async (req,res)=>{
   
        const newPatientOfDoctor = new PatientOfDoctor(req.body);
        await newPatientOfDoctor.save();
        const populatedPatient = await PatientOfDoctor.findById(newPatientOfDoctor._id).populate({
                path: "doctor",
                select: "firstName lastName -_id"
              });
        res.status(200).json({ status : httpStatusText.SUCCESS ,  message: "Patient added successfully" , data : populatedPatient   })

});

exports.getPatientOfDoctor = asyncHandler(async (req,res)=>
{   
        const Patient = await PatientOfDoctor.findById(req.params.PatientOfDoctorId);
        res.status(200).json({ status : httpStatusText.SUCCESS , data : Patient }) 
});

exports.updatePatientOfDoctor = asyncHandler(async (req,res)=>
{
       const{ PatientOfDoctorId }=req.params;
       const updatedPatient= await PatientOfDoctor.findByIdAndUpdate(PatientOfDoctorId,req.body,{new:true});
       res.status(200).json({ status : httpStatusText.SUCCESS , data : updatedPatient ,  message: "patient updated successfully"})
        
           
});

exports.deletePatientOfDoctor = asyncHandler(async(req,res)=>
{      
        const {PatientOfDoctorId}= req.params;
        await PatientOfDoctor.findByIdAndDelete(PatientOfDoctorId);
        res.status(200).json({ status : httpStatusText.SUCCESS , message: "patient deleted successfully" , data : null})  
});

