import type { Testimonial } from '@/types/testimonial';
import RuwanImage from '@/images/testimonials/ruwan.jpg';
import NadiaImage from '@/images/testimonials/nadia.jpg';
import TharinduImage from '@/images/testimonials/tharindu.jpg';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ruwan-d',
    rating: 5,
    message:
      "I'd tried three other gyms in Colombo before this. VANTA is the first place where the coaching actually matched the price.",
    name: 'Ruwan D.',
    image: RuwanImage,
    memberSince: 2023,
  },
  {
    id: 'nadia-f',
    rating: 4,
    message:
      'Lost 9kg in four months on the weight loss program without feeling like I was starving myself. The check-ins kept me honest.',
    name: 'Nadia F.',
    image: NadiaImage,
    memberSince: 2024,
  },
  {
    id: 'tharindu-w',
    rating: 5,
    message:
      "Started as a complete beginner. A year later I'm deadlifting more than I thought was possible, and I actually enjoy training now.",
    name: 'Tharindu W.',
    image: TharinduImage,
    memberSince: 2024,
  },
];
