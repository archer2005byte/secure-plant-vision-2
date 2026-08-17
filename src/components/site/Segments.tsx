import {
  BarChart3,
  Building2,
  Camera,
  CheckCircle2,
  Cpu,
  Eye,
  KeyRound,
  Network,
  RadioTower,
  Server,
  ShieldCheck,
  Target,
} from "lucide-react";

import commandCentreImage from "@/assets/arch-command.jpg";
import establishedPlantImage from "@/assets/why-3-plant.jpg";
import brownfieldPlantImage from "@/assets/arch-perimeter.jpg";

const pathways = [
  {
    number: "01",
    title: "Established multi-site estates",
    strap: "STANDARDISE, INTEGRATE, THEN SCALE",
    bullets: [
      "Extensive surveillance already deployed across plants",
      "Site-level systems built over time across multiple OEMs",
      "Uneven standards, workflows and operating practices across locations",
      "Limited enterprise-wide visibility, orchestration and analytics",
    ],
    stages: ["Integrate", "Standardise", "Orchestrate", "Apply analytics"],
    target:
      "Enterprise-wide command, common governance and analytics-led security operations",
  },
  {
    number: "02",
    title: "Brownfield / standalone estates",
    strap: "ASSESS, PRIORITISE, THEN MODERNISE",
    bullets: [
      "Standalone, NVR-led or partially integrated deployments",
      "Uneven surveillance coverage and legacy equipment",
      "Limited interoperability across cameras, access control and other security systems",
      "Modernisation constrained by live operations, existing infrastructure and phased investment",
    ],
    stages: ["Assess", "Prioritise", "Integrate", "Modernise in phases"],
    target:
      "Integrated security through sequenced, investment-led modernisation",
  },
] as const;

function Capability({ icon: Icon, label }: { icon: typeof Eye; label: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2 px-2.5 py-1.5 text-white">
      <Icon className="h-5 w-5 shrink-0" strokeWidth={1.7} aria-hidden />
      <span className="text-[12px] font-semibold leading-[1.08]">{label}</span>
    </div>
  );
}

function EstablishedVisual() {
  return (
    <div className="relative h-[240px] overflow-hidden bg-[#183047] text-white">
      <img
        src={establishedPlantImage}
        alt="Established multi-site generation estate"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "saturate(.82) contrast(1.04) brightness(.96)", objectPosition: "center 50%" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,39,61,.34),rgba(14,39,61,.08))]" />

      <div className="absolute left-3 top-3 w-[31%] space-y-1.5">
        {["PLANT A", "PLANT B", "PLANT C"].map((plant, index) => (
          <div key={plant} className="flex h-[46px] overflow-hidden rounded border border-white/40 bg-[#102538]/82 shadow-sm backdrop-blur-[1px]">
            <div className="relative w-[58%] overflow-hidden border-r border-white/25">
              <img
                src={establishedPlantImage}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
                style={{ objectPosition: `${48 + index * 6}% 50%`, filter: "brightness(.9) saturate(.8)" }}
              />
              <span className="absolute left-2 top-1 text-[10px] font-bold tracking-[0.08em] text-white">{plant}</span>
            </div>
            <div className="grid flex-1 grid-cols-2 place-items-center gap-0.5 p-1 text-white/90">
              <Camera className="h-3.5 w-3.5" strokeWidth={1.6} />
              <Server className="h-3.5 w-3.5" strokeWidth={1.6} />
              <KeyRound className="h-3.5 w-3.5" strokeWidth={1.6} />
              <Network className="h-3.5 w-3.5" strokeWidth={1.6} />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute left-[34%] top-[74px] flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#1A3850]/84 shadow-lg">
          <ShieldCheck className="h-7 w-7 text-white" strokeWidth={1.6} />
        </div>
        <div className="h-1 w-12 bg-ey-yellow" />
        <span className="h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-ey-yellow" />
      </div>

      <div className="absolute right-3 top-8 w-[43%] overflow-hidden rounded-md border border-white/45 bg-[#0D1E2B]/90 shadow-xl">
        <img
          src={commandCentreImage}
          alt="Enterprise command centre"
          className="h-[122px] w-full object-cover"
          style={{ filter: "brightness(1.04) saturate(.88) contrast(1.03)" }}
        />
        <div className="bg-[#101923]/92 px-3 py-1.5 text-center text-[11px] font-bold uppercase tracking-[0.05em] text-ey-yellow">
          Enterprise command centre
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 grid grid-cols-4 divide-x divide-white/20 bg-[#10202D]/94">
        <Capability icon={Eye} label="Unified visibility" />
        <Capability icon={Network} label="Centralised orchestration" />
        <Capability icon={BarChart3} label="Analytics & insights" />
        <Capability icon={ShieldCheck} label="Governance & compliance" />
      </div>
    </div>
  );
}

const fragmented = [
  { icon: Camera, label: "Cameras" },
  { icon: KeyRound, label: "Access control" },
  { icon: Server, label: "Local NVR" },
  { icon: Cpu, label: "Legacy systems" },
] as const;

const integrated = [
  { icon: Camera, label: "Unified surveillance" },
  { icon: KeyRound, label: "Access management" },
  { icon: ShieldCheck, label: "Perimeter protection" },
  { icon: Cpu, label: "Analytics & AI" },
  { icon: RadioTower, label: "Communication systems" },
  { icon: Server, label: "Centralised management" },
] as const;

function BrownfieldVisual() {
  return (
    <div className="relative h-[240px] overflow-hidden bg-[#645E55] text-white">
      <img
        src={brownfieldPlantImage}
        alt="Operational brownfield power plant"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "saturate(.68) contrast(1.02) brightness(1.08) sepia(.08)", objectPosition: "center 50%" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(49,47,44,.24),rgba(49,47,44,.06))]" />

      <div className="absolute left-3 top-3 grid w-[29%] gap-2">
        {fragmented.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 rounded bg-[#1B2630]/82 px-2 py-1.5 backdrop-blur-[1px]">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/70">
              <Icon className="h-4 w-4" strokeWidth={1.6} />
            </span>
            <span className="text-[11px] font-semibold">{label}</span>
          </div>
        ))}
      </div>

      <div className="absolute right-[30%] top-[88px] flex items-center">
        <div className="h-1 w-10 bg-ey-yellow" />
        <span className="h-0 w-0 border-y-[11px] border-l-[17px] border-y-transparent border-l-ey-yellow" />
      </div>

      <div className="absolute bottom-3 right-3 top-3 w-[28%] overflow-hidden rounded-md border border-ey-yellow bg-[#FFFDF3]/96 text-[#1A1A24] shadow-lg">
        <div className="border-b border-[#D9C13B]/55 px-2 py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.04em] text-[#8C7500]">
          Integrated site security
        </div>
        <div className="grid grid-cols-2 gap-x-1 gap-y-2 px-2 py-2">
          {integrated.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
              <span className="mt-1 text-[9px] font-semibold leading-[1.05]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pathway({ stages }: { stages: readonly string[] }) {
  return (
    <div className="relative mt-2 grid grid-cols-4 gap-1 rounded-md bg-[#FFF9D8] px-2 pb-2 pt-2">
      <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[14px] h-[2px] bg-[#E8C900]" />
      {stages.map((stage) => (
        <div key={stage} className="relative z-[1] flex min-w-0 flex-col items-center text-center">
          <span className="h-[15px] w-[15px] rounded-full border-[3px] border-[#E8C900] bg-white" />
          <span className="mt-2 text-[12px] font-bold uppercase leading-[1.06] text-[#1A1A24]">{stage}</span>
        </div>
      ))}
    </div>
  );
}

export function Segments() {
  return (
    <section
      id="segments"
      className="scroll-mt-24 bg-background px-5 py-4 text-foreground md:px-8"
      style={{ minHeight: "calc(100vh - 98px)" }}
    >
      <div className="mx-auto w-full max-w-[118rem]">
        <header>
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
            <span aria-hidden className="h-3 w-6 shrink-0 rounded-full bg-ey-yellow" />
            Section 03 — Starting position
          </p>
          <h2 className="mt-1 font-semibold leading-[1.02] text-ey-green-deep" style={{ fontSize: "clamp(38px, 3vw, 52px)" }}>
            One sector. Two modernisation starting points.
          </h2>
          <p className="mt-1 text-[17px] leading-[1.25] text-muted-foreground">
            The modernisation pathway is determined by the maturity, scale and integration of the existing security estate.
          </p>
        </header>

        <div className="mt-3 grid overflow-hidden rounded-xl border border-[#C9C9D0] bg-white lg:grid-cols-2">
          <div className="border-b border-[#C9C9D0] lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between bg-[#10202D] px-4 py-2 text-white">
              <span className="text-[12px] font-bold uppercase tracking-[0.12em]">Starting position</span>
              <span className="text-[12px] font-bold text-ey-yellow">Multi-site / established</span>
            </div>
            <EstablishedVisual />
          </div>
          <div>
            <div className="flex items-center justify-between bg-[#10202D] px-4 py-2 text-white">
              <span className="text-[12px] font-bold uppercase tracking-[0.12em]">Starting position</span>
              <span className="text-[12px] font-bold text-ey-yellow">Standalone / brownfield</span>
            </div>
            <BrownfieldVisual />
          </div>
        </div>

        <div className="grid overflow-hidden rounded-b-xl border-x border-b border-[#C9C9D0] bg-white lg:grid-cols-2">
          {pathways.map((pathway, index) => (
            <article key={pathway.title} className={index === 1 ? "border-t border-[#C9C9D0] lg:border-l lg:border-t-0" : ""}>
              <div className="px-5 py-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ey-yellow text-[22px] font-bold text-[#1A1A24]">
                    {pathway.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[21px] font-semibold leading-[1.08] text-[#1A1A24]">{pathway.title}</h3>
                    <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.11em] text-[#5A5A66]">{pathway.strap}</p>
                  </div>
                </div>

                <div className="mt-3 flex gap-3">
                  <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D3AE00]" strokeWidth={1.8} aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-bold text-[#1A1A24]">Where they are today</p>
                    <ul className="mt-1 space-y-0.5 text-[13px] leading-[1.18] text-[#353541]">
                      {pathway.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[#1A1A24]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-3 border-t border-[#DEDEE3] pt-2.5">
                  <div className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-[#D3AE00]" strokeWidth={1.8} aria-hidden />
                    <p className="text-[14px] font-bold text-[#1A1A24]">Modernisation pathway</p>
                  </div>
                  <Pathway stages={pathway.stages} />
                </div>

                <div className="mt-2.5 flex gap-3 border-t border-[#DEDEE3] pt-2.5">
                  <Target className="mt-0.5 h-5 w-5 shrink-0 text-[#D3AE00]" strokeWidth={1.8} aria-hidden />
                  <div>
                    <p className="text-[14px] font-bold text-[#1A1A24]">Target state</p>
                    <p className="mt-0.5 text-[13px] leading-[1.2] text-[#353541]">{pathway.target}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-lg border border-[#E2C900] bg-[#FFFDF0] px-4 py-2.5 text-[#1A1A24]">
          <CheckCircle2 className="h-7 w-7 shrink-0 text-[#D3AE00]" strokeWidth={1.8} aria-hidden />
          <div className="min-w-0">
            <p className="text-[14px] font-semibold leading-[1.2]">
              Plant type defines the starting context. Asset criticality, geography and threat exposure then determine the required security posture.
            </p>
            <p className="mt-0.5 text-[12px] leading-[1.2] text-[#5A5A66]">
              The following sections translate this into asset-level security requirements, assessment priorities and operational use cases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
