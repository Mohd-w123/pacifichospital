import { NextResponse } from 'next/server';
import { getAdminCredentials, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Please provide email and password' }, { status: 400 });
    }

    const admin = await getAdminCredentials();

    if (admin.email.toLowerCase() !== email.trim().toLowerCase() || admin.password !== password) {
      return NextResponse.json({ error: 'Invalid Email ID or Password' }, { status: 401 });
    }

    // Set secure auth session cookie
    const response = NextResponse.json({
      success: true,
      user: {
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: `session_${Date.now()}_${Buffer.from(admin.email).toString('base64')}`,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Server authentication error' }, { status: 500 });
  }
}
