export type MembershipId = 'starter' | 'performance' | 'elite';

/** Always exactly 3 plan ids: [1st, 2nd (most popular), 3rd] */
export type MembershipOrder = [MembershipId, MembershipId, MembershipId];

/** Exactly 4 features per plan. */
export type MembershipFeatures = [string, string, string, string];

export interface Membership {
  id: MembershipId;
  name: string;
  /** e.g. "Month-to-month", "3-month commitment" */
  duration: string;
  /** Monthly price in LKR (number, formatted in the UI) */
  price: number;
  features: MembershipFeatures;
  ctaLabel: string;
}
