'use client';

import React from 'react';
import Link from 'next/link';
import { 
  HeartHandshake, 
  Stethoscope, 
  Activity, 
  ShieldCheck, 
  Bed, 
  Pill, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { ServiceItem } from '@/lib/types';

interface SpecialitiesGridProps {
  services: ServiceItem[];
}

export default function SpecialitiesGrid({ services }: SpecialitiesGridProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-teal-600" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-blue-600" />;
      case 'Activity': return <Activity className="w-6 h-6 text-indigo-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Bed': return <Bed className="w-6 h-6 text-amber-600" />;
      case 'Pill': return <Pill className="w-6 h-6 text-rose-600" />;
      default: return <Stethoscope className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Centres of Clinical Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Medical Services & Specialties
          </h2>
          <p className="text-base text-slate-600">
            पेसिफ़िक केयर हॉस्पिटल में विशेषज्ञ डॉक्टर्स, अत्याधुनिक तकनीकी उपकरण और 24 घंटे समर्पित चिकित्सा सुविधाएं उपलब्ध हैं।
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col group"
            >
              {/* Image Preview */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-md">
                  {getIcon(service.icon)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {service.title}
                  </h3>
                  {service.titleHindi && (
                    <p className="text-xs font-bold text-teal-600 mb-2">
                      {service.titleHindi}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Key Bullet Features */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {service.features?.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/appointment?department=${encodeURIComponent(service.title)}`}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Book For This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/services"
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 bg-gradient-to-r from-teal-700 to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold">Need assistance choosing the right department?</h3>
            <p className="text-sm text-teal-100">Call our 24x7 hospital reception desk for immediate appointment assistance.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:01572299062"
              className="bg-white text-teal-800 hover:bg-teal-50 font-bold px-5 py-3 rounded-xl shadow transition text-sm"
            >
              Call 01572 299062
            </a>
            <Link
              href="/appointment"
              className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-5 py-3 rounded-xl shadow transition text-sm"
            >
              Book Online
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
