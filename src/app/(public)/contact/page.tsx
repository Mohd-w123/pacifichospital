import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldAlert, Sparkles, Send } from 'lucide-react';

export default async function ContactPage() {
  const content = await getSiteContent();
  const { hospital } = content;

  return (
    <div className="bg-slate-50 py-12">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>24/7 Patient Assistance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact Pacific Care Hospital
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto">
            Get in touch with our medical reception, book emergency ambulance, or reach our doctors at Fatehpur Road, Sikar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Address */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Hospital Address</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>{hospital.address}</strong><br />
              {hospital.city}, {hospital.state} - {hospital.pincode}<br />
              <span className="text-xs text-slate-500">(मदनी महल, फ़तेहपुर रोड, वार्ड नं 1, सीकर)</span>
            </p>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Official Phone Numbers</h3>
            <div className="space-y-1 text-xs sm:text-sm">
              {hospital.phoneNumbers.map((phone) => (
                <a key={phone} href={`tel:${phone}`} className="block font-semibold text-teal-700 hover:underline">
                  {phone}
                </a>
              ))}
            </div>
          </div>

          {/* Card 3: WhatsApp */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">WhatsApp Helpdesk</h3>
            <p className="text-xs text-slate-500">Quick inquiries & report sharing:</p>
            <a
              href={`https://wa.me/91${hospital.whatsappNumber}?text=${encodeURIComponent('Hello Pacific Care Hospital, I want to inquire about doctor OPD / checkup.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-extrabold text-emerald-600 hover:underline text-sm"
            >
              +91 {hospital.whatsappNumber}
            </a>
          </div>

          {/* Card 4: Timings & Emergency */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">OPD & Emergency</h3>
            <p className="text-xs text-slate-600">
              OPD: <strong>{hospital.opdTimingsHindi}</strong><br />
              Emergency: <strong className="text-red-600">24 Hours / 7 Days</strong>
            </p>
          </div>

        </div>

        {/* Location Map & Fast Inquiry Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Hospital Visual & Map Info */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/30">
                <MapPin className="w-4 h-4" />
                <span>Prime Location on Fatehpur Road Sikar</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Easy to Reach from Any Corner of Sikar
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Pacific Care Hospital is conveniently located near Madani Mahal on Fatehpur Road. Equipped with dedicated 24-hour ambulance access, patient parking, lift facilities, and round-the-clock medical desk.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-800 h-64 w-full bg-slate-950">
              {hospital.googleMapEmbedUrl ? (
                <iframe
                  src={hospital.googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pacific Care Hospital Google Map Location"
                />
              ) : (
                <img
                  src="/images/hospital-building.jpg"
                  alt="Pacific Care Hospital"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="pt-2">
              <a
                href={hospital.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition text-sm text-center"
              >
                <MapPin className="w-4 h-4" />
                <span>Open Google Maps Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message / Email Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Send Us a Direct Message</h3>
              <p className="text-xs text-slate-500 mb-6">Have general questions? Write to us or call our reception.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9571177525"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="name@email.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Message / Query</label>
                  <textarea
                    rows={4}
                    placeholder="How can our hospital assist you?"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                </div>

                <a
                  href={`https://wa.me/91${hospital.whatsappNumber}?text=${encodeURIComponent('Hello Pacific Care Hospital, I have a general inquiry.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-900 hover:bg-teal-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition text-sm cursor-pointer shadow"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via WhatsApp / Reception</span>
                </a>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center mt-6">
              Official Email: <a href={`mailto:${hospital.email}`} className="text-teal-700 font-semibold">{hospital.email}</a>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
