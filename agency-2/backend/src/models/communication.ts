// backend/src/models/communication.ts
import mongoose from 'mongoose';

const CommunicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  counselor: { type: mongoose.Schema.Types.ObjectId, ref: 'Counselor' },
  type: String, // e.g., 'email', 'note', 'sms'
  content: String,
  date: Date,
  // ...add more fields as needed
});

export default mongoose.model('Communication', CommunicationSchema);