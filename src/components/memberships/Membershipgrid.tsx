import Container from '@/components/layout/Container';
import ScrollReveal from '@/components/animations/ScrollReveal';
import MembershipCard from '@/components/memberships/Membershipcard';
import { getMembershipsByIds } from '@/data/Memberships';
import type { MembershipOrder } from '@/types/membership';

interface MembershipGridProps {
  /** Exactly 3 plan ids in display order: 1st, 2nd (most popular), 3rd */
  planIds?: MembershipOrder;
}

const DEFAULT_ORDER: MembershipOrder = ['starter', 'performance', 'elite'];

/** The middle card (index 1) is always the most popular one. */
const POPULAR_INDEX = 1;

export default function MembershipGrid({
  planIds = DEFAULT_ORDER,
}: MembershipGridProps) {
  const plans = getMembershipsByIds(planIds);

  return (
    <section
      id="plans"
      aria-label="Membership plans"
      className="section-y section-alt pt-10 md:pt-12"
    >
      <Container>
        {/* Mobile: 1 column (popular plan first so it isn't buried).
            Desktop: 3 columns in the original order. */}
        <ul className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan, index) => {
            const popular = index === POPULAR_INDEX;

            return (
              <li
                key={plan.id}
                className={popular ? 'order-first lg:order-none' : undefined}
              >
                <ScrollReveal delay={index * 0.12} className="h-full">
                  <MembershipCard plan={plan} popular={popular} />
                </ScrollReveal>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          All prices are in LKR per month. Not sure which plan fits? Book a free
          trial and a coach will help you choose.
        </p>
      </Container>
    </section>
  );
}
