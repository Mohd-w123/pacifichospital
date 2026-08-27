import { NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '@/lib/content-store';
import { ServiceItem } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const newService: Omit<ServiceItem, 'id'> = await request.json();
    const content = await getSiteContent();
    const service: ServiceItem = {
      ...newService,
      id: `serv-${Date.now()}`
    };
    content.services.push(service);
    await updateSiteContent(content);
    return NextResponse.json({ success: true, service }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add service' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedService: ServiceItem = await request.json();
    const content = await getSiteContent();
    const index = content.services.findIndex((s) => s.id === updatedService.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    content.services[index] = updatedService;
    await updateSiteContent(content);
    return NextResponse.json({ success: true, service: updatedService });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    const content = await getSiteContent();
    content.services = content.services.filter((s) => s.id !== id);
    await updateSiteContent(content);
    return NextResponse.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
