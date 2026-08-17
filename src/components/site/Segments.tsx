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
import establishedPhoto from "@/assets/section3-established.jpg";
import commandCentrePhoto from "@/assets/section3-command-centre.jpg";
import brownfieldPhoto from "@/assets/section3-brownfield.jpg";

const establishedPlants = ["PLANT A", "PLANT B", "PLANT C"] as const;
const fragmented = [
  { icon: Camera, label: "Cameras" },
  { icon: KeyRound, label: "Access Control" },
  { icon: Server, label: "Local NVR" },
  { icon: Cpu, label: "Legacy Systems" },
  { icon: Server, label: "Local Server" },
] as const;
const integrated = [
  { icon: Camera, label: "Unified Surveillance" },
  { icon: KeyRound, label: "Access Management" },
  { icon: ShieldCheck, label: "Perimeter Protection" },
  { icon: Cpu, label: "Analytics & AI" },
  { icon: RadioTower, label: "Communication Systems" },
  { icon: Server, label: "Centralised Management" },
] as const;

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
    target: "Enterprise-wide command, common governance and analytics-led security operations.",
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
    target: "Integrated security through sequenced, investment-led modernisation.",
  },
] as const;

function Pathway({ stages }: { stages: readonly string[] }) {
  return (
    <div className="relative mt-2 grid grid-cols-4 gap-2 rounded-md bg-[#FFF9D8] px-3 pb-2 pt-2">
      <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[15px] h-[2px] bg-[#E8C900]" />
      {stages.map((stage) => (
        <div key={stage} className="relative z-[1] flex min-w-0 flex-col items-center text-center">
          <span className="h-4 w-4 rounded-full border-[3px] border-[#E8C900] bg-white" />
          <span className="mt-2 text-[10px] font-bold uppercase leading-[1.05] text-[#1A1A24]">{stage}</span>
        </div>
      ))}
    </div>
  );
}

function EstablishedVisual() {
  return (
    <div className="grid h-[250px] grid-cols-[47%_10%_43%] overflow-hidden bg-[#9AABB7]">
      <div className="relative overflow-hidden">
        <img
          src={establishedPhoto}
          alt="Daylight multi-site power generation estate"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,24,37,0.60)_0%,rgba(7,24,37,0.34)_68%,rgba(7,24,37,0.16)_100%)]" />
        <div className="relative z-[1] flex h-full flex-col justify-center gap-2.5 px-3.5">
          {establishedPlants.map((plant) => (
            <div
              key={plant}
              className="grid h-[55px] grid-cols-[56%_44%] overflow-hidden rounded-md border border-white/65 bg-[#173047]/86 text-white shadow-lg backdrop-blur-[1px]"
            >
              <div className="flex items-center gap-2 border-r border-white/25 px-2.5">
                <Building2 className="h-5 w-5 shrink-0" strokeWidth={1.5} />
                <span className="text-[11px] font-bold tracking-[0.08em]">{plant}</span>
              </div>
              <div className="grid grid-cols-2 place-items-center gap-1 p-1.5 text-white/95">
                <Camera className="h-4 w-4" strokeWidth={1.6} />
                <Server className="h-4 w-4" strokeWidth={1.6} />
                <KeyRound className="h-4 w-4" strokeWidth={1.6} />
                <Network className="h-4 w-4" strokeWidth={1.6} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex items-center justify-center overflow-hidden bg-[#AAB8C1]">
        <div className="absolute inset-y-0 left-0 w-px bg-white/35" />
        <div className="absolute inset-y-0 right-0 w-px bg-[#70818D]/35" />
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#315269]/95 text-white shadow-lg">
            <ShieldCheck className="h-7 w-7" strokeWidth={1.6} />
          </div>
          <div className="flex items-center">
            <div className="h-1 w-8 bg-ey-yellow" />
            <span className="h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-ey-yellow" />
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-[#10202D]">
        <img
          src={commandCentrePhoto}
          alt="Enterprise security command centre with operators and video wall"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,22,32,0.08)_0%,rgba(8,22,32,0.10)_58%,rgba(8,22,32,0.86)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 z-[1] bg-[#0F1B24]/90 px-3 py-2 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-ey-yellow backdrop-blur-[1px]">
          Enterprise command centre
        </div>
      </div>
    </div>
  );
}

function BrownfieldVisual() {
  return (
    <div className="relative grid h-[250px] grid-cols-[34%_16%_50%] overflow-hidden">
      <img
        src={brownfieldPhoto}
        alt="Daylight brownfield power generation plant"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,28,34,0.56)_0%,rgba(20,28,34,0.34)_35%,rgba(245,241,226,0.46)_62%,rgba(245,241,226,0.68)_100%)]" />

      <div className="relative z-[1] flex flex-col justify-center gap-2 px-3">
        {fragmented.map(({ icon: Icon, label }) => (
          <div key={label} className="flex h-[35px] items-center gap-2 rounded-md border border-white/10 bg-[#26323C]/94 px-2.5 text-white shadow-md backdrop-blur-[1px]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/70">
              <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
            </span>
            <span className="text-[10.5px] font-semibold">{label}</span>
          </div>
        ))}
      </div>

      <div className="relative z-[1] flex items-center justify-center">
        <div className="flex items-center drop-shadow-sm">
          <div className="h-1 w-9 bg-ey-yellow" />
          <span className="h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-ey-yellow" />
        </div>
      </div>

      <div className="relative z-[1] flex items-center justify-center px-3.5">
        <div className="grid w-full grid-cols-2 gap-2 rounded-xl border border-ey-yellow bg-[#FFFDF3]/95 p-3 text-[#1A1A24] shadow-xl backdrop-blur-[2px]">
          {integrated.map(({ icon: Icon, label }) => (
            <div key={label} className="flex min-h-[59px] flex-col items-center justify-center rounded-md border border-[#DED8C5] bg-white/90 px-1 text-center">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
              <span className="mt-1.5 text-[9.5px] font-semibold leading-[1.05]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CapabilityBand() {
  const items = [
    { icon: Eye, label: "Unified visibility" },
    { icon: Network, label: "Centralised orchestration" },
    { icon: BarChart3, label: "Analytics & insights" },
    { icon: ShieldCheck, label: "Governance & compliance" },
  ] as const;
  return (
    <div className="grid grid-cols-4 divide-x divide-white/15 bg-[#10202D] text-white">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center justify-center gap-2 px-2 py-2.5 text-center">
          <Icon className="h-4.5 w-4.5 shrink-0 text-white" strokeWidth={1.7} />
          <span className="text-[10px] font-semibold leading-[1.08]">{label}</span>
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
      <div className="mx-auto w-full max-w-6xl">
        <header>
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
            <span aria-hidden className="h-3 w-6 shrink-0 rounded-full bg-ey-yellow" />
            Section 03 — Starting position
          </p>
          <h2 className="mt-1 font-semibold leading-[1.02] text-ey-green-deep" style={{ fontSize: "2.75rem" }}>
            One sector. Two modernisation starting points.
          </h2>
          <p className="mt-1 text-lg leading-[1.25] text-muted-foreground">
            The modernisation pathway is determined by the maturity, scale and integration of the existing security estate.
          </p>
        </header>

        <div className="mt-3 grid overflow-hidden rounded-xl border border-[#C9C9D0] bg-white lg:grid-cols-2">
          <div className="border-b border-[#C9C9D0] lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between bg-[#10202D] px-4 py-2 text-white">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em]">Starting position</span>
              <span className="text-[11px] font-bold text-ey-yellow">Multi-site / established</span>
            </div>
            <EstablishedVisual />
            <CapabilityBand />
          </div>
          <div>
            <div className="flex items-center justify-between bg-[#10202D] px-4 py-2 text-white">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em]">Starting position</span>
              <span className="text-[11px] font-bold text-ey-yellow">Standalone / brownfield</span>
            </div>
            <BrownfieldVisual />
            <div className="grid grid-cols-3 divide-x divide-[#D7D2BF] bg-[#EEE8D9] text-[#1A1A24]">
              <div className="px-2 py-2 text-center text-[9.5px] font-semibold">Fragmented systems</div>
              <div className="px-2 py-2 text-center text-[9.5px] font-semibold">Phased integration</div>
              <div className="px-2 py-2 text-center text-[9.5px] font-semibold">Unified security estate</div>
            </div>
          </div>
        </div>

        <div className="grid overflow-hidden rounded-b-xl border-x border-b border-[#C9C9D0] bg-white lg:grid-cols-2">
          {pathways.map((pathway, index) => (
            <article key={pathway.title} className={index === 1 ? "border-t border-[#C9C9D0] lg:border-l lg:border-t-0" : ""}>
              <div className="px-4 py-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ey-yellow text-[18px] font-bold text-[#1A1A24]">
                    {pathway.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-semibold leading-[1.08] text-[#1A1A24]">{pathway.title}</h3>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.11em] text-[#5A5A66]">{pathway.strap}</p>
                  </div>
                </div>

                <div className="mt-2 flex gap-2.5">
                  <Building2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#D3AE00]" strokeWidth={1.8} aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11.5px] font-bold text-[#1A1A24]">Where they are today</p>
                    <ul className="mt-0.5 space-y-0 text-[10.3px] leading-[1.14] text-[#353541]">
                      {pathway.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-1.5">
                          <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#1A1A24]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-2 border-t border-[#DEDEE3] pt-1.5">
                  <div className="flex items-center gap-2">
                    <Network className="h-4.5 w-4.5 text-[#D3AE00]" strokeWidth={1.8} aria-hidden />
                    <p className="text-[11.5px] font-bold text-[#1A1A24]">Modernisation pathway</p>
                  </div>
                  <Pathway stages={pathway.stages} />
                </div>

                <div className="mt-1.5 flex gap-2.5 border-t border-[#DEDEE3] pt-1.5">
                  <Target className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#D3AE00]" strokeWidth={1.8} aria-hidden />
                  <div>
                    <p className="text-[11.5px] font-bold text-[#1A1A24]">Target state</p>
                    <p className="mt-0.5 text-[10.3px] leading-[1.14] text-[#353541]">{pathway.target}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-2.5 flex items-center gap-3 rounded-lg border border-[#E2C900] bg-[#FFFDF0] px-4 py-2 text-[#1A1A24]">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-[#D3AE00]" strokeWidth={1.8} aria-hidden />
          <div className="min-w-0">
            <p className="text-[11.5px] font-semibold leading-[1.2]">
              Plant type defines the starting context. Asset criticality, geography and threat exposure then determine the required security posture.
            </p>
            <p className="mt-0.5 text-[10px] leading-[1.2] text-[#5A5A66]">
              The following sections translate this into asset-level security requirements, assessment priorities and operational use cases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
