import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

function checkAuth(req: NextRequest) {
  const auth = req.headers.get('authorization');
  return auth === 'Bearer agencytoken112secretshh';
}

const CounselorSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});
const Counselor = mongoose.models.Counselor || mongoose.model('Counselor', CounselorSchema);

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  const counselors = await Counselor.find();
  return NextResponse.json(counselors);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  const data = await req.json();
  const counselor = new Counselor(data);
  await counselor.save();
  return NextResponse.json(counselor, { status: 201 });
} 