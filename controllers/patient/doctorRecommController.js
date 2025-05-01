const express = require ('express')
const Doctor = require ('../../models/doctorRecomm')
const httpStatusText = require('../../utils/httpStatusText')
const asyncHandler = require('express-async-handler')


const showAllDoctors = asyncHandler( async (req,res)=>{
    
          const query = req.query;
          const limit = query.limit ||20 ;
          const page = query.page|| 1 ;
          const skip = (page-1)*limit ; 
          const doctors = await Doctor.find().limit(limit).skip(skip)
          return res.status(200).json({ status : httpStatusText.SUCCESS ,  length :doctors.length , data : doctors  })
   
});

const showDoctorsBySpecialty =  asyncHandler(async (req,res)=>{
          const query = req.query;
          const limit = query.limit ||20 ;
          const page = query.page|| 1 ;
          const skip = (page-1)*limit ;
          const  specialization =  query.specialization ;
          const doctors = await  Doctor.find({ specialization : { $regex: specialization, $options: 'i' } }).limit(limit).skip(skip)
            return res.status(200).json({ status : httpStatusText.SUCCESS , data : doctors  })

});

const showDoctorsByCity = asyncHandler (async (req,res)=>{
    
          const query = req.query;
          const limit = query.limit ||20 ;
          const page = query.page|| 1 ;
          const skip = (page-1)*limit ;
          const  clinic_location =  query.clinic_location ;
          const doctors = await  Doctor.find({ clinic_location : { $regex: clinic_location, $options: 'i' } }).limit(limit).skip(skip)
          return res.status(200).json({ status : httpStatusText.SUCCESS , data : doctors  })
    
});

const showDoctorsByCityAndSpecialty = asyncHandler (async (req,res)=>{
    
            const { specialization, clinic_location ,Limit = 20, Page = 1  } = req.query;
            const query = {};

            if (specialization) {
              query.specialization = { $regex: specialization, $options: 'i' }; 
            }
        
            if (clinic_location) {
              query.clinic_location = { $regex: clinic_location, $options: 'i' };
            }
        
            const limit =  parseInt(Limit);
            const page =   parseInt(Page);
            const skip = (page - 1) * limit;
        
            const doctors = await Doctor.find(query).limit(limit).skip(skip);
        
            if (!doctors || doctors.length === 0) {
              return res.status(400).json({status: httpStatusText.FAIL,data: null,message: 'There are no doctors available for your filters'});
            }
        
            return res.status(200).json({ status: httpStatusText.SUCCESS, data: doctors});


    
});

const specificDoctorById = asyncHandler(async (req,res)=>{
    
  const { doctorId } = req.params;
  const doctor = await Doctor.findById(doctorId);
  res.status(200).json({ status : httpStatusText.SUCCESS , data : doctor});

});


module.exports = {
  showAllDoctors ,
    showDoctorsBySpecialty ,
    showDoctorsByCity ,
    showDoctorsByCityAndSpecialty ,
    specificDoctorById

}
