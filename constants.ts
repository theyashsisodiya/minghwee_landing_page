import { Testimonial, FaqItem, NavItem } from './types';
import { ShieldCheck, Heart, Users, Star, Clock, CheckCircle } from 'lucide-react';

export const NAV_LINKS: NavItem[] = [
  { label: 'For Employers', href: '#employers' },
  { label: 'For Helpers', href: '#helpers' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Stories', href: '#stories' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "MingHwee helped me find not just an employer, but a family who truly values my work. I feel respected and supported every day.",
    author: "Maria Santos",
    role: "Domestic Helper",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 2,
    quote: "The peace of mind knowing our helper was thoroughly vetted made all the difference. Our family feels complete now.",
    author: "The Tan Family",
    role: "Employers",
    image: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 3,
    quote: "Professional, transparent, and kind. The training resources provided helped me secure a better salary.",
    author: "Siti Rahma",
    role: "Caregiver",
    image: "https://images.unsplash.com/photo-1554721205-f9e498c4d2fb?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "How long does the hiring process take?",
    answer: "Typically, the process takes between 2 to 4 weeks. This includes interview scheduling, background checks, and finalizing documentation to ensure a safe match."
  },
  {
    question: "What kind of background checks do you perform?",
    answer: "We verify employment history, conduct criminal background checks, and validate all certifications to ensure safety and peace of mind for both parties."
  },
  {
    question: "Are there fees for helpers?",
    answer: "No. We believe in fair employment. We do not charge placement fees to domestic workers. Our revenue comes from employer service fees."
  }
];
