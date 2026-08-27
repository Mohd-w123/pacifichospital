import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import Link from 'next/link';
import { Building2, Sparkles, CheckCircle2, ShieldCheck, HeartPulse, ArrowRight } from 'lucide-react';
import FacilitiesTour from '@/components/home/FacilitiesTour';

export default async function FacilitiesPage() {
  const content = await getSiteContent();
  const { gallery, hospital } = content;

  const facilitiesList = [
    {
      title: 'Modular Operation Theatre (OT)',
      desc: 'Sterile surgical suites with laminar airflow, HEPA filters, advanced anaesthesia stations, and high-definition laparoscopic surgery equipment for painless, safe procedures.',
      tag: 'Surgery',
      imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'In-Patient Department (IPD) & Deluxe Rooms',
      desc: 'Spacious, air-conditioned private rooms equipped with multi-parameter patient monitoring, attendant sofa-cum-beds, attached hygienic restrooms, and 24/7 dedicated nursing call buttons.',
      tag: 'Patient Rooms',
      imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Comfortable Waiting Area & Reception',
      desc: 'Air-conditioned, modern waiting lounge with computerized registration desk, digital token display, clean drinking water, and wheelchair accessibility.',
      tag: 'Reception',
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Hygienic General & Semi-Private Wards',
      desc: 'Well-ventilated wards with curtain partitions for privacy, central oxygen supply, continuous nurse observation, and strict hygiene maintenance.',
      tag: 'Wards',
      imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Computerized Pathology & Biochemistry Lab',
      desc: 'Fully automated diagnostic lab offering prompt blood routines, hormonal assays, Beta-HCG, blood grouping, and infectious disease tests with rapid digital reports.',
      tag: 'Diagnostics',
      imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: '24x7 In-House Hospital Pharmacy',
      desc: 'Fully stocked pharmacy carrying 100% genuine emergency medications, maternity products, paediatric formulations, and surgical disposables day and night.',
      tag: 'Pharmacy',
      imageUrl: 'https://images.unsplash.com/photo-1586015555751-63c25227aa71?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Stretcher & Wheelchair Friendly Elevators (Lifts)',
      desc: 'High-speed, spacious hospital lifts designed for smooth, effortless transit of patient stretchers and attendants between floors.',
      tag: 'Accessibility',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Hygienic Canteen & Cafeteria',
      desc: 'Nutritious, freshly prepared meals and beverages for patients, relatives, and hospital staff maintained with strict food safety standards.',
      tag: 'Cafeteria',
      imageUrl: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Hospital Building & Outdoor Ambulance Bay',
      desc: 'Strategically situated on Fatehpur Road with dedicated emergency ambulance driveway, ample patient parking, and quick emergency access.',
      tag: 'Infrastructure',
      imageUrl: '/images/hospital-building.jpg'
    }
  ];

  return (
    <div className="bg-slate-50 py-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>State of the Art Facilities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Hospital Infrastructure & Patient Amenities
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
            Explore our advanced surgical suites, modern diagnostics, comfortable wards, 24x7 pharmacy, and patient-first amenities in Sikar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilitiesList.map((facility, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={facility.imageUrl}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/30">
                  {facility.tag}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {facility.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {facility.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-teal-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mr-1.5" />
                  <span>24x7 Maintained & Monitored</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Visual Tour Section */}
        <FacilitiesTour gallery={gallery} />

      </div>
    </div>
  );
}
