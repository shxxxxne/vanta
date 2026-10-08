import type { StaticImageData } from 'next/image';

export type TestimonialRating = 1 | 2 | 3 | 4 | 5;

export interface Testimonial {
  id: string;
  /** Star rating, 1 to 5 */
  rating: TestimonialRating;
  /** The member's review message */
  message: string;
  /** Member's display name, e.g. "Ruwan D." */
  name: string;
  /** Path under /public, e.g. "/images/testimonials/ruwan.jpg" */
  image: string | StaticImageData;
  /** Year the member joined */
  memberSince: number;
}
