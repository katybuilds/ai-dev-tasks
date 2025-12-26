import type React from "react"

type Highlight = {
  title: string
  description: string
}

type Feature = {
  title: string
  body: string
}

type Step = {
  label: string
  title: string
  body: string
}

type FAQ = {
  question: string
  answer: string
}

type NavItem = {
  label: string
  href: string
  isActive?: boolean
}

export type HomepageTemplateProps = {
  brandName: string
  brandHref: string
  navItems: NavItem[]
  heroTool?: React.ReactNode
  tagLine: string
  heroTitle: string
  heroDescription: string
  highlightsHeading: string
  highlights: Highlight[]
  promoImageSrc: string
  promoImageAlt: string
  featuresHeading: string
  features: Feature[]
  stepsHeading: string
  steps: Step[]
  useCasesHeading: string
  useCasesDescription: string
  useCasesTagline?: string
  useCases: string[]
  faqHeading: string
  faqs: FAQ[]
  ctaHeading: string
  ctaDescription: string
  ctaLabel: string
}

export function HomepageTemplate({
  brandName,
  brandHref,
  navItems,
  heroTool,
  tagLine,
  heroTitle,
  heroDescription,
  highlightsHeading,
  highlights,
  promoImageSrc,
  promoImageAlt,
  featuresHeading,
  features,
  stepsHeading,
  steps,
  useCasesHeading,
  useCasesDescription,
  useCasesTagline,
  useCases,
  faqHeading,
  faqs,
  ctaHeading,
  ctaDescription,
  ctaLabel,
}: HomepageTemplateProps) {
  const activeHref = navItems.find((item) => item.isActive)?.href

  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-6 text-foreground sm:px-6">
        <a href={brandHref} className="inline-flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M10.5 13.5L13.5 10.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M7 17a4 4 0 010-6l1-1a4 4 0 016 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M17 7a4 4 0 010 6l-1 1a4 4 0 01-6 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="text-sm font-semibold tracking-tight">{brandName}</span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = item.isActive ?? item.href === activeHref
            return (
              <a
                key={item.href}
                href={item.href}
                className={[
                  "transition",
                  isActive
                    ? "text-foreground underline decoration-primary/60 underline-offset-8"
                    : "text-foreground/80 hover:text-foreground",
                ].join(" ")}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
      </header>

      <div className="mx-auto mt-16 max-w-5xl space-y-20 px-4 text-foreground sm:px-6">
        {/* Hero copy */}
        <section className="space-y-4 text-center md:relative md:left-1/2 md:w-[120%] md:-translate-x-1/2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{tagLine}</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-[38px]">{heroTitle}</h1>
          <p className="mx-auto max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {heroDescription}
          </p>
        </section>

        {heroTool ? (
          <section aria-label="Tool preview" className="mx-auto max-w-5xl">
            {heroTool}
          </section>
        ) : null}

        {/* Value proposition + preview image */}
        <section className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[0.6fr_0.4fr] lg:items-start">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold md:text-[28px]">{highlightsHeading}</h2>
              <div className="space-y-3 text-base leading-relaxed text-muted-foreground">
                {highlights.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-6 rounded-full bg-primary/70" aria-hidden />
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center border-l border-primary/20 pl-6">
              <img
                src={promoImageSrc}
                alt={promoImageAlt}
                className="h-full max-h-[420px] w-full max-w-[220px] rounded-3xl border border-border/50 bg-background/80 object-contain shadow-[0_18px_32px_-24px_rgba(63,63,94,0.25)]"
              />
            </div>
          </div>
        </section>

        {/* Feature highlights */}
        <section className="mx-auto max-w-5xl space-y-8">
          <h2 className="text-center text-2xl font-semibold md:text-[28px]">{featuresHeading}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="space-y-3 border-l border-border/70 pl-5 transition hover:border-primary/50"
              >
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Step-by-step usage timeline */}
        <section className="mx-auto max-w-5xl space-y-8">
          <h2 className="text-center text-2xl font-semibold md:text-[28px]">{stepsHeading}</h2>
          <div className="relative grid gap-10 md:grid-cols-3">
            <span className="pointer-events-none absolute left-1/2 top-12 hidden h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-border/60 md:block" />
            {steps.map((step) => (
              <div key={step.label} className="relative space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  {step.label}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl space-y-8">
          <div className="text-center">
            {useCasesTagline ? (
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{useCasesTagline}</p>
            ) : null}
            <h2 className="mt-3 text-2xl font-semibold md:text-[30px]">{useCasesHeading}</h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">{useCasesDescription}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {useCases.map((useCase) => (
              <div
                key={useCase}
                className="flex items-start gap-3 rounded-3xl border border-border/60 bg-background/90 px-6 py-5 shadow-[0_18px_32px_-24px_rgba(63,63,94,0.25)]"
              >
                <span className="mt-1 inline-flex h-2 w-2 items-center justify-center rounded-full bg-primary">
                  <span className="sr-only">bullet</span>
                </span>
                <p className="text-sm font-medium leading-relaxed text-foreground md:text-base">{useCase}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-5xl space-y-8">
          <h2 className="text-center text-2xl font-semibold md:text-[28px]">{faqHeading}</h2>
          <div className="divide-y divide-border/70">
            {faqs.map((faq) => (
              <article key={faq.question} className="space-y-2 py-6">
                <h3 className="text-base font-semibold text-foreground md:text-lg">{faq.question}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl rounded-3xl border border-primary/25 bg-primary/10 px-8 py-10 text-center shadow-[0_20px_40px_-28px_rgba(99,102,241,0.35)]">
          <h2 className="text-2xl font-semibold text-foreground md:text-[30px]">{ctaHeading}</h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">{ctaDescription}</p>
          <a
            href="#setup"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-[0_16px_32px_-20px_rgba(99,102,241,0.55)] transition hover:opacity-95"
          >
            <span>{ctaLabel}</span>
            <span className="ml-3">→</span>
          </a>
        </section>
      </div>

      <footer className="relative mt-16 bg-background text-foreground/90">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-foreground/10" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-foreground/5" />
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-10 text-center text-sm text-muted-foreground">
          <p className="mt-2">/* Replace with final footer copy when implementing */</p>
          <p className="mt-6 text-xs text-muted-foreground/70">Placeholder © 20XX Example Product.</p>
        </div>
      </footer>
    </>
  )
}

export const DEFAULT_HOMEPAGE_TEMPLATE_PROPS: HomepageTemplateProps = {
  brandName: "SITE TITLE",
  brandHref: "/",
  navItems: [
    { label: "Home", href: "#", isActive: true },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ],
  tagLine: "Template Tagline",
  heroTitle: "Readable Hero Headline Goes Here",
  heroDescription:
    "Use this space for a concise description of the product value. Keep copy short and scannable so teams can swap in their own language.",
  highlightsHeading: "Why Choose This Product",
  highlights: [
    {
      title: "Key Benefit One",
      description: "Short supporting detail describing what this highlight covers in the final homepage.",
    },
    {
      title: "Key Benefit Two",
      description: "Another concise point that teams can later replace with final marketing copy.",
    },
    {
      title: "Key Benefit Three",
      description: "Ensure lists remain balanced and avoid hard-coded messaging in the template itself.",
    },
  ],
  promoImageSrc: "/placeholder/timer.png",
  promoImageAlt: "Placeholder interface preview",
  featuresHeading: "Core Features at a Glance",
  features: [
    {
      title: "Feature Title One",
      body: "Brief description for how this feature solves a primary job-to-be-done for the user.",
    },
    {
      title: "Feature Title Two",
      body: "Another succinct explanation that will be replaced when the real copy is available.",
    },
    {
      title: "Feature Title Three",
      body: "Keep each paragraph focused on functionality so the layout stays representative.",
    },
  ],
  stepsHeading: "How It Works",
  steps: [
    {
      label: "Step 1",
      title: "Describe the first action",
      body: "Outline what the user should do first in a single sentence.",
    },
    {
      label: "Step 2",
      title: "Explain the second action",
      body: "Continue the journey with another lightweight explanation of the next step.",
    },
    {
      label: "Step 3",
      title: "Clarify the final outcome",
      body: "Wrap up with the goal state so future copywriters know what belongs here.",
    },
  ],
  useCasesTagline: "Designed for Different Workflows",
  useCasesHeading: "Use Cases",
  useCasesDescription: "Replace with the most common scenarios your customers care about. Keep the list balanced and scannable.",
  useCases: [
    "Example use case one",
    "Example use case two",
    "Example use case three",
    "Example use case four",
    "Example use case five",
    "Example use case six",
  ],
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      question: "Sample question one?",
      answer: "Keep answers short and utilitarian. Replace these placeholders during content production.",
    },
    {
      question: "Sample question two?",
      answer: "Mirror the number of FAQ entries the live page needs, but avoid committing to final messaging here.",
    },
    {
      question: "Sample question three?",
      answer: "Use consistent sentence length so layout spacing is easy to evaluate inside design reviews.",
    },
  ],
  ctaHeading: "Get Started",
  ctaDescription: "Invite visitors to try the product immediately. Keep copy imperative, benefits-led, and concise.",
  ctaLabel: "Start Now",
}

export function HeroToolPlaceholder() {
  return (
    <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-[0_22px_44px_-34px_rgba(15,23,42,0.22)] md:p-10">
      <div className="grid gap-10 lg:grid-cols-[0.55fr_0.45fr] lg:items-start">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">Tool Placeholder</h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Drop your real interactive tool here next time. Keep the layout representative so the landing page remains
            scannable and consistent.
          </p>

          <div className="space-y-3 rounded-2xl border border-border bg-background p-4">
            <p className="text-sm font-semibold text-foreground">Input</p>
            <div className="h-28 rounded-xl border border-border bg-background">
              <div className="h-full w-full rounded-xl bg-gradient-to-b from-muted/40 to-background p-3">
                <div className="h-3 w-3/5 rounded bg-muted" />
                <div className="mt-2 h-3 w-4/5 rounded bg-muted/80" />
                <div className="mt-2 h-3 w-2/3 rounded bg-muted/70" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Placeholder for a textarea, editor, or upload widget.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-background p-5">
            <h3 className="text-sm font-semibold text-foreground">Output</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Show a preview / results list / generated content here.
            </p>
            <div className="mt-4 space-y-3">
              <div className="h-10 rounded-xl border border-border bg-muted/40" />
              <div className="h-10 rounded-xl border border-border bg-muted/40" />
              <div className="h-10 rounded-xl border border-border bg-muted/40" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#tool"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-[0_14px_28px_-18px_rgba(15,23,42,0.65)] transition hover:opacity-95"
            >
              Run Tool
            </a>
            <a
              href="#docs"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-foreground/80 transition hover:bg-muted hover:text-foreground"
            >
              View Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DefaultHomepageTemplate() {
  return <HomepageTemplate {...DEFAULT_HOMEPAGE_TEMPLATE_PROPS} heroTool={<HeroToolPlaceholder />} />
}
