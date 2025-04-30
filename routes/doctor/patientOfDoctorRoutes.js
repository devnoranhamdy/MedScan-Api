const express= require('express');
const {getAllPatientsOfDoctor , createPatientOfDoctor ,getPatientOfDoctor , updatePatientOfDoctor , deletePatientOfDoctor} = require('../../controllers/doctor/patientsOfDoctorController')

const router=express.Router({mergeParams: true});


router.route('/:doctorId/PatientOfDoctor')
.get(getAllPatientsOfDoctor)
.post(createPatientOfDoctor )

router.route('/:doctorId/:PatientOfDoctorId')
.get(getPatientOfDoctor)   
.put(updatePatientOfDoctor)
.delete(deletePatientOfDoctor)



module.exports=router;