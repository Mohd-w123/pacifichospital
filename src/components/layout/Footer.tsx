import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle, Heart, ShieldCheck, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { HospitalInfo } from '@/lib/types';

interface FooterProps {
  hospital: HospitalInfo;
}

export default function Footer({ hospital }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner highlight within footer */}
      <div className="bg-gradient-to-r from-teal-900/80 via-slate-900 to-teal-950 py-8 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            <div className="flex items-center gap-4 bg-slate-900/70 p-4 rounded-2xl border border-teal-800/40">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0 border border-teal-500/20">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-teal-300 font-semibold uppercase tracking-wider">OPD Consultation Hours</p>
                <p className="text-sm font-bold text-white">{hospital.opdTimingsHindi}</p>
                <p className="text-xs text-slate-400">{hospital.opdTimings}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/70 p-4 rounded-2xl border border-teal-800/40">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 shrink-0 border border-red-500/20">
                <Phone className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <p className="text-xs text-red-300 font-semibold uppercase tracking-wider">24/7 Emergency & Ambulance</p>
                <a href={`tel:${hospital.emergencyPhone}`} className="text-base font-extrabold text-white hover:text-red-300 transition">
                  {hospital.emergencyPhone}
                </a>
                <p className="text-xs text-slate-400">Immediate trauma & maternity response</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/70 p-4 rounded-2xl border border-teal-800/40">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">WhatsApp Consultation</p>
                <a
                  href={`https://wa.me/91${hospital.whatsappNumber}?text=${encodeURIComponent('Hello Pacific Care Hospital, I want to book an appointment.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-extrabold text-white hover:text-emerald-300 transition"
                >
                  +91 {hospital.whatsappNumber}
                </a>
                <p className="text-xs text-slate-400">Chat with reception for appointments</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Hospital Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl">
                <img
                  src={hospital.footerLogoUrl || hospital.logoUrl || '/images/logo.png'}
                  alt={hospital.name}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              {hospital.footerAboutText || (
                <>
                  <strong className="text-white">{hospital.name}</strong> ({hospital.hindiName}) is committed to providing world-class, compassionate healthcare in Sikar, specializing in Obstetrics, Gynaecology, High-Risk Pregnancy, and General Medicine.
                </>
              )}
            </p>

            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold bg-teal-950/60 border border-teal-800/40 px-3 py-1.5 rounded-lg w-fit">
                <ShieldCheck className="w-4 h-4" />
                <span>Ex-SMS Hospital Jaipur Specialist Doctors</span>
              </div>
            </div>
          </div>

          {/* Column 2: Clinical Departments */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 border-l-4 border-teal-500 pl-3">Clinical Specialties</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                  <span>Obstetrics & Gynaecology (स्त्री रोग)</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                  <span>High Risk Pregnancy Management</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                  <span>Infertility & Normal Delivery</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                  <span>General Physician & Medicine</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                  <span>Color Doppler & NTNB Sonography</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                  <span>Modular OT & Laparoscopic Surgeries</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Facilities & Quick Links */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 border-l-4 border-teal-500 pl-3">Hospital Facilities</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/facilities" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                  <span>Modular Operation Theatre (OT)</span>
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                  <span>Inpatient (IPD) & Deluxe Wards</span>
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                  <span>24/7 Pharmacy & Diagnostics Lab</span>
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                  <span>Waiting Lounge & Patient Lift</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                  <span>Hospital Photo Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                  <span>Book Doctor Appointment</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Address & Contact Info */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 border-l-4 border-teal-500 pl-3">Contact & Location</h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">{hospital.address}</p>
                  <p className="text-slate-400">{hospital.city}, {hospital.state} - {hospital.pincode}</p>
                  <p className="text-xs text-slate-500 mt-0.5">(मदनी महल, फ़तेहपुर रोड, वार्ड नं 1, सीकर)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Phone Numbers:</p>
                  <div className="flex flex-col gap-0.5">
                    {hospital.phoneNumbers.map((phone) => (
                      <a key={phone} href={`tel:${phone}`} className="font-semibold text-white hover:text-teal-300">
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Email Address:</p>
                  <a href={`mailto:${hospital.email}`} className="font-medium text-white hover:text-teal-300 break-all">
                    {hospital.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {hospital.footerCopyrightText || `${hospital.name} (${hospital.hindiName}). All Rights Reserved.`}</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-slate-300">About Us</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-300">Contact</Link>
            <span>•</span>
            <Link href="/appointment" className="hover:text-slate-300">Appointment</Link>
            <span>•</span>
            <Link href="/admin" className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
