import {
  AlertTriangle,
  BookOpenCheck,
  Building2,
  Factory,
  ShieldCheck,
} from "lucide-react";

const incidents = [
  {
    icon: AlertTriangle,
    eyebrow: "Theft / intrusion",
    title: "Ranchi power station",
    detail: "Guards were reportedly restrained during a raid in which copper wire and equipment were stolen.",
    source: "India · Mar 2026",
  },
  {
    icon: Building2,
    eyebrow: "Insider / supply-chain risk",
    title: "Coal diversion in Chennai",
    detail: "Police reported large-scale diversion of high-grade coal in transit to a power plant, with lower-grade material substituted.",
    source: "India · Jan 2026",
  },
  {
    icon: Factory,
    eyebrow: "Sabotage / aerial threat",
    title: "Critical energy infrastructure attack",
    detail: "Recent attacks on power infrastructure have shown how physical sabotage and aerial threats can translate directly into generation loss.",
    source: "Global benchmark case",
  },
];

const globalBenchmarks = [
  {
    name: "ASIS PAP-2021",
    description: "Physical Asset Protection",
    primary: true,
  },
  {
    name: "IEC 62676",
    description: "Video Surveillance Systems for Security Applications",
  },
  {
    name: "NFPA 730",
    description: "Guide for Premises Security",
  },
  {
    name: "ISO 22341",
    description: "Crime Prevention Through Environmental Design",
  },
  {
    name: "NERC CIP-014",
    description: "Power-sector physical security benchmark",
  },
];

const indiaContext = [
  "CEA regulatory and plant-safety environment",
  "Critical infrastructure protection context",
  "Plant emergency and continuity obligations",
  "CERT-In / NCIIPC interfaces where applicable",
];

const implications = [
  "Risk-based protection",
  "Plant-specific security design",
  "Integrated surveillance and access control",
  "Measurable response performance",
  "Resilience and continuity",
];

export function WhyNow() {
  return (
    <section
      id="why-now"
      className="scroll-mt-24 min-h-[calc(100vh-5.75rem)] bg-ey-cream py-6 text-foreground"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div>
          <p className="flex items-center gap-3 text-base font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
            <span aria-hidden className="h-3 w-1.5 shrink-0 rounded-sm bg-ey-yellow" />
            Section 02
          </p>
          <h2 className="mt-1 text-[2.35rem] font-semibold leading-tight text-ey-green-deep">
            Why physical security must change now
          </h2>
          <p className="mt-1 max-w-5xl text-lg leading-[1.35] text-muted-foreground">
            Real incidents, critical infrastructure exposure and established physical-security standards are raising expectations for generation-asset protection.
          </p>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_1.35fr]">
          <section className="rounded-xl border border-hairline bg-white p-5" aria-labelledby="why-now-incidents">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-sm font-bold tracking-[0.16em] text-ey-gold">01</p>
                <h3 id="why-now-incidents" className="mt-1 text-2xl font-semibold text-ey-green-deep">
                  The threat is real
                </h3>
              </div>
              <span className="rounded-full bg-ey-yellow/20 px-3 py-1 text-sm font-semibold text-ey-green-deep">
                Recent incident evidence
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {incidents.map((incident) => (
                <article key={incident.title} className="rounded-lg border border-hairline bg-ey-cream/55 p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ey-green-deep text-ey-yellow">
                      <incident.icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ey-coral">
                          {incident.eyebrow}
                        </p>
                        <p className="text-xs font-medium text-muted-foreground">{incident.source}</p>
                      </div>
                      <h4 className="mt-1 text-lg font-semibold leading-tight text-ey-green-deep">{incident.title}</h4>
                      <p className="mt-1 text-base leading-[1.35] text-foreground/80">{incident.detail}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-4 border-l-4 border-ey-coral pl-3 text-base font-semibold leading-snug text-ey-green-deep">
              Physical-security incidents can move quickly from perimeter breach to operational disruption.
            </p>
          </section>

          <section className="rounded-xl border border-hairline bg-white p-5" aria-labelledby="why-now-standards">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-ey-green-deep text-ey-yellow">
                <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-sm font-bold tracking-[0.16em] text-ey-gold">02</p>
                <h3 id="why-now-standards" className="text-2xl font-semibold text-ey-green-deep">
                  The physical-security bar is already defined
                </h3>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-[1.25fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Global physical-security benchmarks
                </p>
                <div className="mt-3 space-y-2.5">
                  {globalBenchmarks.map((standard) => (
                    <div
                      key={standard.name}
                      className={
                        standard.primary
                          ? "rounded-lg border-2 border-ey-gold bg-ey-yellow/15 p-4"
                          : "rounded-lg border border-hairline bg-ey-cream/45 px-4 py-3"
                      }
                    >
                      <div className="flex items-start gap-3">
                        <ShieldCheck
                          className={standard.primary ? "mt-0.5 h-5 w-5 shrink-0 text-ey-gold" : "mt-0.5 h-4.5 w-4.5 shrink-0 text-ey-green-deep"}
                          aria-hidden="true"
                        />
                        <div>
                          <p className={standard.primary ? "text-xl font-bold text-ey-green-deep" : "text-base font-semibold text-ey-green-deep"}>
                            {standard.name}
                          </p>
                          <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{standard.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-ey-green-deep p-4 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ey-yellow">
                  India / power-sector context
                </p>
                <ul className="mt-3 space-y-3">
                  {indiaContext.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-snug text-white/90">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ey-yellow" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-white/15 pt-4 text-xs leading-relaxed text-white/65">
                  Cyber references are supporting context only; the primary proposition on this page is physical security.
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-4 rounded-xl border border-hairline bg-navy px-5 py-4 text-navy-foreground" aria-labelledby="why-now-implication">
          <div className="grid gap-4 lg:grid-cols-[0.8fr_2.2fr] lg:items-center">
            <div>
              <p className="font-mono text-sm font-bold tracking-[0.16em] text-ey-yellow">03</p>
              <h3 id="why-now-implication" className="mt-1 text-xl font-semibold">
                Implication for power generators
              </h3>
            </div>
            <div>
              <p className="text-lg font-semibold leading-snug">
                Physical security can no longer be assessed by camera count, guard strength or isolated systems alone.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {implications.map((item) => (
                  <span key={item} className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-sm text-white/90">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
