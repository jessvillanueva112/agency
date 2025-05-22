import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const ConsentSchema = new mongoose.Schema({
  type: String,
  granted: Boolean,
  grantedBy: String,
  date: Date,
});
const Consent = mongoose.models.Consent || mongoose.model('Consent', ConsentSchema);

function checkAuth(req: NextRequest) {
  const auth = req.headers.get('authorization');
  return auth === 'Bearer agencytoken112secretshh';
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  const consent = await Consent.findById(params.id);
  if (!consent) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(consent);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  const data = await req.json();
  const consent = await Consent.findByIdAndUpdate(params.id, data, { new: true });
  if (!consent) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(consent);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  await Consent.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
} 