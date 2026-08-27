import React from 'react';
import Link from 'next/link';
import { Phone, Clock, Mail, MessageCircle, ShieldAlert, Sparkles, Lock } from 'lucide-react';
import { HospitalInfo } from '@/lib/types';

interface TopBarProps {
  hospital: HospitalInfo;
}

export default function TopBar({ hospital }: TopBarProps) {
  return (
    <div className="bg-slate-950 text-slate-200 text-xs border-b border-slate-800">
      {/* Top Announcement Strip */}
      {hospital.noticeBanner?.active && (
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white px-4 py-1.5 text-center text-xs font-semibold flex items-center justify-center gap-2 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-yellow-300 animate-pulse" />
          <span className="truncate">
            <span className="bg-yellow-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase mr-1.5 shadow-sm">
              विशेष सूचना
            </span>
            {hospital.noticeBanner.textHindi || hospital.noticeBanner.text}
          </span>
          <Link
            href={hospital.noticeBanner.linkUrl || '/appointment'}
            className="ml-2 font-bold underline hover:text-yellow-200 shrink-0 text-[11px]"
          >
            अपॉइंटमेंट लें &rarr;
          </Link>
        </div>
      )}

      {/* Main TopBar Info - Single sleek row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
        
        {/* Left Side: Emergency & OPD Hours */}
        <div className="flex items-center gap-3 sm:gap-5 overflow-hidden">
          {/* Emergency 24x7 Badge */}
          <a
            href={`tel:${hospital.emergencyPhone}`}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white px-2.5 py-0.5 rounded-full font-bold text-xs shrink-0 shadow-sm transition"
          >
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            <span>24x7 Emergency:</span>
            <span className="underline decoration-white/50">{hospital.emergencyPhone}</span>
          </a>

          {/* OPD Timings */}
          <div className="hidden md:flex items-center gap-1.5 text-slate-300 text-xs truncate">
            <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>OPD: <strong className="text-white">{hospital.opdTimingsHindi}</strong></span>
          </div>

          {/* Email */}
          <div className="hidden xl:flex items-center gap-1.5 text-slate-400 text-xs truncate">
            <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <a href={`mailto:${hospital.email}`} className="hover:text-teal-300 transition truncate">
              {hospital.email}
            </a>
          </div>
        </div>

        {/* Right Side: Contact Numbers & WhatsApp */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 ml-auto">
          
          {/* Helpline Phone */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs">
            <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="text-slate-400">हेल्पलाइन:</span>
            <a
              href={`tel:${hospital.phoneNumbers[0]}`}
              className="font-bold text-white hover:text-teal-300 transition"
            >
              {hospital.phoneNumbers[0]}
            </a>
            {hospital.phoneNumbers[1] && (
              <span className="text-slate-600 hidden lg:inline">/</span>
            )}
            {hospital.phoneNumbers[1] && (
              <a
                href={`tel:${hospital.phoneNumbers[1]}`}
                className="font-semibold text-slate-300 hover:text-white transition hidden lg:inline"
              >
                {hospital.phoneNumbers[1]}
              </a>
            )}
          </div>

          {/* WhatsApp Direct Button */}
          <a
            href={`https://wa.me/91${hospital.whatsappNumber}?text=${encodeURIComponent('Hello Pacific Care Hospital, I want to book an appointment.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-bold transition shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
            <span>WhatsApp</span>
          </a>

          {/* Admin Login Button */}
          <Link
            href="/admin"
            className="flex items-center gap-1 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-2 py-1 rounded-lg text-xs font-semibold border border-slate-700 transition"
            title="Admin Management Panel"
          >
            <Lock className="w-3 h-3 text-teal-400" />
            <span className="hidden xs:inline">Admin</span>
          </Link>

        </div>

      </div>
    </div>
  );
}
