'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Users,
  Stethoscope,
  Image as ImageIcon,
  FileText,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  Phone,
  MessageCircle
} from 'lucide-react';
import { SiteContent, Appointment } from '@/lib/types';

export default function AdminDashboard() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resContent, resApts] = await Promise.all([
        fetch('/api/content'),
        fetch('/api/appointments')
      ]);
      const dataContent = await resContent.json();
      const dataApts = await resApts.json();
      setContent(dataContent);
      setAppointments(Array.isArray(dataApts) ? dataApts : []);
    } catch (err) {
      console.error('Failed to load admin dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch('/api/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || !content) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const pendingApts = appointments.filter((a) => a.status === 'Pending').length;

  return (
    <div className="space-y-8">
      
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800">
        <div>
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Hospital Overview</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {content.hospital.name} ({content.hospital.hindiName})
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {content.hospital.address}, {content.hospital.city} | OPD: {content.hospital.opdTimingsHindi}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/appointments"
            className="bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Manage Appointments ({pendingApts} New)</span>
          </Link>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <Link
          href="/admin/appointments"
          className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-teal-500/50 transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Total Bookings</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{appointments.length}</span>
            {pendingApts > 0 && (
              <span className="text-xs text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800">
                {pendingApts} Pending
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 mt-2 group-hover:text-teal-400 transition">View patient requests &rarr;</p>
        </Link>

        <Link
          href="/admin/doctors"
          className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-teal-500/50 transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Active Doctors</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-white">{content.doctors.length}</span>
          <p className="text-[11px] text-slate-500 mt-2 group-hover:text-sky-400 transition">Manage doctor profiles &rarr;</p>
        </Link>

        <Link
          href="/admin/services"
          className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-teal-500/50 transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Services & Departments</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Stethoscope className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-white">{content.services.length}</span>
          <p className="text-[11px] text-slate-500 mt-2 group-hover:text-indigo-400 transition">Edit clinical departments &rarr;</p>
        </Link>

        <Link
          href="/admin/gallery"
          className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-teal-500/50 transition group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Facility Photos</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-white">{content.gallery.length}</span>
          <p className="text-[11px] text-slate-500 mt-2 group-hover:text-rose-400 transition">Manage OT, IPD & lab photos &rarr;</p>
        </Link>

      </div>

      {/* Quick Actions Strip */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-bold text-base text-white">Quick Content Actions</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/doctors"
            className="bg-slate-900 hover:bg-slate-800 text-teal-300 border border-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Doctor</span>
          </Link>

          <Link
            href="/admin/services"
            className="bg-slate-900 hover:bg-slate-800 text-sky-300 border border-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Medical Service</span>
          </Link>

          <Link
            href="/admin/gallery"
            className="bg-slate-900 hover:bg-slate-800 text-rose-300 border border-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Facility Photo</span>
          </Link>

          <Link
            href="/admin/pages"
            className="bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Custom Page</span>
          </Link>

          <Link
            href="/admin/hospital-info"
            className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition"
          >
            <Building2 className="w-4 h-4 text-teal-400" />
            <span>Edit Hospital Timings & Phone</span>
          </Link>
        </div>
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-white">Recent Patient Appointments & Inquiries</h3>
            <p className="text-xs text-slate-400 mt-0.5">Patients who booked online via website form</p>
          </div>
          <Link
            href="/admin/appointments"
            className="text-xs text-teal-400 hover:text-teal-300 font-semibold"
          >
            View All ({appointments.length}) &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] font-semibold tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Patient Details</th>
                <th className="px-6 py-3.5">Doctor & Department</th>
                <th className="px-6 py-3.5">Preferred Slot</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No appointments received yet.
                  </td>
                </tr>
              ) : (
                appointments.slice(0, 5).map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-900/50 transition">
                    <td className="px-6 py-4">
                      <p className="font-bold text-white text-sm">{apt.patientName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={`tel:${apt.patientPhone}`}
                          className="text-xs text-teal-400 hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{apt.patientPhone}</span>
                        </a>
                        {apt.patientGender && (
                          <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                            {apt.patientGender} {apt.patientAge ? `, ${apt.patientAge}y` : ''}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-200">{apt.doctorName || 'Consultant'}</p>
                      <p className="text-xs text-slate-400">{apt.department}</p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-200">{apt.preferredDate}</p>
                      <p className="text-xs text-teal-400 font-semibold">{apt.preferredTime}</p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          apt.status === 'Pending'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                            : apt.status === 'Confirmed'
                            ? 'bg-teal-950/80 text-teal-300 border border-teal-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {apt.status === 'Pending' && (
                          <button
                            onClick={() => handleStatusChange(apt.id, 'Confirmed')}
                            className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg transition"
                          >
                            Confirm
                          </button>
                        )}
                        {apt.status === 'Confirmed' && (
                          <button
                            onClick={() => handleStatusChange(apt.id, 'Completed')}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-2.5 py-1 rounded-lg transition"
                          >
                            Complete
                          </button>
                        )}
                        <a
                          href={`https://wa.me/91${apt.patientPhone}?text=${encodeURIComponent(`Hello ${apt.patientName}, regarding your appointment at Pacific Care Hospital on ${apt.preferredDate} at ${apt.preferredTime}...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 rounded-lg"
                          title="WhatsApp Patient"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
