import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';

const AUTH_FILE_PATH = path.join(process.cwd(), 'data', 'admin-auth.json');
export const AUTH_COOKIE_NAME = 'pacific_hospital_admin_session';

export interface AdminUser {
  email: string;
  password?: string;
  name: string;
  role: string;
  lastUpdated?: string;
}

export async function getAdminCredentials(): Promise<AdminUser> {
  try {
    const data = await fs.readFile(AUTH_FILE_PATH, 'utf-8');
    return JSON.parse(data) as AdminUser;
  } catch (error) {
    const defaultCreds: AdminUser = {
      email: 'admin@gmail.com',
      password: 'Admin@123',
      name: 'Pacific Care Administrator',
      role: 'Super Admin',
      lastUpdated: new Date().toISOString()
    };
    await fs.writeFile(AUTH_FILE_PATH, JSON.stringify(defaultCreds, null, 2), 'utf-8');
    return defaultCreds;
  }
}

export async function saveAdminCredentials(creds: AdminUser): Promise<void> {
  await fs.writeFile(AUTH_FILE_PATH, JSON.stringify(creds, null, 2), 'utf-8');
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  return !!session?.value;
}
