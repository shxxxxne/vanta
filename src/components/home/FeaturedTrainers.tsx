import Link from 'next/link';

import Container from '@/components/layout/Container';
import SectionHeading from '@/components/ui/Sectionheading';
import { Button } from '@/components/ui/Button';
import ScrollReveal from '@/components/animations/ScrollReveal';
import HoverLift from '@/components/animations/HoverLift';
import ImageZoom from '@/components/animations/ImageZoom';
import ButtonPress from '@/components/animations/ButtonPress';
import { TRAINERS } from '@/data/Trainers';
import type { Trainer } from '@/types/trainer';

export default function FeaturedTrainers() {
  return (
    <section id="trainers" className="section-y">
      <Container>
        {/* One reveal for the heading */}
        <ScrollReveal>
          <SectionHeading
            eyebrow="Coaching staff"
            title="Trained by people who compete themselves."
            description="Every coach is certified and coaches their own training the same way they coach yours."
          />
        </ScrollReveal>

        {/* Mobile: 1 column. Desktop: 3 columns. */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 lg:grid-cols-3 lg:gap-8">
          {TRAINERS.map((trainer, index) => (
            <ScrollReveal
              key={trainer.id}
              delay={index * 0.12}
              className="h-full"
            >
              <TrainerCard trainer={trainer} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TrainerCard({ trainer }: { trainer: Trainer }) {
  const firstName = trainer.name.split(' ')[0];

  return (
    <HoverLift className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors duration-200 hover:border-line-strong">
        {/* Photo */}
        <ImageZoom
          src={trainer.image}
          alt={trainer.imageAlt}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 80vw, 100vw"
          className="relative aspect-[4/5] w-full"
        />

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-sm font-medium text-primary">
            {trainer.yearsOfExperience} years experience
          </p>

          <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
            {trainer.name}
          </h3>

          <p className="mt-1 text-base font-medium text-foreground/80">
            {trainer.title}
          </p>

          <p className="mt-3 max-w-[60ch] text-sm text-muted-foreground sm:text-base">
            {trainer.description}
          </p>

          {/* mt-auto keeps buttons aligned across cards of different text lengths */}
          <ButtonPress className="mt-6 pt-1 lg:mt-auto">
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="#trial">Train with {firstName}</Link>
            </Button>
          </ButtonPress>
        </div>
      </article>
    </HoverLift>
  );
}
