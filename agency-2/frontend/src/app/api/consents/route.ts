import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

function checkAuth(req: NextRequest) {
  const auth = req.headers.get('authorization');
  return auth === 'Bearer agencytoken112secretshh';
}

const ConsentSchema = new mongoose.Schema({
  type: String,
  granted: Boolean,
  grantedBy: String,
  date: Date,
});
const Consent = mongoose.models.Consent || mongoose.model('Consent', ConsentSchema);

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  const consents = await Consent.find();
  return NextResponse.json(consents);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  const data = await req.json();
  const consent = new Consent(data);
  await consent.save();
  return NextResponse.json(consent, { status: 201 });
} 