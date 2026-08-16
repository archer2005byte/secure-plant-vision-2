import { useEffect, useState } from "react";
import {
  ArrowRight,
  ClipboardCheck,
  FileText,
  Handshake,
  Settings,
  ShieldCheck,
} from "lucide-react";
import "./Offerings.css";

const phases = [
  {
    icon: ClipboardCheck,
    name: "Diagnose",
    statement: "Establish the baseline",
    activities: [
      "Security maturity & operating model",
      "Site risk & security zoning",
      "Coverage & control gaps",
    ],
    detail:
      "Security maturity and operating-model assessment; site risk, critical-asset and security-zoning assessment; coverage, technology and control-gap analysis.",
    output: "As-Is Assessment Report",
  },
  {
    icon: FileText,
    name: "Design",
    statement: "Define the target state",
    activities: [
      "Integrated to-be architecture",
      "Use cases & control mapping",
      "DPR, BoQ & CAPEX phasing",
    ],
    detail:
      "Integrated to-be architecture and control mapping; use cases and functional and technical specifications; BoQ, cost estimates, CAPEX phasing and implementation roadmap.",
    output: "Detailed Project Report (DPR)",
  },
  {
    icon: Handshake,
    name: "Select & onboard SI",
    statement: "Appoint and mobilise the delivery partner",
    activities: [
      "RFP & tender documentation",
      "Technical and commercial evaluation",
      "Contract, SLA & mobilisation",
    ],
    detail:
      "RFP and tender documentation; technical and commercial bid-evaluation support; contract, SLA, milestone, mobilisation and governance framework.",
    output: "System Integrator Onboarded",
  },
  {
    icon: Settings,
    name: "Deliver",
    statement: "Govern implementation through go-live",
    activities: [
      "PMU/PMC programme governance",
      "Integration, FAT, SAT & UAT",
      "SOPs, training, acceptance & handover",
    ],
    detail:
      "PMU/PMC governance, schedule, risk and issue control; design approvals, system integration, FAT, SAT and UAT; SOPs, training, acceptance, handover and sign-off.",
    output: "System Go-Live",
  },
  {
    icon: ShieldCheck,
    name: "Post-Go-Live Support",
    statement: "Sustain performance and value",
    activities: [
      "SLA, uptime & service monitoring",
      "O&M implementation & vendor governance",
      "Optimisation & continuous improvement",
    ],
    detail:
      "SLA, uptime and service-performance monitoring; O&M implementation and vendor governance; incident, defect, optimisation and continuous-improvement tracking.",
    output: "Operational Assurance",
  },
] as const;

const principles = [
  {
    heading: "Vendor-neutral",
    detail: "Requirements and evaluation without OEM bias",
  },
  {
    heading: "Governance-led",
    detail: "Decision gates, traceable approvals and accountable ownership",
  },
  {
    heading: "Operations-focused",
    detail: "Go-live followed by measurable SLA and O&M performance",
  },
] as const;

export function Offerings() {
  const [stickyHeaderHeight, setStickyHeaderHeight] = useState(98);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const updateHeaderHeight = () => {
      setStickyHeaderHeight(Math.round(header.getBoundingClientRect().height));
    };

    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#offerings") return;

    const alignSection = () => {
      const section = document.getElementById("offerings");
      if (!section) return;
      const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      const top = section.getBoundingClientRect().top + window.scrollY - headerBottom - 8;
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    };

    const frame = window.requestAnimationFrame(alignSection);
    const timers = [250, 1000, 2500].map((delay) => window.setTimeout(alignSection, delay));
    window.addEventListener("load", alignSection);
    void document.fonts?.ready.then(alignSection);

    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("load", alignSection);
    };
  }, []);

  return (
    <section
      id="offerings"
      className="scroll-mt-24 box-border bg-background px-5 text-foreground md:px-8"
      style={{
        minHeight: `calc(100vh - ${stickyHeaderHeight}px)`,
        paddingBlock: "1.125rem",
      }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <header>
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
            <span aria-hidden="true" className="h-3 w-1.5 rounded-sm bg-ey-yellow" />
            SECTION 08
          </p>
          <h2 className="offerings-title mt-1 text-balance font-semibold tracking-[-0.035em] text-foreground">
            One advisory lifecycle—from diagnosis to sustained operations
          </h2>
          <p className="offerings-subtitle text-[18px] leading-[1.3] text-muted-foreground">
            Each phase ends with a defined programme output, with vendor neutrality and governance
            running through the full lifecycle.
          </p>
        </header>

        <div className="offerings-surface overflow-hidden rounded-xl border border-hairline bg-surface">
          <ol aria-label="EY advisory lifecycle" className="offerings-grid relative min-h-0 flex-1">
            <span
              aria-hidden="true"
              className="offerings-connector absolute left-[10%] right-[10%] top-[2.15rem] h-px bg-foreground/20"
            />

            {phases.map((phase, index) => (
              <li
                key={phase.name}
                className="offerings-phase relative min-w-0"
                aria-description={phase.detail}
              >
                <div className="offerings-phase-header relative text-center">
                  <span className="offerings-medallion relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1A1A24] text-ey-yellow ring-4 ring-surface">
                    <phase.icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
                  </span>

                  {index < phases.length - 1 ? (
                    <ArrowRight
                      aria-hidden="true"
                      className="offerings-phase-arrow absolute -right-2 top-[1.45rem] z-20 h-5 w-5 text-ey-yellow"
                      strokeWidth={2.4}
                    />
                  ) : null}

                  <p className="offerings-phase-number font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    PHASE {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="offerings-phase-title font-bold text-[#1A1A24]">{phase.name}</h3>
                  <p className="offerings-phase-statement font-medium text-muted-foreground">
                    {phase.statement}
                  </p>
                </div>

                <div className="offerings-card-wrap min-h-0">
                  <div className="offerings-phase-card w-full rounded-md border border-hairline bg-surface-2 text-left">
                    <ul className="offerings-activities text-[16px] text-[#1A1A24]/88">
                      {phase.activities.map((activity) => (
                        <li key={activity} className="flex gap-1.5">
                          <span
                            aria-hidden="true"
                            className="mt-[0.36rem] h-1.5 w-1.5 shrink-0 rounded-full bg-ey-yellow ring-1 ring-[#1A1A24]/15"
                          />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="offerings-phase-output border-t border-hairline pt-2">
                      <p className="font-mono text-[10px] font-bold uppercase leading-none tracking-[0.14em] text-muted-foreground">
                        PHASE OUTPUT
                      </p>
                      <p className="mt-1 text-[18px] font-bold leading-[1.08] text-[#1A1A24]">
                        {phase.output}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="offerings-principles grid shrink-0 bg-[#1A1A24] text-white">
            {principles.map((principle) => (
              <div
                key={principle.heading}
                className="offerings-principle relative flex flex-col justify-center px-5 py-3"
              >
                <p className="font-mono text-[12px] font-bold uppercase leading-none tracking-[0.14em] text-ey-yellow">
                  {principle.heading}
                </p>
                <p className="mt-1.5 text-[15px] leading-[1.16] text-white/82">
                  {principle.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
