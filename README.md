# VANTA. Performance Gym Website

Conversion-focused marketing site for **VANTA**, a private strength and performance gym in **Colombo 03, Sri Lanka**. The site's one job is to get visitors to **book a free trial**, with WhatsApp, call and directions as fallbacks at every step.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui conventions** (Radix + `cva` + `cn`), **next/font** and **Motion**. Mobile-first and responsive throughout.

---

## Table of contents

1. [Tech stack](#1-tech-stack)
2. [Project status](#2-project-status)
3. [Getting started](#3-getting-started)
4. [Scripts](#4-scripts)
5. [Environment variables](#5-environment-variables)
6. [Project structure](#6-project-structure)
7. [Architecture decisions](#7-architecture-decisions)
8. [Page composition and sections](#8-page-composition-and-sections)
9. [Design system](#9-design-system)
10. [Component reference](#10-component-reference)
11. [Content and data layer](#11-content-and-data-layer)
12. [Trial booking form](#12-trial-booking-form)
13. [Motion rules](#13-motion-rules)
14. [Accessibility](#14-accessibility)
15. [SEO and structured data](#15-seo-and-structured-data)
16. [Performance](#16-performance)
17. [Coding conventions](#17-coding-conventions)
18. [QA checklist](#18-qa-checklist)
19. [Known issues and fix backlog](#19-known-issues-and-fix-backlog)
20. [Pre-launch content checklist](#20-pre-launch-content-checklist)
21. [Deployment](#21-deployment)
22. [Roadmap](#22-roadmap)

---

## 1. Tech stack

| Area          | Choice                             | Notes                                                                                                           |
| ------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Framework     | Next.js (App Router)               | Server Components by default; `'use client'` only where needed                                                  |
| Language      | TypeScript (strict)                | Typed data files (`src/types`)                                                                                  |
| Styling       | Tailwind CSS **v4.1+**             | Tokens via `@theme inline` in `globals.css`. `bg-radial-[...]` needs 4.1+                                       |
| UI primitives | shadcn/ui pattern                  | `class-variance-authority`, `clsx` + `tailwind-merge` (`cn`), `@radix-ui/react-slot`, `@radix-ui/react-popover` |
| Fonts         | `next/font/google`                 | Space Grotesk (display), Inter (body). Self-hosted at build time                                                |
| Animation     | `motion` (`motion/react`)          | Limited, rules in [section 13](#13-motion-rules)                                                                |
| Icons         | `lucide-react` + inline SVG        | Decorative icons are `aria-hidden`                                                                              |
| Date picker   | `react-day-picker` + Radix Popover | Branded, no native blue                                                                                         |
| Linting       | ESLint (`eslint.config.mjs`)       | Plus `tsc --noEmit`                                                                                             |

---

## 2. Project status

| Area                                                                                  | State                                                                         |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Design tokens, layout, Button/Badge/Input/DatePicker/SectionHeading                   | Done (with fixes pending, see [section 19](#19-known-issues-and-fix-backlog)) |
| Home sections: Hero, WhyVanta, Programs, Memberships, Trainers, Gallery, Testimonials | Built                                                                         |
| `page.tsx` composition                                                                | **Pending** (placeholder)                                                     |
| Trial form (`#trial`)                                                                 | **Pending**                                                                   |
| Contact section (`#contact`) and Final CTA                                            | **Pending**                                                                   |
| Mobile bottom bar (Call / WhatsApp / Trial)                                           | **Pending**                                                                   |
| SEO metadata, JSON-LD, sitemap, robots                                                | **Pending**                                                                   |
| Real content (address, hours, photos, testimonials)                                   | **Pending**, placeholders in use                                              |

> **Architecture decision (recommended, confirm before building):** ship as a **single scrolling page with anchor navigation**, as the blueprint specifies. The `/programs`, `/memberships`, `/trainers` and `/contact` routes from the original file tree are deferred (see [Roadmap](#22-roadmap)).

---

## 3. Getting started

### Prerequisites

- Node.js **20.9+** (LTS recommended)
- npm, pnpm or yarn (examples use npm)
- Git

### Install and run

```bash
git clone <your-repo-url> vanta
cd vanta
npm install
cp .env.example .env.local   # then fill in values (see section 5)
npm run dev
```

Open <http://localhost:3000>.

### Optional: initialise shadcn/ui

The project follows shadcn conventions but hand-rolls Button, Input and Badge. To add official components (Select, Textarea, etc.):

```bash
npx shadcn@latest init
npx shadcn@latest add select textarea
```

Keep the VANTA tokens in `globals.css`. Do not let the CLI overwrite them. Review the diff before accepting.

---

## 4. Scripts

| Command            | Purpose                    |
| ------------------ | -------------------------- |
| `npm run dev`      | Start dev server           |
| `npm run build`    | Production build           |
| `npm run start`    | Serve the production build |
| `npm run lint`     | ESLint                     |
| `npx tsc --noEmit` | Type check                 |

Recommended pre-commit / CI gate: `lint` + `tsc --noEmit` + `build`.

---

## 5. Environment variables

Create `.env.local` (never commit it) and keep an `.env.example` in the repo.

```bash
# Public
NEXT_PUBLIC_SITE_URL=https://vanta.fit

# Trial form delivery (if using Resend)
RESEND_API_KEY=
TRIAL_TO_EMAIL=hello@vanta.fit
TRIAL_FROM_EMAIL="VANTA <noreply@vanta.fit>"
```

> Lead destination is an open decision: **email via Resend** (simplest), Google Sheet/Airtable, or WhatsApp notification. Variables above assume Resend.

---

## 6. Project structure

The project uses a `src/` directory and the `@/*` alias (`@/` maps to `src/`).

```
vanta/
├── public/
│   ├── icons/
│   ├── logo/
│   └── og.jpg                         # 1200x630 social share image
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Fonts, metadata, Navbar, Footer, MobileBar, MotionProvider
│   │   ├── page.tsx                   # Single-page composition (HomePage)
│   │   ├── globals.css                # Tokens, theme mapping, base styles
│   │   ├── actions/
│   │   │   └── trial.ts               # Server action: validate + deliver lead
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── components/
│   │   ├── animations/
│   │   │   ├── MotionProvider.tsx     # <MotionConfig reducedMotion="user">
│   │   │   ├── HeroReveal.tsx         # One-time hero load-in
│   │   │   ├── ScrollReveal.tsx       # One reveal per section
│   │   │   ├── HoverLift.tsx          # Card hover (y: -8)
│   │   │   ├── ButtonPress.tsx        # Button hover/tap scale
│   │   │   └── ImageZoom.tsx          # Image hover zoom
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileBar.tsx          # Call / WhatsApp / Book Free Trial (mobile only)
│   │   │   ├── Logo.tsx               # "VANTA" + lime dot, shared by Navbar and Footer
│   │   │   └── Container.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── WhyVanta.tsx
│   │   │   ├── FeaturedPrograms.tsx
│   │   │   ├── FeaturedMemberships.tsx
│   │   │   ├── FeaturedTrainers.tsx
│   │   │   ├── GalleryPreview.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── TrialSection.tsx       # Reassurance copy + TrialForm
│   │   │   ├── ContactSection.tsx     # Info, hours, map
│   │   │   └── FinalCTA.tsx
│   │   └── ui/
│   │       ├── Button.tsx             # cva + cn + asChild
│   │       ├── Badge.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx             # Native select styled with inputStyles
│   │       ├── DatePicker.tsx
│   │       └── SectionHeading.tsx
│   │
│   ├── data/                          # All editable content lives here
│   │   ├── site.ts                    # Business info, nav, hours, socials
│   │   ├── programs.ts
│   │   ├── memberships.ts
│   │   ├── trainers.ts
│   │   ├── testimonials.ts
│   │   ├── gallery.ts
│   │   └── trial.ts                   # Goals + time slots
│   │
│   ├── images/                        # Statically imported (auto width/height + blur)
│   │   ├── gallery/
│   │   ├── trainers/
│   │   └── testimonials/
│   │
│   ├── lib/
│   │   ├── utils.ts                   # cn()
│   │   └── validations.ts             # isNotEmpty, isEmail, isPhone, todayISO, isTodayOrFuture
│   │
│   └── types/
│       ├── program.ts
│       ├── membership.ts
│       ├── trainer.ts
│       ├── testimonial.ts
│       └── gallery.ts
│
├── components.json                    # Created by `shadcn init` (optional)
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── package.json
└── README.md
```

**File-name casing:** use the exact casing shown above (`SectionHeading.tsx`, `GalleryPreview.tsx`, `DatePicker.tsx`, lowercase `data/*.ts`). Case-only mismatches pass on macOS/Windows and **fail on Linux hosts such as Vercel**. See [section 19](#19-known-issues-and-fix-backlog) for the safe rename procedure.

---

## 7. Architecture decisions

- **Single page, anchor navigation.** Keeps "Book Free Trial" one click away and matches the conversion goal. Anchors: `#home #why #programs #memberships #trainers #gallery #testimonials #trial #contact`.
- **Server Components by default.** Sections are server-rendered. Only animation wrappers, Navbar, DatePicker and the form are client components.
- **Content separate from UI.** Copy, prices and photos live in `src/data/*` with typed shapes in `src/types/*`. Marketing edits never touch component code.
- **Tokens, not hardcoded values.** Components use semantic utilities (`bg-background`, `text-muted-foreground`, `border-line`, `text-primary`). Raw `--vanta-*` variables exist only in `globals.css`.
- **Static image imports.** Images are imported from `src/images/*` so Next.js knows dimensions and can generate blur placeholders.
- **One conversion path.** The trial form is the only form. A separate contact form was dropped to avoid splitting leads.

---

## 8. Page composition and sections

Order in `src/app/page.tsx` (background alternates to create rhythm):

| #   | Section             | Anchor          | Background | Purpose                                                |
| --- | ------------------- | --------------- | ---------- | ------------------------------------------------------ |
| 1   | Hero                | `#home`         | page       | Promise, location credibility, primary CTA, stat strip |
| 2   | WhyVanta            | `#why`          | alt        | "Why is this better than my local gym?"                |
| 3   | FeaturedPrograms    | `#programs`     | page       | Three featured programs, self-qualify                  |
| 4   | FeaturedMemberships | `#memberships`  | alt        | Three plans, middle emphasised                         |
| 5   | FeaturedTrainers    | `#trainers`     | page       | Trust through coaches                                  |
| 6   | GalleryPreview      | `#gallery`      | alt        | Six-zone asymmetric mosaic                             |
| 7   | Testimonials        | `#testimonials` | page       | Social proof                                           |
| 8   | TrialSection        | `#trial`        | alt        | **Primary conversion**                                 |
| 9   | ContactSection      | `#contact`      | page       | Address, hours, map, directions                        |
| 10  | FinalCTA            | n/a             | alt / glow | Catch scroll-to-bottom visitors                        |

Persistent elements: sticky **Navbar**, **Footer**, and the **mobile bottom bar** (Call / WhatsApp / Book Free Trial), which replaces any desktop floating WhatsApp bubble.

```tsx
// src/app/page.tsx
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyVanta />
      <FeaturedPrograms />
      <FeaturedMemberships />
      <FeaturedTrainers />
      <GalleryPreview />
      <Testimonials />
      <TrialSection />
      <ContactSection />
      <FinalCTA />
    </>
  );
}
```

### Primary user flow

```
Land on hero → scan stat strip (credibility)
  → Programs / Memberships (self-qualify)
  → Trainers / Testimonials (trust)
  → Book Free Trial (conversion)
       ↳ fallbacks everywhere: WhatsApp / Call / Get Directions
```

---

## 9. Design system

VANTA is a **dark-only** brand. The dark palette is on `:root` and `color-scheme: dark` is set.

### Color tokens

| Raw token            | Value     | Semantic use                                                                     |
| -------------------- | --------- | -------------------------------------------------------------------------------- |
| `--vanta-black`      | `#0A0A0A` | Page background (`bg-background`)                                                |
| `--vanta-charcoal`   | `#171717` | Alternating sections (`section-alt`), cards                                      |
| `--surface-raised`   | `#1F1F1F` | Cards on charcoal sections (`bg-surface-raised`)                                 |
| `--vanta-graphite`   | `#262626` | Borders, dividers (`border-line`)                                                |
| `--border-strong`    | `#404040` | Emphasised borders (`border-line-strong`)                                        |
| `--vanta-lime`       | `#C6FF00` | **Accent only:** CTAs, active states, key numbers (`text-primary`, `bg-primary`) |
| `--vanta-lime-hover` | `#D4FF3D` | Primary hover (`bg-primary-hover`)                                               |
| `--vanta-white`      | `#F5F5F5` | Body and headings (`text-foreground`)                                            |
| `--vanta-gray`       | `#A3A3A3` | Secondary copy (`text-muted-foreground`)                                         |
| `--vanta-danger`     | `#FF4D4D` | Errors (`text-destructive`)                                                      |

**Rule:** lime is scarce. If more than a few elements per viewport are lime, something is wrong.

> Components should use the semantic utilities above. If legacy `vanta-*` utilities remain in Navbar/Footer, the matching `--color-vanta-*` tokens must exist in `@theme inline`, or migrate those classes to the semantic names (preferred).

Required theme additions:

```css
@theme inline {
  --color-primary-hover: var(--vanta-lime-hover);
}
```

### Typography

| Role    | Font                           | Used for                             |
| ------- | ------------------------------ | ------------------------------------ |
| Display | Space Grotesk (`font-display`) | Headings, prices, logo, stat numbers |
| Body    | Inter (`font-sans`)            | Paragraphs, labels, form fields      |

- Fluid scale from `--text-xs` to `--text-4xl`, plus `--text-hero` (`clamp(3.5rem, 1.5rem + 10vw, 9rem)`) for "BUILT DIFFERENT."
- `.display` class: hero headline (uppercase, tight tracking and leading).
- `.stat-number`: lime key figures.
- Fonts are loaded by `next/font` in `layout.tsx`. **The font variable classes must be applied to `<html>`**:

```tsx
<html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
```

### Layout tokens

| Token                                 | Value             | Notes                                            |
| ------------------------------------- | ----------------- | ------------------------------------------------ |
| `--container-max`                     | `80rem`           | Via `.container-vanta` / `<Container>`           |
| `--container-pad`                     | fluid             | Horizontal gutters                               |
| `--section-y`                         | fluid             | Vertical rhythm via `.section-y`                 |
| `--nav-height`                        | `4rem`            | Fixed header; offset `<main>`                    |
| `--mobile-bar-height`                 | `4.25rem`         | Bottom bar; `body` reserves this space on mobile |
| `--z-nav / mobile-bar / menu / modal` | 40 / 45 / 50 / 60 | Z-index scale                                    |

The fixed header must offset the page, including safe areas:

```tsx
<main className="pt-[calc(var(--nav-height)+env(safe-area-inset-top,0px))]">
```

### Responsive approach (mobile-first)

- Base styles target ~360px; layer up with `sm:`, `md:`, `lg:`.
- Grids: 1 column on mobile; 3 columns at `lg`.
- Gallery mosaic: 2 columns mobile → 4 columns `md+`.
- Touch targets at least 40px (Button `md` is 40px, `lg` is 48px, inputs are 44px).
- Wide content scrolls in its own container (`.scroll-x`), never the page.
- Test at **360, 390, 768, 1024, 1280px**.

---

## 10. Component reference

### UI primitives (`src/components/ui`)

**`Button`**: `cva` variants merged with `cn()` so caller classes win.

| Prop      | Values                                               |
| --------- | ---------------------------------------------------- |
| `variant` | `primary` (default), `secondary`, `outline`, `ghost` |
| `size`    | `sm` (h-9), `md` (h-10, default), `lg` (h-12)        |
| `asChild` | Render as child element (use with `Link` / `a`)      |

```tsx
// Always use asChild for links. Never nest <Button> in <Link>.
<Button asChild size="lg">
  <Link href="#trial">Book a Free Trial</Link>
</Button>
```

`buttonVariants` is exported to style plain anchors as buttons.

**`Badge`**: variants `lime` (one per section max), `outline`, `muted`; sizes `sm`, `md`.

**`Input`**: label, hint and error built in. Sets `aria-invalid` and `aria-describedby`; errors use `role="alert"`. Exports `inputStyles` for custom controls (used by `DatePicker` and `Select`).

**`DatePicker`**: Radix Popover + `react-day-picker`. Value is `YYYY-MM-DD`. Must render a hidden `<input name=… value=…>` to participate in `<form>` submission. Pass `min` from client state, not from `todayISO()` during render.

**`Select`**: styled native `<select>` using `inputStyles` (most reliable on mobile).

**`SectionHeading`**: `title`, `description`, `eyebrow`, `align`, `as`, `action`. Use `as="h1"` once per page; the hero owns the page `h1`.

### Layout (`src/components/layout`)

- **`Navbar`**: fixed, blurred. Desktop: logo, links, phone, CTA. Mobile: logo, compact CTA, hamburger. Menu must be `inert` when closed, close on Escape, and lock body scroll while open.
- **`Footer`**: brand blurb, socials, three link columns (Explore / Get Started / Contact), legal line. `tel:`, `mailto:` and `wa.me` use `<a>`, not `next/link`. Each `<nav>` has an `aria-label`.
- **`MobileBar`**: `md:hidden`, fixed bottom, `pb-safe`, three actions.
- **`Logo`**: single source for the `VANTA.` wordmark.
- **`Container`**: max-width wrapper.

### Animation wrappers (`src/components/animations`)

| Component        | Use                                                           |
| ---------------- | ------------------------------------------------------------- |
| `MotionProvider` | Wraps the app; `reducedMotion="user"`                         |
| `HeroReveal`     | Hero load-in; `fade={false}` for the `h1` so LCP isn't hidden |
| `ScrollReveal`   | One per section                                               |
| `HoverLift`      | Card hover lift                                               |
| `ButtonPress`    | Hover/tap scale on CTAs                                       |
| `ImageZoom`      | Hover zoom inside an `overflow-hidden` frame                  |

---

## 11. Content and data layer

All editable content is in `src/data`. Types are in `src/types`.

| File              | Contents                                                                                   | Constraints                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `site.ts`         | Name, tagline, phone, email, WhatsApp, address, map URLs, hours, socials, nav, `trialHref` | Single source of truth, no hardcoding in components                                   |
| `programs.ts`     | `Program[]` (id, title, description, tag, CTA)                                             | `featured: true` marks home-page programs (3 recommended)                             |
| `memberships.ts`  | `MEMBERSHIPS_BY_ID` + `getMembershipsByIds()`                                              | Exactly 3 plans, exactly 4 features each (tuple-typed). Middle plan is "Most Popular" |
| `trainers.ts`     | `Trainer[]`                                                                                | Photo, years, specialty, bio                                                          |
| `testimonials.ts` | `Testimonial[]`                                                                            | Rating 1–5, name, member-since year                                                   |
| `gallery.ts`      | `GalleryImage[]`                                                                           | **Exactly 6 items**; order maps to mosaic slots (first = largest)                     |
| `trial.ts`        | `TRAINING_GOALS`, `TIME_SLOTS`                                                             | Time slots must match real opening hours                                              |

### Recommended `SITE` shape

```ts
export const SITE = {
  name: 'VANTA',
  tagline: 'Built Different.',
  url: 'https://vanta-xi-olive.vercel.app/',
  trialHref: '#trial',
  contact: {
    phone: '+94 77 123 4567', // replace placeholder
    phoneHref: 'tel:+94771234567',
    email: 'hello@vanta.fit',
    whatsappHref: 'https://wa.me/94771234567',
    address: ['Street address', 'Colombo 03', 'Sri Lanka'],
    mapsUrl: 'https://maps.google.com/?q=…',
    mapEmbedSrc: 'https://www.google.com/maps/embed?pb=…',
  },
  hours: [
    { days: 'Mon – Fri', time: '5:30 AM – 10:00 PM' },
    { days: 'Saturday', time: '6:00 AM – 8:00 PM' },
    { days: 'Sunday', time: '7:00 AM – 2:00 PM' },
  ],
  socials: { instagram: '', tiktok: '', facebook: '' },
  navigation: [
    { label: 'Programs', href: '#programs' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ],
} as const;
```

### Adding content

- **New program:** add an object to `PROGRAMS`; set `featured: true` to show it on the home page. The hero stat should derive from data: `String(PROGRAMS.length)`.
- **New trainer:** drop the photo in `src/images/trainers/`, import it, add to `TRAINERS`.
- **Gallery:** replace the six images, keep the six zones (Strength Zone, Free Weight Floor, Functional Rig, Recovery Room, PT Studio, Community Sessions).
- **Prices:** `price` is a monthly LKR number; the UI formats it.

---

## 12. Trial booking form

Located in `TrialSection` (`#trial`). Two columns on desktop: reassurance copy plus 3 bullets on the left, form on the right. Stacked on mobile with the form first or second per design review.

### Fields

| Field     | Control                          | Validation        |
| --------- | -------------------------------- | ----------------- |
| Full name | `Input`                          | `isNotEmpty`      |
| Phone     | `Input type="tel"`               | `isPhone`         |
| Email     | `Input type="email"`             | `isEmail`         |
| Date      | `DatePicker` (+ hidden input)    | `isTodayOrFuture` |
| Time      | `Select` (from `TIME_SLOTS`)     | required          |
| Goal      | `Select` (from `TRAINING_GOALS`) | required          |
| `website` | Hidden honeypot                  | Must be empty     |

### Behaviour

1. Validate on blur and on submit; focus the first invalid field.
2. Compute `today` in an effect to avoid hydration mismatch:
   ```tsx
   const [today, setToday] = useState('');
   useEffect(() => setToday(todayISO()), []);
   ```
3. Submit to the server action `app/actions/trial.ts`, which **re-validates on the server**, checks the honeypot (silently succeeds if filled) and delivers the lead.
4. States: `idle → submitting` (button disabled, "Booking…") `→ success` (replaces the form, `role="status"`, "You're booked, we'll call to confirm") `→ error` (message + WhatsApp fallback).
5. Add rate limiting (IP-based) before launch.

---

## 13. Motion rules

Motion is intentionally limited:

- **One** hero load-in sequence
- **One** scroll reveal per section (not per card, and no nested reveals)
- Hover and press states
- **Nothing looping or decorative**

Implementation rules:

- Wrap the app in `MotionProvider` (`reducedMotion="user"`). The CSS `prefers-reduced-motion` query does **not** affect `motion/react`.
- Animate only `opacity` and `transform` (`y`, `scale`). No animated blur.
- Never start the hero `h1` at `opacity: 0` (it delays LCP).
- Use `viewport={{ once: true, amount: 'some' }}` for tall wrappers; `amount: 0.2` can fail to trigger on short screens.
- Decorative glows are static. If you ever animate one, animate only its own child element, behind `motion-safe:`.
- Lists keep valid markup: `ul > li > (motion wrapper)`, never `ul > div`.

---

## 14. Accessibility

Target: **WCAG 2.1 AA**.

- Semantic landmarks: one `header`, `main`, `footer`; labelled `nav`s (main + three footer columns).
- One `h1` (hero); `h2` per section; `h3` for cards.
- Add a **skip-to-content** link as the first focusable element.
- Visible focus: global `:focus-visible` lime outline.
- Forms: visible labels, `aria-invalid`, `aria-describedby`, errors announced with `role="alert"`, success with `role="status"`.
- Mobile menu: `aria-expanded`, `aria-controls`, `inert` when closed, Escape to close.
- Decorative SVGs/icons: `aria-hidden="true"`. Informative ones get a label (e.g. star ratings use `role="img"` + `aria-label`).
- Images: meaningful `alt` in data files; decorative overlays `aria-hidden`.
- Color: lime on black passes contrast. Verify `muted-foreground` (`#A3A3A3`) on `#171717` for small text.
- Don't nest interactive elements (no `<Button>` inside `<Link>`).
- External links with `target="_blank"` include `rel="noopener noreferrer"`.
- Reduced motion respected via `MotionProvider`.

---

## 15. SEO and structured data

- `metadata` in `layout.tsx`: `metadataBase`, title template, description, Open Graph (`locale: en_LK`, 1200×630 image), Twitter `summary_large_image`.
- **`HealthClub` JSON-LD** built from `SITE` (name, phone, email, address, opening hours, URL), rendered once in `page.tsx`.
- `app/sitemap.ts` and `app/robots.ts`.
- Heading hierarchy as in [section 14](#14-accessibility).
- Page title: _VANTA | Performance Gym in Colombo 03_.
- Use real URLs in social links; don't ship `href="#"`.

---

## 16. Performance

- Fonts via `next/font` (no layout shift, self-hosted).
- Use `next/image` with static imports; add `priority` to above-the-fold images only; keep accurate `sizes` (see `GalleryPreview`).
- Keep the hero `h1` visible from first paint.
- Avoid heavy GPU effects (animated blur, infinite opacity loops).
- Lazy-load the map iframe (`loading="lazy"`).
- Keep client components small; sections stay server-rendered.
- Targets (mobile): Lighthouse Performance ≥ 90, LCP < 2.5s, CLS < 0.1, INP < 200ms.

---

## 17. Coding conventions

- **TypeScript strict.** No `any`. Data shapes live in `src/types`.
- **Mobile-first Tailwind.** Unprefixed = mobile; add breakpoints upward.
- **Use `cn()`** for any conditional or merged class names.
- **Use `asChild`** for link-styled buttons.
- **Semantic tokens only** in components (no raw hex, no ad-hoc `vanta-*`).
- **Imports:** use the `@/` alias everywhere (no `../` across folders).
- **Exports:** named exports for components; `default` only for Next.js pages/layouts. _(Currently mixed, normalise when convenient.)_
- **One reveal per section.**
- **No content in components.** Move copy, numbers and URLs to `src/data`.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- **Branches:** `main` (deployable), `feat/*`, `fix/*`.

---

## 18. QA checklist

### Automated

- [ ] `npm run lint` passes
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes (also on Linux, to catch casing errors)
- [ ] Playwright + axe at 360, 768, 1280px: no serious/critical violations
- [ ] Lighthouse mobile ≥ 90 (Performance, Accessibility, SEO, Best Practices)

### Visual and responsive

- [ ] Fonts render as Space Grotesk / Inter (not system fallback)
- [ ] Fixed header doesn't cover the hero; correct on notched devices
- [ ] No horizontal scroll at 320px
- [ ] Bottom bar visible on mobile only; no empty strip beneath the footer
- [ ] Hero fills the viewport correctly (`100svh` minus header)
- [ ] Gallery mosaic matches the layout diagram at both breakpoints
- [ ] Middle membership card is emphasised; cards align in height
- [ ] Hover states work (primary button, links, cards); `bg-primary-hover` resolves

### Functional

- [ ] Every "Book Free Trial" / "Start this program" / "Train with …" CTA scrolls to `#trial`
- [ ] Nav anchors land below the sticky header
- [ ] Mobile menu opens/closes; Escape closes; closed menu not tabbable
- [ ] Trial form: required, invalid and success paths; honeypot; server re-validation
- [ ] DatePicker blocks past dates, submits with the form, fits at 320px
- [ ] `tel:`, `mailto:`, WhatsApp and Directions links open correctly
- [ ] "Explore all programs" doesn't link to a missing route (hide it or build `/programs`)

### Accessibility

- [ ] Full keyboard pass (tab order logical, focus visible)
- [ ] Screen reader pass on nav, form, menu
- [ ] Reduced-motion on: no transform animations
- [ ] Skip link works

### Content

- [ ] See [section 20](#20-pre-launch-content-checklist)

---

## 19. Known issues and fix backlog

Findings from the QA review, in recommended fix order.

### 🔴 Blockers

1. **Fonts not applied.** Add `${spaceGrotesk.variable} ${inter.variable}` to `<html>`; add `pt-[var(--nav-height)]` to `<main>`.
2. **`vanta-*` utilities undefined** (Navbar, Footer). Add `--color-vanta-*` to `@theme inline`, or (preferred) migrate to semantic utilities.
3. **`hover:bg-primary-hover` undefined.** Add `--color-primary-hover: var(--vanta-lime-hover)`.
4. **Button doesn't merge classes.** Rebuild with `cva` + `cn()`.
5. **Wrong/missing CTA targets and sections.** Navbar CTA uses `#contact` (should be `#trial`); `page.tsx` is a placeholder; trial form, contact, final CTA and mobile bar don't exist; `/programs` 404s.
6. **`.hero-glow` pulses the entire hero** and loops. Move the glow to a static child element.

### 🟠 Major

- Button nested inside `Link` (Navbar ×3). Use `asChild`.
- `WhyVanta` list markup invalid (`ul > div`); nested reveals.
- Per-card reveals contradict the one-reveal-per-section rule (WhyVanta, Memberships, Trainers).
- Closed mobile menu still focusable; no Escape handling.
- Hamburger X misaligned: translate by 7px, not 4px.
- Header ignores safe-area insets.
- Motion ignores reduced-motion: add `MotionProvider`.
- `HeroReveal` hides the `h1` and uses blur, which hurts LCP.
- Anchors only work on `/`; use `/#section` once sub-pages exist.
- Blueprint (single page) vs file structure (multi-page) disagree. Pick one.

### 🟡 Minor

- Hero says "6 core programs" but data has 7: derive from `PROGRAMS.length`.
- `featured` flag unused: filter by it instead of hardcoded IDs.
- `todayISO()` during render causes hydration mismatch.
- DatePicker lacks a hidden input; won't submit natively.
- Footer: `href="#"` + `target="_blank"`; special links via `next/link`; unlabeled `<nav>`s.
- `CheckIcon` (FeaturedMemberships) missing `aria-hidden`.
- Dead CSS: `.reveal`, `.hero-enter`, `.hero-glow`; unused `useScrollReveal` hook; inconsistent `.press` vs `ButtonPress`.
- Logo inconsistent (`VANTA` vs `VANTA.`).
- Relative import in Navbar (`../animations/ButtonPress`).
- Image comments reference `/public/images/…` but code imports `@/images/…`.
- `@theme inline` self-references `--text-*`; rename `:root` vars to `--fs-*`.
- Copy punctuation (see below).

### Safe file-case rename (macOS/Windows)

```bash
git mv src/components/ui/Sectionheading.tsx src/components/ui/tmp.tsx
git mv src/components/ui/tmp.tsx src/components/ui/SectionHeading.tsx
git config core.ignorecase false
```

Repeat for `Gallerypreview → GalleryPreview`, `Datepicker → DatePicker`, `Site → site` (and other data files), then update imports.

### Copy punctuation fixes

| Where    | Fix                                                     |
| -------- | ------------------------------------------------------- |
| Hero     | "built for output**,** not a place to just show up"     |
| WhyVanta | "in real time**,** not just checking you in"            |
| WhyVanta | "intent**, and** that standard is contagious"           |
| WhyVanta | "entry**-**level basics"                                |
| Trainers | "national**-**level powerlifter"; "train pain**-**free" |

---

## 20. Pre-launch content checklist

Placeholders and claims **must** be verified or replaced before going live. Inaccurate marketing claims can create legal exposure.

- [ ] Phone number (`+94 77 123 4567` looks like a placeholder)
- [ ] Real street address, map embed URL, directions link
- [ ] Real opening hours (and align `TIME_SLOTS`)
- [ ] Stats: "500+ members", "12 certified coaches", "3,200 sq ft", program count
- [ ] Trainer bios, years of experience, and credentials (e.g. "former national-level powerlifter")
- [ ] Headline "Trained by people who compete themselves": true for every coach?
- [ ] Testimonials: real members, written permission, accurate results ("lost 9kg in four months")
- [ ] Trainer, member and gallery photos are real (no stock/AI placeholders)
- [ ] Membership prices, commitment terms, features and "free onboarding session"
- [ ] Social profile URLs
- [ ] Legal pages / privacy note for form data collection
- [ ] OG image (`public/og.jpg`)

---

## 21. Deployment

Recommended: **Vercel**.

1. Push to GitHub; import the repo in Vercel.
2. Set environment variables (section 5) for Production and Preview.
3. Set the production domain; update `metadataBase` and `NEXT_PUBLIC_SITE_URL`.
4. Verify the build passes on Linux (case-sensitive filesystem).
5. After deploy: submit `sitemap.xml` to Google Search Console, test the share preview, run Lighthouse on the live URL, and submit a real trial booking end to end.

---

## 22. Roadmap

**Now (launch):** Batches 1–4 from the QA plan:

1. Fix blockers: fonts, tokens, Button, CTA targets
2. Build `page.tsx`, trial form, contact, final CTA, mobile bar
3. Accessibility and polish: nav, motion, hero, footer, list semantics
4. Cleanup, SEO and real content

**Later:**

- Dedicated `/programs`, `/memberships`, `/trainers` pages (convert anchors to `/#section` and reuse the `Featured*` components)
- `TrainerProfile` pages at `/trainers/[id]`
- Membership FAQ
- Analytics and conversion tracking (trial form submits, WhatsApp clicks, call taps)
- Active-section highlighting in the Navbar
- Playwright + axe in CI

---

## Open decisions

| #   | Question                             | Recommendation                                                                 |
| --- | ------------------------------------ | ------------------------------------------------------------------------------ |
| 1   | Single page or multi-page?           | Single page for launch                                                         |
| 2   | Where do trial leads go?             | Email via Resend                                                               |
| 3   | 6 or 7 programs?                     | Derive the stat from data; trim to 6 if the brand promise is "6 core programs" |
| 4   | Full-screen mobile menu or dropdown? | Full-screen, per the blueprint                                                 |

---

© 2026 VANTA. All rights reserved.
