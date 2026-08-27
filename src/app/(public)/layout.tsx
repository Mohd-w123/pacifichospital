import React from 'react';
import { getSiteContent } from '@/lib/content-store';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContent();

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar hospital={content.hospital} />
      <Navbar hospital={content.hospital} customPages={content.customPages} navigation={content.navigation} />
      <main className="flex-grow">{children}</main>
      <Footer hospital={content.hospital} />
      <WhatsAppButton whatsappNumber={content.hospital.whatsappNumber} />
    </div>
  );
}
