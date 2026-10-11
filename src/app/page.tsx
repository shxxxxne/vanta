import FeaturedMemberships from '@/components/home/FeaturedMemberships';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import FeaturedTrainers from '@/components/home/FeaturedTrainers';
import GalleryPreview from '@/components/home/Gallerypreview';
import Hero from '@/components/home/Hero';
import WhyVanta from '@/components/home/WhyVanta';
import Testimonials from '@/components/home/Testimonials';
import TrialCTA from '@/components/home/TrialCTA';
import FinalCTA from '@/components/home/Finalcta';

export default function page() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <WhyVanta />
      <FeaturedPrograms />
      <FeaturedMemberships />
      <FeaturedTrainers />
      <GalleryPreview />
      <Testimonials />
      <TrialCTA />
      <FinalCTA />
    </main>
  );
}
