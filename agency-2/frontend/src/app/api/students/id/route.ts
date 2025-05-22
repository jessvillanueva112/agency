import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  grade: String,
});
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

function checkAuth(req: NextRequest) {
  const auth = req.headers.get('authorization');
  return auth === 'Bearer agencytoken112secretshh';
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  const student = await Student.findById(params.id);
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(student);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  const data = await req.json();
  const student = await Student.findByIdAndUpdate(params.id, data, { new: true });
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(student);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  await Student.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
} 