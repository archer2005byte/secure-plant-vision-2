import {
  ArrowRight,
  BatteryWarning,
  Biohazard,
  Cable,
  CameraOff,
  CarFront,
  ClipboardCheck,
  Database,
  DoorClosed,
  DoorClosedLocked,
  Factory,
  Fence,
  Flame,
  HardHat,
  MapPinned,
  Network,
  PackageOpen,
  PackageSearch,
  PanelsTopLeft,
  PersonStanding,
  Radar,
  Radio,
  ScanSearch,
  Search,
  ShieldCheck,
  Siren,
  Thermometer,
  Truck,
  UserRoundCheck,
  UsersRound,
  Waves,
  Waypoints,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";
import { useCases, type UseCase } from "./useCaseData";

const categories = [
  {
    id: "generation-electrical",
    label: "Generation & electrical",
    scenarioIds: [2, 3, 10, 11, 16],
  },
  {
    id: "material-movement",
    label: "Material & movement",
    scenarioIds: [6, 7, 8, 9, 24],
  },
  {
    id: "people-access",
    label: "People & access",
    scenarioIds: [1, 4, 5, 15, 22],
  },
  {
    id: "safety-continuity",
    label: "Safety & continuity",
    scenarioIds: [12, 13, 14, 23, 25, 26],
  },
  {
    id: "remote-airspace",
    label: "Remote assets & airspace",
    scenarioIds: [17, 18, 19, 20, 21],
  },
] as const;

type CategoryId = (typeof categories)[number]["id"];

const scenarioIcons: Record<number, LucideIcon> = {
  1: Fence,
  2: Zap,
  3: Factory,
  4: UserRoundCheck,
  5: DoorClosedLocked,
  6: Cable,
  7: PackageOpen,
  8: Truck,
  9: CarFront,
  10: Flame,
  11: Thermometer,
  12: PersonStanding,
  13: HardHat,
  14: DoorClosed,
  15: Biohazard,
  16: BatteryWarning,
  17: PanelsTopLeft,
  18: Wind,
  19: Waves,
  20: Waypoints,
  21: Radar,
  22: UsersRound,
  23: CameraOff,
  24: PackageSearch,
  25: Wrench,
  26: Search,
};

const responseStages = [
  { label: "Verify", icon: ScanSearch },
  { label: "Correlate", icon: Network },
  { label: "Dispatch", icon: Radio },
  { label: "Record / close", icon: ClipboardCheck },
] as const;

function scenariosForCategory(categoryId: CategoryId) {
  const category = categories.find((item) => item.id === categoryId) ?? categories[0];
  return category.scenarioIds
    .map((id) => useCases.find((scenario) => scenario.id === id))
    .filter((scenario): scenario is UseCase => Boolean(scenario));
}

function shortZone(zone: string) {
  return zone.split("—")[0]?.trim() ?? zone;
}

function correlationIcon(scenario: UseCase): LucideIcon {
  const value = scenario.chain.correlate.toLowerCase();
  if (value.includes("gis") || value.includes("zone map")) return MapPinned;
  if (value.includes("erp") || value.includes("cmms") || value.includes("record")) {
    return Database;
  }
  return Network;
}

function responseIcon(scenario: UseCase): LucideIcon {
  const value = scenario.chain.respond.toLowerCase();
  if (
    value.includes("emergency") ||
    value.includes("agency") ||
    value.includes("police") ||
    value.includes("fire")
  ) {
    return Siren;
  }
  if (value.includes("maintenance") || value.includes("inspection")) return Wrench;
  if (value.includes("investigation") || value.includes("evidence")) return Search;
  if (value.includes("patrol") || value.includes("dispatch") || value.includes("field")) {
    return Radio;
  }
  return ShieldCheck;
}

function ScenarioCard({
  scenario,
  selected,
  onSelect,
}: {
  scenario: UseCase;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = scenarioIcons[scenario.id] ?? ShieldCheck;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      data-scenario-id={scenario.id}
      className={cn(
        "group flex min-h-0 w-full items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-ey-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2",
        selected
          ? "border-[#1A1A24] bg-[#1A1A24] text-white"
          : "border-hairline bg-white/75 text-[#1A1A24] hover:border-[#1A1A24]/35 hover:bg-white",
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border",
          selected
            ? "border-ey-yellow/55 bg-ey-yellow/10 text-ey-yellow"
            : "border-[#1A1A24]/10 bg-[#1A1A24]/[0.04] text-[#1A1A24]/75 group-hover:text-[#1A1A24]",
        )}
      >
        <Icon aria-hidden size={29} strokeWidth={1.65} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">
          <span className={selected ? "text-ey-yellow" : "text-ey-gold"}>
            Scenario {String(scenario.id).padStart(2, "0")}
          </span>
          <span className={selected ? "text-white/65" : "text-muted-foreground"}>
            {shortZone(scenario.zone)}
          </span>
        </span>
        <span className="mt-0.5 block text-[15px] font-semibold leading-[1.12]">
          {scenario.name}
        </span>
      </span>
    </button>
  );
}

function ChainModule({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 px-3 py-2.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#1A1A24] text-ey-yellow">
        <Icon aria-hidden size={29} strokeWidth={1.7} />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </span>
        <span className="mt-1 block text-[15px] font-semibold leading-[1.15] text-[#1A1A24]">
          {value}
        </span>
      </span>
    </div>
  );
}

function ScenarioDetail({ scenario }: { scenario: UseCase }) {
  const ScenarioIcon = scenarioIcons[scenario.id] ?? ShieldCheck;
  const CorrelationIcon = correlationIcon(scenario);
  const ResponseIcon = responseIcon(scenario);

  return (
    <article
      data-scenario-detail={scenario.id}
      className="scenario-detail grid h-full min-h-0 overflow-hidden rounded-xl border border-hairline bg-surface"
    >
      <header className="flex min-w-0 items-center gap-3 border-b border-white/10 bg-[#1A1A24] px-4 text-white">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-ey-yellow/45 bg-ey-yellow/10 text-ey-yellow">
          <ScenarioIcon aria-hidden size={30} strokeWidth={1.65} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ey-yellow">
              {scenario.zone}
            </p>
            {scenario.plantTypes ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/55">
                {scenario.plantTypes}
              </p>
            ) : null}
          </div>
          <h3 className="mt-0.5 text-[21px] font-semibold leading-[1.08] text-white">
            {scenario.name}
          </h3>
        </div>
        <span className="shrink-0 font-mono text-sm font-bold tracking-[0.16em] text-white/45">
          {String(scenario.id).padStart(2, "0")}
        </span>
      </header>

      <section
        aria-label="Detect, correlate and respond chain"
        className="relative border-b border-hairline bg-surface-2 text-[#1A1A24]"
      >
        <div className="grid h-full sm:grid-cols-3 sm:divide-x sm:divide-hairline">
          <ChainModule label="Detect" value={scenario.chain.detect} icon={ScenarioIcon} />
          <ChainModule label="Correlate" value={scenario.chain.correlate} icon={CorrelationIcon} />
          <ChainModule label="Respond" value={scenario.chain.respond} icon={ResponseIcon} />
        </div>
        {["33.333%", "66.666%"].map((left) => (
          <span
            key={left}
            aria-hidden
            className="absolute top-1/2 z-10 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#1A1A24] bg-[#1A1A24] text-ey-yellow sm:flex"
            style={{ left }}
          >
            <ArrowRight size={14} strokeWidth={2.2} />
          </span>
        ))}
      </section>

      <section className="grid border-b border-hairline bg-surface text-[#1A1A24] sm:grid-cols-2 sm:divide-x sm:divide-hairline">
        <div className="px-4 py-2">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1A24]/60">
            What it detects
          </p>
          <p className="mt-1 text-[17px] leading-[1.2] text-[#1A1A24]/85">{scenario.detects}</p>
        </div>
        <div className="border-t border-hairline px-4 py-2 sm:border-t-0">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1A24]/60">
            Why it matters
          </p>
          <p className="mt-1 text-[17px] leading-[1.2] text-[#1A1A24]/85">{scenario.matters}</p>
        </div>
      </section>

      <section className="scenario-response-timeline bg-[#1A1A24] px-4 py-2 text-white">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-white/55">
          Control-room response
        </p>
        <ol className="scenario-response-stages relative mt-1.5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <span
            aria-hidden
            className="scenario-response-line absolute left-[12.5%] right-[12.5%] top-[13px] z-0 hidden h-px bg-ey-yellow/50 lg:block"
          />
          {scenario.response.map((step, index) => {
            const stage = responseStages[index] ?? responseStages[responseStages.length - 1];
            const StageIcon = stage.icon;
            return (
              <li
                key={step}
                className="scenario-response-stage relative z-[1] min-w-0 px-2 text-center first:pl-0 last:pr-0"
              >
                <div className="flex justify-center">
                  <span className="scenario-response-icon relative z-[2] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ey-yellow/60 bg-[#1A1A24] text-ey-yellow">
                    <StageIcon aria-hidden size={15} strokeWidth={1.9} />
                  </span>
                </div>
                <p className="scenario-response-label relative z-[2] mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.11em]">
                  <span className="text-ey-yellow">{String(index + 1).padStart(2, "0")}</span>{" "}
                  <span className="text-white/70">{stage.label}</span>
                </p>
                <p className="scenario-response-copy relative z-[2] mt-1 text-[14px] font-medium leading-[1.16] text-white/88">
                  {step}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      <footer className="flex items-center border-t border-hairline bg-ey-cream px-4 py-2 text-[14px] leading-[1.25] text-[#1A1A24]/72">
        <p>
          Assessment qualification: the final scenario library, thresholds and escalation matrix are
          confirmed per plant type and zone during the as-is assessment.
        </p>
      </footer>
    </article>
  );
}

export function UseCases() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(categories[0].id);
  const [activeScenarioId, setActiveScenarioId] = useState(categories[0].scenarioIds[0]);
  const [stickyHeaderHeight, setStickyHeaderHeight] = useState(98);
  const [sectionHeaderHeight, setSectionHeaderHeight] = useState(105);
  const sectionHeaderRef = useRef<HTMLElement | null>(null);
  const categoryButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const visibleScenarios = scenariosForCategory(activeCategory);
  const current =
    useCases.find((scenario) => scenario.id === activeScenarioId) ??
    visibleScenarios[0] ??
    useCases[0]!;

  useEffect(() => {
    const stickyHeader = document.querySelector("header");
    if (!stickyHeader) return;

    const measure = () => {
      setStickyHeaderHeight(Math.ceil(stickyHeader.getBoundingClientRect().height));
      if (sectionHeaderRef.current) {
        setSectionHeaderHeight(Math.ceil(sectionHeaderRef.current.getBoundingClientRect().height));
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stickyHeader);
    if (sectionHeaderRef.current) observer.observe(sectionHeaderRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const selectCategory = (categoryId: CategoryId) => {
    const firstScenario = scenariosForCategory(categoryId)[0];
    setActiveCategory(categoryId);
    if (firstScenario) setActiveScenarioId(firstScenario.id);
  };

  const handleCategoryKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % categories.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + categories.length) % categories.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = categories.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const nextCategory = categories[nextIndex]!;
    selectCategory(nextCategory.id);
    categoryButtonRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      id="use-cases"
      className="scenario-interactive scroll-mt-24 box-border bg-surface-2 px-5 text-foreground md:px-8"
      style={{
        minHeight: `calc(100vh - ${stickyHeaderHeight + 8}px)`,
        paddingBlock: "1.125rem",
      }}
    >
      <style>{`
        @media (min-width: 1024px) {
          .scenario-workspace {
            grid-template-columns: minmax(0, 31fr) minmax(0, 69fr);
            height: var(--scenario-workspace-height);
          }

          .scenario-navigator {
            grid-template-rows: repeat(var(--scenario-count), minmax(0, 1fr));
          }

          .scenario-detail {
            grid-template-rows: 56px 94px 120px 124px minmax(0, 1fr);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scenario-interactive * {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl">
        <header ref={sectionHeaderRef} className="min-w-0">
          <p className="flex items-center gap-3 text-base font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
            <span aria-hidden className="h-3 w-1.5 shrink-0 rounded-sm bg-ey-yellow" />
            Section 07
          </p>
          <h2
            className="mt-1 whitespace-normal font-semibold leading-[1.02] text-ey-green-deep lg:whitespace-nowrap"
            style={{ fontSize: "clamp(42px, 3.25vw, 54px)" }}
          >
            Power-plant security scenarios
          </h2>
          <p className="mt-1 text-[18px] leading-[1.3] text-muted-foreground lg:whitespace-nowrap">
            See how detection, correlation and control-room response work as one operational chain.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Scenario categories"
          className="mt-3 flex h-11 gap-1.5 overflow-x-auto overflow-y-hidden pb-px"
        >
          {categories.map((category, index) => {
            const selected = category.id === activeCategory;
            return (
              <button
                key={category.id}
                ref={(element) => {
                  categoryButtonRefs.current[index] = element;
                }}
                id={`scenario-category-${category.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="scenario-workspace"
                tabIndex={selected ? 0 : -1}
                onClick={() => selectCategory(category.id)}
                onKeyDown={(event) => handleCategoryKeyDown(event, index)}
                className={cn(
                  "relative h-11 min-w-max flex-1 rounded-md border px-3 text-sm font-semibold outline-none transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-ey-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2",
                  selected
                    ? "border-[#1A1A24] bg-[#1A1A24] text-white after:absolute after:inset-x-3 after:bottom-0 after:h-1 after:bg-ey-yellow"
                    : "border-hairline bg-white/70 text-[#1A1A24]/78 hover:border-[#1A1A24]/30 hover:bg-white hover:text-[#1A1A24]",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div
          id="scenario-workspace"
          role="tabpanel"
          aria-labelledby={`scenario-category-${activeCategory}`}
          data-active-category={activeCategory}
          className="scenario-workspace mt-3 grid min-h-0 gap-4"
          style={
            {
              "--scenario-workspace-height": `min(28.5rem, calc(100vh - ${stickyHeaderHeight + sectionHeaderHeight + 112}px))`,
            } as CSSProperties
          }
        >
          <nav
            aria-label="Scenarios in selected category"
            className="scenario-navigator grid min-h-0 gap-1.5"
            style={{ "--scenario-count": visibleScenarios.length } as CSSProperties}
          >
            {visibleScenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                selected={scenario.id === current.id}
                onSelect={() => setActiveScenarioId(scenario.id)}
              />
            ))}
          </nav>

          <ScenarioDetail scenario={current} />
        </div>
      </div>
    </section>
  );
}
