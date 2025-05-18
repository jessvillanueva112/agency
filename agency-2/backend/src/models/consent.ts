// backend/src/models/consent.ts
import mongoose from 'mongoose';

const ConsentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  type: String, // e.g., 'data_sharing', 'external_provider'
  granted: Boolean,
  grantedBy: String,
  date: Date,
  expires: Date,
  // ...add more fields as needed
});

export default mongoose.model('Consent', ConsentSchema);