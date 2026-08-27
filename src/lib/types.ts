export interface HospitalInfo {
  name: string;
  hindiName: string;
  tagline: string;
  logoUrl: string;
  footerLogoUrl?: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  phoneNumbers: string[];
  whatsappNumber: string;
  email: string;
  opdTimings: string;
  opdTimingsHindi: string;
  emergencyPhone: string;
  googleMapUrl: string;
  googleMapEmbedUrl?: string;
  footerAboutText?: string;
  footerCopyrightText?: string;
  noticeBanner: {
    active: boolean;
    text: string;
    textHindi: string;
    linkUrl?: string;
  };
}

export interface Doctor {
  id: string;
  name: string;
  nameHindi: string;
  designation: string;
  degrees: string;
  specialties: string[];
  specialtiesHindi?: string[];
  experience: string;
  opdTimings: string;
  photoUrl: string;
  bio: string;
  availableDays: string[];
  featured: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleHindi: string;
  shortDesc: string;
  fullDesc: string;
  category: 'clinical' | 'diagnostic' | 'facility' | 'surgery';
  icon: string;
  features: string[];
  imageUrl: string;
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'OT' | 'IPD' | 'Waiting Area' | 'Ward' | 'Lab' | 'Pharma' | 'Indoor' | 'Outdoor' | 'Canteen' | 'Lift' | 'All';
  imageUrl: string;
  description: string;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  metaDescription: string;
  published: boolean;
  lastUpdated: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  titleHindi: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

export interface SubNavItem {
  id: string;
  name: string;
  href: string;
}

export interface NavItem {
  id: string;
  name: string;
  href: string;
  enabled: boolean;
  order: number;
  subItems?: SubNavItem[];
}

export interface SiteContent {
  hospital: HospitalInfo;
  heroSlides: HeroSlide[];
  doctors: Doctor[];
  services: ServiceItem[];
  gallery: GalleryItem[];
  customPages: CustomPage[];
  navigation?: NavItem[];
  specialCampaigns: {
    title: string;
    titleHindi: string;
    description: string;
    descriptionHindi: string;
    dates: string;
    active: boolean;
  }[];
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  patientAge?: string;
  patientGender?: 'Male' | 'Female' | 'Other';
  department: string;
  doctorId?: string;
  doctorName?: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}
