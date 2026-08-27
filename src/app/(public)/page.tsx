import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import HeroSlider from '@/components/home/HeroSlider';
import CampaignBanner from '@/components/home/CampaignBanner';
import SpecialitiesGrid from '@/components/home/SpecialitiesGrid';
import DoctorSpotlight from '@/components/home/DoctorSpotlight';
import FacilitiesTour from '@/components/home/FacilitiesTour';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import AppointmentForm from '@/components/shared/AppointmentForm';
import { Calendar, PhoneCall, ShieldAlert, Clock, MapPin, CheckCircle2, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Slider & Sparsh Style Quick Action Cards */}
      <HeroSlider slides={content.heroSlides} hospital={content.hospital} />

      {/* 2. Special Campaign Banner (9th & 10th Free Consultation) */}
      <CampaignBanner hospital={content.hospital} />

      {/* 3. Medical Specialties & Clinical Departments */}
      <SpecialitiesGrid services={content.services} />

      {/* 4. Doctors Showcase (Dr. Anjuman Sayyad & Panel) */}
      <DoctorSpotlight doctors={content.doctors} />

      {/* 5. Hospital Facilities & Infrastructure Tour */}
      <FacilitiesTour gallery={content.gallery} />

      {/* 6. Why Choose Us & Patient Testimonials */}
      <WhyChooseUs hospital={content.hospital} />

      {/* 7. Dedicated Appointment Section on Homepage */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="book-appointment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Booking Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
                <Calendar className="w-3.5 h-3.5" />
                <span>Fast & Easy Consultation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Book Your Doctor Appointment in Sikar
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Consult with <strong>डॉ. अन्जुमन सैय्यद</strong> (MBBS, MS OBG & GYNAE) or our senior general physicians. Fill the form to get instant appointment confirmation.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <Clock className="w-6 h-6 text-teal-400 shrink-0" />
                  <div>
                    <p className="text-xs text-teal-300 font-semibold uppercase">Daily OPD Hours</p>
                    <p className="text-sm font-bold text-white">{content.hospital.opdTimingsHindi}</p>
                    <p className="text-xs text-slate-400">{content.hospital.opdTimings}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <PhoneCall className="w-6 h-6 text-teal-400 shrink-0" />
                  <div>
                    <p className="text-xs text-teal-300 font-semibold uppercase">Direct Helpdesk</p>
                    <p className="text-sm font-bold text-white">01572 299062 / 9571177525</p>
                    <p className="text-xs text-slate-400">Available all 7 days for inquiries</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <MapPin className="w-6 h-6 text-teal-400 shrink-0" />
                  <div>
                    <p className="text-xs text-teal-300 font-semibold uppercase">Hospital Location</p>
                    <p className="text-sm font-bold text-white">{content.hospital.address}</p>
                    <p className="text-xs text-slate-400">{content.hospital.city}, {content.hospital.state} - {content.hospital.pincode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Appointment Form Card */}
            <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100">
              <div className="mb-6 pb-4 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900">Patient Appointment Request</h3>
                <p className="text-xs text-slate-500 mt-1">Please enter patient details for instant OPD scheduling</p>
              </div>

              <AppointmentForm
                doctors={content.doctors}
                services={content.services}
                whatsappNumber={content.hospital.whatsappNumber}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 8. Google Maps & Location Directions Strip */}
      <section className="bg-slate-100 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">How to reach us</span>
              <h4 className="text-lg font-bold text-slate-900">
                Pacific Care Hospital, Madani Mahal, Fatehpur Road, Ward No. 1, Sikar - 332001
              </h4>
              <p className="text-xs text-slate-500">
                Centrally located on Fatehpur Road with spacious patient parking, stretcher lifts, and 24-hour pharmacy.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={content.hospital.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-teal-700 text-white font-bold px-5 py-3 rounded-xl shadow transition text-sm flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-teal-300" />
                <span>Open Google Maps</span>
              </a>
              <Link
                href="/contact"
                className="bg-teal-50 text-teal-800 hover:bg-teal-100 font-bold px-5 py-3 rounded-xl transition text-sm"
              >
                Contact Details
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
