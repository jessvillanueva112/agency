import mongoose from 'mongoose';

const AssessmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  type: String, // e.g., 'academic', 'behavioral'
  date: Date,
  score: Number,
  notes: String,
  assessedBy: String,
});

export default mongoose.model('Assessment', AssessmentSchema);