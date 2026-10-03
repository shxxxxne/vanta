'use client';

import { useState } from 'react';
import Link from 'next/link';

import { SITE } from '@/data/Site';
import { Button } from '@/components/ui/Button';
import ButtonPress from '../animations/ButtonPress';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-nav)] border-b border-border bg-background/95 backdrop-blur-md">
      <nav
        className="container-vanta flex h-[var(--nav-height)] items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-[-0.04em] text-foreground transition-colors hover:text-primary"
          aria-label="VANTA home"
        >
          VANTA
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {SITE.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm font-medium text-vanta-white transition-colors duration-200 hover:text-lime"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-5 md:flex">
          <a
            href={SITE.contact.phoneHref}
            className="font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {SITE.contact.phone}
          </a>

<ButtonPress>
          <Link href="#contact">
            <Button>Book Free Trial</Button>
          </Link>
</ButtonPress>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ButtonPress>
          <Link href="#contact" onClick={closeMenu}>
            <Button className="px-3.5 py-2 text-xs uppercase tracking-wide">
              Free Trial
            </Button>
          </Link>
</ButtonPress>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            <span className="sr-only">
              {menuOpen ? 'Close menu' : 'Open menu'}
            </span>

            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-current transition-transform duration-200 ${
                  menuOpen ? 'translate-y-[4px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-current transition-opacity duration-200 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-current transition-transform duration-200 ${
                  menuOpen ? '-translate-y-[4px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={`border-t border-border bg-background transition-[max-height,opacity] duration-250 md:hidden ${
          menuOpen
            ? 'max-h-[32rem] opacity-100'
            : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className="container-vanta py-5">
          <div className="flex flex-col">
            {SITE.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-border py-4 font-display text-lg font-semibold uppercase tracking-tight text-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}

            <a
              href={SITE.contact.phoneHref}
              onClick={closeMenu}
              className="py-4 font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {SITE.contact.phone}
            </a>

            <Link href="#contact" onClick={closeMenu} className="mt-2">
              <Button className="w-full uppercase tracking-wide">
                Book Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
