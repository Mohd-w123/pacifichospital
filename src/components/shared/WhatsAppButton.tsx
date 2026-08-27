'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  whatsappNumber: string;
}

export default function WhatsAppButton({ whatsappNumber }: WhatsAppButtonProps) {
  const url = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(
    'Hello Pacific Care Hospital, I want to book an appointment / ask about hospital services.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      <div className="hidden sm:block mr-3 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
        WhatsApp Consultation
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all relative border-2 border-white"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}
