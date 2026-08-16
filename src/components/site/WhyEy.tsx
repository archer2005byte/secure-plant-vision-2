import { FileCheck2, GitBranch, ShieldCheck, Target, Zap } from "lucide-react";

import { navigateToSection } from "./DeckNavigation";
import "./WhyEy.css";

const capabilities = [
  {
    number: "01",
    icon: Zap,
    title: "Power-sector context",
    description: "Critical assets, generation operations and Indian public-sector realities.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Security convergence",
    description: "Physical, cyber, OT and command-centre architecture in one control model.",
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "Procurement engineering",
    description: "Risk translated into DPRs, BoQs, SLAs and objective acceptance criteria.",
  },
  {
    number: "04",
    icon: GitBranch,
    title: "Programme governance",
    description: "Pilot-to-fleet delivery with gates, evidence, escalation and ownership.",
  },
] as const;

const outcomes = [
  "Decision-ready design",
  "Procurement-ready package",
  "Implementation-ready governance",
] as const;

const evidenceSpans = [
  "Power & utilities",
  "Surveillance programmes",
  "Command-centre design",
  "OT / cyber",
  "Tender / RFP",
  "Deployment governance",
  "India public sector",
  "Major infrastructure PMO",
] as const;

function Capability({ index }: { index: number }) {
  const capability = capabilities[index]!;
  const Icon = capability.icon;

  return (
    <article className="why-ey-capability" data-capability={capability.number}>
      <div className="why-ey-capability-icon" aria-hidden="true">
        <Icon size={30} strokeWidth={1.7} />
      </div>
      <div className="min-w-0">
        <p className="why-ey-capability-number">{capability.number}</p>
        <h3>{capability.title}</h3>
        <p className="why-ey-capability-description">{capability.description}</p>
      </div>
    </article>
  );
}

export function WhyEy() {
  const handleCredentialsClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateToSection("credentials");
  };

  return (
    <section
      id="why-ey"
      className="why-ey-section scroll-mt-24 bg-[#1A1718] px-5 text-white md:px-8"
    >
      <div className="why-ey-inner mx-auto w-full max-w-6xl">
        <header className="why-ey-header">
          <div className="min-w-0">
            <p className="why-ey-eyebrow">
              <span aria-hidden="true" />
              SECTION 09
            </p>
            <h2>EY brings the four capabilities that turn architecture into delivery</h2>
            <p className="why-ey-subtitle">
              Domain context, converged security design, procurement engineering and programme
              governance operate as one delivery system—not four disconnected workstreams.
            </p>
          </div>

          <a href="#credentials" onClick={handleCredentialsClick} className="why-ey-cta">
            View evidence base
          </a>
        </header>

        <div
          className="why-ey-architecture"
          role="group"
          aria-label="Four EY capabilities operating as one integrated delivery system"
        >
          <div className="why-ey-capability-system">
            <div className="why-ey-capability-group why-ey-capability-group-left">
              <Capability index={0} />
              <Capability index={1} />
            </div>

            <section className="why-ey-integrated-value" aria-labelledby="integrated-value-title">
              <Target aria-hidden="true" size={34} strokeWidth={1.8} />
              <p className="why-ey-integrated-eyebrow">INTEGRATED VALUE</p>
              <h3 id="integrated-value-title">From advice to an operable system</h3>
              <p>Independent choices. Procurement discipline. Delivery accountability.</p>
            </section>

            <div className="why-ey-capability-group why-ey-capability-group-right">
              <Capability index={2} />
              <Capability index={3} />
            </div>
          </div>

          <ol className="why-ey-outcomes" aria-label="Integrated delivery outcomes">
            {outcomes.map((outcome, index) => (
              <li key={outcome}>
                <span aria-hidden="true">{index + 1}</span>
                <p>{outcome}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="why-ey-evidence" aria-labelledby="evidence-spans-title">
          <p id="evidence-spans-title">EVIDENCE SPANS</p>
          <ul>
            {evidenceSpans.map((item) => (
              <li key={item}>
                <span aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
