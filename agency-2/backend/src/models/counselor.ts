// backend/src/models/counselor.ts
import mongoose from 'mongoose';

const CounselorSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  preferences: Object,
  // ...add more fields as needed
});

export default mongoose.model('Counselor', CounselorSchema);