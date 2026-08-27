import { NextResponse } from 'next/server';
import { getAdminCredentials, isAuthenticated } from '@/lib/auth';

export async function GET() {
  const loggedIn = await isAuthenticated();
  if (!loggedIn) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const admin = await getAdminCredentials();
  return NextResponse.json({
    authenticated: true,
    user: {
      email: admin.email,
      name: admin.name,
      role: admin.role,
      lastUpdated: admin.lastUpdated
    }
  });
}
