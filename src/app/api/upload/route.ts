import { NextResponse } from 'next/server';
import { uploadToCloudinary, CLOUDINARY_FOLDER } from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Check authentication
    const loggedIn = await isAuthenticated();
    if (!loggedIn) {
      return NextResponse.json({ error: 'Unauthorized. Please login to upload files.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const subfolder = (formData.get('folder') as string) || CLOUDINARY_FOLDER;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const result = await uploadToCloudinary(buffer, subfolder, filename);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error: any) {
    console.error('❌ Cloudinary Upload Error:', error);
    return NextResponse.json({ error: error.message || 'Image upload failed' }, { status: 500 });
  }
}
