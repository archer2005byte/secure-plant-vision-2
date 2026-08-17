import { ArrowRight, BarChart3, ShieldCheck, Siren, Users } from "lucide-react";
import heroImage from "@/assets/hero-power-plant.jpg";

const markers = [
  { label: "Perimeter & Asset Protection", icon: ShieldCheck },
  { label: "Workforce & Access", icon: Users },
  { label: "Operational Intelligence", icon: BarChart3 },
  { label: "Command & Response", icon: Siren },
];

export function Hero() {
  return (
    <section
      id="top"
      className="presentation-cover relative scroll-mt-24 overflow-hidden bg-navy text-navy-foreground"
    >
      <img
        src={heroImage}
        alt="A modern power generation plant at dusk, showing cooling towers, turbine hall, and high-voltage switchyard"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-55 md:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/45 md:from-navy md:via-navy/85 md:via-[65%] md:to-transparent" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 md:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/20 bg-navy-foreground/5 px-3 py-1.5 text-base font-semibold uppercase tracking-[0.18em] text-brand">
            <ShieldCheck className="h-3.5 w-3.5" />
            ADVISORY PERSPECTIVE FOR POWER GENERATION COMPANIES
          </span>
          <h1 className="mt-7 text-balance text-3xl font-semibold leading-[1.1] md:text-6xl">
            Integrated Security Architecture for Power Generation Assets
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-muted md:text-lg">
            Helping power generation companies strengthen perimeter security, plant surveillance,
            operational visibility, and incident response through a structured advisory-led
            approach.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#to-be"
              className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-base font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              Explore the framework
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 max-w-2xl overflow-hidden rounded-lg border border-navy-foreground/15 bg-navy/70">
            <div className="flex items-center gap-4 px-5 py-2.5">
              <span className="h-px flex-1 bg-brand/45" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">Focus</p>
              <span className="h-px flex-1 bg-brand/45" aria-hidden="true" />
            </div>
            <dl className="grid grid-cols-2 border-t border-navy-foreground/10 sm:grid-cols-4">
              {markers.map(({ label, icon: Icon }, index) => (
                <div
                  key={label}
                  className={`flex min-h-28 flex-col items-center justify-center px-4 py-4 text-center ${index > 0 ? "sm:border-l sm:border-navy-foreground/10" : ""}`}
                >
                  <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
                  <dd className="mt-2 text-base font-medium leading-snug text-navy-foreground">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
