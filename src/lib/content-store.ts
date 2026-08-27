import { SiteContent, Appointment } from './types';
import { connectToDatabase } from './mongodb';
import { SiteContentModel, AppointmentModel } from './models';

export async function getSiteContent(): Promise<SiteContent> {
  await connectToDatabase();
  const record = await SiteContentModel.findOne({ key: 'main_content' }).lean();

  if (!record) {
    throw new Error('No site content found in MongoDB Atlas collection site_contents');
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
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
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
    { upsert: true, returnDocument: 'after' }
  );
}

export const updateSiteContent = saveSiteContent;

export async function getAppointments(): Promise<Appointment[]> {
  await connectToDatabase();
  const list = await AppointmentModel.find({}).sort({ createdAt: -1 }).lean();

  return list.map((item: any) => ({
    id: item.id,
    patientName: item.patientName,
    patientPhone: item.patientPhone,
    patientEmail: item.patientEmail || '',
    patientAge: item.patientAge || '',
    patientGender: item.patientGender || 'Other',
    department: item.department,
    doctorId: item.doctorId || '',
    doctorName: item.doctorName || '',
    preferredDate: item.preferredDate,
    preferredTime: item.preferredTime || 'Morning',
    message: item.message || '',
    status: item.status || 'Pending',
    createdAt: item.createdAt
  }));
}

export async function saveAppointments(appointments: Appointment[]): Promise<void> {
  await connectToDatabase();
  for (const app of appointments) {
    await AppointmentModel.findOneAndUpdate(
      { id: app.id },
      { ...app },
      { upsert: true, returnDocument: 'after' }
    );
  }
}

export async function addAppointment(
  appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>
): Promise<Appointment> {
  const newAppointment: Appointment = {
    ...appointmentData,
    id: `apt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  await connectToDatabase();
  await AppointmentModel.create(newAppointment);
  return newAppointment;
}

export const createAppointment = addAppointment;
