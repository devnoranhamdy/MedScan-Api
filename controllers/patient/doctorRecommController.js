const express = require ('express')
const Doctor = require ('../../models/doctorRecomm')
const httpStatusText = require('../../utils/httpStatusText')
const asyncHandler = require('express-async-handler')


const show_all_doctors = asyncHandler( async (req,res)=>{
    
          const query = req.query;
          const limit = query.limit ||20 ;
          const page = query.page|| 1 ;
          const skip = (page-1)*limit ; 
          const doctors = await Doctor.find().limit(limit).skip(skip)
          if (!doctors || doctors.length === 0)
          {
            return res.status(400).json({ status : httpStatusText.FAIL , data : null , message : 'there is no doctors available'  })

          }
           return res.status(200).json({ status : httpStatusText.SUCCESS , data : doctors  })
   
});
const show_doctors_by_specialty =  asyncHandler(async (req,res)=>{
    
          const query = req.query;
          const limit = query.limit ||20 ;
          const page = query.page|| 1 ;
          const skip = (page-1)*limit ;
          const  specialization =  query.specialization ;

          console.log('Specialization received:', specialization);

          const doctors = await  Doctor.find({ specialization : { $regex: specialization, $options: 'i' } }).limit(limit).skip(skip)
           if (!doctors || doctors.length === 0)
            {
              return res.status(400).json({ status : httpStatusText.FAIL , data : null , message : 'there is no doctors available'  })
  
            }
            return res.status(200).json({ status : httpStatusText.SUCCESS , data : doctors  })


    
});
const show_doctors_by_city = asyncHandler (async (req,res)=>{
    
          const query = req.query;
          const limit = query.limit ||20 ;
          const page = query.page|| 1 ;
          const skip = (page-1)*limit ;
          const  clinic_location =  query.clinic_location ;
          const doctors = await  Doctor.find({ clinic_location : { $regex: clinic_location, $options: 'i' } }).limit(limit).skip(skip)
           if (!doctors || doctors.length === 0)
            {
              return res.status(400).json({ status : httpStatusText.FAIL , data : null , message : 'there is no doctors available'  })
  
            }
            return res.status(200).json({ status : httpStatusText.SUCCESS , data : doctors  })
    
});
const show_doctors_by_city_and_specialty = asyncHandler (async (req,res)=>{
    
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


module.exports = {
    show_all_doctors ,
    show_doctors_by_specialty ,
    show_doctors_by_city ,
    show_doctors_by_city_and_specialty

}
