import Link from 'next/link';

import Container from '@/components/layout/Container';
import ScrollReveal from '@/components/animations/ScrollReveal';
import SectionHeading from '@/components/ui/Sectionheading';
import { Button } from '@/components/ui/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { SITE } from '@/data/Site';

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Placeholder answers. Items marked (confirm) describe policies that are not
 * in the project data yet. Replace them with VANTA's real terms.
 */
export const MEMBERSHIP_FAQS: FAQItem[] = [
  {
    question: 'Can I try VANTA before I join?',
    answer:
      'Yes. Book a free trial, pick a date and time that suits you, and a coach will show you around and run a session with you. No commitment.',
  },
  {
    question: 'What is the difference between the three plans?',
    answer:
      'Starter gives you full gym floor access during standard hours. Performance adds unlimited group classes, one personal training session a month and a monthly nutrition check-in. Elite adds unlimited personal training, priority booking and 24/7 access.',
  },
  {
    question: 'Do I have to sign a long contract?',
    answer:
      'Starter is month-to-month. Performance is a 3-month commitment and Elite is a 6-month commitment, which is how we keep coaching and programming consistent for you.',
  },
  {
    question: 'Can I change my plan later?',
    answer:
      'You can move up to a higher plan at any time. Moving down is possible once your current commitment ends. (confirm)',
  },
  {
    question: 'Can I pause my membership if I travel?',
    answer:
      'Talk to the front desk before you go and we will tell you what options are available for your plan. (confirm)',
  },
  {
    question: 'How do I pay?',
    answer:
      'Memberships are billed monthly in LKR. Ask at your onboarding session about the payment methods we accept. (confirm)',
  },
  {
    question: 'I have never trained before. Is VANTA right for me?',
    answer:
      'Yes. Every new member gets an onboarding session, and the Beginner Rebuild program is designed for people starting from zero, with a coach on the floor to guide you.',
  },
];

interface MembershipFAQProps {
  items?: FAQItem[];
}

export default function MembershipFAQ({
  items = MEMBERSHIP_FAQS,
}: MembershipFAQProps) {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="section-y ">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Heading + contact prompt */}
          <ScrollReveal className="lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:self-start">
            <SectionHeading
              eyebrow="FAQ"
              title={
                <span id="faq-heading">Membership questions, answered</span>
              }
              description="Can't find what you need? Call us or drop in. We're happy to walk you through the options."
            />

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <a href={SITE.contact.phoneHref}>Call us</a>
              </Button>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/#trial">Book a Free Trial</Link>
              </Button>
            </div>
          </ScrollReveal>

          {/* Accordion */}
          <ScrollReveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${index}`}
                  className="border-b border-line"
                >
                  <AccordionTrigger className="gap-4 py-5 text-left font-display text-base font-semibold text-foreground hover:text-primary hover:no-underline sm:text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[60ch] pb-5 text-sm text-muted-foreground sm:text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
