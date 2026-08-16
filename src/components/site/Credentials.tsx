import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { navigateToAnchor } from "./DeckNavigation";
import { IndiaMap } from "./IndiaMap";
import {
  categories,
  powerEngagements,
  programmes,
  type CredentialCategory,
  type Programme,
} from "./credentialsData";
import "./Credentials.css";

const stats = [
  { value: "40+", label: "Surveillance, ICCC & ERSS programmes" },
  { value: "25+", label: "Cities with command-centre deployments" },
  { value: "18", label: "States & union territories" },
] as const;

type FootprintCategory = Exclude<CredentialCategory, "power">;

const footprintCategories = categories.filter(
  (category): category is (typeof categories)[number] & { id: FootprintCategory } =>
    category.id !== "power",
);
const footprintProgrammes = programmes.filter(
  (programme): programme is Programme & { category: FootprintCategory } =>
    programme.category !== "power",
);

const categoryCounts = Object.fromEntries(
  footprintCategories.map((category) => [
    category.id,
    footprintProgrammes.filter((programme) => programme.category === category.id).length,
  ]),
) as Record<FootprintCategory, number>;

function ViewNavigation({
  href,
  destination,
  children,
}: {
  href: string;
  destination: "credentials" | "credentials-power";
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="credentials-view-navigation"
      onClick={(event) => {
        event.preventDefault();
        navigateToAnchor(destination);
      }}
    >
      {children}
    </a>
  );
}

export function Credentials() {
  const [activeCategory, setActiveCategory] = useState<"all" | FootprintCategory>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedEngagement, setSelectedEngagement] = useState(powerEngagements[0]!.client);

  const filteredProgrammes = useMemo(
    () =>
      activeCategory === "all"
        ? footprintProgrammes
        : footprintProgrammes.filter((programme) => programme.category === activeCategory),
    [activeCategory],
  );

  const selectedProgramme = useMemo(
    () => footprintProgrammes.find((programme) => programme.id === selectedId) ?? null,
    [selectedId],
  );

  const engagement =
    powerEngagements.find((item) => item.client === selectedEngagement) ?? powerEngagements[0]!;

  const handleCategoryChange = (category: "all" | FootprintCategory) => {
    setActiveCategory(category);
    setSelectedId(
      category === "all"
        ? null
        : (footprintProgrammes.find((programme) => programme.category === category)?.id ?? null),
    );
  };

  return (
    <>
      <section
        id="credentials"
        className="credentials-view credentials-footprint-view bg-ey-cream px-5 md:px-8"
      >
        <div className="credentials-view-inner mx-auto w-full max-w-6xl">
          <header className="credentials-view-header">
            <div className="min-w-0">
              <p className="credentials-eyebrow">SECTION 10 · CREDENTIALS 1/2</p>
              <h2>Credentials</h2>
              <p>
                A national surveillance, command-centre and emergency-response footprint supporting
                complex security-modernisation programmes across India.
              </p>
            </div>
            <ViewNavigation href="#credentials-power" destination="credentials-power">
              Next: Power-generation engagements
              <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
            </ViewNavigation>
          </header>

          <dl className="credentials-metrics" aria-label="Credentials summary metrics">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>

          <section
            className="credentials-footprint-workspace"
            aria-labelledby="credentials-footprint-title"
          >
            <div className="credentials-footprint-heading">
              <div className="min-w-0">
                <h3 id="credentials-footprint-title">NATIONAL DELIVERY FOOTPRINT</h3>
                <p>{footprintProgrammes.length} programmes across six credential categories</p>
              </div>

              <div className="credentials-filters" aria-label="Filter credentials by category">
                <button
                  type="button"
                  aria-pressed={activeCategory === "all"}
                  onClick={() => handleCategoryChange("all")}
                >
                  All
                </button>
                {footprintCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={activeCategory === category.id}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.id === "police"
                      ? "Police / large-scale surveillance"
                      : category.short}
                  </button>
                ))}
              </div>
            </div>

            <div className="credentials-footprint-body">
              <FootprintEvidence
                activeCategory={activeCategory}
                items={filteredProgrammes}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />

              <div className="credentials-map-column">
                <div className="credentials-map-wrap">
                  <IndiaMap
                    items={footprintProgrammes}
                    activeCategory={activeCategory}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                </div>
                <div className="credentials-map-legend" aria-label="Map legend">
                  {footprintCategories.map((category) => (
                    <span key={category.id}>
                      <i className={category.dot} aria-hidden="true" />
                      {category.label}
                    </span>
                  ))}
                </div>
                {selectedProgramme ? (
                  <div className="credentials-map-summary" aria-live="polite">
                    <>
                      <p>
                        {
                          footprintCategories.find((item) => item.id === selectedProgramme.category)
                            ?.label
                        }{" "}
                        · {selectedProgramme.place}
                      </p>
                      <strong>{selectedProgramme.name}</strong>
                      <span>{selectedProgramme.detail}</span>
                    </>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </section>

      <section
        id="credentials-power"
        className="credentials-view credentials-power-view bg-ey-cream px-5 md:px-8"
      >
        <div className="credentials-view-inner mx-auto w-full max-w-6xl">
          <header className="credentials-view-header">
            <div className="min-w-0">
              <p className="credentials-eyebrow">SECTION 10 · CREDENTIALS 2/2</p>
              <h2>Power-generation engagements</h2>
              <p>
                Selected engagements spanning approximately 39 GW of generation capacity, from as-is
                assessment and DPR preparation to procurement and implementation governance.
              </p>
            </div>
            <ViewNavigation href="#credentials" destination="credentials">
              <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.8} />
              Back to national footprint
            </ViewNavigation>
          </header>

          <div className="credentials-engagement-workspace">
            <nav className="credentials-engagement-navigator" aria-label="Select power engagement">
              {powerEngagements.map((item, index) => {
                const selected = item.client === engagement.client;
                return (
                  <button
                    key={item.client}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSelectedEngagement(item.client)}
                    className={cn(selected && "is-selected")}
                  >
                    <span className="credentials-engagement-icon" aria-hidden="true">
                      <Zap size={20} strokeWidth={1.8} />
                    </span>
                    <span className="credentials-engagement-row-copy">
                      <small>{String(index + 1).padStart(2, "0")}</small>
                      <strong>{item.client}</strong>
                      <span>{item.project}</span>
                    </span>
                    <b>{item.capacity.split(" (")[0]}</b>
                  </button>
                );
              })}
            </nav>

            <article className="credentials-engagement-detail" aria-live="polite">
              <header>
                <div className="min-w-0">
                  <p>SELECTED ENGAGEMENT</p>
                  <h3>{engagement.client}</h3>
                  <span>{engagement.project}</span>
                </div>
                <strong>{engagement.capacity.split(" (")[0]}</strong>
              </header>

              <dl className="credentials-engagement-facts">
                <div>
                  <dt>Capacity covered</dt>
                  <dd>{engagement.capacity}</dd>
                </div>
                <div>
                  <dt>EY role</dt>
                  <dd>{engagement.role}</dd>
                </div>
                <div>
                  <dt>Unit capacity</dt>
                  <dd>{engagement.units}</dd>
                </div>
              </dl>

              <div className="credentials-engagement-coverage">
                <p>GEOGRAPHIC / PLANT COVERAGE</p>
                <span>{engagement.stations}</span>
              </div>

              <div className="credentials-engagement-scope">
                <p>SCOPE OF WORK</p>
                <ul>
                  {engagement.scope.map((item, index) => (
                    <li key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

function FootprintEvidence({
  activeCategory,
  items,
  selectedId,
  onSelect,
}: {
  activeCategory: "all" | FootprintCategory;
  items: Programme[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  if (activeCategory === "all") {
    return (
      <aside className="credentials-evidence-panel">
        <p>PROGRAMME MIX</p>
        <div className="credentials-category-totals">
          {footprintCategories.map((category) => (
            <div key={category.id}>
              <i className={category.dot} aria-hidden="true" />
              <span>{category.label}</span>
              <strong>{categoryCounts[category.id]}</strong>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  const category = footprintCategories.find((item) => item.id === activeCategory)!;
  return (
    <aside className="credentials-evidence-panel">
      <p>
        {category.label} · {categoryCounts[activeCategory]} engagements
      </p>
      <ul className="credentials-programme-list">
        {items.map((programme) => (
          <li key={programme.id}>
            <button
              type="button"
              aria-pressed={selectedId === programme.id}
              onClick={() => onSelect(programme.id)}
            >
              <i className={category.dot} aria-hidden="true" />
              <span>{programme.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
