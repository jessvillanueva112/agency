import mongoose from 'mongoose';

const IncidentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  type: String, // e.g., 'bullying', 'injury', etc.
  date: Date,
  description: String,
  reportedBy: String,
  resolved: Boolean,
  resolutionNotes: String,
});

export default mongoose.model('Incident', IncidentSchema);