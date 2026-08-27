import fs from 'fs/promises';
import path from 'path';
import { SiteContent, Appointment } from './types';
import { connectToDatabase } from './mongodb';
import { SiteContentModel, AppointmentModel } from './models';

const SEED_CONTENT_FILE = path.join(process.cwd(), 'data', 'site-content.json');
const SEED_APPOINTMENTS_FILE = path.join(process.cwd(), 'data', 'appointments.json');

async function getSeedContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(SEED_CONTENT_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    throw new Error('Seed file not found');
  }
}

async function getSeedAppointments(): Promise<Appointment[]> {
  try {
    const raw = await fs.readFile(SEED_APPOINTMENTS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    await connectToDatabase();
    let record = await SiteContentModel.findOne({ key: 'main_content' }).lean();

    if (!record) {
      // Auto-seed from JSON file into MongoDB
      console.log('🌱 Seeding initial site content to MongoDB Atlas (pacific-hms)...');
      const seedData = await getSeedContent();
      record = await SiteContentModel.findOneAndUpdate(
        { key: 'main_content' },
        { key: 'main_content', ...seedData },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();
    }

    return {
      hospital: record.hospital,
      heroSlides: record.heroSlides || [],
      doctors: record.doctors || [],
      services: record.services || [],
      gallery: record.gallery || [],
      customPages: record.customPages || [],
      navigation: record.navigation || [],
      specialCampaigns: record.specialCampaigns || []
    };
  } catch (error) {
    console.error('⚠️ MongoDB getSiteContent fallback to local file:', error);
    return getSeedContent();
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  try {
    await connectToDatabase();
    await SiteContentModel.findOneAndUpdate(
      { key: 'main_content' },
      {
        key: 'main_content',
        hospital: content.hospital,
        heroSlides: content.heroSlides,
        doctors: content.doctors,
        services: content.services,
        gallery: content.gallery,
        customPages: content.customPages,
        navigation: content.navigation,
        specialCampaigns: content.specialCampaigns
      },
      { upsert: true, new: true }
    );

    // Keep local backup JSON synchronized
    await fs.writeFile(SEED_CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
  } catch (error) {
    console.error('⚠️ Error saving to MongoDB, writing to local JSON file:', error);
    await fs.writeFile(SEED_CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
  }
}

export const updateSiteContent = saveSiteContent;

export async function getAppointments(): Promise<Appointment[]> {
  try {
    await connectToDatabase();
    const list = await AppointmentModel.find({}).sort({ createdAt: -1 }).lean();

    if (list.length === 0) {
      const seedList = await getSeedAppointments();
      if (seedList.length > 0) {
        await AppointmentModel.insertMany(seedList);
        return seedList;
      }
    }

    return list.map((item: any) => ({
      id: item.id,
      patientName: item.patientName,
      patientPhone: item.patientPhone,
      patientEmail: item.patientEmail,
      patientAge: item.patientAge,
      patientGender: item.patientGender,
      department: item.department,
      doctorId: item.doctorId,
      doctorName: item.doctorName,
      preferredDate: item.preferredDate,
      preferredTime: item.preferredTime,
      message: item.message,
      status: item.status,
      createdAt: item.createdAt
    }));
  } catch (error) {
    console.error('⚠️ MongoDB getAppointments fallback to local file:', error);
    return getSeedAppointments();
  }
}

export async function saveAppointments(appointments: Appointment[]): Promise<void> {
  try {
    await connectToDatabase();
    // Bulk sync / save
    for (const app of appointments) {
      await AppointmentModel.findOneAndUpdate(
        { id: app.id },
        { ...app },
        { upsert: true }
      );
    }
    // Also backup to local file
    await fs.writeFile(SEED_APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), 'utf-8');
  } catch (error) {
    console.error('⚠️ Error saving appointments to MongoDB:', error);
    await fs.writeFile(SEED_APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), 'utf-8');
  }
}

export async function addAppointment(appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<Appointment> {
  const newAppointment: Appointment = {
    ...appointmentData,
    id: `apt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  try {
    await connectToDatabase();
    await AppointmentModel.create(newAppointment);

    // Also update local json backup
    const list = await getSeedAppointments();
    list.unshift(newAppointment);
    await fs.writeFile(SEED_APPOINTMENTS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (error) {
    console.error('⚠️ Error adding appointment to MongoDB, writing to local JSON:', error);
    const list = await getSeedAppointments();
    list.unshift(newAppointment);
    await fs.writeFile(SEED_APPOINTMENTS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  }

  return newAppointment;
}

export const createAppointment = addAppointment;
