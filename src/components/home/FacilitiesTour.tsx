'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, X, ZoomIn, ArrowRight, Sparkles } from 'lucide-react';
import { GalleryItem } from '@/lib/types';

interface FacilitiesTourProps {
  gallery: GalleryItem[];
}

export default function FacilitiesTour({ gallery }: FacilitiesTourProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'OT',
    'IPD',
    'Waiting Area',
    'Ward',
    'Lab',
    'Pharma',
    'Indoor',
    'Outdoor',
    'Canteen',
    'Lift'
  ];

  const filteredItems = activeCategory === 'All'
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>World-Class Infrastructure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Hospital Facilities & Visual Tour
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Take a virtual walkthrough of our Modular OT, IPD Deluxe Rooms, 24x7 Lab, Pharmacy, Wards, and Patient Lounges in Sikar.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-400 hover:text-teal-300 transition shrink-0"
          >
            <span>View Full Photo Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/30 font-bold scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative bg-slate-800 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700/60"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-teal-500/90 text-slate-950 text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md">
                  {item.category}
                </div>

                {/* Zoom icon on hover */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                  <ZoomIn className="w-4 h-4 text-teal-300" />
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 space-y-1">
                <h3 className="font-bold text-white text-base group-hover:text-teal-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-red-600 flex items-center justify-center transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[70vh] w-full bg-black flex items-center justify-center">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="p-6 bg-slate-900 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-teal-500 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded-md">
                    {selectedImage.category}
                  </span>
                  <h4 className="text-xl font-bold text-white">{selectedImage.title}</h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
