import type { Trainer } from '@/types/trainer';
import kavinduPerera from '@/images/trainers/kavindu-perera.jpg';
import dinithiSilva from '@/images/trainers/dinithi-silva.jpg';
import ashanFernando from '@/images/trainers/ashan-fernando.jpg';

// Images live in /public/images/trainers/. Replace years of experience with real values.
export const TRAINERS: Trainer[] = [
  {
    id: 'kavindu-perera',
    name: 'Kavindu Perera',
    yearsOfExperience: 10,
    image: kavinduPerera,
    imageAlt: 'Kavindu Perera, strength and powerlifting coach at VANTA',
    title: 'Strength & Powerlifting',
    description:
      'Former national level powerlifter specializing in barbell technique and progressive strength programming.',
  },
  {
    id: 'dinithi-silva',
    name: 'Dinithi Silva',
    yearsOfExperience: 8,
    image: dinithiSilva,
    imageAlt: 'Dinithi Silva, fat loss and conditioning coach at VANTA',
    title: 'Fat Loss & Conditioning',
    description:
      'Builds structured conditioning plans that pair with nutrition coaching for sustainable results.',
  },
  {
    id: 'ashan-fernando',
    name: 'Ashan Fernando',
    yearsOfExperience: 7,
    image: ashanFernando,
    imageAlt: 'Ashan Fernando, functional training and mobility coach at VANTA',
    title: 'Functional & Mobility',
    description:
      'Focuses on movement quality first, helping members train pain free for the long term.',
  },
];
