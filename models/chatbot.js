const mongoose = require('mongoose');
const { Schema } = mongoose;

const adviceSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  dateGiven: { type: Date, default: Date.now },
}, { _id: true });

const messageSchema = new Schema({
  role: { type: String, enum: ['user', 'bot'], required: true }, // مين اللي بعت الرسالة
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { _id: false });

const scanSchema = new Schema({
  scan_url: { type: String, required: true },
  result: { type: String },
  uploadedAt: { type: Date, default: Date.now },
}, { _id: false });

const chatBotSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true , unique: true  },
  messages: [messageSchema],
  scans: [scanSchema],
  advices: [adviceSchema],
}, { timestamps: true });

module.exports = mongoose.model('Chatbot', chatBotSchema);
