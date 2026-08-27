'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Users,
  Stethoscope,
  Image as ImageIcon,
  FileText,
  Calendar,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Bell
} from 'lucide-react';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Appointments & Inquiries', href: '/admin/appointments', icon: Calendar },
    { name: 'Doctors Panel', href: '/admin/doctors', icon: Users },
    { name: 'Services & Specialties', href: '/admin/services', icon: Stethoscope },
    { name: 'Hospital Photos & Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Custom Pages & CMS', href: '/admin/pages', icon: FileText },
    { name: 'Hospital Info & Contacts', href: '/admin/hospital-info', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center font-black text-white text-sm">
            P
          </div>
          <div>
            <h1 className="font-bold text-sm text-white leading-tight">Pacific Care Admin</h1>
            <p className="text-[10px] text-teal-400">Content Management</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1.5 rounded-lg flex items-center gap-1 border border-slate-700"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Logo & Hospital Header */}
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/20 text-white font-black text-lg">
              P
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base leading-tight">Pacific Care</h2>
              <p className="text-xs text-teal-400 font-semibold">Admin CMS Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-teal-600 text-white font-bold shadow-lg shadow-teal-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: View Live Website */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/80">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold py-2.5 px-4 rounded-xl text-xs transition"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
          </Link>
          <p className="text-[11px] text-slate-500 text-center">
            Logged in as Admin • Pacific Care Hospital
          </p>
        </div>
      </aside>

      {/* Main Admin Content Viewport */}
      <main className="flex-1 overflow-y-auto min-h-screen bg-slate-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
