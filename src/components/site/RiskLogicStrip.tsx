import { Calculator, ArrowRight } from "lucide-react";

const factors = [
  "Asset Criticality",
  "Threat Exposure",
  "Vulnerability",
  "Consequence",
  "Response Capability",
];

export function RiskLogicStrip() {
  return (
    <section className="bg-navy py-10 text-navy-foreground md:py-12">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-ey-gold">
              <Calculator className="h-4.5 w-4.5" />
            </span>
            <p className="text-base font-semibold uppercase tracking-[0.18em] text-ey-gold">
              Risk-led control design
            </p>
          </div>

          <div className="flex-1">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-semibold leading-snug md:text-base">
              {factors.map((factor, i) => (
                <span key={factor} className="inline-flex items-center gap-x-2">
                  <span className="whitespace-nowrap">{factor}</span>
                  {i < factors.length - 1 && (
                    <span className="text-ey-gold" aria-hidden>
                      ×
                    </span>
                  )}
                </span>
              ))}
              <span className="inline-flex items-center gap-x-2 text-ey-gold">
                <ArrowRight className="h-4 w-4" aria-hidden />
                <span className="whitespace-nowrap">Required Security Posture</span>
              </span>
            </p>
          </div>
        </div>

        <p className="mt-4 max-w-4xl text-base leading-relaxed text-navy-muted md:text-base">
          This is the decision rule that determines why one plant receives thermal cameras and fibre
          PIDS while another receives standard CCTV plus access-control rationalisation. Controls are
          derived from risk, not from product availability.
        </p>
      </div>
    </section>
  );
}
