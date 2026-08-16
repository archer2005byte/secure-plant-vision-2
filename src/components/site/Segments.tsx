import {
  BarChart3,
  Camera,
  CircleGauge,
  Clock3,
  Fence,
  HardDrive,
  Layers3,
  Network,
  RadioTower,
  ShieldCheck,
  Unplug,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type IllustrationProps = { accentColor: string };

function EnterpriseIllustration({ accentColor }: IllustrationProps) {
  return (
    <svg viewBox="0 0 320 86" className="h-full w-full text-white/85" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M55 52h52M107 52l24-20M107 52l24 20M183 32h34M183 52h34M183 72h34" opacity=".55" />
        <circle cx="107" cy="52" r="7" fill={accentColor} stroke={accentColor} />
        <rect x="16" y="38" width="39" height="28" rx="4" />
        <path d="M23 66V50l9-6v8l9-6v20M47 38V27h5v11" />
        <rect x="131" y="20" width="52" height="24" rx="4" />
        <path d="M138 44V31l9-5v7l9-5v16M174 20V12h4v8" />
        <rect x="131" y="60" width="52" height="24" rx="4" />
        <path d="M138 84V71l9-5v7l9-5v16M174 60v-8h4v8" />
        <rect x="217" y="22" width="86" height="60" rx="8" />
        <path d="M231 66h58M231 56h58M231 36h23v10h-23zM264 36h25v10h-25z" />
        <circle cx="238" cy="72" r="2" fill={accentColor} stroke={accentColor} />
        <circle cx="247" cy="72" r="2" fill={accentColor} stroke={accentColor} />
      </g>
    </svg>
  );
}

function BrownfieldIllustration({ accentColor }: IllustrationProps) {
  return (
    <svg viewBox="0 0 320 86" className="h-full w-full text-white/85" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <rect x="12" y="18" width="105" height="64" rx="8" strokeDasharray="5 5" opacity=".7" />
        <path d="M28 35h34l8 8h31M28 56h18l8-8h30l9 9h12M28 69h52" />
        <circle cx="28" cy="35" r="4" fill={accentColor} stroke={accentColor} />
        <circle cx="28" cy="56" r="4" fill={accentColor} stroke={accentColor} />
        <circle cx="28" cy="69" r="4" fill={accentColor} stroke={accentColor} />
        <path d="M129 50h54M170 38l13 12-13 12" stroke={accentColor} strokeWidth="3" />
        <rect x="198" y="12" width="108" height="70" rx="8" />
        <path d="M215 30h74M215 45h74M215 60h74" opacity=".55" />
        <circle cx="224" cy="30" r="3" fill={accentColor} stroke={accentColor} />
        <circle cx="224" cy="45" r="3" fill={accentColor} stroke={accentColor} />
        <circle cx="224" cy="60" r="3" fill={accentColor} stroke={accentColor} />
        <path d="M244 30h33M244 45h33M244 60h33" />
      </g>
    </svg>
  );
}

function RemoteIllustration({ accentColor }: IllustrationProps) {
  return (
    <svg viewBox="0 0 320 86" className="h-full w-full text-white/85" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M15 76h290M36 76c16-25 31-35 47-35s30 10 47 35M177 76c13-18 26-26 39-26s26 8 39 26" opacity=".45" />
        <path d="M108 76V52l12-7v9l13-8v30M139 52V36h6v16" />
        <path d="M76 76V57M70 57h12M73 63h6M238 76V49M231 49h14M234 56h8" />
        <path d="M60 59c7-10 15-15 24-15M54 50c9-14 19-21 30-21M251 48c12-14 25-21 39-21M258 58c9-10 19-15 30-15" opacity=".7" />
        <path d="M177 18h26M186 12l8 6-8 6M172 25l-7 5M208 25l7 5" stroke={accentColor} />
        <circle cx="84" cy="44" r="3" fill={accentColor} stroke={accentColor} />
        <circle cx="290" cy="27" r="4" fill={accentColor} stroke={accentColor} />
        <path d="M145 42c19-13 39-17 60-13" stroke={accentColor} strokeDasharray="5 5" />
      </g>
    </svg>
  );
}

const pathways = [
  {
    title: "Established multi-site estates",
    statement: "From installed surveillance to enterprise orchestration",
    accentColor: "#FFE600",
    bodyTint: "#FFFCE1",
    illustration: EnterpriseIllustration,
    signals: [
      { text: "Extensive surveillance already in place", icon: Camera },
      { text: "Site-level systems across mixed OEMs", icon: Network },
      { text: "Limited enterprise orchestration and analytics", icon: BarChart3 },
    ],
    stages: ["Integrate", "Orchestrate", "Apply analytics"],
    outcome: "Unified command and analytics-led operations",
    outcomeIcon: CircleGauge,
  },
  {
    title: "Brownfield / standalone estates",
    statement: "From isolated systems to phased integration",
    accentColor: "#D97900",
    bodyTint: "#FFF5E8",
    illustration: BrownfieldIllustration,
    signals: [
      { text: "Standalone, NVR-led deployments", icon: HardDrive },
      { text: "Uneven coverage and limited interoperability", icon: Unplug },
      { text: "Investment phased around live operations", icon: Layers3 },
    ],
    stages: ["Assess", "Prioritise", "Modernise in phases"],
    outcome: "Phased modernisation and integrated security",
    outcomeIcon: Workflow,
  },
  {
    title: "Remote / elevated-threat assets",
    statement: "From limited visibility to detection at depth",
    accentColor: "#C43B32",
    bodyTint: "#FFF0EE",
    illustration: RemoteIllustration,
    signals: [
      { text: "Extended, difficult-to-observe perimeters", icon: Fence },
      { text: "Delayed external reinforcement", icon: Clock3 },
      { text: "Ground intrusion and low-altitude aerial threats", icon: RadioTower },
    ],
    stages: ["Detect at depth", "Verify early", "Coordinate response"],
    outcome: "Earlier warning and coordinated response",
    outcomeIcon: ShieldCheck,
  },
] satisfies Array<{
  title: string;
  statement: string;
  accentColor: string;
  bodyTint: string;
  illustration: (props: IllustrationProps) => React.JSX.Element;
  signals: Array<{ text: string; icon: LucideIcon }>;
  stages: string[];
  outcome: string;
  outcomeIcon: LucideIcon;
}>;

type Pathway = (typeof pathways)[number];

function ArchetypeHeader({ pathway, index }: { pathway: Pathway; index: number }) {
  const Illustration = pathway.illustration;
  return (
    <header
      className="relative bg-[#1A1A24] px-3 py-2.5 text-white"
      style={{
        "--path-accent": pathway.accentColor,
        borderTop: `5px solid ${pathway.accentColor}`,
      } as React.CSSProperties}
    >
      <div className="flex items-center gap-2" style={{ height: "58px" }}>
        <div
          className="shrink-0"
          style={{ width: "clamp(96px, 7vw, 112px)", height: "58px", flexBasis: "clamp(96px, 7vw, 112px)" }}
        >
          <Illustration accentColor={pathway.accentColor} />
        </div>
        <div className="min-w-0">
          <p
            className="font-mono font-bold tracking-[0.16em] text-[var(--path-accent)]"
            style={{ fontSize: "14px", lineHeight: 1 }}
          >
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-0.5 font-semibold text-white" style={{ fontSize: "19px", lineHeight: 1.12 }}>
            {pathway.title}
          </h3>
        </div>
      </div>
      <p className="mt-1 font-medium text-white/85" style={{ fontSize: "16px", lineHeight: 1.2 }}>
        {pathway.statement}
      </p>
    </header>
  );
}

function StartingSignals({ pathway }: { pathway: Pathway }) {
  return (
    <ul className="grid h-full grid-rows-3 px-3 py-1">
      {pathway.signals.map(({ text, icon: Icon }) => (
        <li
          key={text}
          className="flex min-w-0 items-center gap-2.5 text-[#1A1A24]"
          style={{ fontSize: "18px", lineHeight: 1.2 }}
        >
          <Icon aria-hidden size={23} strokeWidth={1.8} style={{ color: pathway.accentColor }} className="shrink-0" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

function ModernisationPathway({ pathway }: { pathway: Pathway }) {
  return (
    <div
      className="relative grid h-full items-start px-3 pt-2"
      style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
    >
      <span
        aria-hidden
        className="absolute"
        style={{ left: "17%", right: "17%", top: "15px", height: "3px", backgroundColor: pathway.accentColor }}
      />
      {[33.333, 66.666].map((left) => (
        <span
          key={left}
          aria-hidden
          className="absolute"
          style={{
            left: `calc(${left}% - 7px)`,
            top: "10px",
            width: "10px",
            height: "10px",
            borderTop: `3px solid ${pathway.accentColor}`,
            borderRight: `3px solid ${pathway.accentColor}`,
            rotate: "45deg",
          }}
        />
      ))}
      {pathway.stages.map((stage) => (
        <div key={stage} className="relative z-[1] flex min-w-0 flex-col items-center px-1 text-center">
          <span
            aria-hidden
            className="rounded-full bg-white"
            style={{ width: "16px", height: "16px", border: `3px solid ${pathway.accentColor}` }}
          />
          <span
            className="mt-2 font-bold uppercase text-[#1A1A24]"
            style={{ fontSize: "17px", lineHeight: 1.12 }}
          >
            {stage}
          </span>
        </div>
      ))}
    </div>
  );
}

function Outcome({ pathway }: { pathway: Pathway }) {
  const OutcomeIcon = pathway.outcomeIcon;
  return (
    <footer
      className="flex items-center gap-2.5 bg-[#1A1A24] px-3 text-white"
      style={{ borderTop: `4px solid ${pathway.accentColor}` }}
    >
      <OutcomeIcon aria-hidden size={23} strokeWidth={1.9} style={{ color: pathway.accentColor }} className="shrink-0" />
      <p className="font-semibold" style={{ fontSize: "18px", lineHeight: 1.22 }}>{pathway.outcome}</p>
    </footer>
  );
}

export function Segments() {
  return (
    <section
      id="segments"
      className="scroll-mt-24 bg-background py-6 text-foreground"
      style={{ minHeight: "calc(100vh - 98px)" }}
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div>
          <p className="flex items-center gap-3 text-base font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
            <span aria-hidden className="h-3 w-1.5 shrink-0 rounded-sm bg-ey-yellow" />
            Section 03
          </p>
          <h2
            className="mt-1 whitespace-normal font-semibold leading-[1.04] text-ey-green-deep lg:whitespace-nowrap"
            style={{ fontSize: "clamp(42px, 3.25vw, 56px)", lineHeight: 1.04 }}
          >
            One sector. Three security starting points.
          </h2>
          <p className="mt-1 text-[18px] leading-[1.35] text-muted-foreground">
            The modernisation path depends on surveillance maturity, operating scale and threat exposure.
          </p>
        </div>

        <div
          data-segments-infographic
          aria-label="Three security modernisation pathways"
          className="mt-3 grid overflow-visible rounded-xl border border-[#C8C8D0] bg-white lg:grid-cols-3"
        >
          {pathways.map((pathway, index) => (
            <article
              key={pathway.title}
              className={cn(
                "grid min-w-0",
                index > 0 && "border-t border-[#C8C8D0] lg:border-l lg:border-t-0",
              )}
              style={{
                backgroundColor: pathway.bodyTint,
                gridTemplateRows: "122px 150px 86px 72px",
              }}
            >
              <ArchetypeHeader pathway={pathway} index={index} />
              <StartingSignals pathway={pathway} />
              <div className="border-t border-[#C8C8D0]">
                <ModernisationPathway pathway={pathway} />
              </div>
              <Outcome pathway={pathway} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
