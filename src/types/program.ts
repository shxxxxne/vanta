export interface Program {
  id: string;
  title: string;
  description: string;
  /** Short neutral tag shown as a Badge, e.g. level or session length */
  tag: string;
  /** Link text, e.g. "Start this program" */
  ctaLabel: string;
  /** Anchor or route the link goes to */
  ctaHref: string;
  /** Set true to show the program on the home page */
  featured?: boolean;
}