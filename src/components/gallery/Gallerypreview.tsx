import Container from '@/components/layout/Container';
import SectionHeading from '@/components/ui/Sectionheading';
import ScrollReveal from '@/components/animations/ScrollReveal';
import GalleryMosaic from '@/components/gallery/Gallerymosaic';

export default function GalleryPreview() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="section-y section-alt relative overflow-hidden"
    >
      {/* Ambient radial glow so the section never reads as a flat block */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[min(60rem,140%)] -translate-x-1/2 bg-radial-[closest-side] from-lime/10 to-transparent"
      />

      <Container className="relative">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Inside VANTA"
            title={
              <span id="gallery-heading">
                The floor, the equipment, the people.
              </span>
            }
            description="A look at the space before you walk in."
          />

          <GalleryMosaic className="mt-10 md:mt-14" />
        </ScrollReveal>
      </Container>
    </section>
  );
}