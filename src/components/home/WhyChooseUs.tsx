'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, HeartPulse, Clock, Sparkles, Users, Stethoscope, Star, CheckCircle } from 'lucide-react';
import { HospitalInfo } from '@/lib/types';

interface WhyChooseUsProps {
  hospital: HospitalInfo;
}

export default function WhyChooseUs({ hospital }: WhyChooseUsProps) {
  const stats = [
    { number: '10,000+', label: 'Happy Families & Patients', icon: Users },
    { number: '10+ Yrs', label: 'SMS Hospital Clinical Expertise', icon: Award },
    { number: '24x7', label: 'Emergency, Lab & Pharmacy', icon: Clock },
    { number: '100%', label: 'Dedicated Maternity & Surgical Care', icon: ShieldCheck },
  ];

  const pillars = [
    {
      title: 'Expert Doctors (SMS Hospital Jaipur Experience)',
      desc: 'Led by Dr. Anjuman Sayyad (MBBS, MS OBG & GYNAE), bringing advanced maternal, laparoscopic, and gynaecological treatments to Sikar.',
      icon: Award
    },
    {
      title: 'High-Risk Pregnancy & Infertility Specialization',
      desc: 'Comprehensive guidance, painless delivery options, and focused care for complex pregnancies and infertility cases.',
      icon: HeartPulse
    },
    {
      title: 'Advanced Color Doppler & NTNB Sonography',
      desc: 'High-resolution foetal ultrasound scanning and diagnostics for accurate prenatal and abdominal health evaluation.',
      icon: Stethoscope
    },
    {
      title: '24/7 In-House Pharmacy, Lab & Emergency',
      desc: 'Round-the-clock emergency medical attention, computerized blood testing, and genuine medication dispensing on premises.',
      icon: ShieldCheck
    }
  ];

  const testimonials = [
    {
      quote: "डॉ. अन्जुमन सैय्यद मैम की वजह से मेरी नॉर्मल और सेफ डिलीवरी हुई। हॉस्पिटल का स्टाफ बहुत ही केयरिंग है और सुविधाएं बहुत साफ-सुथरी हैं।",
      author: "Pooja Kanwar",
      location: "Fatehpur, Sikar",
      tag: "Normal Delivery"
    },
    {
      quote: "Pacific Care Hospital provides top-notch care. The 24/7 lab and sonography facilities saved us precious time during emergency.",
      author: "Mohammad Imran",
      location: "Sikar",
      tag: "Emergency & Diagnostics"
    },
    {
      quote: "हर महीने 9 और 10 तारीख को गर्भवती महिलाओं के लिए फ्री चेकअप की जो सुविधा है वह बहुत ही सराहनीय है।",
      author: "Sunita Saini",
      location: "Nechwa, Sikar",
      tag: "Maternal Health"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Counter Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 text-center hover:border-teal-400 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1 tracking-tight">
                  {stat.number}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-600">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pillars of Excellence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Pacific Care Hospital</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Patient-First Healthcare Centered on Safety, Warmth & Quality
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              At <strong>Pacific Care Hospital</strong>, we believe every patient deserves top-tier medical expertise without having to travel to metro cities. We combine senior medical leadership with modern medical technology in Sikar.
            </p>

            <div className="space-y-4 pt-2">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-200 transition">
                    <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{pillar.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hospital Building Image with Floating Badge */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/hospital-building.jpg"
                alt="Pacific Care Hospital"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="text-xs font-bold text-teal-300 uppercase tracking-wider">Convenient Location</p>
                <p className="text-lg font-bold">{hospital.address}, {hospital.city}</p>
                <p className="text-xs text-slate-300">Ambulance Bay, Spacious Parking, Lift & 24/7 Emergency Counter</p>
              </div>
            </div>

            {/* Float badge */}
            <div className="absolute -top-6 -right-6 hidden sm:flex bg-white p-4 rounded-2xl shadow-xl border border-slate-100 items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">OPD Everyday</p>
                <p className="text-sm font-bold text-slate-900">9:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Testimonials */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              What Our Patients Say (मरीजों के अनुभव)
            </h3>
            <p className="text-sm text-slate-600">
              Hear from families who trusted Pacific Care Hospital for their maternity and wellness needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{t.author}</h5>
                    <p className="text-xs text-slate-500">{t.location}</p>
                  </div>
                  <span className="text-[11px] font-bold bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full">
                    {t.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
