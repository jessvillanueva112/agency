import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  type: String,
  date: Date,
  notes: String,
});
const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

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
  const event = await Event.findById(id);
  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(event);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  await mongoose.connect(process.env.MONGODB_URI!);
  const data = await req.json();
  const event = await Event.findByIdAndUpdate(id, data, { new: true });
  if (!event) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(event);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  await mongoose.connect(process.env.MONGODB_URI!);
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
} 