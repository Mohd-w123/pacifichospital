import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import Link from 'next/link';
import { Award, Clock, Calendar, CheckCircle2, PhoneCall, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

export default async function DoctorsPage() {
  const content = await getSiteContent();
  const { doctors, hospital } = content;

  return (
    <div className="bg-slate-50 py-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Experienced Medical Faculty</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our Specialist Doctors in Sikar
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
            Experienced consultants with background at SMS Hospital Jaipur, providing dedicated OPD consultations from 9:00 AM to 8:00 PM.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start"
            >
              {/* Doctor Photo */}
              <div className="relative w-full sm:w-48 h-64 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top"
                />
                {doctor.id === 'doc-anjuman-sayyad' && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    Ex-SMS Hospital Jaipur
                  </div>
                )}
              </div>

              {/* Doctor Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                    {doctor.nameHindi && (
                      <span className="text-sm font-bold text-teal-700">({doctor.nameHindi})</span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-teal-600 mt-0.5">
                    {doctor.degrees}
                  </p>
                  <p className="text-xs font-semibold text-slate-600">
                    {doctor.designation}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {doctor.experience}
                  </p>
                </div>

                {/* Specialties */}
                <div>
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Specialties & Procedures:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {doctor.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timings */}
                <div className="bg-teal-50/70 p-2.5 rounded-xl border border-teal-200/60 flex items-center gap-2 text-xs text-teal-900 font-medium">
                  <Clock className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>OPD Hours: <strong>{doctor.opdTimings}</strong></span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/appointment?doctorId=${doctor.id}`}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl shadow transition text-xs sm:text-sm text-center flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </Link>

                  <a
                    href={`https://wa.me/91${hospital.whatsappNumber}?text=${encodeURIComponent(`Hello, I want to consult with ${doctor.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold p-2.5 rounded-xl transition"
                    title="WhatsApp Consultation"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Doctor Consultation Info Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">Have an urgent health question or emergency?</h3>
            <p className="text-sm text-slate-300">
              Our 24x7 emergency medical officer is on duty around the clock. Walk in anytime at Madani Mahal, Fatehpur Road Sikar.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`tel:${hospital.emergencyPhone}`}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition text-sm flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Emergency: {hospital.emergencyPhone}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
