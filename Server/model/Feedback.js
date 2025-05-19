// Feedback.js
import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback; // <--- this is a default export
