import { useState } from "react";
import { ChevronRight, Newspaper, ShieldCheck, X } from "lucide-react";
import { WhyNow } from "./WhyNow";
import "./WhyNowWithRails.css";

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
    place: "Zawiya, Libya · Aug 2026",
    headline: "Drone strike on substation disrupted generation",
    detail:
      "A drone strike on the South Zawiya electrical substation ignited a major fire and knocked the facility out of service, causing widespread outages. The incident came amid repeated explosive-laden drone attacks on nearby energy infrastructure, including the refinery and power plant; more than 700 MW of Zawiya plant capacity was reported unavailable and GE withdrew technical teams because of the security situation. No group had claimed responsibility.",
    source: "Reuters / AP",
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

type DetailCard = { title: string; subtitle?: string; body: string; source?: string; side: "left" | "right" };

export function WhyNowWithRails() {
  const [detailCard, setDetailCard] = useState<DetailCard | null>(null);

  const openIncident = (incident: (typeof incidents)[number]) =>
    setDetailCard({
      title: incident.headline,
      subtitle: `${incident.tag} · ${incident.place}`,
      body: incident.detail,
      source: incident.source,
      side: "left",
    });

  const openStandard = (item: (typeof standards)[number] | (typeof indiaContext)[number]) =>
    setDetailCard({ title: item.code, subtitle: item.label, body: item.detail, side: "right" });

  return (
    <section id="why-now" className="relative h-[calc(100vh-5.75rem)] overflow-hidden bg-ey-cream text-foreground">
      <div className="s02-shell mx-auto hidden h-full w-full max-w-[112rem] flex-col px-4 py-4 xl:flex">
        <div className="s02-heading mx-auto grid w-full max-w-[110rem] shrink-0 grid-cols-[14.25rem_minmax(0,1fr)_14.25rem] gap-3">
          <div aria-hidden="true" />
          <header>
            <p className="flex items-center gap-3 text-base font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
              <span aria-hidden className="h-3 w-1.5 shrink-0 rounded-sm bg-ey-yellow" />
              Section 02
            </p>
            <h2 className="text-[2.25rem] font-semibold leading-tight text-ey-green-deep">
              Why plant security architecture must change now
            </h2>
            <p className="mt-1 text-base leading-[1.3] text-muted-foreground">
              Exposure is widening, plant risk remains uneven, and security performance is becoming measurable.
            </p>
          </header>
          <div aria-hidden="true" />
        </div>

        <div className="s02-workspace relative mx-auto mt-3 grid min-h-0 w-full max-w-[110rem] flex-1 grid-cols-[14.25rem_minmax(0,1fr)_14.25rem] gap-3">
          <aside aria-label="Recent power-sector security incidents" className="s02-rail h-full min-h-0 rounded-xl border border-hairline bg-white/95 p-2.5 shadow-sm">
            <div className="flex items-center gap-2 border-b border-hairline pb-2">
              <Newspaper className="h-4 w-4 text-ey-gold" aria-hidden="true" />
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ey-gold">Evidence</p>
                <h3 className="text-sm font-semibold leading-tight text-ey-green-deep">Recent incidents</h3>
              </div>
            </div>

            <div className="mt-2 grid h-[calc(100%-3.1rem)] grid-rows-4 gap-2">
              {incidents.map((incident) => (
                <button
                  key={incident.headline}
                  type="button"
                  onClick={() => openIncident(incident)}
                  className="group flex h-full w-full items-center justify-between rounded-lg border border-hairline bg-ey-cream/55 px-2.5 py-2 text-left transition hover:border-ey-gold/70 hover:bg-white"
                >
                  <div className="min-w-0">
                    <p className="text-[0.54rem] font-bold uppercase tracking-[0.12em] text-ey-gold">{incident.tag}</p>
                    <p className="mt-0.5 text-[0.61rem] font-semibold text-muted-foreground">{incident.place}</p>
                    <p className="mt-1 text-[0.71rem] font-semibold leading-[1.2] text-ey-green-deep">{incident.headline}</p>
                  </div>
                  <ChevronRight className="ml-2 h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:text-ey-gold" aria-hidden="true" />
                </button>
              ))}
            </div>
          </aside>

          <div className="h-full min-h-0 min-w-0">
            <WhyNow embedded />
          </div>

          <aside aria-label="Applicable physical-security standards and power-sector regulations" className="s02-rail h-full min-h-0 rounded-xl border border-hairline bg-white/95 p-2.5 shadow-sm">
            <div className="flex items-center gap-2 border-b border-hairline pb-2">
              <ShieldCheck className="h-4 w-4 text-ey-gold" aria-hidden="true" />
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-ey-gold">Standards</p>
                <h3 className="text-sm font-semibold leading-tight text-ey-green-deep">Physical security</h3>
              </div>
            </div>

            <div className="mt-2 space-y-1">
              {standards.map((item, index) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => openStandard(item)}
                  className={
                    index === 0
                      ? "group flex w-full items-center justify-between rounded-md border-l-4 border-ey-yellow bg-ey-green-deep px-2 py-1.5 text-left text-white"
                      : "group flex w-full items-center justify-between rounded-md border border-hairline bg-ey-cream/55 px-2 py-1.5 text-left transition hover:border-ey-gold/70 hover:bg-white"
                  }
                >
                  <div>
                    <p className="text-[0.68rem] font-bold leading-tight">{item.code}</p>
                    <p className={index === 0 ? "mt-0.5 text-[0.56rem] leading-tight text-white/75" : "mt-0.5 text-[0.56rem] leading-tight text-muted-foreground"}>{item.label}</p>
                  </div>
                  <ChevronRight className={index === 0 ? "h-3 w-3 shrink-0 text-white/60" : "h-3 w-3 shrink-0 text-muted-foreground group-hover:text-ey-gold"} aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="my-2 flex items-center gap-1.5">
              <div className="h-px flex-1 bg-hairline" />
              <span className="text-[0.51rem] font-bold uppercase tracking-[0.11em] text-muted-foreground">India / power sector</span>
              <div className="h-px flex-1 bg-hairline" />
            </div>

            <div className="space-y-1">
              {indiaContext.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => openStandard(item)}
                  className="group flex w-full items-center justify-between rounded-md border border-hairline bg-white px-2 py-1.5 text-left transition hover:border-ey-gold/70"
                >
                  <div>
                    <p className="text-[0.64rem] font-bold leading-tight text-ey-green-deep">{item.code}</p>
                    <p className="mt-0.5 text-[0.53rem] leading-tight text-muted-foreground">{item.label}</p>
                  </div>
                  <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground group-hover:text-ey-gold" aria-hidden="true" />
                </button>
              ))}
            </div>
          </aside>

          {detailCard && (
            <div
              className={
                detailCard.side === "left"
                  ? "absolute left-[14.9rem] top-5 z-20 w-[22rem] rounded-xl border border-ey-gold/35 bg-white p-4 shadow-xl"
                  : "absolute right-[14.9rem] top-5 z-20 w-[22rem] rounded-xl border border-ey-gold/35 bg-white p-4 shadow-xl"
              }
            >
              <button
                type="button"
                onClick={() => setDetailCard(null)}
                className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition hover:bg-ey-cream hover:text-ey-green-deep"
                aria-label="Close detail"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
              {detailCard.subtitle && <p className="pr-8 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ey-gold">{detailCard.subtitle}</p>}
              <h4 className="mt-2 pr-7 text-lg font-semibold leading-tight text-ey-green-deep">{detailCard.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{detailCard.body}</p>
              {detailCard.source && <p className="mt-4 text-[0.7rem] font-semibold text-muted-foreground">Source: {detailCard.source}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="xl:hidden">
        <WhyNow />
      </div>
    </section>
  );
}
