
const ADDRESS = {
  line1: '123 Galle Road', // TODO: Replace with the real street address
  area: 'Colombo 03',
  country: 'Sri Lanka',
} as const;

const FULL_ADDRESS = `${ADDRESS.line1}, ${ADDRESS.area}, ${ADDRESS.country}`;

const WHATSAPP_NUMBER = '94771234567';

export interface OpeningHoursEntry {
  label: string;

  /** 0 = Sunday ... 6 = Saturday */
  days: number[];

  /** 24-hour format: HH:MM */
  open: string;
  close: string;
}

export const OPENING_HOURS: OpeningHoursEntry[] = [
  {
    label: 'Monday to Friday',
    days: [1, 2, 3, 4, 5],
    open: '06:00',
    close: '21:00',
  },
  {
    label: 'Saturday',
    days: [6],
    open: '07:00',
    close: '18:00',
  },
  {
    label: 'Sunday',
    days: [0],
    open: '08:00',
    close: '14:00',
  },
];

export const SITE = {
  name: 'VANTA',
  tagline: 'Built Different.',

  contact: {
    phone: '+94 77 123 4567',
    phoneHref: 'tel:+94771234567',
    email: 'hello@vanta.fit',
  },

  whatsapp: {
    display: '+94 77 123 4567',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hi VANTA, I'd like to know more about training with you.",
    )}`,
  },

  address: {
    ...ADDRESS,
    full: FULL_ADDRESS,
  },

  map: {
    /** Keyless Google Maps embed */
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(
      FULL_ADDRESS,
    )}&output=embed`,

    /** Google Maps directions */
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      FULL_ADDRESS,
    )}`,
  },

  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Programs', href: '/programs' },
    { label: 'Memberships', href: '/memberships' },
    { label: 'Trainers', href: '/trainers' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;
