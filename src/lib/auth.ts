import fs from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';
import { connectToDatabase } from './mongodb';
import { AdminAuthModel } from './models';

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
    await connectToDatabase();
    let admin = await AdminAuthModel.findOne({}).lean();

    if (!admin) {
      // Seed default credentials to MongoDB
      console.log('🌱 Seeding initial admin auth credentials to MongoDB Atlas...');
      let seedCreds: AdminUser = {
        email: 'admin@gmail.com',
        password: 'Admin@123',
        name: 'Pacific Care Administrator',
        role: 'Super Admin',
        lastUpdated: new Date().toISOString()
      };

      try {
        const raw = await fs.readFile(AUTH_FILE_PATH, 'utf-8');
        seedCreds = JSON.parse(raw);
      } catch (e) {}

      admin = await AdminAuthModel.findOneAndUpdate(
        { email: seedCreds.email.toLowerCase().trim() },
        { ...seedCreds },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();
    }

    return {
      email: admin.email,
      password: admin.password,
      name: admin.name,
      role: admin.role,
      lastUpdated: admin.lastUpdated
    };
  } catch (error) {
    console.error('⚠️ MongoDB getAdminCredentials fallback to local file:', error);
    try {
      const data = await fs.readFile(AUTH_FILE_PATH, 'utf-8');
      return JSON.parse(data) as AdminUser;
    } catch (e) {
      return {
        email: 'admin@gmail.com',
        password: 'Admin@123',
        name: 'Pacific Care Administrator',
        role: 'Super Admin',
        lastUpdated: new Date().toISOString()
      };
    }
  }
}

export async function saveAdminCredentials(creds: AdminUser): Promise<void> {
  try {
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
      { upsert: true, new: true }
    );

    // Keep local backup JSON synchronized
    await fs.writeFile(AUTH_FILE_PATH, JSON.stringify(creds, null, 2), 'utf-8');
  } catch (error) {
    console.error('⚠️ Error saving admin credentials to MongoDB:', error);
    await fs.writeFile(AUTH_FILE_PATH, JSON.stringify(creds, null, 2), 'utf-8');
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  return !!session?.value;
}
