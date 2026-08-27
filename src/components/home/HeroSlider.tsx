'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, PhoneCall, Stethoscope, ChevronLeft, ChevronRight, ShieldAlert, Sparkles, Award, ArrowRight, HeartPulse, Clock } from 'lucide-react';
import { HeroSlide, HospitalInfo } from '@/lib/types';

interface HeroSliderProps {
  slides: HeroSlide[];
  hospital: HospitalInfo;
}

export default function HeroSlider({ slides, hospital }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current] || slides[0];

  return (
    <div className="relative bg-slate-900 overflow-hidden">
      {/* Background Image / Slider with subtle overlay */}
      <div className="relative min-h-[520px] lg:min-h-[580px] flex items-center">
        {slides.map((s, idx) => (
          <div
            key={s.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={s.imageUrl}
              alt={s.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Rich gradient overlays for crisp readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
          </div>
        ))}

        {/* Hero Content Area */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
          <div className="max-w-2xl text-white space-y-6">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs sm:text-sm font-semibold backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Sparkles className="w-4 h-4 text-teal-300" />
              <span>{slide.badge || 'Multi-Speciality Hospital in Sikar'}</span>
            </div>

            {/* Title (English & Hindi) */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {slide.title}
              </h1>
              {slide.titleHindi && (
                <h2 className="text-xl sm:text-2xl font-bold text-teal-300/90 leading-snug">
                  {slide.titleHindi}
                </h2>
              )}
            </div>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/appointment"
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-xl shadow-teal-600/30 hover:shadow-teal-600/50 transition-all flex items-center gap-2.5 transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5 text-teal-100" />
                <span>Book Doctor Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`tel:${hospital.emergencyPhone}`}
                className="bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700 font-semibold px-5 py-3.5 rounded-xl backdrop-blur-md transition flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-red-400 animate-pulse" />
                <span>24/7 Helpline: {hospital.emergencyPhone}</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-400 shrink-0" />
                <span>SMS Hospital Trained Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>OPD: 9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <HeartPulse className="w-4 h-4 text-teal-400 shrink-0" />
                <span>24x7 Lab & Pharmacy</span>
              </div>
            </div>

          </div>
        </div>

        {/* Slide navigation controls */}
        {slides.length > 1 && (
          <div className="absolute right-6 bottom-8 z-30 hidden sm:flex items-center gap-2">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-teal-600 text-white border border-slate-700 backdrop-blur-md transition"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-teal-600 text-white border border-slate-700 backdrop-blur-md transition"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Sparsh Hospital Style Floating Action Cards Strip */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Book Appointment */}
          <Link
            href="/appointment"
            className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 hover:border-teal-400 hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
              Book Appointment
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select doctor & instant slot confirmation online
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 mt-3 group-hover:translate-x-1 transition-transform">
              Book Now &rarr;
            </span>
          </Link>

          {/* Card 2: Find a Doctor */}
          <Link
            href="/doctors"
            className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 hover:border-teal-400 hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-3 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-700 transition-colors">
              Find Our Doctors
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Dr. Anjuman Sayyad & medical specialists
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 mt-3 group-hover:translate-x-1 transition-transform">
              View Profiles &rarr;
            </span>
          </Link>

          {/* Card 3: 24/7 Emergency & ICU */}
          <a
            href={`tel:${hospital.emergencyPhone}`}
            className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 hover:border-red-400 hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-red-600 transition-colors">
              24/7 Emergency Care
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Call: {hospital.emergencyPhone} for immediate response
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 mt-3 group-hover:translate-x-1 transition-transform">
              Emergency Call &rarr;
            </span>
          </a>

          {/* Card 4: WhatsApp Consultation */}
          <a
            href={`https://wa.me/91${hospital.whatsappNumber}?text=${encodeURIComponent('Hello Pacific Care Hospital, I want to inquire about hospital services and doctor appointments.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 hover:border-emerald-400 hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition-colors">
              WhatsApp Helpdesk
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Direct chat on +91 {hospital.whatsappNumber}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 mt-3 group-hover:translate-x-1 transition-transform">
              Chat on WhatsApp &rarr;
            </span>
          </a>

        </div>
      </div>
    </div>
  );
}
