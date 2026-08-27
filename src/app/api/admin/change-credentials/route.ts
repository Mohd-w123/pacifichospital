import { NextResponse } from 'next/server';
import { getAdminCredentials, saveAdminCredentials, isAuthenticated, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function PUT(request: Request) {
  try {
    const loggedIn = await isAuthenticated();
    if (!loggedIn) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const { currentPassword, newEmail, newPassword, newName } = await request.json();

    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required to make security changes' }, { status: 400 });
    }

    const admin = await getAdminCredentials();

    if (admin.password !== currentPassword) {
      return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
    }

    if (newPassword && newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    const updatedAdmin = {
      ...admin,
      email: newEmail ? newEmail.trim() : admin.email,
      password: newPassword ? newPassword : admin.password,
      name: newName ? newName.trim() : admin.name,
      lastUpdated: new Date().toISOString()
    };

    await saveAdminCredentials(updatedAdmin);

    const response = NextResponse.json({
      success: true,
      message: 'Admin credentials updated successfully!',
      user: {
        email: updatedAdmin.email,
        name: updatedAdmin.name,
        role: updatedAdmin.role
      }
    });

    // Refresh cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: `session_${Date.now()}_${Buffer.from(updatedAdmin.email).toString('base64')}`,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update credentials' }, { status: 500 });
  }
}
