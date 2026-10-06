import { Activity, Dumbbell, Heart, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import ScrollReveal from '@/components/animations/ScrollReveal';
import HoverLift from '@/components/animations/HoverLift';
import ImageZoom from '@/components/animations/ImageZoom';
import Container from '@/components/layout/Container';
import SectionHeading from '@/components/ui/Sectionheading';
import CoachTrainingimg from '@/images/gallery/members-training-coach.jpg';

interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    icon: Activity,
    title: 'Programming, not guesswork',
    description:
      'Every member trains on a plan built around their goal, reviewed and adjusted week to week.',
  },
  {
    icon: Users,
    title: 'Coaches on the floor',
    description:
      'Certified trainers correcting form and pushing intensity in real time not just checking you in.',
  },
  {
    icon: Dumbbell,
    title: 'Equipment built for output',
    description:
      'Competition-grade barbells, plates, and rigs designed for serious loading, not entry level basics.',
  },
  {
    icon: Heart,
    title: 'A floor that holds you accountable',
    description:
      "You're training next to people who show up with intent that standard is contagious.",
  },
];

export default function WhyVanta() {
  return (
    <section id="why" className="section-y section-alt">
      <Container>
        <ScrollReveal>
          <SectionHeading
            as="h2"
            eyebrow="Why VANTA"
            title={
              <>
                Most gyms sell access.
                <br />
                We build outcomes.
              </>
            }
            description="A neighborhood gym gives you equipment and a door code. VANTA gives you a plan, a coach, and a floor that expects more from you."
          />

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Reasons */}
            <ul className="order-2 flex flex-col gap-6 lg:order-1">
              {reasons.map(
                ({ icon: Icon, title, description }, index) => (
                  <ScrollReveal
                    key={title}
                    delay={0.1 + index * 0.08}
                  >
                    <HoverLift>
                      <li className="flex items-start gap-4">
                        <span
                          aria-hidden="true"
                          className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-surface-raised text-lime"
                        >
                          <Icon
                            className="size-6"
                            strokeWidth={1.75}
                          />
                        </span>

                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {title}
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                            {description}
                          </p>
                        </div>
                      </li>
                    </HoverLift>
                  </ScrollReveal>
                ),
              )}
            </ul>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line bg-surface-raised sm:aspect-[4/3] lg:aspect-[4/5]">
                <ImageZoom
                  src={CoachTrainingimg}
                  alt="Members training under a coach on the VANTA strength floor"
                  className="absolute inset-0 h-full w-full"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"
                />

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
                  <p className="font-display text-lg font-bold text-foreground sm:text-xl">
                    Colombo 03
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Private strength &amp; performance facility
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}