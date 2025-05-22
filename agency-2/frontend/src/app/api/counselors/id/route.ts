import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const CounselorSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
});
const Counselor = mongoose.models.Counselor || mongoose.model('Counselor', CounselorSchema);

function checkAuth(req: NextRequest) {
  const auth = req.headers.get('authorization');
  return auth === 'Bearer agencytoken112secretshh';
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  await mongoose.connect(process.env.MONGODB_URI!);
  const counselor = await Counselor.findById(id);
  if (!counselor) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(counselor);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  await mongoose.connect(process.env.MONGODB_URI!);
  const data = await req.json();
  const counselor = await Counselor.findByIdAndUpdate(id, data, { new: true });
  if (!counselor) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(counselor);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  await mongoose.connect(process.env.MONGODB_URI!);
  await Counselor.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
} 