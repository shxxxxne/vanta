import type { StaticImageData } from 'next/image';

export interface Trainer {
  /** Unique key, also usable for a future /trainers/[id] profile page */
  id: string;
  name: string;
  /** Total years coaching or training professionally */
  yearsOfExperience: number;
  /** Photo: a path under /public or a statically imported image */
  image: string | StaticImageData;
  /** Alt text for the photo */
  imageAlt: string;
  /** What they train, e.g. "Strength & Powerlifting" */
  title: string;
  description: string;
}
