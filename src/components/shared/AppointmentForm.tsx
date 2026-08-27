'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Stethoscope, CheckCircle2, AlertCircle, MessageSquare, Send, ArrowRight } from 'lucide-react';
import { Doctor, ServiceItem } from '@/lib/types';

interface AppointmentFormProps {
  doctors?: Doctor[];
  services?: ServiceItem[];
  preselectedDoctorId?: string;
  preselectedDepartment?: string;
  onSuccess?: () => void;
  whatsappNumber?: string;
}

export default function AppointmentForm({
  doctors = [],
  services = [],
  preselectedDoctorId = '',
  preselectedDepartment = '',
  onSuccess,
  whatsappNumber = '9571177525'
}: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    patientAge: '',
    patientGender: 'Female' as 'Male' | 'Female' | 'Other',
    department: preselectedDepartment || (services[0]?.title || 'Obstetrics & Gynaecology (Obs & Gynae)'),
    doctorId: preselectedDoctorId || (doctors[0]?.id || ''),
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: '10:30 AM',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const timeSlots = [
    '09:30 AM',
    '10:30 AM',
    '11:30 AM',
    '12:30 PM',
    '01:30 PM',
    '04:00 PM',
    '05:30 PM',
    '06:30 PM',
    '07:30 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const selectedDoc = doctors.find((d) => d.id === formData.doctorId);
      const payload = {
        ...formData,
        doctorName: selectedDoc ? selectedDoc.name : 'Consultant Doctor'
      };

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to submit appointment request.');
      }

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please call directly.');
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppBookingUrl = () => {
    const selectedDoc = doctors.find((d) => d.id === formData.doctorId);
    const docName = selectedDoc ? selectedDoc.name : 'Consultant Doctor';
    const text = `*New Appointment Request - Pacific Care Hospital*\n\n` +
      `*Patient Name:* ${formData.patientName}\n` +
      `*Phone:* ${formData.patientPhone}\n` +
      `*Doctor:* ${docName}\n` +
      `*Department:* ${formData.department}\n` +
      `*Preferred Date:* ${formData.preferredDate}\n` +
      `*Preferred Time:* ${formData.preferredTime}\n` +
      (formData.message ? `*Reason / Note:* ${formData.message}\n` : '');

    return `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-teal-100 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto border border-teal-100 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Appointment Request Received!</h3>
          <p className="text-sm text-slate-600 mt-2">
            धन्यवाद! Your appointment request has been recorded. Our reception team will call you shortly at <strong className="text-slate-900">{formData.patientPhone}</strong> to confirm your slot.
          </p>
        </div>

        <div className="bg-teal-50/70 p-4 rounded-xl text-left border border-teal-200/60 text-xs sm:text-sm space-y-1.5 text-slate-800">
          <p><strong>Patient:</strong> {formData.patientName}</p>
          <p><strong>Date & Time:</strong> {formData.preferredDate} at {formData.preferredTime}</p>
          <p><strong>Department:</strong> {formData.department}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={getWhatsAppBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition"
          >
            <Send className="w-4 h-4" />
            <span>Confirm via WhatsApp</span>
          </a>

          <button
            onClick={() => setSubmitted(false)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-xl transition text-sm"
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Patient Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Patient Name (मरीज का नाम) *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              placeholder="e.g. Sunita Devi / Ramesh"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Phone Number (मोबाइल नंबर) *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="tel"
              required
              placeholder="e.g. 9571177525"
              value={formData.patientPhone}
              onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>

      {/* Age & Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Age (उम्र)
          </label>
          <input
            type="number"
            placeholder="e.g. 28"
            value={formData.patientAge}
            onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Gender (लिंग)
          </label>
          <select
            value={formData.patientGender}
            onChange={(e) => setFormData({ ...formData, patientGender: e.target.value as any })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          >
            <option value="Female">Female (महिला)</option>
            <option value="Male">Male (पुरुष)</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Email (Optional)
          </label>
          <input
            type="email"
            placeholder="name@email.com"
            value={formData.patientEmail}
            onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Department & Doctor Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Speciality / Department (विभाग) *
          </label>
          <div className="relative">
            <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            >
              <option value="Obstetrics & Gynaecology (Obs & Gynae)">Obstetrics & Gynaecology (स्त्री एवं प्रसूति रोग)</option>
              <option value="High Risk Pregnancy Care">High Risk Pregnancy Care (उच्च जोखिम गर्भावस्था)</option>
              <option value="Infertility Consultation">Infertility Specialist (निःसंतानता परामर्श)</option>
              <option value="General Physician & Internal Medicine">General Physician (सामान्य चिकित्सा)</option>
              <option value="Color Doppler & Sonography">Color Doppler & Sonography (सोनोग्राफी / NTNB Scan)</option>
              <option value="General & Laparoscopic Surgery">General & Laparoscopic Surgery (सर्जरी)</option>
              <option value="General Checkup">General Health Checkup</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Preferred Doctor (डॉक्टर)
          </label>
          <select
            value={formData.doctorId}
            onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          >
            {doctors.length > 0 ? (
              doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} - {doc.degrees} ({doc.designation})
                </option>
              ))
            ) : (
              <>
                <option value="doc-anjuman-sayyad">Dr. Anjuman Sayyad (MBBS, MS OBG & GYNAE)</option>
                <option value="doc-general-physician">Dr. M. K. Sharma (MD General Medicine)</option>
                <option value="doc-general-surgeon">Dr. R. K. Verma (MS Surgery)</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Preferred Date (तारीख) *
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Preferred Time Slot (समय) *
          </label>
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <select
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Message / Symptoms */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Health Problem / Symptoms (समस्या / लक्षण - Optional)
        </label>
        <textarea
          rows={2}
          placeholder="Brief description of symptoms, previous checkups or questions..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold rounded-xl shadow-lg shadow-teal-700/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Calendar className="w-5 h-5 text-teal-200" />
            <span>Confirm & Book Appointment (अपॉइंटमेंट बुक करें)</span>
            <ArrowRight className="w-4 h-4 text-teal-200" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-500">
        🔒 Your medical and personal information is strictly confidential.
      </p>
    </form>
  );
}
