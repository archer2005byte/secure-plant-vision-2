import { useState } from "react";
import { ChevronDown, ChevronUp, Newspaper, ShieldCheck } from "lucide-react";
import { WhyNow } from "./WhyNow";

const incidents = [
  {
    tag: "INTRUSION / THEFT",
    place: "Ranchi · Mar 2026",
    headline: "Power-station raid; guards and staff restrained",
    detail:
      "An organised group allegedly entered a power station, restrained guards and employees, and stole copper wire, equipment and cash. The case illustrates how routine theft can become a coordinated physical-security event.",
    source: "Times of India",
  },
  {
    tag: "SUPPLY-CHAIN THEFT",
    place: "Chennai · Jan 2026",
    headline: "High-grade coal allegedly diverted and substituted",
    detail:
      "Police reported alleged diversion of about 190 tonnes of high-grade coal in transit to a power plant, with lower-grade material substituted. The incident highlights material movement, vehicle and contractor-control exposure.",
    source: "Times of India",
  },
  {
    tag: "REMOTE ASSET THEFT",
    place: "Chandimandir · May 2026",
    headline: "Copper cable stolen from solar installation",
    detail:
      "Suspects allegedly entered a solar installation during the night and removed copper cable. Remote and lightly staffed generation assets require detection and response capabilities beyond conventional guarding.",
    source: "Times of India",
  },
  {
    tag: "SABOTAGE / AERIAL THREAT",
    place: "Zawiya · Aug 2026",
    headline: "Attack on power infrastructure disrupted generation",
    detail:
      "An attack on substation infrastructure caused a major outage and affected generation availability, illustrating how physical attacks and aerial threats can produce operational consequences beyond the immediate asset.",
    source: "Reuters",
  },
];

const standards = [
  {
    code: "ASIS PAP-2021",
    label: "Physical Asset Protection",
    detail:
      "Risk-based framework for protecting physical assets through layered safeguards, threat assessment, protective design and response planning. Relevant here as the overarching physical-security benchmark.",
  },
  {
    code: "IEC 62676",
    label: "Video Surveillance Systems",
    detail:
      "International standard family covering the design, performance and application of video-surveillance systems for security purposes. Relevant to camera architecture, system design and surveillance performance.",
  },
  {
    code: "NFPA 730",
    label: "Premises Security",
    detail:
      "Guidance for premises-security planning, including vulnerability assessment, physical protection, access control and security management. Useful as a reference for layered protection of plant premises.",
  },
  {
    code: "ISO 22341",
    label: "CPTED",
    detail:
      "Framework for reducing security risk through environmental and spatial design. Relevant to perimeter treatment, access routes, visibility, natural surveillance and site layout.",
  },
  {
    code: "NERC CIP-014",
    label: "International sector benchmark",
    detail:
      "North American electric-sector standard requiring identification and protection of critical transmission facilities against physical attack. Relevant as a sector-specific benchmark for consequence-based physical-security planning.",
  },
] as const;

const indiaContext = [
  {
    code: "CEA Technical Standards 2022",
    label: "Plant & electrical infrastructure",
    detail:
      "Technical requirements governing construction and operation of electrical plants and systems. Relevant because physical-security design must coexist with plant layout, electrical infrastructure and operational requirements.",
  },
  {
    code: "CEA Safety Requirements 2011/2022",
    label: "Construction & O&M safety",
    detail:
      "Safety requirements applicable during construction, operation and maintenance of generating stations and associated installations. Relevant to access, work zones, contractor movement and emergency arrangements.",
  },
  {
    code: "CEA Safety & Electric Supply 2023",
    label: "Electrical safety & inspection",
    detail:
      "Regulatory requirements covering electrical safety, inspection and safe operation of electrical installations. Relevant where surveillance and security systems interface with substations, switchyards and other electrical areas.",
  },
  {
    code: "CEA Cyber Security Guidelines 2021",
    label: "Supporting cyber-physical context",
    detail:
      "Power-sector cybersecurity guidance covering governance, monitoring, incident management and protection of critical systems. Included here only where physical-security systems connect with digital and OT environments.",
  },
] as const;

export function WhyNowWithRails() {
  const [openIncident, setOpenIncident] = useState<number | null>(null);
  const [openStandard, setOpenStandard] = useState<string | null>(null);

  const toggleStandard = (code: string) => {
    setOpenStandard((current) => (current === code ? null : code));
  };

  return (
    <div className="relative h-[calc(100vh-5.75rem)] overflow-hidden bg-ey-cream">
      <div className="mx-auto hidden h-full w-full max-w-[112rem] grid-cols-[14.5rem_minmax(0,1fr)_14.5rem] gap-3 px-3 xl:grid">
        <aside className="pt-[8.9rem]" aria-label="Recent power-sector security incidents">
          <div className="h-[33.25rem] overflow-y-auto rounded-xl border border-hairline bg-white/95 p-2.5 shadow-sm">
            <div className="mb-2 flex items-center gap-2 border-b border-hairline pb-2">
              <Newspaper className="h-4 w-4 text-ey-gold" aria-hidden="true" />
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ey-gold">Evidence</p>
                <h3 className="text-sm font-semibold leading-tight text-ey-green-deep">Recent incidents</h3>
              </div>
            </div>

            <div className="space-y-1.5">
              {incidents.map((incident, index) => {
                const isOpen = openIncident === index;
                return (
                  <button
                    key={incident.headline}
                    type="button"
                    onClick={() => setOpenIncident(isOpen ? null : index)}
                    className="w-full rounded-lg border border-hairline bg-ey-cream/55 p-2 text-left transition hover:border-ey-gold/70 hover:bg-white"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[0.54rem] font-bold uppercase tracking-[0.12em] text-ey-gold">{incident.tag}</p>
                        <p className="mt-0.5 text-[0.62rem] font-semibold text-muted-foreground">{incident.place}</p>
                      </div>
                      {isOpen ? <ChevronUp className="mt-0.5 h-3 w-3 shrink-0" /> : <ChevronDown className="mt-0.5 h-3 w-3 shrink-0" />}
                    </div>
                    <p className="mt-1 text-[0.71rem] font-semibold leading-[1.2] text-ey-green-deep">{incident.headline}</p>
                    {isOpen && (
                      <div className="mt-1.5 border-t border-hairline pt-1.5">
                        <p className="text-[0.64rem] leading-[1.3] text-muted-foreground">{incident.detail}</p>
                        <p className="mt-1 text-[0.58rem] font-semibold text-foreground/65">Source: {incident.source}</p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="min-w-0 overflow-hidden [&_button[aria-controls='why-now-more-information']]:hidden">
          <div className="origin-top" style={{ transform: "scale(0.82)", width: "121.95%", marginLeft: "-10.975%" }}>
            <WhyNow />
          </div>
        </div>

        <aside className="pt-[8.9rem]" aria-label="Applicable physical-security standards and power-sector regulations">
          <div className="h-[33.25rem] overflow-y-auto rounded-xl border border-hairline bg-white/95 p-2.5 shadow-sm">
            <div className="mb-2 flex items-center gap-2 border-b border-hairline pb-2">
              <ShieldCheck className="h-4 w-4 text-ey-gold" aria-hidden="true" />
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ey-gold">Standards</p>
                <h3 className="text-sm font-semibold leading-tight text-ey-green-deep">Physical security</h3>
              </div>
            </div>

            <div className="space-y-1">
              {standards.map((item, index) => {
                const isOpen = openStandard === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => toggleStandard(item.code)}
                    aria-expanded={isOpen}
                    className={
                      index === 0
                        ? "w-full rounded-md border-l-4 border-ey-yellow bg-ey-green-deep px-2 py-1.5 text-left text-white"
                        : "w-full rounded-md border border-hairline bg-ey-cream/55 px-2 py-1.5 text-left transition hover:border-ey-gold/70 hover:bg-white"
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[0.69rem] font-bold leading-tight">{item.code}</p>
                        <p className={index === 0 ? "mt-0.5 text-[0.57rem] leading-tight text-white/75" : "mt-0.5 text-[0.57rem] leading-tight text-muted-foreground"}>{item.label}</p>
                      </div>
                      {isOpen ? <ChevronUp className="mt-0.5 h-3 w-3 shrink-0" /> : <ChevronDown className="mt-0.5 h-3 w-3 shrink-0" />}
                    </div>
                    {isOpen && (
                      <div className={index === 0 ? "mt-1.5 border-t border-white/20 pt-1.5" : "mt-1.5 border-t border-hairline pt-1.5"}>
                        <p className={index === 0 ? "text-[0.58rem] leading-[1.3] text-white/80" : "text-[0.58rem] leading-[1.3] text-muted-foreground"}>{item.detail}</p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="my-2 flex items-center gap-1.5">
              <div className="h-px flex-1 bg-hairline" />
              <span className="text-[0.52rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">India / power sector</span>
              <div className="h-px flex-1 bg-hairline" />
            </div>

            <div className="space-y-1">
              {indiaContext.map((item) => {
                const isOpen = openStandard === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => toggleStandard(item.code)}
                    aria-expanded={isOpen}
                    className="w-full rounded-md border border-hairline bg-white px-2 py-1.5 text-left transition hover:border-ey-gold/70"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[0.66rem] font-bold leading-tight text-ey-green-deep">{item.code}</p>
                        <p className="mt-0.5 text-[0.55rem] leading-tight text-muted-foreground">{item.label}</p>
                      </div>
                      {isOpen ? <ChevronUp className="mt-0.5 h-3 w-3 shrink-0" /> : <ChevronDown className="mt-0.5 h-3 w-3 shrink-0" />}
                    </div>
                    {isOpen && (
                      <div className="mt-1.5 border-t border-hairline pt-1.5">
                        <p className="text-[0.57rem] leading-[1.3] text-muted-foreground">{item.detail}</p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      <div className="xl:hidden">
        <WhyNow />
      </div>
    </div>
  );
}
