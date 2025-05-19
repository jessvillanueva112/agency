import mongoose from 'mongoose';
import Student from './models/student';
import Counselor from './models/counselor';
import Event from './models/event';
import Consent from './models/consent';
import Communication from './models/communication';
import AuditLog from './models/auditLog';
import Incident from './models/incident';
import Assessment from './models/assessment';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agency';

async function seed() {
  await mongoose.connect(MONGODB_URI);

  // Clear existing data
  await Promise.all([
    Student.deleteMany({}),
    Counselor.deleteMany({}),
    Event.deleteMany({}),
    Consent.deleteMany({}),
    Communication.deleteMany({}),
    AuditLog.deleteMany({}),
    Incident.deleteMany({}),
    Assessment.deleteMany({}),
  ]);

  // Seed students
  const student1 = await Student.create({ firstName: 'Alice', lastName: 'Wong', grade: '12' });
  const student2 = await Student.create({ firstName: 'Bob', lastName: 'Smith', grade: '11' });

  // Seed counselors
  const counselor1 = await Counselor.create({ name: 'Ms. Lee', email: 'lee@school.edu', role: 'counselor' });
  const counselor2 = await Counselor.create({ name: 'Mr. Patel', email: 'patel@school.edu', role: 'counselor' });

  // Seed events
  await Event.create({ student: student1._id, counselor: counselor1._id, type: 'meeting', date: new Date(), notes: 'Initial meeting' });

  // Seed consents
  await Consent.create({ student: student1._id, type: 'data_sharing', granted: true, grantedBy: 'parent', date: new Date(), expires: null });

  // Seed communications
  await Communication.create({ student: student1._id, counselor: counselor1._id, type: 'email', content: 'Welcome!', date: new Date() });

  // Seed audit logs
  await AuditLog.create({ action: 'CREATE_STUDENT', user: 'admin', details: { student: student1._id }, target: 'Student', targetId: student1._id });

  // Seed incidents
  await Incident.create({ student: student2._id, type: 'bullying', date: new Date(), description: 'Reported bullying incident', reportedBy: 'teacher', resolved: false });

  // Seed assessments
  await Assessment.create({ student: student2._id, type: 'academic', date: new Date(), score: 85, notes: 'Math test', assessedBy: 'Ms. Lee' });

  await mongoose.disconnect();
  console.log('Seeding complete!');
}

seed();