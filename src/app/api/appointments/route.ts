import { NextResponse } from 'next/server';
import { getAppointments, createAppointment, saveAppointments } from '@/lib/content-store';

export async function GET() {
  try {
    const appointments = await getAppointments();
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.patientName || !body.patientPhone || !body.department) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const appointment = await createAppointment(body);
    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    const appointments = await getAppointments();
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }
    appointments[index].status = status;
    await saveAppointments(appointments);
    return NextResponse.json({ success: true, appointment: appointments[index] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }
    const appointments = await getAppointments();
    const filtered = appointments.filter((a) => a.id !== id);
    await saveAppointments(filtered);
    return NextResponse.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete appointment' }, { status: 500 });
  }
}
