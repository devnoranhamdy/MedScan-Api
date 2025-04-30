const express= require('express');
const {getAllPatientProfiles ,specificPatientProfile , updatePatientInfo ,deletePatientProfile ,createPatientProfile  } = require('../../controllers/patient/patientProfileController')

const router=express.Router();


router.route('/patientProfile')
.get(getAllPatientProfiles)
.post(createPatientProfile )

router.route('/patientProfile/:patientId')
.get(specificPatientProfile)   
.put(updatePatientInfo)
.delete(deletePatientProfile)



module.exports=router;