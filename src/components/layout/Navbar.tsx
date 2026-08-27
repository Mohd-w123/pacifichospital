'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, ChevronDown, ChevronRight, PhoneCall, Sparkles } from 'lucide-react';
import { HospitalInfo, CustomPage, NavItem } from '@/lib/types';

interface NavbarProps {
  hospital: HospitalInfo;
  customPages?: CustomPage[];
  navigation?: NavItem[];
}

export default function Navbar({ hospital, customPages = [], navigation }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  const defaultNavLinks: NavItem[] = [
    { id: 'nav-1', name: 'Home', href: '/', enabled: true, order: 1 },
    { id: 'nav-2', name: 'About Us', href: '/about', enabled: true, order: 2 },
    { id: 'nav-3', name: 'Our Doctors', href: '/doctors', enabled: true, order: 3 },
    {
      id: 'nav-4',
      name: 'Specialities & Services',
      href: '/services',
      enabled: true,
      order: 4,
      subItems: [
        { id: 'sub-1', name: 'Obstetrics & Gynaecology', href: '/services#serv-obg-gynae' },
        { id: 'sub-2', name: 'General Physician', href: '/services#serv-general-physician' },
        { id: 'sub-3', name: 'Color Doppler Sonography', href: '/services#serv-sonography-doppler' },
        { id: 'sub-4', name: 'Modular Operation Theatre (OT)', href: '/services#serv-modular-ot' },
        { id: 'sub-5', name: 'In-Patient (IPD) & Wards', href: '/services#serv-ipd-ward' },
        { id: 'sub-6', name: '24/7 Lab & Pharmacy', href: '/services#serv-lab-pharma' }
      ]
    },
    { id: 'nav-5', name: 'Facilities', href: '/facilities', enabled: true, order: 5 },
    { id: 'nav-6', name: 'Photo Gallery', href: '/gallery', enabled: true, order: 6 },
    { id: 'nav-7', name: 'Contact Us', href: '/contact', enabled: true, order: 7 }
  ];

  const activeNavLinks = navigation && navigation.length > 0
    ? navigation.filter((item) => item.enabled !== false).sort((a, b) => a.order - b.order)
    : defaultNavLinks;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Dynamic Header Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group py-1.5">
            <img
              src={hospital.logoUrl || '/images/logo.png'}
              alt={hospital.name}
              className="h-12 sm:h-14 md:h-15 w-auto object-contain max-w-[220px] sm:max-w-[270px] transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links & Submenus */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {activeNavLinks.map((link) => {
              const isActive = pathname === link.href;
              const hasSubmenu = link.subItems && link.subItems.length > 0;

              if (hasSubmenu) {
                return (
                  <div key={link.id || link.name} className="relative group">
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[14.5px] font-semibold tracking-tight whitespace-nowrap transition-all duration-150 ${
                        isActive
                          ? 'text-teal-700 bg-teal-50/80 font-bold'
                          : 'text-slate-700 hover:text-teal-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                    </Link>

                    {/* Submenu Dropdown */}
                    <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 hidden group-hover:block animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                      {link.subItems?.map((sub) => (
                        <Link
                          key={sub.id || sub.name}
                          href={sub.href}
                          className="flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition group/item"
                        >
                          <span>{sub.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/item:text-teal-600 transition-transform group-hover/item:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.id || link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-[14.5px] font-semibold tracking-tight whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'text-teal-700 bg-teal-50/80 font-bold'
                      : 'text-slate-700 hover:text-teal-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Dynamic Custom Pages Dropdown if any */}
            {customPages.filter((p) => p.published).length > 0 && (
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-[14.5px] font-semibold text-slate-700 hover:text-teal-600 hover:bg-slate-50 transition whitespace-nowrap cursor-pointer">
                  <span>Patient Guide</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full right-0 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 hidden group-hover:block animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                  {customPages
                    .filter((p) => p.published)
                    .map((p) => (
                      <Link
                        key={p.id}
                        href={`/page/${p.slug}`}
                        className="block px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition"
                      >
                        {p.title}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </nav>

          {/* Right Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              href="/appointment"
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white text-[13.5px] font-bold px-5 py-2.5 rounded-full shadow-md shadow-teal-700/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-teal-200" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/appointment"
              className="bg-teal-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm sm:hidden whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer with Submenus */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200">
          {activeNavLinks.map((link) => {
            const isActive = pathname === link.href;
            const hasSubmenu = link.subItems && link.subItems.length > 0;
            const isSubmenuOpen = openMobileSubmenu === link.id;

            if (hasSubmenu) {
              return (
                <div key={link.id || link.name} className="space-y-1">
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50">
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={isActive ? 'text-teal-700 font-extrabold' : 'text-slate-700'}
                    >
                      {link.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setOpenMobileSubmenu(isSubmenuOpen ? null : link.id)}
                      className="p-1 text-slate-400 hover:text-slate-700"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {isSubmenuOpen && (
                    <div className="pl-6 space-y-1 border-l-2 border-teal-500 ml-4 py-1">
                      {link.subItems?.map((sub) => (
                        <Link
                          key={sub.id || sub.name}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 text-xs font-semibold text-slate-600 hover:text-teal-700"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.id || link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition ${
                  isActive
                    ? 'text-teal-700 bg-teal-50 font-extrabold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {customPages.filter((p) => p.published).length > 0 && (
            <div className="pt-2 border-t border-slate-100">
              <span className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Patient Information</span>
              {customPages.filter((p) => p.published).map((p) => (
                <Link
                  key={p.id}
                  href={`/page/${p.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-xs font-semibold text-slate-600 hover:text-teal-700"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <Link
              href="/appointment"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-full font-bold shadow-md text-center text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Doctor Appointment</span>
            </Link>

            <a
              href={`tel:${hospital.phoneNumbers[0]}`}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-800 hover:bg-slate-200 py-2.5 rounded-full font-semibold text-center text-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
              <span>Call: {hospital.phoneNumbers[0]}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
