const asyncHandellar = require('express-async-handler')
const Doctor = require('../../models/doctorRecomm.js')
const httpStatusText = require ('../../utils/httpStatusText.js')


exports.getAllDoctors = asyncHandellar ( async (req,res)=>{
    const { limit , page }=  req.query
    const numLimit = limit *1 || 20 ;
    const numPage = page *1 ||1;
    const skip = ( numPage - 1 ) * numLimit
    const Doctors = await Doctor.find({}, {'__v':0}).skip(skip).limit(limit)
    res.status(200).json({ status : httpStatusText.SUCCESS , length : Doctors.length , data : Doctors })

});
exports.getSpecificDoctor = asyncHandellar ( async (req,res)=>{
    const {doctorId } = req.params ;
    const doctor = await Doctor.findById(doctorId) ;
    res.status(200).json({ status : httpStatusText.SUCCESS , data : doctor })
});
exports.createDoctor = asyncHandellar ( async (req,res)=>{
  const newDoctor = new Doctor (req.body);
  await newDoctor.save();
  res.status(200).json({ status : httpStatusText.SUCCESS ,message : 'Doctor added successfuly ', data : newDoctor  })

});
exports.updateDoctor = asyncHandellar ( async (req,res)=>{
    const { doctorId } = req.params ;
    const doctor = await Doctor.findByIdAndUpdate(doctorId , req.body , {new :true})
    res.status(200).json({ status : httpStatusText.SUCCESS ,message : 'Doctor udated successfuly ', data : doctor })

});
exports.deleteDoctor = asyncHandellar ( async (req,res)=>{
    const { doctorId } = req.params ;
    await Doctor.findByIdAndDelete(doctorId)
    res.status(200).json({ status : httpStatusText.SUCCESS ,message : 'Doctor deleted successfuly'})

});