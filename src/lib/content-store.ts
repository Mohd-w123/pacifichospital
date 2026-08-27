import fs from 'fs/promises';
import path from 'path';
import { SiteContent, Appointment } from './types';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'data', 'site-content.json');
const APPOINTMENTS_FILE_PATH = path.join(process.cwd(), 'data', 'appointments.json');

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const data = await fs.readFile(CONTENT_FILE_PATH, 'utf-8');
    return JSON.parse(data) as SiteContent;
  } catch (error) {
    console.error('Error reading site content file, attempting re-seed...', error);
    // If file missing or corrupted, return fallback structure
    throw error;
  }
}

export async function updateSiteContent(content: SiteContent): Promise<void> {
  const data = JSON.stringify(content, null, 2);
  await fs.writeFile(CONTENT_FILE_PATH, data, 'utf-8');
}

export async function getAppointments(): Promise<Appointment[]> {
  try {
    const data = await fs.readFile(APPOINTMENTS_FILE_PATH, 'utf-8');
    return JSON.parse(data) as Appointment[];
  } catch (error) {
    console.error('Error reading appointments file:', error);
    return [];
  }
}

export async function saveAppointments(appointments: Appointment[]): Promise<void> {
  const data = JSON.stringify(appointments, null, 2);
  await fs.writeFile(APPOINTMENTS_FILE_PATH, data, 'utf-8');
}

export async function createAppointment(newApt: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<Appointment> {
  const appointments = await getAppointments();
  const appointment: Appointment = {
    ...newApt,
    id: `apt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  appointments.unshift(appointment);
  await saveAppointments(appointments);
  return appointment;
}
