import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import AppointmentForm from '@/components/shared/AppointmentForm';
import { Calendar, Clock, PhoneCall, ShieldAlert, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

export default async function AppointmentPage({
  searchParams
}: {
  searchParams?: Promise<{ doctorId?: string; department?: string }>;
}) {
  const content = await getSiteContent();
  const { doctors, services, hospital } = content;
  const resolvedParams = searchParams ? await searchParams : {};
  const preselectedDoctorId = resolvedParams.doctorId || '';
  const preselectedDepartment = resolvedParams.department || '';

  return (
    <div className="bg-slate-50 py-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-14 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Online OPD Registration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Book Doctor Consultation
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Schedule an appointment with Dr. Anjuman Sayyad (MBBS, MS OBG & GYNAE) or our specialist medical panel in Sikar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900">Patient Appointment Booking</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Please fill in the form below. Our reception desk will promptly verify your time slot.
              </p>
            </div>

            <AppointmentForm
              doctors={doctors}
              services={services}
              preselectedDoctorId={preselectedDoctorId}
              preselectedDepartment={preselectedDepartment}
              whatsappNumber={hospital.whatsappNumber}
            />
          </div>

          {/* Right Column: Hospital Details & Helpline */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Timings Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">OPD Consultation Hours</h3>
                <p className="text-sm font-bold text-teal-700 mt-0.5">{hospital.opdTimingsHindi}</p>
                <p className="text-xs text-slate-500">{hospital.opdTimings}</p>
              </div>
              <p className="text-xs text-slate-600 border-t border-slate-100 pt-3">
                All 7 days open for patient checkups and ultrasound examinations.
              </p>
            </div>

            {/* Special Monthly Camp Card */}
            <div className="bg-gradient-to-br from-amber-500 to-rose-600 text-white p-6 rounded-3xl shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" />
                <span className="text-xs font-bold uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                  Monthly Free Camp
                </span>
              </div>
              <h4 className="font-extrabold text-base leading-tight">
                हर माह की 9 और 10 तारीख को गर्भवती महिलाओं के लिए निःशुल्क परामर्श!
              </h4>
              <p className="text-xs text-rose-100 leading-relaxed">
                Free consultation, BP & fetal evaluation under Dr. Anjuman Sayyad.
              </p>
            </div>

            {/* Helpdesk Contacts */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="font-bold text-base text-white border-b border-slate-800 pb-2">Direct Hospital Contacts</h4>
              
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <p className="text-slate-400 text-xs">Reception Phone:</p>
                  <a href={`tel:${hospital.phoneNumbers[0]}`} className="font-bold text-teal-300 hover:underline">
                    {hospital.phoneNumbers[0]}
                  </a>
                </div>

                <div>
                  <p className="text-slate-400 text-xs">Doctor WhatsApp:</p>
                  <a href={`https://wa.me/91${hospital.whatsappNumber}`} className="font-bold text-emerald-400 hover:underline">
                    +91 {hospital.whatsappNumber}
                  </a>
                </div>

                <div>
                  <p className="text-slate-400 text-xs">Hospital Address:</p>
                  <p className="text-slate-200">{hospital.address}, {hospital.city}, {hospital.state} - {hospital.pincode}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
