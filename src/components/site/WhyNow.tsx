import {
  AlertTriangle,
  BarChart3,
  Building2,
  Cpu,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

import grid from "@/assets/why-1-grid.jpg";
import plant from "@/assets/why-3-plant.jpg";
import videowall from "@/assets/why-4-videowall.jpg";
import kpi from "@/assets/why-5-kpi.jpg";
import platform from "@/assets/why-6-platform.jpg";

const drivers = [
  { icon: ShieldCheck, image: grid },
  { icon: AlertTriangle, image: grid },
  { icon: Building2, image: plant },
  { icon: Layers, image: videowall },
  { icon: BarChart3, image: kpi },
  { icon: Cpu, image: platform },
] as const;

const shifts = [
  {
    heading: "Threats are becoming operational",
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
    heading: "Every plant has a different risk profile",
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
    heading: "Security architecture must scale with maturity",
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
        title: "Modernisation requires an integrated operating model",
        summary:
          "Video analytics, perimeter intelligence, access management, GIS, OT context and response workflows must operate together.",
      },
    ],
    implication: "Connect detection, decision and response.",
  },
] as const;

type Shift = (typeof shifts)[number];

function IntegratedShiftHeader({ shift, index }: { shift: Shift; index: number }) {
  const representative = drivers[shift.mainImageIndex]!;

  return (
    <div className="flex h-full flex-col bg-ey-green-deep">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <img
          src={representative.image}
          alt=""
          aria-hidden="true"
          width={480}
          height={180}
          style={{ filter: "saturate(0.58) contrast(1.18)", objectPosition: shift.objectPosition }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden="true" style={{ backgroundColor: shift.overlay, mixBlendMode: "color" }} className="absolute inset-0 opacity-25" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(8,20,17,0.02) 15%, rgba(8,20,17,0.36) 100%)" }}
        />
      </div>
      <div className="flex h-[3.05rem] shrink-0 items-center gap-2.5 bg-ey-green-deep px-3 text-white">
        <span
          style={{ backgroundColor: shift.accent, color: "var(--ey-green-deep)" }}
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md shadow-sm"
        >
          <shift.icon className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span className="font-mono text-sm font-bold tracking-[0.14em] text-white/75">0{index + 1}</span>
        <h3 style={{ lineHeight: 1.04 }} className="min-w-0 text-[0.98rem] font-semibold text-white">
          {shift.heading}
        </h3>
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

export function WhyNow({ embedded = false }: { embedded?: boolean }) {
  return (
    <section
      id={embedded ? undefined : "why-now"}
      style={{ paddingBlock: embedded ? 0 : "1.25rem" }}
      className={cn(
        "bg-ey-cream text-foreground",
        embedded ? "h-full" : "scroll-mt-24 min-h-[calc(100vh-5.75rem)]",
      )}
    >
      <div className={cn("mx-auto w-full", embedded ? "h-full" : "max-w-6xl px-5 md:px-8")}>
        {!embedded && (
          <div>
            <p className="flex items-center gap-3 text-base font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
              <span aria-hidden className="h-3 w-1.5 shrink-0 rounded-sm bg-ey-yellow" />
              Section 02
            </p>
            <h2 style={{ fontSize: "2.5rem" }} className="font-semibold leading-tight text-ey-green-deep">
              Why plant security architecture must change now
            </h2>
            <p className="mt-1 text-lg leading-[1.3] text-muted-foreground">
              Exposure is widening, plant risk remains uneven, and security performance is becoming measurable.
            </p>
          </div>
        )}

        <div className={cn("hidden lg:block", embedded ? "h-full" : "mt-3")}>
          <div
            data-why-now-infographic
            aria-label="Three strategic shifts changing plant security"
            className="grid h-full overflow-hidden rounded-xl border border-hairline bg-white"
            style={{
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gridTemplateRows: embedded ? "8rem minmax(0,1fr) minmax(0,1fr) 3.75rem" : "8.5rem 8.9375rem 8.9375rem 4rem",
            }}
          >
            {shifts.map((shift, index) => (
              <div key={`header-${shift.heading}`} className={cn(index > 0 && "border-l border-hairline")}>
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

        {!embedded && (
          <div className="mt-3 space-y-4 lg:hidden">
            {shifts.map((shift, index) => (
              <article key={shift.heading} style={{ backgroundColor: shift.tint }} className="border border-hairline">
                <div className="h-36">
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
