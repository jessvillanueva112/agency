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

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(year = 2024) {
  return new Date(year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
}

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

  // Seed counselors
  const counselorNames = ['Ms. Lee', 'Mr. Patel', 'Mrs. Smith', 'Dr. Brown', 'Ms. Garcia', 'Mr. Kim'];
  const counselors = [];
  for (let i = 0; i < 10; i++) {
    counselors.push(await Counselor.create({
      name: `${randomItem(counselorNames)} ${i}`,
      email: `counselor${i}@school.edu`,
      role: i % 2 === 0 ? 'counselor' : 'admin'
    }));
  }

  // Seed students
  const grades = ['10', '11', '12'];
  const riskLevels = ['low', 'medium', 'high'];
  const students = [];
  for (let i = 0; i < 300; i++) {
    students.push(await Student.create({
      firstName: `Student${i}`,
      lastName: `Test${i}`,
      dob: new Date(2005 + (i % 5), i % 12, (i % 28) + 1),
      grade: randomItem(grades),
      riskLevel: randomItem(riskLevels)
    }));
  }

  // Seed events
  for (let i = 0; i < 250; i++) {
    await Event.create({
      student: randomItem(students)._id,
      counselor: randomItem(counselors)._id,
      type: randomItem(['meeting', 'intervention', 'IEP', 'crisis']),
      date: randomDate(),
      notes: `Event notes ${i}`
    });
  }

  // Seed consents
  for (let i = 0; i < 250; i++) {
    await Consent.create({
      student: randomItem(students)._id,
      type: randomItem(['data_sharing', 'external_provider']),
      granted: Math.random() > 0.2,
      grantedBy: randomItem(['parent', 'student']),
      date: randomDate(),
      expires: null
    });
  }

  // Seed communications
  for (let i = 0; i < 250; i++) {
    await Communication.create({
      student: randomItem(students)._id,
      counselor: randomItem(counselors)._id,
      type: randomItem(['email', 'note', 'sms']),
      content: `Communication content ${i} about student progress, meeting, or incident.`,
      date: randomDate()
    });
  }

  // Seed audit logs
  for (let i = 0; i < 200; i++) {
    await AuditLog.create({
      action: randomItem(['CREATE_STUDENT', 'UPDATE_CONSENT', 'CREATE_EVENT']),
      user: randomItem(counselors).name,
      details: { info: `Details for log ${i}` },
      target: randomItem(['Student', 'Consent', 'Event']),
      targetId: randomItem(students)._id
    });
  }

  // Seed incidents
  for (let i = 0; i < 200; i++) {
    await Incident.create({
      student: randomItem(students)._id,
      type: randomItem(['bullying', 'injury', 'conflict', 'other']),
      date: randomDate(),
      description: `Incident description ${i} - details about what happened.`,
      reportedBy: randomItem(['teacher', 'coach', 'admin']),
      resolved: Math.random() > 0.5,
      resolutionNotes: Math.random() > 0.5 ? `Resolution notes ${i}` : undefined
    });
  }

  // Seed assessments
  for (let i = 0; i < 250; i++) {
    await Assessment.create({
      student: randomItem(students)._id,
      type: randomItem(['academic', 'behavioral']),
      date: randomDate(),
      score: Math.floor(Math.random() * 41) + 60,
      notes: `Assessment notes ${i} - summary of performance or behavior.`,
      assessedBy: randomItem(counselors).name
    });
  }

  await mongoose.disconnect();
  console.log('Seeding complete!');
}

seed();