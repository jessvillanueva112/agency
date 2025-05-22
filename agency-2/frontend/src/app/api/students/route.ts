import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

function checkAuth(req: NextRequest) {
  const auth = req.headers.get('authorization');
  return auth === 'Bearer agencytoken112secretshh';
}

const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  grade: String,
});
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  const students = await Student.find();
  return NextResponse.json(students);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  const data = await req.json();
  const student = new Student(data);
  await student.save();
  return NextResponse.json(student, { status: 201 });
} 