import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

function checkAuth(req: NextRequest) {
  const auth = req.headers.get('authorization');
  return auth === 'Bearer agencytoken112secretshh';
}

const EventSchema = new mongoose.Schema({
  type: String,
  date: Date,
  notes: String,
});
const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  const events = await Event.find();
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await mongoose.connect(process.env.MONGODB_URI!);
  const data = await req.json();
  const event = new Event(data);
  await event.save();
  return NextResponse.json(event, { status: 201 });
} 