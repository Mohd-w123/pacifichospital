import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import Link from 'next/link';
import { Award, ShieldCheck, HeartPulse, Clock, Sparkles, CheckCircle2, PhoneCall, Calendar, MapPin, Users } from 'lucide-react';

export default async function AboutPage() {
  const content = await getSiteContent();
  const { hospital } = content;

  return (
    <div className="bg-slate-50 py-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Pacific Care Hospital</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Compassionate Care, Advanced Medicine
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
            {hospital.name} ({hospital.hindiName}) is committed to elevating healthcare standards in Sikar, Rajasthan through expert clinical leadership and patient-centric services.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our Journey & Healthcare Mission
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Founded with the noble vision to provide world-class maternal, obstetrical, and general medical care to families in Sikar and Shekhawati region, <strong>Pacific Care Hospital</strong> brings together experienced specialists trained at premier institutions like SMS Medical College & Hospital Jaipur.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              We specialize in <strong>High-Risk Pregnancy management, normal and painless deliveries, infertility counseling, color Doppler sonography, modular laparoscopic surgeries</strong>, and round-the-clock emergency support.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 bg-white p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Ex-SMS Hospital Specialists</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 bg-white p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>24x7 Emergency & Pharmacy</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 bg-white p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Modern Color Doppler Ultrasound</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 bg-white p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Modular Operation Theatres</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/hospital-building.jpg"
                alt="Pacific Care Hospital Sikar"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Doctor Leadership Message */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden shadow-xl border-4 border-teal-500/30 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"
                  alt="Dr. Anjuman Sayyad"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="inline-block bg-teal-100 text-teal-800 font-bold px-3 py-1 rounded-full text-xs uppercase">
                Doctor's Message (चिकित्सक सन्देश)
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Dr. Anjuman Sayyad <span className="text-slate-500 text-lg font-normal">(MBBS, MS OBG & GYNAE)</span>
              </h3>
              <p className="text-xs font-bold text-teal-700">
                स्त्री, प्रसूति एवं निःसंतान रोग विशेषज्ञ | पूर्व चिकित्सक, SMS हॉस्पिटल, जयपुर
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic">
                "Our single-minded aim at Pacific Care Hospital is to ensure the safest pregnancy and delivery experience for every mother, coupled with ethical, modern medical care for all illnesses. We believe in transparency, empathy, and providing high quality diagnostics right here in Sikar."
              </p>
              
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/appointment"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2.5 rounded-xl shadow text-sm transition"
                >
                  Consult Dr. Anjuman Sayyad
                </Link>
                <Link
                  href="/doctors"
                  className="text-slate-700 hover:text-teal-700 font-semibold text-sm"
                >
                  View Full Medical Team &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-10">
            Our Guiding Healthcare Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mx-auto">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900">Patient-Centric</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Every treatment plan is tailored to the physical and emotional well-being of the patient.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900">Safety & Hygiene</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Sterile modular OTs, HEPA air filtration, and stringent infection control protocols.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900">24/7 Availability</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Round-the-clock emergency medical officers, trauma response, pharmacy, and diagnostic lab.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900">Affordable Excellence</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Transparent charges, free checkup schemes for expectant mothers, and accessible care for all.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
