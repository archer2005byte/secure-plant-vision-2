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
  ["ASIS PAP-2021", "Physical Asset Protection"],
  ["IEC 62676", "Video Surveillance Systems"],
  ["NFPA 730", "Premises Security"],
  ["ISO 22341", "CPTED"],
  ["NERC CIP-014", "Power-sector physical security"],
] as const;

const indiaContext = [
  ["CEA", "Plant technical & safety context"],
  ["NCIIPC", "Critical infrastructure context"],
  ["CERT-In", "Incident-response context"],
] as const;

export function WhyNowWithRails() {
  const [openIncident, setOpenIncident] = useState<number | null>(null);

  return (
    <div className="relative bg-ey-cream">
      <div className="mx-auto hidden w-full max-w-[104rem] grid-cols-[13.5rem_minmax(0,1fr)_12rem] gap-3 px-3 xl:grid">
        <aside className="pt-28" aria-label="Recent power-sector security incidents">
          <div className="sticky top-24 rounded-xl border border-hairline bg-white/90 p-3 shadow-sm backdrop-blur">
            <div className="mb-3 flex items-center gap-2 border-b border-hairline pb-2">
              <Newspaper className="h-4 w-4 text-ey-gold" aria-hidden="true" />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ey-gold">Evidence</p>
                <h3 className="text-sm font-semibold leading-tight text-ey-green-deep">Recent incidents</h3>
              </div>
            </div>

            <div className="space-y-2">
              {incidents.map((incident, index) => {
                const isOpen = openIncident === index;
                return (
                  <button
                    key={incident.headline}
                    type="button"
                    onClick={() => setOpenIncident(isOpen ? null : index)}
                    className="w-full rounded-lg border border-hairline bg-ey-cream/55 p-2.5 text-left transition hover:border-ey-gold/70 hover:bg-white"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[0.58rem] font-bold uppercase tracking-[0.13em] text-ey-gold">{incident.tag}</p>
                        <p className="mt-0.5 text-[0.67rem] font-semibold text-muted-foreground">{incident.place}</p>
                      </div>
                      {isOpen ? <ChevronUp className="mt-0.5 h-3.5 w-3.5 shrink-0" /> : <ChevronDown className="mt-0.5 h-3.5 w-3.5 shrink-0" />}
                    </div>
                    <p className="mt-1.5 text-xs font-semibold leading-[1.25] text-ey-green-deep">{incident.headline}</p>
                    {isOpen && (
                      <div className="mt-2 border-t border-hairline pt-2">
                        <p className="text-[0.7rem] leading-[1.35] text-muted-foreground">{incident.detail}</p>
                        <p className="mt-1.5 text-[0.62rem] font-semibold text-foreground/65">Source: {incident.source}</p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <WhyNow />
        </div>

        <aside className="pt-28" aria-label="Physical-security standards and regulatory context">
          <div className="sticky top-24 rounded-xl border border-hairline bg-white/90 p-3 shadow-sm backdrop-blur">
            <div className="mb-3 flex items-center gap-2 border-b border-hairline pb-2">
              <ShieldCheck className="h-4 w-4 text-ey-gold" aria-hidden="true" />
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ey-gold">Benchmark</p>
                <h3 className="text-sm font-semibold leading-tight text-ey-green-deep">Physical security</h3>
              </div>
            </div>

            <div className="space-y-1.5">
              {standards.map(([code, label], index) => (
                <div
                  key={code}
                  className={index === 0 ? "rounded-md border-l-4 border-ey-yellow bg-ey-green-deep px-2.5 py-2 text-white" : "rounded-md border border-hairline bg-ey-cream/55 px-2.5 py-2"}
                >
                  <p className="text-xs font-bold leading-tight">{code}</p>
                  <p className={index === 0 ? "mt-0.5 text-[0.63rem] leading-tight text-white/75" : "mt-0.5 text-[0.63rem] leading-tight text-muted-foreground"}>{label}</p>
                </div>
              ))}
            </div>

            <div className="my-3 flex items-center gap-2">
              <div className="h-px flex-1 bg-hairline" />
              <span className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">India context</span>
              <div className="h-px flex-1 bg-hairline" />
            </div>

            <div className="space-y-1.5">
              {indiaContext.map(([code, label]) => (
                <div key={code} className="rounded-md border border-hairline bg-white px-2.5 py-2">
                  <p className="text-xs font-bold leading-tight text-ey-green-deep">{code}</p>
                  <p className="mt-0.5 text-[0.63rem] leading-tight text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[0.58rem] leading-[1.25] text-muted-foreground">Cyber-specific standards are intentionally subordinate on this physical-security view.</p>
          </div>
        </aside>
      </div>

      <div className="xl:hidden">
        <WhyNow />
      </div>
    </div>
  );
}
