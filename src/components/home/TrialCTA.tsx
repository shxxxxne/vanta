import { Check } from 'lucide-react';

import ScrollReveal from '@/components/animations/ScrollReveal';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/ui/Sectionheading';
import ContactForm from '@/components/contact/Contactform';

const reassurance = [
  'One free session, no obligation',
  'Guided by a certified coach',
  'Confirmed by phone or WhatsApp within 24 hours',
] as const;

export default function TrialCTA() {
  return (
    <section id="trial" className="section-y section-alt">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Free trial"
            title={
              <>
                See if VANTA is right
                <br />
                for you on us
              </>
            }
            description="Book a free introductory session. You'll train on the floor, meet a coach, and leave with a clear plan, no pressure to sign up."
          />

          <div className="mt-10 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-start lg:gap-16">
            {/* Flex item 1: reassurance */}
            <ul className="flex flex-col gap-4 lg:flex-1">
              {reassurance.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    aria-hidden
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-foreground sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Flex item 2: form */}
            <div className="rounded-2xl border border-line bg-surface-raised p-5 sm:p-8 lg:flex-1">
              <ContactForm />
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
