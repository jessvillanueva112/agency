import mongoose from 'mongoose';
import fs from 'fs';
import Student from '../src/models/student';
import Assessment from '../src/models/assessment';
import Incident from '../src/models/incident';
import Communication from '../src/models/communication';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agency';

// Use 'any' for model type to avoid type incompatibility errors
async function exportCollection(
  model: any,
  filename: string,
  projection: Record<string, unknown> = {}
): Promise<void> {
  const data = await model.find({}, projection).lean();
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`Exported ${data.length} records to ${filename}`);
}

async function main(): Promise<void> {
  await mongoose.connect(MONGODB_URI);

  await exportCollection(Student, 'students.json', { firstName: 1, lastName: 1, grade: 1, riskLevel: 1 });
  await exportCollection(Assessment, 'assessments.json');
  await exportCollection(Incident, 'incidents.json');
  await exportCollection(Communication, 'communications.json', { content: 1, type: 1, date: 1 });

  await mongoose.disconnect();
}

main().catch(console.error);