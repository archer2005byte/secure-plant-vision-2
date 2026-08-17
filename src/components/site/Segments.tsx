import {
  Building2,
  CheckCircle2,
  Network,
  Target,
} from "lucide-react";

import commandCentreImage from "@/assets/hero-command-centre.jpg";
import plantImage from "@/assets/hero-power-plant.jpg";

const pathways = [
  {
    number: "01",
    title: "Established multi-site estates",
    strap: "STANDARDISE, INTEGRATE, THEN SCALE",
    image: commandCentreImage,
    imageLabel: "Multi-site estate with enterprise command and control",
    imageTone: "cool",
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
    image: plantImage,
    imageLabel: "Brownfield power plant with fragmented legacy security systems",
    imageTone: "warm",
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

function EstateImage({
  image,
  alt,
  tone,
}: {
  image: string;
  alt: string;
  tone: "cool" | "warm";
}) {
  return (
    <div className="relative h-[156px] overflow-hidden bg-[#1A1A24]">
      <img
        src={image}
        alt={alt}
        className="h-full w-full object-cover"
        style={{
          filter:
            tone === "cool"
              ? "saturate(.72) contrast(1.05) brightness(.78) hue-rotate(5deg)"
              : "saturate(.55) contrast(1.04) brightness(.82) sepia(.12)",
          objectPosition: tone === "cool" ? "center 44%" : "center 53%",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            tone === "cool"
              ? "linear-gradient(90deg, rgba(20,39,58,.64), rgba(64,85,103,.12)), linear-gradient(0deg, rgba(16,24,36,.48), transparent 58%)"
              : "linear-gradient(90deg, rgba(62,58,52,.48), rgba(115,105,92,.10)), linear-gradient(0deg, rgba(37,36,34,.45), transparent 58%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-[#11131A]/74 px-4 py-2 text-white backdrop-blur-[1px]">
        <span className="text-[13px] font-semibold uppercase tracking-[0.13em] text-white/78">
          Starting position
        </span>
        <span className="text-[13px] font-semibold text-ey-yellow">
          {tone === "cool" ? "Multi-site / established" : "Standalone / brownfield"}
        </span>
      </div>
    </div>
  );
}

function Pathway({ stages }: { stages: readonly string[] }) {
  return (
    <div className="relative mt-2 grid grid-cols-4 gap-1 px-1 pt-1">
      <span
        aria-hidden
        className="absolute left-[12.5%] right-[12.5%] top-[9px] h-[2px] bg-[#E8C900]"
      />
      {stages.map((stage) => (
        <div key={stage} className="relative z-[1] flex min-w-0 flex-col items-center text-center">
          <span className="h-[14px] w-[14px] rounded-full border-[3px] border-[#E8C900] bg-white" />
          <span className="mt-2 text-[13px] font-bold uppercase leading-[1.08] text-[#1A1A24]">
            {stage}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Segments() {
  return (
    <section
      id="segments"
      className="scroll-mt-24 bg-background px-5 py-5 text-foreground md:px-8"
      style={{ minHeight: "calc(100vh - 98px)" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <header>
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
            <span aria-hidden className="h-3 w-1.5 shrink-0 rounded-sm bg-ey-yellow" />
            Section 03 — Starting position
          </p>
          <h2
            className="mt-1 font-semibold leading-[1.03] text-ey-green-deep"
            style={{ fontSize: "clamp(40px, 3.15vw, 54px)" }}
          >
            One sector. Two modernisation starting points.
          </h2>
          <p className="mt-1 text-[18px] leading-[1.3] text-muted-foreground">
            The modernisation pathway is determined by the maturity, scale and integration of the existing security estate.
          </p>
        </header>

        <div
          data-segments-infographic
          aria-label="Two security modernisation starting points"
          className="mt-3 grid overflow-hidden rounded-xl border border-[#C9C9D0] bg-white lg:grid-cols-2"
        >
          {pathways.map((pathway, index) => (
            <article
              key={pathway.title}
              className={index === 1 ? "border-t border-[#C9C9D0] lg:border-l lg:border-t-0" : ""}
            >
              <EstateImage
                image={pathway.image}
                alt={pathway.imageLabel}
                tone={pathway.imageTone}
              />

              <div className="px-5 py-3.5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ey-yellow text-[22px] font-bold text-[#1A1A24]">
                    {pathway.number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[22px] font-semibold leading-[1.08] text-[#1A1A24]">
                      {pathway.title}
                    </h3>
                    <p className="mt-1 text-[13px] font-bold uppercase tracking-[0.11em] text-[#5A5A66]">
                      {pathway.strap}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex gap-3">
                  <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D3AE00]" strokeWidth={1.8} aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-bold text-[#1A1A24]">Where they are today</p>
                    <ul className="mt-1 space-y-1 text-[14px] leading-[1.22] text-[#353541]">
                      {pathway.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#1A1A24]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-3 border-t border-[#DEDEE3] pt-2.5">
                  <div className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-[#D3AE00]" strokeWidth={1.8} aria-hidden />
                    <p className="text-[15px] font-bold text-[#1A1A24]">Modernisation pathway</p>
                  </div>
                  <Pathway stages={pathway.stages} />
                </div>

                <div className="mt-3 flex gap-3 border-t border-[#DEDEE3] pt-2.5">
                  <Target className="mt-0.5 h-5 w-5 shrink-0 text-[#D3AE00]" strokeWidth={1.8} aria-hidden />
                  <div>
                    <p className="text-[15px] font-bold text-[#1A1A24]">Target state</p>
                    <p className="mt-0.5 text-[14px] leading-[1.25] text-[#353541]">{pathway.target}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-lg border border-[#E2C900] bg-[#FFFDF0] px-4 py-2.5 text-[#1A1A24]">
          <CheckCircle2 className="h-7 w-7 shrink-0 text-[#D3AE00]" strokeWidth={1.8} aria-hidden />
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-[1.25]">
              Plant type defines the starting context. Asset criticality, geography and threat exposure then determine the required security posture.
            </p>
            <p className="mt-0.5 text-[13px] leading-[1.25] text-[#5A5A66]">
              The following sections translate this into asset-level security requirements, assessment priorities and operational use cases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
