'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Clock, Calendar, CheckCircle2, ChevronRight, Stethoscope, Sparkles } from 'lucide-react';
import { Doctor } from '@/lib/types';

interface DoctorSpotlightProps {
  doctors: Doctor[];
}

export default function DoctorSpotlight({ doctors }: DoctorSpotlightProps) {
  const primaryDoc = doctors.find((d) => d.id === 'doc-anjuman-sayyad') || doctors[0];
  const otherDocs = doctors.filter((d) => d.id !== primaryDoc?.id);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider border border-rose-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Expert Medical Panel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Senior Doctors & Specialists
          </h2>
          <p className="text-base text-slate-600">
            Dedicated healthcare professionals with prestigious hospital background, providing evidence-based, compassionate care.
          </p>
        </div>

        {/* Primary Doctor Featured Spotlight (Dr. Anjuman Sayyad) */}
        {primaryDoc && (
          <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-teal-800/40 text-white mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
              
              {/* Doctor Photo Column */}
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-teal-500/40 bg-slate-800">
                  <img
                    src={primaryDoc.photoUrl}
                    alt={primaryDoc.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    Ex-SMS Hospital Jaipur
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md p-2 rounded-xl text-center border border-white/10">
                    <p className="text-xs text-teal-300 font-semibold">{primaryDoc.experience}</p>
                  </div>
                </div>
              </div>

              {/* Doctor Info & Specialties Column */}
              <div className="lg:col-span-8 space-y-6">
                
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {primaryDoc.name}
                    </h3>
                    {primaryDoc.nameHindi && (
                      <span className="text-xl font-bold text-yellow-400">
                        ({primaryDoc.nameHindi})
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-bold text-teal-300">
                    {primaryDoc.degrees} • {primaryDoc.designation}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    स्त्री, प्रसूति एवं निःसंतान रोग विशेषज्ञ, पूर्व चिकित्सक, एस. एम. एस. हॉस्पिटल, जयपुर
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {primaryDoc.bio}
                </p>

                {/* Key clinical areas */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                    Key Specialties & Procedures (विशेष परामर्श व उपचार):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-200">
                    {primaryDoc.specialties.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* OPD Timings Strip & Action Button */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-4 py-2.5 rounded-xl">
                    <Clock className="w-5 h-5 text-teal-400" />
                    <div>
                      <p className="text-[11px] text-teal-300 font-semibold uppercase">OPD Consultation Timings</p>
                      <p className="text-sm font-bold text-white">{primaryDoc.opdTimings}</p>
                    </div>
                  </div>

                  <Link
                    href={`/appointment?doctorId=${primaryDoc.id}`}
                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-teal-500/30 transition-all flex items-center gap-2 text-sm transform hover:-translate-y-0.5"
                  >
                    <Calendar className="w-4 h-4 text-teal-100" />
                    <span>Book Appointment with {primaryDoc.name}</span>
                  </Link>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Other Medical Specialists */}
        {otherDocs.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-teal-600 pl-3">
              Other Department Consultants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-teal-400 hover:shadow-lg transition-all flex flex-col sm:flex-row gap-6 items-start"
                >
                  <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                    <img
                      src={doc.photoUrl}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{doc.name}</h4>
                      {doc.nameHindi && <p className="text-xs font-semibold text-teal-700">{doc.nameHindi}</p>}
                      <p className="text-xs font-bold text-slate-600">{doc.degrees} • {doc.designation}</p>
                      <p className="text-xs text-teal-600 font-medium">{doc.experience}</p>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <p className="font-semibold text-slate-800">Specialties:</p>
                      <p className="line-clamp-2">{doc.specialties.join(', ')}</p>
                    </div>

                    <div className="text-xs bg-white p-2 rounded-lg border border-slate-200 flex items-center gap-1.5 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{doc.opdTimings}</span>
                    </div>

                    <Link
                      href={`/appointment?doctorId=${doc.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 pt-1"
                    >
                      <span>Book Consultation</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
