import { NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '@/lib/content-store';
import { CustomPage } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const newPage: Omit<CustomPage, 'id' | 'lastUpdated'> = await request.json();
    const content = await getSiteContent();
    const page: CustomPage = {
      ...newPage,
      id: `page-${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    content.customPages.push(page);
    await updateSiteContent(content);
    return NextResponse.json({ success: true, page }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedPage: CustomPage = await request.json();
    const content = await getSiteContent();
    const index = content.customPages.findIndex((p) => p.id === updatedPage.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    content.customPages[index] = {
      ...updatedPage,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    await updateSiteContent(content);
    return NextResponse.json({ success: true, page: content.customPages[index] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    const content = await getSiteContent();
    content.customPages = content.customPages.filter((p) => p.id !== id);
    await updateSiteContent(content);
    return NextResponse.json({ success: true, message: 'Page deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}
