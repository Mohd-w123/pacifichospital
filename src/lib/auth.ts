import { cookies } from 'next/headers';
import { connectToDatabase } from './mongodb';
import { AdminAuthModel } from './models';

export const AUTH_COOKIE_NAME = 'pacific_hospital_admin_session';

export interface AdminUser {
  email: string;
  password?: string;
  name: string;
  role: string;
  lastUpdated?: string;
}

export async function getAdminCredentials(): Promise<AdminUser> {
  await connectToDatabase();
  const admin = await AdminAuthModel.findOne({}).lean();

  if (!admin) {
    throw new Error('Admin credentials not found in MongoDB Atlas collection admin_auth');
  }

  return {
    email: admin.email,
    password: admin.password,
    name: admin.name,
    role: admin.role,
    lastUpdated: admin.lastUpdated
  };
}

export async function saveAdminCredentials(creds: AdminUser): Promise<void> {
  await connectToDatabase();
  await AdminAuthModel.findOneAndUpdate(
    {},
    {
      email: creds.email.toLowerCase().trim(),
      password: creds.password,
      name: creds.name,
      role: creds.role || 'Super Admin',
      lastUpdated: new Date().toISOString()
    },
    { upsert: true, returnDocument: 'after' }
  );
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  return !!session?.value;
}
