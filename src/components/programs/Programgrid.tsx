import Container from '@/components/layout/Container';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SectionHeading from '@/components/ui/Sectionheading';
import { PROGRAMS } from '@/data/Programs';
import type { Program } from '@/types/program';

import ProgramCard from './Programcard';

interface ProgramGridProps {
  /** Defaults to every program in data/Programs.ts */
  programs?: Program[];
}

export default function ProgramGrid({ programs = PROGRAMS }: ProgramGridProps) {
  return (
    <section
      id="program-list"
      aria-labelledby="program-list-title"
      className="section-y section-alt"
    >
      <Container>
        {/* One reveal for the whole section (blueprint: per section, not per card) */}
        <ScrollReveal className="flex flex-col gap-10 md:gap-14">
          <SectionHeading
            title={<span id="program-list-title">All programs</span>}
            description="Not sure where to start? Book a free trial and a coach will point you to the right one."
          />

          {/* Mobile: 1 column · Tablet: 2 columns · Desktop: 3 columns */}
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {programs.map((program) => (
              <li key={program.id} className="flex">
                <ProgramCard program={program} />
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </section>
  );
}