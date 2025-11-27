export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum UserType {
  EMPLOYER = 'employer',
  WORKER = 'worker',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}