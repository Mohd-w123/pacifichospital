'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, CheckCircle2, PhoneCall, ArrowRight, HeartHandshake } from 'lucide-react';
import { HospitalInfo } from '@/lib/types';

interface CampaignBannerProps {
  hospital: HospitalInfo;
}

export default function CampaignBanner({ hospital }: CampaignBannerProps) {
  const benefits = [
    'हमारा उद्देश्य: नॉर्मल डिलीवरी और सुरक्षित मातृत्व',
    'निःसंतानता (Infertility) एवं बार-बार अबॉर्शन का सफल उपचार',
    'माहवारी की अनियमितता एवं सफेद पानी (ल्यूकोरिया) का इलाज',
    'बच्चेदानी व अण्डेदानी में गाँठ का अत्याधुनिक ऑपरेशन',
    'गर्भावस्था में रंगीन सोनोग्राफी, NTNB Scan (11-13 सप्ताह) व Color Doppler',
    'कैंसर की समय पर जाँच व रोकथाम'
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-amber-500 via-rose-600 to-red-600 text-white relative overflow-hidden shadow-2xl">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Offer Details */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-950 font-black px-4 py-1.5 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg animate-bounce">
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>विशेष मासिक स्वास्थ्य सेवा शिविर</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  हर माह की <span className="text-yellow-300 underline decoration-yellow-400 font-black">9 और 10 तारीख</span> को गर्भवती महिलाओं की निःशुल्क परामर्श व जांच!
                </h2>
                <p className="text-sm sm:text-base text-rose-100 font-medium">
                  Get Expert Advice & Tips To Manage High Risk Pregnancy Under <strong>डॉ. अन्जुमन सैय्यद</strong> (MBBS, MS OBG & GYNAE, पूर्व चिकित्सक, SMS हॉस्पिटल जयपुर).
                </p>
              </div>

              {/* Service list bullets from poster */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 bg-black/15 p-2.5 rounded-xl text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0 mt-0.5" />
                    <span className="font-medium text-white">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href="/appointment"
                  className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm sm:text-base"
                >
                  <Calendar className="w-5 h-5 text-slate-950" />
                  <span>शिविर में नाम दर्ज करवाएं (Book Free Slot)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`tel:${hospital.phoneNumbers[0]}`}
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-3.5 rounded-xl border border-white/30 transition flex items-center gap-2 text-sm sm:text-base"
                >
                  <PhoneCall className="w-4 h-4 text-yellow-300" />
                  <span>फ़ोन करें: {hospital.phoneNumbers[0]}</span>
                </a>
              </div>

            </div>

            {/* Right Column: Doctor Spotlight Card */}
            <div className="lg:col-span-4 bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border-4 border-yellow-400 relative">
              <div className="absolute -top-3 right-4 bg-red-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                महिला डॉक्टर द्वारा
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-teal-500 shadow-md shrink-0 bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"
                    alt="Dr. Anjuman Sayyad"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-950 leading-tight">डॉ. अन्जुमन सैय्यद</h3>
                  <p className="text-xs font-bold text-red-600">MBBS, MS (OBG & GYNAE)</p>
                  <p className="text-[11px] text-slate-600 font-medium">स्त्री, प्रसूति एवं निःसंतान रोग विशेषज्ञ</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700 border-t border-slate-100 pt-3">
                <p className="flex items-center gap-1.5 font-semibold text-teal-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  पूर्व चिकित्सक, एस. एम. एस. हॉस्पिटल, जयपुर
                </p>
                <p className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  रंगीन सोनोग्राफी (Color Doppler & NTNB Scan)
                </p>
                <p className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  ओपीडी समय: <strong>सुबह 9:00 से शाम 8:00 बजे</strong>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  href="/doctors"
                  className="w-full bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold py-2.5 rounded-xl transition text-center block"
                >
                  डॉक्टर प्रोफाइल और अपॉइंटमेंट देखें
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
