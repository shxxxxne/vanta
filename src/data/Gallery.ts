import type { GalleryImage } from '@/types/gallery';
import strengthZone from '@/images/gallery/strength-zone.jpg';
import freeWeightFloor from '@/images/gallery/free-weight-floor.jpg';
import functionalRig from '@/images/gallery/functional-rig.jpg';
import recoveryRoom from '@/images/gallery/recovery-room.jpg';
import ptStudio from '@/images/gallery/pt-studio.jpg';
import communitySessions from '@/images/gallery/community-sessions.jpg';

/**
 * Exactly 6 items: GalleryPreview maps each one to a slot in its mosaic.
 * Order matters (first = largest tile). Drop matching photos into
 * public/images/gallery/.
 */
export const GALLERY: GalleryImage[] = [
  {
    id: 'strength-zone',
    image: strengthZone,
    title: 'Strength Zone',
    alt: 'Racks and platforms in the VANTA strength zone',
  },
  {
    id: 'free-weight-floor',
    image: freeWeightFloor,
    title: 'Free Weight Floor',
    alt: 'Dumbbell racks and benches on the free weight floor',
  },
  {
    id: 'functional-rig',
    image: functionalRig,
    title: 'Functional Rig',
    alt: 'Pull-up rig, rings and sleds in the functional area',
  },
  {
    id: 'recovery-room',
    image: recoveryRoom,
    title: 'Recovery Room',
    alt: 'Recovery room with mobility and stretching space',
  },
  {
    id: 'pt-studio',
    image: ptStudio,
    title: 'PT Studio',
    alt: 'Private personal training studio',
  },
  {
    id: 'community-sessions',
    image: communitySessions,
    title: 'Community Sessions',
    alt: 'Members training together in a group session',
  },
];
