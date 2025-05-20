import mongoose from 'mongoose';
import Student from './models/student';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agency';

async function testCRUD() {
  await mongoose.connect(MONGODB_URI);

  // CREATE
  const student = new Student({ firstName: 'Test', lastName: 'Student', grade: '10' });
  await student.save();
  console.log('Created:', student);

  // READ
  const found = await Student.findOne({ firstName: 'Test' });
  console.log('Read:', found);

  if (!found) {
    console.error('Student not found!');
    await mongoose.disconnect();
    return;
  }

  // UPDATE
  found.grade = '11';
  await found.save();
  console.log('Updated:', found);

  // DELETE
  await Student.deleteOne({ _id: found._id });
  console.log('Deleted student with id:', found._id);

  await mongoose.disconnect();
}

testCRUD().catch(console.error);