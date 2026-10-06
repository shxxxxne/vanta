import type { Membership, MembershipId } from '@/types/membership';

export const MEMBERSHIPS_BY_ID: Record<MembershipId, Membership> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    duration: 'Month-to-month',
    price: 8500,
    features: [
      'Full gym floor access',
      'Standard hours access',
      'App-based progress tracking',
      'Free onboarding session',
    ],
    ctaLabel: 'Get started',
  },
  performance: {
    id: 'performance',
    name: 'Performance',
    duration: '3-month commitment',
    price: 13500,
    features: [
      'Everything in Starter',
      'Unlimited group classes',
      '1 personal training session / month',
      'Monthly nutrition check-in',
    ],
    ctaLabel: 'Get started',
  },
  elite: {
    id: 'elite',
    name: 'Elite',
    duration: '6-month commitment',
    price: 21000,
    features: [
      'Everything in Performance',
      'Unlimited personal training',
      'Priority class & PT booking',
      '24/7 premium hours access',
    ],
    ctaLabel: 'Get started',
  },
};

/** Returns plans in the exact order of the ids passed in. */
export function getMembershipsByIds(
  ids: readonly MembershipId[],
): Membership[] {
  return ids.map((id) => MEMBERSHIPS_BY_ID[id]);
}
