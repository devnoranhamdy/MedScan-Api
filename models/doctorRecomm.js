const mongoose = require('mongoose')

const doctor_recomendation_schema = new mongoose.Schema(
    {
        name: { type: String, required: false },
        specialization: { type: String, required: false },
        fees: { type: String, required: false },
        avg_rate: { type: Number, required: false},
        waiting_time: { type: String, required: false},
        clinic_location: { type: String, required:false},
        image_url: { type: String } 
    }
)

module.exports = mongoose.model( 'Doctor' ,doctor_recomendation_schema )