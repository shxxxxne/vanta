import { MessageCircle, Phone } from 'lucide-react';

import HeroReveal from '@/components/animations/HeroReveal';
import ButtonPress from '@/components/animations/ButtonPress';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import SectionHeading from '@/components/ui/Sectionheading';
import { SITE } from '@/data/Site';

export default function ContactHero() {
  return (
    <section
      id="contact-hero"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--vanta-lime)_14%,transparent),transparent_60%)] pb-12 pt-[calc(var(--nav-height)+3rem)] md:pb-16 md:pt-[calc(var(--nav-height)+5rem)]"
    >
      <Container>
        <HeroReveal>
          <SectionHeading
            as="h1"
            eyebrow="Contact · Colombo 03"
            title={
              <>
                Questions?
                <br />
                Let's talk training
              </>
            }
            description="Ask about programs, memberships or your first session. Call, message us on WhatsApp, or send a note and a coach will get back to you."
          />
        </HeroReveal>

        <HeroReveal
          delay={0.15}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <ButtonPress className="w-full sm:w-auto">
            <Button asChild size="lg" className="w-full gap-2 sm:w-auto">
              <a href={SITE.contact.phoneHref}>
                <Phone className="size-4" aria-hidden="true" />
                Call {SITE.contact.phone}
              </a>
            </Button>
          </ButtonPress>

          <ButtonPress className="w-full sm:w-auto">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full gap-2 sm:w-auto"
            >
              <a
                href={SITE.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Message on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </ButtonPress>
        </HeroReveal>
      </Container>
    </section>
  );
}