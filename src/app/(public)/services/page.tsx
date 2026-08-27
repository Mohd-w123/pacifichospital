import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import Link from 'next/link';
import { 
  HeartHandshake, 
  Stethoscope, 
  Activity, 
  ShieldCheck, 
  Bed, 
  Pill, 
  CheckCircle2, 
  Calendar, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default async function ServicesPage() {
  const content = await getSiteContent();
  const { services, hospital } = content;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8 text-teal-600" />;
      case 'Stethoscope': return <Stethoscope className="w-8 h-8 text-blue-600" />;
      case 'Activity': return <Activity className="w-8 h-8 text-indigo-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-emerald-600" />;
      case 'Bed': return <Bed className="w-8 h-8 text-amber-600" />;
      case 'Pill': return <Pill className="w-8 h-8 text-rose-600" />;
      default: return <Stethoscope className="w-8 h-8 text-teal-600" />;
    }
  };

  return (
    <div className="bg-slate-50 py-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinical Departments & Technology</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Specialities & Medical Services
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
            Comprehensive obstetrics, gynaecology, internal medicine, advanced sonography, modular surgeries, and 24x7 diagnostics at Pacific Care Hospital Sikar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.id}
              id={service.id}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                
                {/* Image Column */}
                <div className={`lg:col-span-5 ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video lg:aspect-4/3 bg-slate-100">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow">
                      {getIcon(service.icon)}
                    </div>
                  </div>
                </div>

                {/* Details Column */}
                <div className={`lg:col-span-7 space-y-5 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                      {service.title}
                    </h2>
                    {service.titleHindi && (
                      <p className="text-base font-bold text-teal-600 mt-1">
                        {service.titleHindi}
                      </p>
                    )}
                  </div>

                  <div
                    className="text-slate-600 text-sm sm:text-base leading-relaxed prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: service.fullDesc || `<p>${service.shortDesc}</p>` }}
                  />

                  {/* Bullet Points */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Key Capabilities & Treatments:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 flex items-center gap-4">
                    <Link
                      href={`/appointment?department=${encodeURIComponent(service.title)}`}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl shadow transition text-sm flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Appointment in {service.title.split(' ')[0]}</span>
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
