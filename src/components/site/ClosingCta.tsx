import { ArrowRight, ClipboardCheck, DraftingCompass, Rocket, Target } from "lucide-react";

import "./ClosingCta.css";

const propositions = [
  {
    number: "01",
    title: "Assess",
    copy: "Critical assets, security maturity, zones, threats and current controls",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Prioritise",
    copy: "Highest-consequence gaps, quick wins and the pilot scope that matters most",
    icon: Target,
  },
  {
    number: "03",
    title: "Design",
    copy: "Target architecture, use cases, SOPs, specifications and CAPEX phasing",
    icon: DraftingCompass,
  },
  {
    number: "04",
    title: "Mobilise",
    copy: "Delivery roadmap, governance, SI onboarding and measurable outcomes",
    icon: Rocket,
  },
] as const;

export function ClosingCta() {
  return (
    <section id="closing" className="closing-section scroll-mt-24 bg-[#1A1A24] text-white">
      <div className="closing-layout mx-auto grid w-full max-w-6xl items-center px-5 md:px-8">
        <div className="closing-narrative flex min-w-0 flex-col">
          <p className="closing-eyebrow font-semibold uppercase tracking-[0.22em] text-ey-yellow">
            Section 11
          </p>
          <h2 className="closing-title mt-4 font-semibold leading-[1.02] text-white">
            Start with one pilot plant - or one operating cluster.
          </h2>
          <p className="closing-support mt-5 max-w-2xl leading-[1.45] text-white/68">
            A structured assessment will establish the current state, define the target
            architecture, prioritise investment and produce an executable modernisation roadmap.
          </p>
          <a
            href="mailto:akshya.singhal@in.ey.com"
            className="closing-cta mt-7 inline-flex w-fit items-center gap-2 rounded-md bg-ey-yellow px-5 py-3 font-semibold text-[#1A1A24] outline-none transition-colors hover:bg-[#F3DB00] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A24]"
          >
            Book an assessment discussion
            <ArrowRight aria-hidden className="h-5 w-5" />
          </a>
          <p className="closing-line mt-auto font-semibold text-white/68">
            Start focused. Scale on evidence.
          </p>
        </div>

        <ol className="closing-propositions grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
          {propositions.map((proposition) => {
            const Icon = proposition.icon;
            return (
              <li key={proposition.number} className="closing-proposition min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm font-bold tracking-[0.12em] text-ey-yellow">
                    {proposition.number}
                  </span>
                  <Icon aria-hidden className="h-8 w-8 text-ey-yellow" strokeWidth={1.6} />
                </div>
                <h3 className="mt-8 text-2xl font-semibold text-white">{proposition.title}</h3>
                <p className="mt-3 text-[17px] leading-[1.4] text-white/62">{proposition.copy}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
