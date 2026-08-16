import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Domain = {
  key: string;
  label: string;
  short: string;
  maturity: number;
  items: string[];
  reveals: { title: string; body: string }[];
};

const domains: Domain[] = [
  {
    key: "arch",
    label: "Architecture & zoning",
    short: "Architecture",
    maturity: 2,
    items: ["Site security architecture", "Compliance and procurement gaps"],
    reveals: [
      {
        title: "Where the security model is undefined",
        body: "Missing zone boundaries, inconsistent risk classification between blocks, and unclear demarcation between IT, OT and physical security ownership.",
      },
      {
        title: "Which regulations are already in scope",
        body: "Existing CEA/CERC/NERC/ISO obligations, site-specific statutory requirements, and procurement rules that constrain vendor selection.",
      },
      {
        title: "How the plant layout drives risk",
        body: "Distance between perimeter and critical assets, natural choke points, adjacent public areas, and how topology affects detection and response time.",
      },
    ],
  },
  {
    key: "cctv",
    label: "Surveillance systems",
    short: "CCTV",
    maturity: 2,
    items: ["CCTV inventory and health", "Camera placement adequacy", "Day/night visibility"],
    reveals: [
      {
        title: "Where coverage actually breaks",
        body: "Blind spots, unusable night footage, cameras aimed at the wrong risk, and legacy analog equipment that cannot be integrated into a modern VMS.",
      },
      {
        title: "Which feeds are operationally useful",
        body: "Resolution, frame rate, storage retention, and whether recorded evidence is admissible and accessible to security and operations teams.",
      },
      {
        title: "How analytics maturity compares",
        body: "Current reliance on manual monitoring versus available AI-based detection for intrusion, perimeter crossing, crowd formation and object left behind.",
      },
    ],
  },
  {
    key: "perimeter",
    label: "Perimeter protection",
    short: "Perimeter",
    maturity: 2,
    items: ["Perimeter protection coverage"],
    reveals: [
      {
        title: "Where the perimeter can be breached undetected",
        body: "Gaps in fencing, ineffective lighting, unmanned gates, and vegetation or structures that create natural hiding points.",
      },
      {
        title: "Which sensors are actually integrated",
        body: "Standalone fences, bollards, beams or patrol routes that do not feed a common alert stream or generate actionable control-room alarms.",
      },
      {
        title: "How deterrence works after dark",
        body: "Lighting uniformity, thermal coverage, drone patrolling gaps, and whether perimeter response forces can reach an intrusion point in time.",
      },
    ],
  },
  {
    key: "access",
    label: "Access & movement",
    short: "Access",
    maturity: 3,
    items: [
      "Gate and access-control controls",
      "Visitor and contractor movement",
      "Vehicle and material movement",
      "Security manpower deployment",
    ],
    reveals: [
      {
        title: "Which identities move through the plant",
        body: "Employee, contractor, visitor and vehicle flows; badge issuance discipline; and whether access rights are reviewed and revoked on time.",
      },
      {
        title: "Where material controls are weak",
        body: "Stores, tool cribs, scrap yards and fuel logistics points where material can leave without traceable authorization or weighing.",
      },
      {
        title: "How movement is monitored",
        body: "Escort policies, zone-based access enforcement, and whether guards, barriers and boom controls operate as a single system.",
      },
    ],
  },
  {
    key: "command",
    label: "Command centre",
    short: "ICCC",
    maturity: 2,
    items: ["Command centre / control room capability", "Incident logging and evidence management"],
    reveals: [
      {
        title: "How incidents are really handled",
        body: "Detection-to-response time, evidence integrity, whether the control room can act or only observe, and how escalations are tracked.",
      },
      {
        title: "What technology the command centre can absorb",
        body: "Display real estate, video wall capacity, workstation ergonomics, and ability to integrate VMS, ACS, fire, safety and OT alarms.",
      },
      {
        title: "Where situational awareness is incomplete",
        body: "Lack of GIS, missing camera-to-zone mapping, unclear runbooks, and manual incident logging that slows audit and review.",
      },
    ],
  },
  {
    key: "network",
    label: "Network & storage",
    short: "Network",
    maturity: 3,
    items: ["Network, storage and retention"],
    reveals: [
      {
        title: "What the system can and cannot sustain",
        body: "Retention limits, bandwidth headroom, storage redundancy, and whether the network can carry new camera, access and sensor loads.",
      },
      {
        title: "Where cyber-physical separation is unclear",
        body: "IT and OT network segmentation, camera VLAN hygiene, and how video storage is protected from ransomware or insider tampering.",
      },
      {
        title: "How archival evidence is managed",
        body: "Chain-of-custody procedures, export readiness, and whether retention periods satisfy legal and compliance requirements.",
      },
    ],
  },
  {
    key: "sop",
    label: "SOPs & drills",
    short: "SOPs",
    maturity: 2,
    items: ["SOPs, escalation and drills", "Integration with fire, safety and operational systems"],
    reveals: [
      {
        title: "Which controls exist only on paper",
        body: "Access rules, contractor discipline, escalation paths and incident playbooks that are documented but not rehearsed or enforced.",
      },
      {
        title: "How drills are conducted and scored",
        body: "Frequency of security drills, participation by operations and safety, after-action reviews, and gap closure tracking.",
      },
      {
        title: "Where integration with safety and operations breaks",
        body: "Whether fire, medical, operations and security control rooms share protocols, channels and a common incident timeline.",
      },
    ],
  },
  {
    key: "oandm",
    label: "O&M & SLA readiness",
    short: "O&M",
    maturity: 3,
    items: ["AMC, uptime, spares and SLA readiness"],
    reveals: [
      {
        title: "Where maintenance is reactive",
        body: "Camera downtime patterns, deferred repairs, vendor response delays, and whether spares are held on site or ordered ad-hoc.",
      },
      {
        title: "How SLAs are measured",
        body: "Uptime targets, mean time to repair, penalty clauses, and whether the plant receives meaningful performance reports from integrators.",
      },
      {
        title: "What capability exists in-house",
        body: "Technical staffing, training currency, and whether the plant can self-diagnose faults or remains fully dependent on vendors.",
      },
    ],
  },
];

const CX = 160;
const CY = 160;
const INNER = 52;
const OUTER = 125;
const LABEL_RADIUS = 170;
const GAP = 2.2; // degrees

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  const round = (n: number) => Math.round(n * 100) / 100;
  return { x: round(cx + r * Math.cos(rad)), y: round(cy + r * Math.sin(rad)) };
}

function sector(startDeg: number, endDeg: number, rInner: number, rOuter: number) {
  const s1 = polar(CX, CY, rOuter, startDeg);
  const e1 = polar(CX, CY, rOuter, endDeg);
  const e2 = polar(CX, CY, rInner, endDeg);
  const s2 = polar(CX, CY, rInner, startDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${s1.x} ${s1.y}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${e1.x} ${e1.y}`,
    `L ${e2.x} ${e2.y}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${s2.x} ${s2.y}`,
    "Z",
  ].join(" ");
}

export function AsIsAssessment() {
  const [activeKey, setActiveKey] = useState(domains[0]!.key);
  const [stickyHeaderHeight, setStickyHeaderHeight] = useState(98);
  const [sectionHeaderHeight, setSectionHeaderHeight] = useState(102);
  const sectionHeaderRef = useRef<HTMLElement | null>(null);
  const active = domains.find((d) => d.key === activeKey) ?? domains[0]!;
  const step = 360 / domains.length;

  useEffect(() => {
    const stickyHeader = document.querySelector("header");
    if (!stickyHeader) return;

    const measure = () => {
      setStickyHeaderHeight(Math.ceil(stickyHeader.getBoundingClientRect().height));
      if (sectionHeaderRef.current) {
        setSectionHeaderHeight(Math.ceil(sectionHeaderRef.current.getBoundingClientRect().height));
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stickyHeader);
    if (sectionHeaderRef.current) observer.observe(sectionHeaderRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const selectDomain = (key: string) => setActiveKey(key);

  return (
    <section
      id="as-is"
      className="scroll-mt-24 box-border bg-background px-5 text-foreground md:px-8"
      style={{
        minHeight: `calc(100vh - ${stickyHeaderHeight + 60}px)`,
        paddingBlock: "0.5rem",
        scrollMarginTop: "4rem",
      }}
    >
      <style>{`
        @media (min-width: 1024px) {
          .assessment-workspace {
            grid-template-columns: minmax(0, 0.9fr) minmax(0, 1fr);
            height: var(--assessment-workspace-height);
          }
          .assessment-framework-body {
            grid-template-columns: minmax(0, 330px) minmax(0, 1fr);
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl">
        <header ref={sectionHeaderRef}>
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
            <span aria-hidden className="h-3 w-1.5 shrink-0 rounded-sm bg-ey-yellow" />
            Section 05
          </p>
          <h2 className="mt-1 text-[2.75rem] font-semibold leading-[1.02] text-ey-green-deep">
            As-Is Security Assessment
          </h2>
          <p className="mt-1 text-lg leading-[1.3] text-muted-foreground">
            EY would assess the current security posture across the plant and its associated
            assets—on site and on record.
          </p>
        </header>

        <p className="mb-2 mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Assessment framework — eight domains
        </p>

        <div
          data-assessment-workspace
          className="assessment-workspace grid min-h-0 gap-5"
          style={
            {
              "--assessment-workspace-height": `calc(100vh - ${stickyHeaderHeight + sectionHeaderHeight + 141}px)`,
            } as CSSProperties
          }
        >
          <div className="flex min-h-0 min-w-0 flex-col rounded-xl border border-hairline bg-surface p-3 shadow-card">
            <div className="assessment-framework-body grid min-h-0 flex-1 items-center gap-3">
              <div className="flex min-h-0 min-w-0 items-center justify-center">
                <svg
                  viewBox="-70 -15 470 350"
                  data-maturity-wheel
                  role="group"
                  aria-label="Assessment maturity wheel across eight domains"
                  className="block h-[350px] w-[350px] max-w-full shrink-0"
                >
                  {domains.map((d, i) => {
                    const start = i * step + GAP;
                    const end = (i + 1) * step - GAP;
                    const filled = Math.round(INNER + ((OUTER - INNER) * d.maturity) / 5);
                    const isActive = d.key === activeKey;
                    const mid = (start + end) / 2;
                    const lp = polar(CX, CY, LABEL_RADIUS, mid);
                    const labelAnchor =
                      mid >= 45 && mid <= 135
                        ? "start"
                        : mid >= 225 && mid <= 315
                          ? "end"
                          : "middle";
                    return (
                      <g
                        key={d.key}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select ${d.label}`}
                        aria-pressed={isActive}
                        onMouseEnter={() => setActiveKey(d.key)}
                        onClick={() => selectDomain(d.key)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            selectDomain(d.key);
                          }
                        }}
                        className="cursor-pointer outline-none focus-visible:[&>path:first-of-type]:stroke-brand focus-visible:[&>path:first-of-type]:stroke-[3px]"
                      >
                        <path
                          d={sector(start, end, INNER, OUTER)}
                          className="fill-navy/[0.06] stroke-hairline"
                          strokeWidth={1}
                        />
                        <path
                          d={sector(start, end, INNER, filled)}
                          className={cn(
                            "transition-colors",
                            isActive ? "fill-[#FFE600]" : "fill-navy/70",
                          )}
                        />
                        <text
                          data-wheel-label
                          x={lp.x}
                          y={lp.y}
                          textAnchor={labelAnchor}
                          dominantBaseline="middle"
                          className={cn(
                            "text-[1.0625rem]",
                            isActive ? "fill-[#1A1A24] font-bold" : "fill-[#494965] font-medium",
                          )}
                        >
                          {d.short}
                        </text>
                      </g>
                    );
                  })}
                  <circle cx={CX} cy={CY} r={INNER - 5} className="fill-surface stroke-hairline" />
                  <text
                    x={CX}
                    y={CY - 8}
                    textAnchor="middle"
                    className="fill-muted-foreground text-sm font-semibold uppercase tracking-[0.14em]"
                  >
                    Maturity
                  </text>
                  <text
                    x={CX}
                    y={CY + 12}
                    textAnchor="middle"
                    className="fill-navy text-lg font-semibold"
                  >
                    {active.maturity}/5
                  </text>
                </svg>
              </div>

              <ul aria-label="Assessment domains" className="grid min-w-0 grid-cols-1 gap-1">
                {domains.map((d) => (
                  <li key={d.key}>
                    <button
                      type="button"
                      aria-pressed={d.key === activeKey}
                      onMouseEnter={() => setActiveKey(d.key)}
                      onClick={() => selectDomain(d.key)}
                      className={cn(
                        "flex min-h-9 w-full min-w-0 items-center rounded-md px-2 py-1 text-left text-[0.9375rem] font-medium leading-[1.15] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1",
                        d.key === activeKey
                          ? "bg-[#1A1A24] text-white"
                          : "text-foreground/85 hover:bg-surface-2",
                      )}
                    >
                      <span
                        data-domain-selector-label
                        className="min-w-0 flex-1 whitespace-normal py-px leading-[18px]"
                      >
                        {d.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-1.5 grid shrink-0 gap-0.5 border-t border-hairline pt-1.5 text-[0.8125rem] leading-[1.1] text-muted-foreground">
              <p>
                Maturity bands shown are illustrative placeholders — actual scoring is produced
                during the on-site assessment.
              </p>
              <p className="border-l-2 border-brand pl-2 text-foreground/90">
                The assessment creates the fact base for the to-be design, costing, and procurement
                plan.
              </p>
            </div>
          </div>

          <div
            data-assessment-detail
            className="flex min-h-0 min-w-0 flex-col rounded-xl bg-[#1A1A24] p-[1.125rem] text-white shadow-card"
          >
            <h3 className="text-xl font-semibold leading-tight">{active.label}</h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-brand">
              What we examine
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-1.5">
              {active.items.map((it) => (
                <li
                  key={it}
                  data-examine-chip
                  className="flex min-h-10 min-w-0 items-center rounded-md border border-white/20 px-2.5 py-1.5 text-lg font-medium leading-[1.3]"
                >
                  {it}
                </li>
              ))}
            </ul>

            <p className="mt-3 border-t border-white/10 pt-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand">
              What it reveals
            </p>
            <ol className="mt-2 grid min-h-0 flex-1 grid-cols-2 content-start gap-x-4 gap-y-2">
              {active.reveals.map((r, i) => (
                <li
                  key={r.title}
                  data-reveal-content
                  className={cn(
                    "flex min-w-0 gap-2",
                    i === 2 && "col-span-2 border-t border-white/10 pt-2",
                  )}
                >
                  <span className="mt-px shrink-0 font-mono text-base font-semibold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-lg font-semibold leading-[1.25]">{r.title}</p>
                    <p className="mt-0.5 text-lg leading-[1.3] text-white/75">{r.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
