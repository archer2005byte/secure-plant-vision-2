import {
  AlertTriangle,
  BarChart3,
  Building2,
  Cpu,
  Info,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AccentMedallion, accentVars, type AccentSlot } from "./AccentCard";
import { cn } from "@/lib/utils";

import grid from "@/assets/why-1-grid.jpg";
import threat from "@/assets/why-2-threat.jpg";
import plant from "@/assets/why-3-plant.jpg";
import videowall from "@/assets/why-4-videowall.jpg";
import kpi from "@/assets/why-5-kpi.jpg";
import platform from "@/assets/why-6-platform.jpg";

const drivers: {
  icon: typeof ShieldCheck;
  slot: AccentSlot;
  image: string;
  title: string;
  body: string;
}[] = [
  {
    icon: ShieldCheck,
    slot: 1,
    image: grid,
    title: "Critical Infrastructure Is Now a National Security Asset",
    body: "Power generation is a critical infrastructure sector, and designated systems and assets may fall within India's Critical Information Infrastructure protection framework. A security incident no longer affects a plant alone—it can cascade across grid operations, fuel logistics, evacuation infrastructure, and regional economic activity.",
  },
  {
    icon: AlertTriangle,
    slot: 2,
    image: threat,
    title: "Threats Have Changed from Theft to Operational Disruption",
    body: "Traditional perimeter threats now coexist with coordinated intrusion, insider risk, drone reconnaissance, cyber-physical attacks, contractor vulnerabilities, and deliberate disruption of critical operations.",
  },
  {
    icon: Building2,
    slot: 3,
    image: plant,
    title: "Security Must Match Plant Risk",
    body: "Plant risk is not uniform. Security architecture must reflect asset scale, terrain, fuel type, population density, contractor flows, and local threat conditions.",
  },
  {
    icon: Layers,
    slot: 4,
    image: videowall,
    title: "Existing Surveillance Estates Are Reaching Their Limits",
    body: "Many plants already operate hundreds of cameras. The challenge is no longer video acquisition—it is integrating surveillance, access control, analytics, incident workflows and command visibility into a single operational architecture.",
  },
  {
    icon: BarChart3,
    slot: 5,
    image: kpi,
    title: "Security Performance is becoming Measurable",
    body: "Security performance increasingly influences operational continuity, contractor governance, regulatory audits, emergency preparedness and insurance exposure. Modern security programmes are measured through response times, incident intelligence and operational resilience rather than camera counts.",
  },
  {
    icon: Cpu,
    slot: 6,
    image: platform,
    title: "Modernization Requires an Enterprise Platform",
    body: "The next generation of plant security is built around integrated command platforms combining AI-enabled video analytics, perimeter intelligence, access management, drone awareness, GIS, OT integration and decision-support workflows.",
  },
];

const shifts = [
  {
    heading: "National exposure and evolving threats",
    icon: ShieldCheck,
    accent: "var(--ey-gold)",
    tint: "color-mix(in oklab, var(--ey-yellow) 7%, white)",
    overlay: "#c58b00",
    objectPosition: "center 58%",
    mainImageIndex: 0,
    driverIndexes: [0, 1] as const,
    compressedDrivers: [
      {
        title: "Critical infrastructure has national consequences",
        summary:
          "A serious plant incident can cascade into grid operations, fuel logistics, evacuation infrastructure and regional activity.",
      },
      {
        title: "Threats increasingly target continuity",
        summary:
          "Intrusion, insider risk, drones and cyber-physical attacks can disrupt operations without destroying the physical asset.",
      },
    ],
    implication: "Protect continuity—not only the perimeter.",
  },
  {
    heading: "Plant-specific capability gaps",
    icon: Layers,
    accent: "var(--ey-coral)",
    tint: "color-mix(in oklab, var(--ey-coral) 6%, white)",
    overlay: "#b83a2f",
    objectPosition: "center 45%",
    mainImageIndex: 3,
    driverIndexes: [2, 3] as const,
    compressedDrivers: [
      {
        title: "Plant risk is not uniform",
        summary:
          "Architecture must reflect plant scale, terrain, fuel, population exposure, contractor movement and the local threat environment.",
      },
      {
        title: "Existing surveillance estates are reaching their limits",
        summary:
          "The challenge is shifting from acquiring cameras to integrating video, access control, analytics and incident workflows.",
      },
    ],
    implication: "Design for the plant—not for a generic specification.",
  },
  {
    heading: "Enterprise resilience and modernisation",
    icon: Cpu,
    accent: "var(--ey-resilience)",
    tint: "color-mix(in oklab, var(--ey-resilience) 7%, white)",
    overlay: "#087a55",
    objectPosition: "center 52%",
    mainImageIndex: 5,
    driverIndexes: [4, 5] as const,
    compressedDrivers: [
      {
        title: "Security performance is becoming measurable",
        summary:
          "Response time, incident intelligence, auditability and continuity now matter more than camera counts.",
      },
      {
        title: "Modernisation requires an enterprise platform",
        summary:
          "Video analytics, perimeter intelligence, access management, GIS, OT context and response workflows must operate together.",
      },
    ],
    implication: "Connect detection, decision and response.",
  },
];

type Shift = (typeof shifts)[number];

function IntegratedShiftHeader({ shift, index }: { shift: Shift; index: number }) {
  const representative = drivers[shift.mainImageIndex]!;

  return (
    <div className="relative h-full bg-ey-green-deep">
      <img
        src={representative.image}
        alt=""
        aria-hidden="true"
        width={480}
        height={180}
        style={{ filter: "saturate(0.58) contrast(1.18)", objectPosition: shift.objectPosition }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" style={{ backgroundColor: shift.overlay, mixBlendMode: "color" }} className="absolute inset-0 opacity-30" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(8,20,17,0.08) 10%, rgba(8,20,17,0.88) 100%)" }}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 px-4 pb-3">
        <span
          style={{ backgroundColor: shift.accent, color: "var(--ey-green-deep)" }}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md shadow-sm"
        >
          <shift.icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <span
            style={{ color: "rgba(255,255,255,0.9)", textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}
            className="font-mono text-lg font-bold tracking-[0.16em]"
          >
            0{index + 1}
          </span>
          <h3 style={{ lineHeight: 1.05 }} className="text-xl font-semibold text-white">
            {shift.heading}
          </h3>
        </div>
      </div>
    </div>
  );
}

function CompressedDriver({ shift, driverIndex }: { shift: Shift; driverIndex: 0 | 1 }) {
  const compressed = shift.compressedDrivers[driverIndex]!;
  const original = drivers[shift.driverIndexes[driverIndex]]!;

  return (
    <div className="flex items-start gap-3">
      <span style={{ color: shift.accent }} className="mt-0.5 shrink-0">
        <original.icon className="h-4.5 w-4.5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h4 style={{ lineHeight: 1.1 }} className="text-lg font-semibold text-ey-green-deep">
          {compressed.title}
        </h4>
        <p style={{ lineHeight: 1.22 }} className="mt-1 text-lg text-foreground/80">
          {compressed.summary}
        </p>
      </div>
    </div>
  );
}

function StrategicImplication({ shift }: { shift: Shift }) {
  return (
    <div
      style={{
        borderTopColor: shift.accent,
        backgroundColor: `color-mix(in oklab, var(--navy) 88%, ${shift.accent})`,
      }}
      className="flex h-full items-center border-t-4 px-4 py-2 text-navy-foreground"
    >
      <p style={{ lineHeight: 1.15 }} className="text-lg font-semibold">
        {shift.implication}
      </p>
    </div>
  );
}

export function WhyNow() {
  const [showMore, setShowMore] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);
  const supplementalHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const restoreMoreButtonFocusRef = useRef(false);

  useEffect(() => {
    if (showMore) {
      supplementalHeadingRef.current?.focus({ preventScroll: true });
      return;
    }
    if (restoreMoreButtonFocusRef.current) {
      restoreMoreButtonFocusRef.current = false;
      moreButtonRef.current?.focus({ preventScroll: true });
    }
  }, [showMore]);

  const openMoreInformation = () => {
    setShowMore(true);
  };

  const closeMoreInformation = () => {
    restoreMoreButtonFocusRef.current = true;
    setShowMore(false);
  };

  if (showMore) {
    return (
      <section id="why-now" className="scroll-mt-24 bg-ey-cream py-8">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <div className="flex flex-wrap items-center gap-4 border-b border-hairline pb-4">
            <p className="flex items-center gap-3 text-lg font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
              <span aria-hidden className="h-3 w-1.5 shrink-0 rounded-sm bg-ey-yellow" />
              Section 02
            </p>
            <button
              type="button"
              onClick={closeMoreInformation}
              className="rounded-md border border-ey-gold px-3 py-2 text-lg font-semibold text-ey-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ey-gold focus-visible:ring-offset-2"
            >
              ← Back to Section 02
            </button>
          </div>

          <h2
            ref={supplementalHeadingRef}
            id="why-now-more-information-heading"
            tabIndex={-1}
            className="mt-5 text-3xl font-semibold leading-tight text-ey-green-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ey-gold"
          >
            More information on the six drivers
          </h2>

          <div id="why-now-more-information" role="region" aria-labelledby="why-now-more-information-heading" className="mt-6 space-y-8">
            {shifts.map((shift, shiftIndex) => (
              <section key={shift.heading} aria-labelledby={`why-now-shift-${shiftIndex + 1}`}>
                <div className="flex items-center gap-3">
                  <span style={{ color: shift.accent }} className="font-mono text-lg font-bold tracking-[0.16em]">
                    0{shiftIndex + 1}
                  </span>
                  <h3 id={`why-now-shift-${shiftIndex + 1}`} className="text-2xl font-semibold text-ey-green-deep">
                    {shift.heading}
                  </h3>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {shift.driverIndexes.map((driverIndex) => {
                    const driver = drivers[driverIndex]!;
                    return (
                      <article
                        key={driver.title}
                        style={accentVars(driver.slot)}
                        className="border border-[color:color-mix(in_oklab,var(--a)_25%,transparent)] bg-white p-5"
                      >
                        <img
                          src={driver.image}
                          alt=""
                          aria-hidden="true"
                          width={560}
                          height={240}
                          className="h-32 w-full rounded-md object-cover"
                        />
                        <div className="mt-4 flex items-start gap-3">
                          <AccentMedallion>
                            <driver.icon className="h-5 w-5" aria-hidden="true" />
                          </AccentMedallion>
                          <h4 className="text-xl font-semibold leading-snug text-ey-green-deep">{driver.title}</h4>
                        </div>
                        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{driver.body}</p>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="why-now"
      style={{ paddingBlock: "1.25rem" }}
      className="scroll-mt-24 min-h-[calc(100vh-5.75rem)] bg-ey-cream text-foreground"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div>
          <p className="flex items-center gap-3 text-base font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
            <span aria-hidden className="h-3 w-1.5 shrink-0 rounded-sm bg-ey-yellow" />
            Section 02
          </p>
          <h2 style={{ fontSize: "2.5rem" }} className="font-semibold leading-tight text-ey-green-deep">
            Why plant security architecture must change now
          </h2>
          <div className="mt-1 flex items-center justify-between gap-5">
            <p className="text-lg leading-[1.3] text-muted-foreground">
              Exposure is widening, plant risk remains uneven, and security performance is becoming measurable.
            </p>
            <button
              ref={moreButtonRef}
              type="button"
              onClick={openMoreInformation}
              aria-expanded={false}
              aria-controls="why-now-more-information"
              className="inline-flex shrink-0 items-center gap-2 rounded-md border border-foreground/20 px-3 py-1.5 text-lg font-medium text-muted-foreground hover:border-ey-gold hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ey-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ey-cream"
            >
              <Info className="h-4 w-4" aria-hidden="true" />
              More information
            </button>
          </div>
        </div>

        <div className="mt-3 hidden lg:block">
          <div
            data-why-now-infographic
            aria-label="Three strategic shifts changing plant security"
            className="grid rounded-xl border border-hairline bg-white"
            style={{
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gridTemplateRows: "7.75rem 8.9375rem 8.9375rem 4rem",
            }}
          >
            {shifts.map((shift, index) => (
              <div
                key={`header-${shift.heading}`}
                className={cn(index > 0 && "border-l border-hairline")}
              >
                <IntegratedShiftHeader shift={shift} index={index} />
              </div>
            ))}

            {shifts.map((shift, index) => (
              <div
                key={`driver-one-${shift.heading}`}
                className={cn("border-t border-hairline px-4", index > 0 && "border-l")}
                style={{ backgroundColor: shift.tint, paddingBlock: "0.375rem" }}
              >
                <CompressedDriver shift={shift} driverIndex={0} />
              </div>
            ))}

            {shifts.map((shift, index) => (
              <div
                key={`driver-two-${shift.heading}`}
                className={cn("border-t border-hairline px-4", index > 0 && "border-l")}
                style={{ backgroundColor: shift.tint, paddingBlock: "0.375rem" }}
              >
                <CompressedDriver shift={shift} driverIndex={1} />
              </div>
            ))}

            {shifts.map((shift, index) => (
              <div key={`implication-${shift.heading}`} className={cn(index > 0 && "border-l border-l-white/10")}>
                <StrategicImplication shift={shift} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-4 lg:hidden">
          {shifts.map((shift, index) => {
            return (
              <article key={shift.heading} style={{ backgroundColor: shift.tint }} className="border border-hairline">
                <div className="h-32">
                  <IntegratedShiftHeader shift={shift} index={index} />
                </div>
                <div className="space-y-4 px-4 py-4">
                  <CompressedDriver shift={shift} driverIndex={0} />
                  <CompressedDriver shift={shift} driverIndex={1} />
                </div>
                <div className="h-20">
                  <StrategicImplication shift={shift} />
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
