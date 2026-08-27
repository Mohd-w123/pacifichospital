import type { Metadata } from 'next';
import './globals.css';
import { getSiteContent } from '@/lib/content-store';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = await getSiteContent();
    return {
      title: `${content.hospital.name} (${content.hospital.hindiName}) | Multi-Speciality Hospital in Sikar`,
      description: `Best hospital in Sikar for Obstetrics & Gynaecology (Dr. Anjuman Sayyad, Ex-SMS Hospital Jaipur), High Risk Pregnancy, Normal Delivery, General Medicine, Sonography & 24x7 Emergency Care.`,
      keywords: [
        'Pacific Care Hospital Sikar',
        'Dr Anjuman Sayyad Sikar',
        'Gynaecologist in Sikar',
        'Normal delivery hospital Sikar',
        'Pregnancy doctor Fatehpur Road Sikar',
        'Best hospital in Sikar Rajasthan',
        'High risk pregnancy care',
        'पेसिफ़िक केयर हॉस्पिटल सीकर'
      ],
      openGraph: {
        title: `${content.hospital.name} - Multi-Speciality Hospital in Sikar`,
        description: `Comprehensive healthcare by Dr. Anjuman Sayyad and team. OPD: 9 AM - 8 PM. 24x7 Emergency.`,
        images: ['/images/hospital-building.jpg']
      }
    };
  } catch (error) {
    return {
      title: 'Pacific Care Hospital | Sikar Rajasthan',
      description: 'Advanced Healthcare with Compassion & Excellence in Sikar.'
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Yantramanav:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-slate-900 font-sans flex flex-col min-h-screen selection:bg-teal-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
