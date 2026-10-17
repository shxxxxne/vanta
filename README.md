# VANTA. Performance Gym Website

> **Built Different.** A conversion-focused, mobile-first website for VANTA, a private strength and performance gym in Colombo 03, Sri Lanka.

[![Next.js](https://img.shields.io/badge/Next.js-App_Router-black?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-compatible-black)](https://ui.shadcn.com)

The site has one job: turn a visitor into a **free trial booking**. Every section has a clear purpose, and the "Book Free Trial" CTA is never more than one click away.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Getting started](#getting-started)
3. [Project structure](#project-structure)
4. [Design system](#design-system)
5. [Page sections](#page-sections)
6. [Content editing (data layer)](#content-editing-data-layer)
7. [Motion](#motion)
8. [Development rules](#development-rules)
9. [Project process](#project-process)
10. [Status and roadmap](#status-and-roadmap)
11. [Known issues to fix](#known-issues-to-fix)
12. [Deployment](#deployment)

---

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js (App Router) with React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (tokens in `globals.css`, `@theme inline`) |
| UI primitives | shadcn/ui-compatible tokens, Radix UI (`Slot`, `Popover`) |
| Variants | `class-variance-authority`, `clsx`, `tailwind-merge` |
| Fonts | `next/font/google`: **Space Grotesk** (display), **Inter** (body) |
| Animation | `motion` (`motion/react`) and `tw-animate-css` |
| Icons | `lucide-react` plus inline SVGs |
| Date picking | `react-day-picker` in a Radix Popover |
| Images | `next/image` with statically imported assets |

---

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm, pnpm or yarn

### Install and run

```bash
# 1. Clone
git clone https://github.com/<your-username>/vanta.git
cd vanta

# 2. Install
npm install

# 3. Develop
npm run dev        # http://localhost:3000

# 4. Production build
npm run build
npm run start

# 5. Lint
npm run lint
```

### Add your images

Photos are imported statically from `src/images/`. Drop matching files in before running:

```
src/images/
├── gallery/        strength-zone.jpg, free-weight-floor.jpg, functional-rig.jpg,
│                   recovery-room.jpg, pt-studio.jpg, community-sessions.jpg,
│                   members-training-coach.jpg
├── trainers/       kavindu-perera.jpg, dinithi-silva.jpg, ashan-fernando.jpg
└── testimonials/   ruwan.jpg, nadia.jpg, tharindu.jpg
```

---

## Project structure

Everything lives under `src/`.

```
vanta/
├── src/
│   ├── app/
│   │   ├── layout.tsx            Fonts, metadata, viewport, Navbar + Footer
│   │   ├── page.tsx              Home (single scrolling page)
│   │   └── globals.css           Design tokens, base styles, helpers
│   │
│   ├── components/
│   │   ├── animations/           Reusable motion wrappers
│   │   │   ├── HeroReveal.tsx    Load-in with blur, hero only
│   │   │   ├── ScrollReveal.tsx  One reveal per section
│   │   │   ├── HoverLift.tsx     Card hover lift
│   │   │   ├── ButtonPress.tsx   Hover/tap scale
│   │   │   └── ImageZoom.tsx     Image zoom on hover
│   │   ├── layout/               Navbar, Footer, Container
│   │   ├── home/                 Hero, WhyVanta, FeaturedPrograms,
│   │   │                         FeaturedMemberships, FeaturedTrainers,
│   │   │                         GalleryPreview, Testimonials
│   │   └── ui/                   Button, Badge, Input, DatePicker, SectionHeading
│   │
│   ├── data/                     All editable content (typed)
│   │   ├── Site.ts               Brand, contact, navigation
│   │   ├── Programs.ts           Training programs
│   │   ├── Memberships.ts        Pricing plans
│   │   ├── Trainers.ts           Coaches
│   │   ├── Testimonials.ts       Member reviews
│   │   ├── Gallery.ts            Facility photos and zones
│   │   └── Trial.ts              Trial form goals and time slots
│   │
│   ├── lib/
│   │   ├── utils.ts              cn() class merger
│   │   └── validations.ts        isEmail, isPhone, isNotEmpty, date helpers
│   │
│   ├── types/                    program, membership, trainer, testimonial, gallery
│   └── images/                   Statically imported photos
│
├── public/                       Icons, logo, static files
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

---

## Design system

VANTA is a **dark-only** brand. All tokens live in `src/app/globals.css` and are mapped to Tailwind utilities through `@theme inline`.

| Token | Value | Use |
|---|---|---|
| `--vanta-black` | `#0A0A0A` | Page background |
| `--vanta-charcoal` | `#171717` | Alternating section background (`.section-alt`) |
| `--vanta-graphite` | `#262626` | Borders, dividers |
| `--vanta-lime` | `#C6FF00` | **Accent only**: CTAs, active states, key numbers |
| `--vanta-white` | `#F5F5F5` | Body and headings |
| `--vanta-gray` | `#A3A3A3` | Secondary copy |

Typography uses a fluid `clamp()` scale (`--text-xs` to `--text-hero`) so it scales smoothly from mobile to desktop. Headings use Space Grotesk, body text uses Inter.

Useful helper classes: `.container-vanta`, `.section-y`, `.section-alt`, `.display`, `.stat-number`, `.press`, `.scroll-x`.

Utilities such as `bg-primary`, `text-lime`, `border-line`, `bg-surface-raised`, `font-display` and `text-muted-foreground` are available everywhere.

---

## Page sections

Single scrolling page with anchor navigation. This is the standard pattern for a conversion-focused small-business site.

| Anchor | Section | Job |
|---|---|---|
| `#home` | Hero + stats strip | State the promise, show credibility, give the first CTA |
| `#why` | Why VANTA | Answer "why not my local gym?" |
| `#programs` | Programs | Let visitors self-qualify (3 featured, link to all) |
| `#memberships` | Pricing | Three plans, middle one highlighted |
| `#trainers` | Coaches | Build trust |
| `#gallery` | Facility mosaic | Show the space |
| `#testimonials` | Member reviews | Social proof |
| `#trial` | Free trial form | Primary conversion |
| `#contact` | Location and hours | Fallback paths: call, WhatsApp, directions |

**Primary user flow:** land on hero, check the stat strip, scroll to programs or memberships, check trainers or testimonials for trust, then book a free trial. WhatsApp, call and directions are available as fallbacks throughout.

---

## Content editing (data layer)

No component needs touching to change copy. Edit the typed files in `src/data/`:

- **Add a program:** push an object to `PROGRAMS` in `Programs.ts` (shape: `types/program.ts`).
- **Change prices or features:** edit `MEMBERSHIPS_BY_ID` in `Memberships.ts`. Each plan has exactly 4 features, which is enforced by the `MembershipFeatures` tuple type.
- **Swap featured home programs:** edit `FEATURED_PROGRAM_IDS` in `FeaturedPrograms.tsx`.
- **Phone, email, nav links:** `Site.ts`.
- **Trial time slots and goals:** `Trial.ts`.

TypeScript will flag any missing or malformed field at build time.

---

## Motion

Motion is intentionally restrained:

- One **hero load-in** sequence (`HeroReveal`)
- One **scroll reveal per section** (`ScrollReveal`, plays once)
- **Hover and press** states only (`HoverLift`, `ButtonPress`, `ImageZoom`)
- Nothing looping or decorative, apart from the subtle hero glow

`prefers-reduced-motion` is respected in CSS.

---

## Development rules

1. **Mobile first.** Write base styles for small screens, then layer on `sm:`, `md:`, `lg:`.
2. **Accessibility.** Semantic HTML, visible focus ring (lime), labelled inputs, `aria-*` where needed, 44px+ tap targets for primary actions.
3. **Server components by default.** Add `'use client'` only for interactivity (Navbar menu, motion wrappers, DatePicker).
4. **Content in `data/`, not JSX.**
5. **Reuse primitives.** Use `Button`, `Badge`, `Input`, `SectionHeading` and `Container` instead of re-styling.
6. **Lime is for emphasis.** At most one lime badge per section.
7. **Use `next/image`** with `sizes` set for every photo.
8. **Use `cn()`** for conditional classes so Tailwind conflicts resolve correctly.

---

## Project process

How the project was built, in order:

1. **Concept and UI exploration.** A visual prototype was designed first to settle the look and feel (dark, high-contrast, lime accent).
2. **Blueprint.** A sitemap and section-by-section wireframe were written, covering layout logic, the job of each section, user flow and the design system.
3. **File structure.** A component and folder architecture was planned so each section maps to a component and each piece of content maps to a data file.
4. **Foundation.** Next.js, TypeScript, Tailwind v4 and fonts were set up, along with design tokens in `globals.css`, the `cn()` utility and the `Container` layout.
5. **UI primitives.** `Button`, `Badge`, `Input`, `DatePicker` and `SectionHeading` were built and documented with usage examples.
6. **Data and types.** Typed content models were created for programs, memberships, trainers, testimonials, gallery and trial options.
7. **Motion layer.** Reusable animation wrappers were built to enforce the "restrained motion" rule.
8. **Sections.** Navbar, Footer, Hero, WhyVanta, FeaturedPrograms, FeaturedMemberships, FeaturedTrainers, GalleryPreview and Testimonials were built.
9. **Next:** trial form, contact section, final CTA, mobile action bar, and assembly of `page.tsx`.

---

## Status and roadmap

**Done**
- [x] Design tokens, fonts, layout shell
- [x] Navbar (responsive, mobile menu) and Footer
- [x] UI primitives (Button, Badge, Input, DatePicker, SectionHeading)
- [x] Hero, Why VANTA, Programs, Memberships, Trainers, Gallery, Testimonials sections
- [x] Typed data layer and validation helpers
- [x] Motion wrappers

**To do**
- [ ] Assemble sections in `src/app/page.tsx` (currently a placeholder)
- [ ] `TrialForm` section (`#trial`): name, phone, email, date, time, goal, with success state
- [ ] Contact section (`#contact`): address, hours, WhatsApp, map and directions button
- [ ] Final CTA band (Book Trial + WhatsApp)
- [ ] Mobile bottom bar (Call / WhatsApp / Book Free Trial). `globals.css` already reserves space for it via `--mobile-bar-height`
- [ ] Form submission (API route, email or WhatsApp notification)
- [ ] Real photos, real trainer data and real social links
- [ ] Optional multi-page routes: `/programs`, `/memberships`, `/trainers`, `/contact`
- [ ] SEO extras: Open Graph image, `LocalBusiness` JSON-LD, sitemap, robots
- [ ] Add a LICENSE

---

## Known issues to fix

Small things spotted while reviewing the code:

1. **Nav CTA is a button inside a link.** In `Navbar.tsx`, `<Link><Button/></Link>` renders a `<button>` inside an `<a>`, which is invalid HTML. Use `<Button asChild><Link href="#trial">…</Link></Button>`.
2. **Nav CTA target.** "Book Free Trial" links to `#contact`, while every other CTA uses `#trial`. Point it to `#trial` for consistency with the blueprint.
3. **Nav has no "Why" or "Testimonials" link**, which is fine, but make sure `#trial` exists once the form is added or anchors will go nowhere.
4. **Footer social links** use `href="#"` with `target="_blank"`. Replace them with real URLs, or remove the entries until you have them.
5. **`featured` flag unused.** `Program.featured` exists, but the home page uses a hardcoded `FEATURED_PROGRAM_IDS` array. Pick one approach.
6. **Unused hook in plan.** `useScrollReveal.ts` is no longer needed because `motion` handles reveals. The `.reveal` CSS classes can be removed too.
7. **Nested `ScrollReveal` in `WhyVanta`.** The section wraps everything in one reveal and each reason in another, which goes against the "one reveal per section" rule. Remove the inner wrappers.
8. **Footer headings** use `h2` inside the footer. Consider `h2` with `sr-only` or a `p`, to keep the page's heading outline clean.
9. **Testimonials star rating** displays 4 stars for one member. Fine if intentional, but all-5-star data reads more like marketing than proof, so keep it if it is real.
10. **Placeholder data:** phone number, email, WhatsApp number and years of experience are placeholders.

---

## Deployment

The easiest route is [VANTA](https://vanta-xi-olive.vercel.app/):

1. Push the repo to GitHub.
2. Import the repo in Vercel (framework preset: Next.js).
3. Deploy. Every push to `main` ships automatically.

Before launch, check: real images, real contact details, working trial form, Open Graph image, Lighthouse score on mobile.

---

## License
-------

---

<sub>Built for VANTA, Colombo 03. Strength. Discipline. Transformation.</sub>
