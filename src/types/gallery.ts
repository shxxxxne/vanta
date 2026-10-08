import type { StaticImageData } from 'next/image';

export interface GalleryImage {
  id: string;
  /** Path inside /public, e.g. /images/gallery/strength-zone.jpg */
  image: string | StaticImageData;
  title: string;
  alt: string;
}
