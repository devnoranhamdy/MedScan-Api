const mongoose = require('mongoose')
const validator = require ('validator')

const adviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    dateGiven: { type: Date, default: Date.now }
  }); 

const chatBotSchema = new mongoose.Schema ({
    user_id : { type : String  },
    messages : { type : String  },
    scan : { type : String } ,
    advices : [adviceSchema],
    },
    {timestamps : true})

module.exports= mongoose.model ( 'chatbot' , chatBotSchema)
