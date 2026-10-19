import type { Metadata } from 'next';

import ScrollReveal from '@/components/animations/ScrollReveal';
import ContactForm from '@/components/contact/Contactform';
import ContactHero from '@/components/contact/Contacthero';
import ContactInfo from '@/components/contact/Contactinfo';
import LocationMap from '@/components/contact/Locationmap';
import OpeningHours from '@/components/contact/Openinghours';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/ui/Sectionheading';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Call, WhatsApp or message VANTA in Colombo 03. Opening hours, directions and a contact form.',
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      {/* Details + form (one reveal for the whole section) */}
      <section
        aria-label="Contact details and message form"
        className="pb-[var(--section-y)]"
      >
        <Container>
          <ScrollReveal className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div className="flex flex-col gap-8">
              <ContactInfo />
              <OpeningHours />
            </div>
            <ContactForm />
          </ScrollReveal>
        </Container>
      </section>

      {/* Map */}
      <section
        id="location"
        aria-labelledby="location-title"
        className="section-y section-alt"
      >
        <Container>
          <ScrollReveal className="flex flex-col gap-10 md:gap-14">
            <SectionHeading
              eyebrow="Location"
              title={<span id="location-title">Find VANTA in Colombo 03</span>}
              description="Walk-ins are welcome. Book a free trial first and a coach will meet you at the door."
            />
            <LocationMap />
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
