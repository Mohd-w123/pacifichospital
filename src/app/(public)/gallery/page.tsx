import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import FacilitiesTour from '@/components/home/FacilitiesTour';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

export default async function GalleryPage() {
  const content = await getSiteContent();
  const { gallery } = content;

  return (
    <div className="bg-slate-50 py-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Hospital Photo Gallery</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Pacific Care Hospital Photo Gallery
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
            High-resolution photos of our modular OT, IPD patient rooms, pathology laboratory, 24x7 pharmacy, lifts, waiting area, and hospital building.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FacilitiesTour gallery={gallery} />
      </div>
    </div>
  );
}
