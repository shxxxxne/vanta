import Link from 'next/link';

import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ButtonPress from '@/components/animations/ButtonPress';
import MovingGlow from '@/components/animations/Movingglow';

const WHATSAPP_HREF = 'https://wa.me/94771234567';

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-title"
      className="section-y relative overflow-hidden border-t border-line"
    >
      <MovingGlow />

      <Container className="relative">
        {/* One reveal for the whole band (blueprint: per section, not per card) */}
        <ScrollReveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center md:gap-8">
          <h2
            id="final-cta-title"
            className="font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Stop training around
            <br />
            your goals. Start training
            <br />
            toward them.
          </h2>

          <p className="max-w-[48ch] text-base text-muted-foreground md:text-lg">
            Your first session is free. Bring your goal, we&apos;ll bring the
            plan.
          </p>

          {/* Mobile: stacked, full width. sm+: side by side */}
          <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row sm:gap-4">
            <ButtonPress className="w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="#trial">Book Free Trial</Link>
              </Button>
            </ButtonPress>

            <ButtonPress className="w-full sm:w-auto">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </ButtonPress>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}