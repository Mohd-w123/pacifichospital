import mongoose, { Schema, Document, Model } from 'mongoose';
import { SiteContent, Appointment } from './types';
import { AdminUser } from './auth';

// 1. Site Content Schema
const SiteContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: 'main_content' },
    hospital: { type: Schema.Types.Mixed, required: true },
    heroSlides: { type: Array, default: [] },
    doctors: { type: Array, default: [] },
    services: { type: Array, default: [] },
    gallery: { type: Array, default: [] },
    customPages: { type: Array, default: [] },
    navigation: { type: Array, default: [] },
    specialCampaigns: { type: Array, default: [] }
  },
  {
    timestamps: true,
    collection: 'site_contents'
  }
);

export const SiteContentModel: Model<any> =
  mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema);

// 2. Appointment Schema
const AppointmentSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    patientName: { type: String, required: true },
    patientPhone: { type: String, required: true },
    patientEmail: { type: String, default: '' },
    patientAge: { type: String, default: '' },
    patientGender: { type: String, default: 'Other' },
    department: { type: String, required: true },
    doctorId: { type: String, default: '' },
    doctorName: { type: String, default: '' },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, default: 'Morning' },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending'
    },
    createdAt: { type: String, default: () => new Date().toISOString() }
  },
  {
    timestamps: true,
    collection: 'appointments'
  }
);

export const AppointmentModel: Model<any> =
  mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);

// 3. Admin Auth Schema
const AdminAuthSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, default: 'Pacific Care Administrator' },
    role: { type: String, default: 'Super Admin' },
    lastUpdated: { type: String, default: () => new Date().toISOString() }
  },
  {
    timestamps: true,
    collection: 'admin_auth'
  }
);

export const AdminAuthModel: Model<any> =
  mongoose.models.AdminAuth || mongoose.model('AdminAuth', AdminAuthSchema);
