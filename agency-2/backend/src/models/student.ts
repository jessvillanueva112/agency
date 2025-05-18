// backend/src/models/student.ts
import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  grade: String,
  riskLevel: String,
  interventions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  consents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Consent' }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Communication' }],
  // add more fields as needed
});

export default mongoose.model('Student', StudentSchema);