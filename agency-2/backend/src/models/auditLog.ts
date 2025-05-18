// backend/src/models/auditLog.ts
import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },         // e.g., 'CREATE_STUDENT', 'UPDATE_CONSENT'
  user: { type: String, required: true },           // username or userId who performed the action
  timestamp: { type: Date, default: Date.now },     // when the action occurred
  details: { type: mongoose.Schema.Types.Mixed },   // any extra info (object, string, etc.)
  target: { type: String },                         // e.g., 'Student', 'Consent', etc.
  targetId: { type: String },                       // the _id of the affected document
});

export default mongoose.model('AuditLog', AuditLogSchema);