import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type PhaseKey = "understand" | "protect" | "respond" | "sustain";

type Domain = {
  key: string;
  number: string;
  phase: PhaseKey;
  label: string;
  short: string;
  maturity: number;
  question: string;
  evidence: string[];
  examine: { title: string; body: string }[];
  reveals: { title: string; body: string }[];
};

const phaseMeta: Record<PhaseKey, { label: string; range: string }> = {
  understand: { label: "UNDERSTAND", range: "01–02" },
  protect: { label: "PROTECT & DETECT", range: "03–05" },
  respond: { label: "RESPOND", range: "06–07" },
  sustain: { label: "SUSTAIN", range: "08–10" },
};

const domains: Domain[] = [
  {
    key: "criticality",
    number: "01",
    phase: "understand",
    label: "Asset criticality & security zoning",
    short: "Criticality",
    maturity: 2,
    question: "Are protection levels aligned to the consequence and criticality of the assets being protected?",
    evidence: ["Asset register", "Site / zoning drawings", "Criticality criteria", "Management interviews"],
    examine: [
      {
        title: "Critical assets & security zones",
        body: "Generating units, switchyards, fuel systems, control buildings, stores and other assets mapped by consequence and required protection level.",
      },
      {
        title: "Security architecture & ownership",
        body: "Zone boundaries, interfaces between physical security, operations, IT and OT, and the governance model that owns protection decisions.",
      },
    ],
    reveals: [
      {
        title: "Where criticality and protection are misaligned",
        body: "High-consequence assets receiving the same protection as low-risk areas, or security zones that do not reflect operational consequence.",
      },
      {
        title: "Where the security model is undefined",
        body: "Missing zone boundaries, inconsistent classifications and unclear ownership between security, operations, IT and OT.",
      },
      {
        title: "Where plant layout changes the required posture",
        body: "Standoff, choke points, internal routes and asset adjacency that materially affect deterrence, detection and response time.",
      },
    ],
  },
  {
    key: "vulnerabilities",
    number: "02",
    phase: "understand",
    label: "Site vulnerabilities & adversary pathways",
    short: "Vulnerabilities",
    maturity: 2,
    question: "Can an adversary reach, observe or attack a critical asset despite the intended security envelope?",
    evidence: ["Site & utility drawings", "Physical walkdown", "Adjacent-area observation", "Approach-path validation"],
    examine: [
      {
        title: "Site exposure & unconventional approaches",
        body: "Terrain, adjoining land, public roads, waterways, culverts, drains, underground services, utility corridors, rail or conveyor routes and UAS approaches.",
      },
      {
        title: "Critical asset accessibility & attack pathways",
        body: "Potential routes from outside the site towards transformers, switchyards, fuel systems, control buildings, cable galleries and other critical assets.",
      },
    ],
    reveals: [
      {
        title: "Where the formal perimeter can be bypassed",
        body: "Underground pipes, drains, culverts, waterways, cable routes, utility corridors and other penetrations that cross or circumvent the controlled boundary.",
      },
      {
        title: "Where geography creates exploitable exposure",
        body: "Adjacent fields, elevated terrain, public roads, nearby structures, vegetation and remote boundaries that provide concealment, observation or stand-off opportunities.",
      },
      {
        title: "Where critical assets remain reachable",
        body: "Ground, elevated or drone/UAS approaches that permit observation, access or attack despite conventional perimeter controls.",
      },
    ],
  },
  {
    key: "perimeter",
    number: "03",
    phase: "protect",
    label: "Perimeter & boundary protection",
    short: "Perimeter",
    maturity: 2,
    question: "Does the physical boundary deter, delay and expose intrusion along the pathways that matter?",
    evidence: ["Boundary walkdown", "Fence / gate records", "Lighting / night checks", "Intrusion alarm tests"],
    examine: [
      {
        title: "Boundary condition & delay measures",
        body: "Fencing, walls, anti-climb measures, gates, barriers, standoff, vulnerable penetrations, vegetation and physical condition.",
      },
      {
        title: "Boundary detection & illumination",
        body: "Lighting, intrusion sensors, thermal coverage, gate monitoring and whether boundary alarms are visible to the response organisation.",
      },
    ],
    reveals: [
      {
        title: "Where the perimeter can be penetrated or crossed",
        body: "Damaged or weak barriers, uncontrolled penetrations, climbable structures and sections that offer inadequate delay.",
      },
      {
        title: "Where intrusion may not be detected in time",
        body: "Poor illumination, sensor gaps, blind approaches and boundary sections without reliable alarm verification.",
      },
      {
        title: "Whether boundary protection matches the threat",
        body: "Controls that are technically present but insufficient for the site's terrain, consequence, response time or likely attack method.",
      },
    ],
  },
  {
    key: "access",
    number: "04",
    phase: "protect",
    label: "Access & movement control",
    short: "Access",
    maturity: 3,
    question: "Are people, vehicles, contractors and materials controlled from entry through movement inside the plant?",
    evidence: ["Access logs", "Gate / visitor records", "Movement observation", "Sample access tests"],
    examine: [
      {
        title: "Entry, screening & authorisation",
        body: "Gatehouses, barriers, locks, turnstiles, identity checks, visitor and contractor controls, vehicle search and access-right discipline.",
      },
      {
        title: "Internal movement & material control",
        body: "Restricted-area access, escorts, vehicle routes, stores, scrap, tools, fuel and other material flows through the site.",
      },
    ],
    reveals: [
      {
        title: "Who can enter and where they can go",
        body: "Gaps in identity assurance, badge governance, visitor control and restricted-area enforcement.",
      },
      {
        title: "Where vehicle and material controls are weak",
        body: "Movement routes, loading areas, stores, scrap yards and logistics points where traceability or search discipline breaks down.",
      },
      {
        title: "Where authorised access can become insider exposure",
        body: "Contractor, temporary-worker and privileged-access patterns that allow unnecessary reach into critical zones.",
      },
    ],
  },
  {
    key: "surveillance",
    number: "05",
    phase: "protect",
    label: "Surveillance & detection",
    short: "Surveillance",
    maturity: 2,
    question: "Can the plant reliably detect and verify activity across its critical zones and adversary pathways?",
    evidence: ["Camera inventory", "Coverage walkdown", "Recorded-video review", "Detection / alarm tests"],
    examine: [
      {
        title: "Coverage, visibility & camera fitness",
        body: "Camera placement, blind spots, day/night performance, lighting dependency, image quality and condition of the installed surveillance estate.",
      },
      {
        title: "Detection, analytics & alarm verification",
        body: "Intrusion detection, analytics, alarm rules, operator workload and whether events can be verified quickly enough to support response.",
      },
    ],
    reveals: [
      {
        title: "Where coverage actually breaks",
        body: "Blind spots, unusable night imagery and cameras positioned around equipment rather than the site's real threat pathways.",
      },
      {
        title: "Which feeds are operationally useful",
        body: "Whether resolution, frame rate, retention and evidence quality are sufficient for live decision-making and post-incident use.",
      },
      {
        title: "Where detection remains dependent on manual observation",
        body: "Events that are technically visible but unlikely to be noticed, verified or escalated in time by operators.",
      },
    ],
  },
  {
    key: "guarding",
    number: "06",
    phase: "respond",
    label: "Guarding & protective response",
    short: "Guarding",
    maturity: 2,
    question: "Can detection produce a timely, disciplined and proportionate physical response?",
    evidence: ["Deployment rosters", "Post orders", "Patrol observation", "Response-time exercise"],
    examine: [
      {
        title: "Guard deployment, posts & patrols",
        body: "Guard strength, shift deployment, post positioning, patrol routes, supervision, post orders, vulnerable periods and coverage of critical areas.",
      },
      {
        title: "Screening, intervention & response",
        body: "Gate checks, visitor and contractor screening, vehicle search, alarm response, communications, escalation and coordination with the command centre.",
      },
    ],
    reveals: [
      {
        title: "Whether manpower is aligned to actual risk",
        body: "Overstaffed low-risk posts, uncovered critical areas, ineffective patrol patterns, weak supervision and deployment that has evolved without reference to asset criticality.",
      },
      {
        title: "Whether protective procedures are actually performed",
        body: "Gaps between post orders and practice in screening, searching, patrolling, handover, key control, incident logging and escalation.",
      },
      {
        title: "Whether detection can produce an effective response",
        body: "Who responds to CCTV, intrusion and access alarms, how quickly they can reach the location, how they communicate and whether they can interrupt or contain the event.",
      },
    ],
  },
  {
    key: "command",
    number: "07",
    phase: "respond",
    label: "Command, control & incident coordination",
    short: "Command",
    maturity: 2,
    question: "Can the plant convert alarms and observations into coordinated decisions, escalation and incident control?",
    evidence: ["Incident logs", "Control-room observation", "Escalation SOPs", "Alarm-to-response test"],
    examine: [
      {
        title: "Control-room capability & situational awareness",
        body: "Workstations, video wall, GIS or maps, event visibility, communications and integration of surveillance, access and other security alarms.",
      },
      {
        title: "Incident command, logging & escalation",
        body: "Decision authority, incident logs, evidence handling, communications, escalation paths and coordination with police, fire and operations.",
      },
    ],
    reveals: [
      {
        title: "How incidents are really handled",
        body: "Detection-to-decision time, whether the control room can act or only observe, and how ownership changes as an event escalates.",
      },
      {
        title: "Where situational awareness is incomplete",
        body: "Missing zone mapping, fragmented alarm sources, manual logging and incomplete visibility of field responder location or status.",
      },
      {
        title: "Where coordination will slow a real response",
        body: "Unclear authority, duplicated communication channels, weak external-agency interfaces and evidence processes that fail under pressure.",
      },
    ],
  },
  {
    key: "integration",
    number: "08",
    phase: "sustain",
    label: "Systems integration & security infrastructure",
    short: "Integration",
    maturity: 3,
    question: "Can the technical security estate support integrated operations, growth and reliable evidence?",
    evidence: ["System architecture", "Device / network inventory", "Capacity records", "Integration / failover tests"],
    examine: [
      {
        title: "Platform, network & interoperability",
        body: "VMS and ACS integration, device compatibility, network architecture, segmentation, bandwidth, resilience and cyber-physical interfaces.",
      },
      {
        title: "Servers, storage & evidence retention",
        body: "Compute, storage capacity, redundancy, retention, archival controls, evidence export and capacity for additional cameras, analytics and sensors.",
      },
    ],
    reveals: [
      {
        title: "Where systems remain isolated",
        body: "Standalone cameras, access systems and alarms that cannot be correlated into one operating picture or workflow.",
      },
      {
        title: "What the infrastructure can and cannot sustain",
        body: "Bandwidth, compute and storage constraints that limit expansion, analytics, resilience or required retention.",
      },
      {
        title: "Where evidence and cyber-physical resilience are weak",
        body: "Single points of failure, unclear segmentation, insecure storage and chain-of-custody gaps affecting incident evidence.",
      },
    ],
  },
  {
    key: "sop",
    number: "09",
    phase: "sustain",
    label: "SOPs, drills & emergency preparedness",
    short: "SOPs",
    maturity: 2,
    question: "Do documented procedures reflect the real threats, vulnerabilities and response model of the plant?",
    evidence: ["SOP review", "Drill records", "Staff interviews", "Tabletop / live exercise"],
    examine: [
      {
        title: "SOPs, escalation & degraded-mode operations",
        body: "Post orders, incident playbooks, escalation thresholds, fallback arrangements and procedures for system or communications failure.",
      },
      {
        title: "Drills, exercises & interagency readiness",
        body: "Security drills, participation by operations and safety, after-action review, corrective actions and coordination with external responders.",
      },
    ],
    reveals: [
      {
        title: "Which controls exist only on paper",
        body: "Procedures that are documented but not understood, rehearsed, enforced or connected to the actual security architecture.",
      },
      {
        title: "Whether response arrangements have been tested",
        body: "Frequency, realism, scoring and closure of drills covering intrusion, sabotage, drone activity, insider events and major incidents.",
      },
      {
        title: "Where security, safety and operations diverge",
        body: "Conflicting escalation paths, communications and emergency priorities that could fragment incident command.",
      },
    ],
  },
  {
    key: "assurance",
    number: "10",
    phase: "sustain",
    label: "Assurance, maintenance & governance",
    short: "Assurance",
    maturity: 3,
    question: "Can the protection capability be maintained, measured and improved over its operating life?",
    evidence: ["Maintenance history", "SLA / KPI reports", "Audit / governance records", "Owner / vendor interviews"],
    examine: [
      {
        title: "Maintenance, uptime, spares & SLA discipline",
        body: "Preventive maintenance, failure history, spares, vendor support, mean time to repair, service levels and ownership of unresolved faults.",
      },
      {
        title: "Governance, performance & lifecycle assurance",
        body: "KPIs, audit trails, compliance reviews, training, change control, procurement constraints and lifecycle planning for physical-security assets.",
      },
    ],
    reveals: [
      {
        title: "Where maintenance is reactive",
        body: "Recurring faults, deferred repairs, vendor dependence and critical controls remaining unavailable without effective escalation.",
      },
      {
        title: "Whether security performance is measurable",
        body: "Availability of meaningful KPIs for uptime, incident response, false alarms, patrol performance, maintenance and corrective-action closure.",
      },
      {
        title: "Whether capability can be sustained after modernisation",
        body: "Skills, budgets, governance and lifecycle arrangements needed to keep the target-state system effective rather than merely commissioned.",
      },
    ],
  },
];

const CX = 150;
const CY = 150;
const INNER = 48;
const OUTER = 116;
const INDEX_RADIUS = 127;
const GAP = 1.9;

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

function arcPath(startDeg: number, endDeg: number, radius: number) {
  const start = polar(CX, CY, radius, startDeg);
  const end = polar(CX, CY, radius, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`;
}

export function AsIsAssessment() {
  const [activeKey, setActiveKey] = useState(domains[0]!.key);
  const [stickyHeaderHeight, setStickyHeaderHeight] = useState(98);
  const [sectionHeaderHeight, setSectionHeaderHeight] = useState(108);
  const sectionHeaderRef = useRef<HTMLElement | null>(null);
  const active = domains.find((domain) => domain.key === activeKey) ?? domains[0]!;
  const step = 360 / domains.length;

  useEffect(() => {
    const stickyHeader = document.querySelector("body > div header, header");
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

  const activePhase = active.phase;

  return (
    <section
      id="as-is"
      className="scroll-mt-24 box-border bg-background px-5 py-3 text-foreground md:px-8"
      style={{ minHeight: `calc(100vh - ${stickyHeaderHeight}px)` }}
    >
      <style>{`
        @media (min-width: 1024px) {
          .assessment-workspace-v2 {
            grid-template-columns: minmax(0, 0.98fr) minmax(0, 1.12fr);
            height: var(--assessment-workspace-height);
          }
          .assessment-left-body-v2 {
            grid-template-columns: minmax(0, 280px) minmax(0, 1fr);
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl">
        <header ref={sectionHeaderRef}>
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
            <span aria-hidden className="h-3 w-6 shrink-0 rounded-full bg-ey-yellow" />
            Section 05
          </p>
          <h2 className="mt-1 text-[2.75rem] font-semibold leading-[1.02] text-ey-green-deep">
            As-Is Physical Security Assessment
          </h2>
          <p className="mt-1 text-lg leading-[1.25] text-muted-foreground">
            EY would assess the plant&apos;s physical, technological and operational security posture — on site and on record.
          </p>
        </header>

        <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-lg border border-hairline bg-white lg:grid-cols-4">
          {(Object.keys(phaseMeta) as PhaseKey[]).map((phase) => {
            const meta = phaseMeta[phase];
            const isActive = phase === activePhase;
            return (
              <div
                key={phase}
                className={cn(
                  "flex min-h-[42px] items-center justify-between gap-3 border-hairline px-3 py-2 lg:border-l first:lg:border-l-0",
                  isActive ? "bg-[#10202D] text-white" : "bg-white text-[#41414D]",
                )}
              >
                <span className={cn("text-[10px] font-bold tracking-[0.12em]", isActive && "text-ey-yellow")}>{meta.label}</span>
                <span className={cn("font-mono text-[10px]", isActive ? "text-white/70" : "text-muted-foreground")}>{meta.range}</span>
              </div>
            );
          })}
        </div>

        <div className="mb-2 mt-2 flex items-center justify-between gap-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-muted-foreground">
            Assessment framework — 10 domains across four phases
          </p>
          <p className="hidden text-[10px] text-muted-foreground lg:block">
            Sequence: understand → protect & detect → respond → sustain
          </p>
        </div>

        <div
          className="assessment-workspace-v2 grid min-h-0 gap-4"
          style={
            {
              "--assessment-workspace-height": `calc(100vh - ${stickyHeaderHeight + sectionHeaderHeight + 142}px)`,
            } as CSSProperties
          }
        >
          <div className="flex min-h-0 min-w-0 flex-col rounded-xl border border-hairline bg-surface p-3 shadow-card">
            <div className="assessment-left-body-v2 grid min-h-0 flex-1 items-center gap-3">
              <div className="flex min-h-0 items-center justify-center">
                <svg
                  viewBox="0 0 300 300"
                  role="group"
                  aria-label="Physical security maturity wheel across ten assessment domains"
                  className="block h-[280px] w-[280px] max-w-full shrink-0"
                >
                  {([
                    { phase: "understand" as PhaseKey, start: 0, end: 72 },
                    { phase: "protect" as PhaseKey, start: 72, end: 180 },
                    { phase: "respond" as PhaseKey, start: 180, end: 252 },
                    { phase: "sustain" as PhaseKey, start: 252, end: 360 },
                  ]).map(({ phase, start, end }) => (
                    <path
                      key={phase}
                      d={arcPath(start + 2.5, end - 2.5, 140)}
                      fill="none"
                      stroke={phase === activePhase ? "#FFE600" : "#D0D0D6"}
                      strokeWidth={phase === activePhase ? 4 : 2.5}
                      strokeLinecap="round"
                    />
                  ))}

                  {domains.map((domain, index) => {
                    const start = index * step + GAP;
                    const end = (index + 1) * step - GAP;
                    const filled = Math.round(INNER + ((OUTER - INNER) * domain.maturity) / 5);
                    const isActive = domain.key === activeKey;
                    const mid = (start + end) / 2;
                    const indexPosition = polar(CX, CY, INDEX_RADIUS, mid);
                    return (
                      <g
                        key={domain.key}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select ${domain.label}`}
                        aria-pressed={isActive}
                        onMouseEnter={() => setActiveKey(domain.key)}
                        onClick={() => setActiveKey(domain.key)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setActiveKey(domain.key);
                          }
                        }}
                        className="cursor-pointer outline-none"
                      >
                        <path d={sector(start, end, INNER, OUTER)} fill="#F1F1F3" stroke="#D9D9DE" strokeWidth={0.8} />
                        <path d={sector(start, end, INNER, filled)} fill={isActive ? "#FFE600" : "#253948"} opacity={isActive ? 1 : 0.78} />
                        {isActive && (
                          <circle
                            cx={indexPosition.x}
                            cy={indexPosition.y}
                            r={9}
                            fill="#10202D"
                          />
                        )}
                        <text
                          x={indexPosition.x}
                          y={indexPosition.y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill={isActive ? "#FFE600" : "#8A8A95"}
                          fontWeight={isActive ? 800 : 600}
                          className={isActive ? "text-[9px]" : "text-[8px]"}
                        >
                          {domain.number}
                        </text>
                      </g>
                    );
                  })}

                  <circle cx={CX} cy={CY} r={INNER - 4} fill="#FFFFFF" stroke="#D9D9DE" />
                  <text x={CX} y={CY - 10} textAnchor="middle" fill="#666675" className="text-[8px] font-bold uppercase tracking-[0.11em]">
                    Security
                  </text>
                  <text x={CX} y={CY + 2} textAnchor="middle" fill="#666675" className="text-[8px] font-bold uppercase tracking-[0.11em]">
                    maturity
                  </text>
                  <text x={CX} y={CY + 24} textAnchor="middle" fill="#10202D" className="text-[19px] font-bold">
                    {active.maturity}/5
                  </text>
                </svg>
              </div>

              <ol aria-label="Assessment domains" className="grid min-w-0 grid-cols-1 gap-[3px]">
                {domains.map((domain) => {
                  const isActive = domain.key === activeKey;
                  return (
                    <li key={domain.key}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onMouseEnter={() => setActiveKey(domain.key)}
                        onClick={() => setActiveKey(domain.key)}
                        className={cn(
                          "grid min-h-[28px] w-full grid-cols-[28px_minmax(0,1fr)] items-center rounded-md px-1.5 py-1 text-left transition",
                          isActive ? "bg-[#10202D] text-white" : "text-[#34343F] hover:bg-[#F2F2F4]",
                        )}
                      >
                        <span className={cn("font-mono text-[10px] font-bold", isActive ? "text-ey-yellow" : "text-[#B39B00]")}>{domain.number}</span>
                        <span className="text-[10.5px] font-semibold leading-[1.12]">{domain.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="mt-2 border-t border-hairline pt-2">
              <p className="text-[9.5px] leading-[1.2] text-muted-foreground">
                Radial depth indicates maturity; yellow identifies the selected domain. Scores shown are illustrative placeholders and are produced through the on-site assessment.
              </p>
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl bg-[#1A1A24] text-white shadow-card">
            <div className="border-b border-white/10 px-4 pb-3 pt-3.5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[14px] font-bold text-ey-yellow">{active.number}</span>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/55">{phaseMeta[active.phase].label}</p>
              </div>
              <h3 className="mt-1 text-[20px] font-semibold leading-[1.1]">{active.label}</h3>
              <p className="mt-2 border-l-2 border-ey-yellow pl-3 text-[12px] font-medium leading-[1.3] text-white/88">
                {active.question}
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ey-yellow">What we examine</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {active.examine.map((item) => (
                  <div key={item.title} className="rounded-lg border border-white/15 bg-white/[0.035] p-2.5">
                    <p className="text-[12px] font-semibold leading-[1.15]">{item.title}</p>
                    <p className="mt-1 text-[9.5px] leading-[1.25] text-white/65">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="mt-3 border-t border-white/10 pt-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ey-yellow">What it reveals</p>
              <ol className="mt-2 space-y-2">
                {active.reveals.map((reveal, index) => (
                  <li key={reveal.title} className="grid grid-cols-[26px_minmax(0,1fr)] gap-2">
                    <span className="pt-px font-mono text-[11px] font-bold text-ey-yellow">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-[11.5px] font-semibold leading-[1.15]">{reveal.title}</p>
                      <p className="mt-0.5 text-[9.5px] leading-[1.24] text-white/66">{reveal.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-white/10 px-4 py-2">
              <div className="flex h-[34px] items-center gap-2.5">
                <p className="shrink-0 whitespace-nowrap text-[8.5px] font-bold uppercase tracking-[0.13em] text-ey-yellow">Evidence & tests</p>
                <div className="flex min-w-0 flex-1 flex-nowrap justify-end gap-1">
                  {active.evidence.map((item) => (
                    <span key={item} className="whitespace-nowrap rounded-full border border-white/15 px-1.5 py-0.5 text-[7.5px] font-medium text-white/72">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-3 rounded-lg border border-[#E2C900] bg-[#FFFDF0] px-4 py-2 text-[#1A1A24]">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D3AE00]" strokeWidth={1.8} aria-hidden />
          <p className="text-[10.5px] font-semibold leading-[1.2]">
            The assessment establishes the evidence-based baseline for risk prioritisation, target-state design, investment sequencing and procurement.
          </p>
        </div>
      </div>
    </section>
  );
}
