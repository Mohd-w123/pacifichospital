import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Calendar, ChevronLeft } from 'lucide-react';

export default async function DynamicCustomPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getSiteContent();
  const page = content.customPages.find((p) => p.slug === slug && p.published);

  if (!page) {
    notFound();
  }

  return (
    <div className="bg-slate-50 py-12">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold mb-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="text-base text-slate-300 max-w-2xl mx-auto">
              {page.subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-slate-800 leading-relaxed">
          
          {/* Render formatted Rich Text HTML */}
          <div
            className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-a:text-teal-600 prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50/70 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Last updated: {page.lastUpdated}
            </p>
            <Link
              href="/appointment"
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow transition"
            >
              Book Doctor Consultation &rarr;
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
