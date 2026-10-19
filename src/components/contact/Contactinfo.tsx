import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from 'lucide-react';

import { SITE } from '@/data/Site';
import { cn } from '@/lib/utils';

interface InfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  /** Opens in a new tab */
  external?: boolean;
}

const ITEMS: InfoItem[] = [
  {
    icon: MapPin,
    label: 'Visit us',
    value: SITE.address.full,
    href: SITE.map.directionsUrl,
    external: true,
  },
  {
    icon: Phone,
    label: 'Call',
    value: SITE.contact.phone,
    href: SITE.contact.phoneHref,
  },
  {
    icon: Mail,
    label: 'Email',
    value: SITE.contact.email,
    href: `mailto:${SITE.contact.email}`,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: SITE.whatsapp.display,
    href: SITE.whatsapp.href,
    external: true,
  },
];

interface ContactInfoProps {
  className?: string;
}

export default function ContactInfo({ className }: ContactInfoProps) {
  return (
    <div className={className}>
      <h2 className="font-display text-xl font-bold text-foreground">
        Get in touch
      </h2>

      <ul className="mt-5 flex flex-col gap-3">
        {ITEMS.map(({ icon: Icon, label, value, href, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={cn(
                'group flex items-center gap-4 rounded-xl border border-line bg-surface-raised p-4',
                'transition-colors duration-(--duration-base) hover:border-primary/60 sm:p-5',
              )}
            >
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-card text-lime"
              >
                <Icon className="size-6" strokeWidth={1.75} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm text-muted-foreground">
                  {label}
                </span>
                <span className="block break-words text-base font-medium text-foreground">
                  {value}
                </span>
              </span>

              {external && (
                <>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
