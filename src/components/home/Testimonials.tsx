import Image from 'next/image';

import ScrollReveal from '@/components/animations/ScrollReveal';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/ui/Sectionheading';
import { TESTIMONIALS } from '@/data/Testimonials';
import { cn } from '@/lib/utils';
import type { TestimonialRating } from '@/types/testimonial';

function Stars({ rating }: { rating: TestimonialRating }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className={cn(
            'size-5',
            i < rating ? 'text-primary' : 'text-line-strong',
          )}
        >
          <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-y "
    >
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Member results"
            title={
              <span id="testimonials-heading">
                What training here actually feels like
              </span>
            }
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-10 md:mt-14">
          <ul className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <li
                key={t.id}
                className="flex flex-col gap-6 rounded-xl border border-line bg-surface-raised p-6 lg:p-8"
              >
                <Stars rating={t.rating} />

                <blockquote className="flex-1 text-base text-foreground">
                  <p>{t.message}</p>
                </blockquote>

                <footer className="flex items-center gap-4">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-line-strong">
                    <Image
                      src={t.image}
                      alt={`Portrait of ${t.name}`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Member since {t.memberSince}
                    </p>
                  </div>
                </footer>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </section>
  );
}
