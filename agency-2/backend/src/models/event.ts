// backend/src/models/event.ts
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  counselor: { type: mongoose.Schema.Types.ObjectId, ref: 'Counselor' },
  type: String, // e.g., 'meeting', 'intervention'
  date: Date,
  notes: String,
  // ...add more fields as needed
});

export default mongoose.model('Event', EventSchema);