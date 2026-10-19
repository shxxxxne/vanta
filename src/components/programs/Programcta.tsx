import Link from 'next/link';

import ButtonPress from '@/components/animations/ButtonPress';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

interface ProgramCTAProps {
  trialHref?: string;
  whatsappHref?: string;
}

export default function ProgramCTA({
  trialHref = '/#trial',
  whatsappHref = 'https://wa.me/94771234567',
}: ProgramCTAProps) {
  return (
    <section
      aria-labelledby="program-cta-title"
      className="section-y border-t border-line"
    >
      <Container>
        <ScrollReveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2
            id="program-cta-title"
            className="font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            Try a session before you commit
          </h2>

          <p className="max-w-[60ch] text-base text-muted-foreground md:text-lg">
            Book a free trial, meet your coach and train on the VANTA floor.
            <br />
            No joining fee, no pressure.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <ButtonPress className="w-full sm:w-auto">
              <Button asChild size="lg" className="w-full px-8 sm:w-auto">
                <Link href={trialHref}>Book a Free Trial</Link>
              </Button>
            </ButtonPress>

            <ButtonPress className="w-full sm:w-auto">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full px-8 sm:w-auto"
              >
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message on WhatsApp
                </a>
              </Button>
            </ButtonPress>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
