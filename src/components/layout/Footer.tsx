import Link from 'next/link';

import { SITE } from '@/data/Site';

const exploreLinks = SITE.navigation.filter((item) => item.label !== 'Contact');

const getStartedLinks = [
  { label: 'Book Free Trial', href: '#trial' },
  { label: 'Member Results', href: '#testimonials' },
  { label: 'Contact Us', href: '#contact' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: InstagramIcon,
  },
  {
    label: 'TikTok',
    href: '#',
    icon: TikTokIcon,
  },
  {
    label: 'Facebook',
    href: '#',
    icon: FacebookIcon,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-vanta-graphite bg-vanta-black">
      <div className="container-vanta">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] lg:gap-16 lg:py-20">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-[-0.04em] text-vanta-white transition-colors hover:text-vanta-lime"
            >
              VANTA.
            </Link>

            <p className="mt-5 font-sans text-sm leading-relaxed text-vanta-gray">
              Strength. Discipline. Transformation. A premium training facility
              in Colombo 03.
            </p>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-md border border-vanta-graphite text-vanta-gray transition-colors duration-200 hover:border-vanta-lime hover:text-vanta-lime"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <FooterColumn title="Explore">
            {exploreLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Get Started */}
          <FooterColumn title="Get Started">
            {getStartedLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title="Contact">
            <FooterLink href={SITE.contact.phoneHref}>
              {SITE.contact.phone}
            </FooterLink>

            <FooterLink href={`mailto:${SITE.contact.email}`}>
              {SITE.contact.email}
            </FooterLink>

            <FooterLink href="https://wa.me/94771234567">WhatsApp</FooterLink>
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-vanta-graphite py-6 text-xs text-vanta-gray sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 VANTA. All rights reserved.</p>

          <p>Colombo 03, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h2 className="font-display text-xs font-bold uppercase tracking-[0.15em] text-vanta-white">
        {title}
      </h2>

      <nav className="mt-5 flex flex-col items-start gap-3">{children}</nav>
    </div>
  );
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="font-sans text-sm text-vanta-gray transition-colors duration-200 hover:text-vanta-lime"
    >
      {children}
    </Link>
  );
}

/* Icons */

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M15.5 3c.2 1.8 1.2 3.2 3 3.8v2.4c-1.1-.1-2.1-.5-3-1.1v6.1c0 3.3-2.1 5.5-5.2 5.5-2.8 0-4.8-1.9-4.8-4.6 0-3 2.4-5.1 5.5-5.1.3 0 .6 0 .9.1v2.5c-.3-.1-.6-.1-.9-.1-1.5 0-2.8 1-2.8 2.5 0 1.2.9 2.2 2.2 2.2 1.5 0 2.5-1 2.5-2.9V3h2.6Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M14 8h2.5V4.2c-.4-.1-1.8-.2-3.4-.2-3.4 0-5.7 2.1-5.7 5.9v3.3H4v4.2h3.4V24h4.2v-6.6h3.5l.6-4.2h-4.1V10.2c0-1.2.3-2.2 2.4-2.2Z" />
    </svg>
  );
}
