import type { Program } from '@/types/program';

export const PROGRAMS: Program[] = [
  {
    id: 'strength-foundations',
    title: 'Strength Foundations',
    description:
      'Learn the big lifts with coach-led technique work and a progressive plan that adds weight to the bar every week.',
    tag: 'All levels',
    ctaLabel: 'Start this program',
    ctaHref: '#trial',
  },
  {
    id: 'hypertrophy-lab',
    title: 'Hypertrophy Lab',
    description:
      'Structured volume, tracked progress and form checks, built to add lean muscle in a focused 12-week block.',
    tag: '12 weeks',
    ctaLabel: 'Book a trial session',
    ctaHref: '#trial',
  },
  {
    id: 'functional-conditioning',
    title: 'Functional Conditioning',
    description:
      'High-output circuits on the rig that build stamina, mobility and power. Small groups, scaled to your level.',
    tag: 'Small group',
    ctaLabel: 'Join a session',
    ctaHref: '#trial',
  },
  {
    id: 'performance-strength',
    title: 'Performance Strength',
    description:
      'Train for greater power, speed, and athletic performance with structured strength work and explosive movement patterns.',
    tag: 'Intermediate',
    ctaLabel: 'Explore program',
    ctaHref: '#trial',
  },
  {
    id: 'personal-training',
    title: 'Personal Training',
    description:
      'Get one-to-one coaching with a personalized training plan built around your goals, ability, and progress.',
    tag: '1-on-1',
    ctaLabel: 'Meet a coach',
    ctaHref: '#trial',
  },
  {
    id: 'conditioning-bootcamp',
    title: 'Conditioning Bootcamp',
    description:
      'Push your fitness with demanding group sessions combining strength, conditioning, and athletic movement.',
    tag: '45 minutes',
    ctaLabel: 'Join a session',
    ctaHref: '#trial',
  },
  {
    id: 'beginner-rebuild',
    title: 'Beginner Rebuild',
    description:
      'Start training with confidence through simple movements, expert coaching, and a progressive plan built for beginners.',
    tag: 'Beginner',
    ctaLabel: 'Start training',
    ctaHref: '#trial',
  },
  // Add the remaining programs here (up to 6 for the Programs page).
  // They won't appear on the home page unless `featured: true`.
];
