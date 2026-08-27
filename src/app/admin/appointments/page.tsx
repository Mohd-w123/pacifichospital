'use client';

import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Search,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trash2,
  User,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Appointment } from '@/lib/types';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'>('All');
  const [message, setMessage] = useState('');

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setAppointments(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setMessage(`Status updated to ${newStatus}`);
        setTimeout(() => setMessage(''), 3000);
        fetchAppointments();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this appointment inquiry?')) return;
    try {
      const res = await fetch(`/api/appointments?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Appointment removed');
        setTimeout(() => setMessage(''), 3000);
        fetchAppointments();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patientPhone.includes(searchTerm) ||
      (apt.doctorName && apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      apt.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Patient Inquiries</span>
          <h1 className="text-2xl font-extrabold text-white">Appointments & OPD Bookings</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Track and manage patient appointment submissions received through the website.
          </p>
        </div>

        <button
          onClick={fetchAppointments}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-700 transition flex items-center gap-2 self-start cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-teal-950/80 border border-teal-800 text-teal-300 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Filters & Search */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {(['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                statusFilter === st
                  ? 'bg-teal-600 text-white'
                  : 'text-slate-400 hover:text-white bg-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search patient / phone / doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-slate-950 p-12 rounded-3xl border border-slate-800 text-center text-slate-500 space-y-2">
            <Calendar className="w-12 h-12 mx-auto text-slate-700" />
            <p className="font-semibold text-white">No appointments found</p>
            <p className="text-xs">No bookings match the current filter or search criteria.</p>
          </div>
        ) : (
          filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Column: Patient & Doctor */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-extrabold text-white text-base">{apt.patientName}</h4>
                  {apt.patientGender && (
                    <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                      {apt.patientGender} {apt.patientAge ? `(${apt.patientAge} yrs)` : ''}
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      apt.status === 'Pending'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                        : apt.status === 'Confirmed'
                        ? 'bg-teal-950/80 text-teal-300 border border-teal-800'
                        : apt.status === 'Completed'
                        ? 'bg-blue-950/80 text-blue-300 border border-blue-800'
                        : 'bg-red-950/80 text-red-300 border border-red-800'
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>

                <div className="text-xs text-slate-400 space-y-0.5">
                  <p>
                    <strong className="text-slate-300">Doctor:</strong> {apt.doctorName || 'Consultant'} ({apt.department})
                  </p>
                  <p>
                    <strong className="text-slate-300">Slot:</strong> {apt.preferredDate} at <strong className="text-teal-400">{apt.preferredTime}</strong>
                  </p>
                  {apt.message && (
                    <p className="italic text-slate-400 bg-slate-900/60 p-2 rounded-lg mt-1 border border-slate-850">
                      "{apt.message}"
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Actions & Communication */}
              <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                
                {/* Call Button */}
                <a
                  href={`tel:${apt.patientPhone}`}
                  className="bg-slate-900 hover:bg-slate-800 text-teal-400 border border-slate-800 font-semibold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{apt.patientPhone}</span>
                </a>

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/91${apt.patientPhone}?text=${encodeURIComponent(
                    `Hello ${apt.patientName}, Greetings from Pacific Care Hospital Sikar. Your appointment request for ${apt.department} on ${apt.preferredDate} at ${apt.preferredTime} has been received.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 font-semibold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                {/* Status Dropdown */}
                <select
                  value={apt.status}
                  onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-2.5 py-2 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(apt.id)}
                  className="p-2 text-slate-500 hover:text-red-400 transition"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
