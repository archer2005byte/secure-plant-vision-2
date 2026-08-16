import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Check, MousePointerClick, ShieldAlert, ShieldCheck } from "lucide-react";

import {
  plantBlocksByType,
  plantTypes,
  zoneBLabel,
  zoneMeta,
  type PlantBlock,
  type PlantType,
} from "./plantMapData";

function AssetBlockLabel({ block }: { block: PlantBlock }) {
  const { x, y, w, h } = block.shape;
  const compact = h < 80;
  const Icon = block.icon;

  return (
    <foreignObject x={x + 2} y={y + 2} width={w - 4} height={h - 4} className="pointer-events-none">
      <div
        data-asset-block-label
        className="flex h-full w-full min-w-0 flex-col items-center justify-center whitespace-normal text-center"
        style={{
          boxSizing: "border-box",
          color: "#1A1A24",
          gap: compact ? 2 : 3,
          padding: 2,
          overflowWrap: "normal",
          textWrap: "balance",
          wordBreak: "normal",
        }}
      >
        <Icon
          style={{
            color: zoneMeta[block.zone].border,
            height: compact ? 12 : 18,
            width: compact ? 12 : 18,
          }}
          className="shrink-0"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <span
          data-asset-block-text
          style={{
            fontSize: compact ? 17 : 18,
            lineHeight: compact ? "18px" : "20px",
            paddingBottom: 3,
            paddingTop: 1,
          }}
          className="block min-w-0 max-w-full font-medium"
        >
          {block.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      </div>
    </foreignObject>
  );
}

export function PlantBlocks() {
  const [plantType, setPlantType] = useState<PlantType>("thermal");
  const [activeId, setActiveId] = useState<string>("perimeter");
  const [stickyHeaderHeight, setStickyHeaderHeight] = useState(98);
  const [compactHeaderHeight, setCompactHeaderHeight] = useState(105);
  const compactHeaderRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const measure = () => {
      setStickyHeaderHeight(Math.ceil(header.getBoundingClientRect().height));
      if (compactHeaderRef.current) {
        setCompactHeaderHeight(Math.ceil(compactHeaderRef.current.getBoundingClientRect().height));
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    if (compactHeaderRef.current) observer.observe(compactHeaderRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const blocks = plantBlocksByType[plantType];
  const fence = blocks[0]!;
  const innerBlocks = useMemo(() => blocks.slice(1), [blocks]);
  const active = blocks.find((block) => block.id === activeId) ?? fence;

  const zoneLegend = (zone: PlantBlock["zone"]) =>
    zone === "B" ? zoneBLabel[plantType] : zoneMeta[zone].label;

  const selectPlantType = (nextType: PlantType) => {
    setPlantType(nextType);
    setActiveId("perimeter");
  };

  const selectBlock = (id: string) => setActiveId(id);

  return (
    <section
      id="plant-blocks"
      className="scroll-mt-24 box-border bg-surface-2 px-5 text-foreground md:px-8"
      style={{
        minHeight: `calc(100vh - ${stickyHeaderHeight + 60}px)`,
        paddingBlock: "1.375rem",
      }}
    >
      <style>{`
        @media (min-width: 1024px) {
          .plant-blocks-header {
            grid-template-columns: minmax(0, 1fr) auto;
          }
          .plant-blocks-workspace {
            grid-template-columns: minmax(0, 55fr) minmax(0, 45fr);
            height: var(--plant-workspace-height);
          }
        }
      `}</style>
      <div
        className="mx-auto grid w-full max-w-6xl gap-3"
        style={{
          minHeight: `calc(100vh - ${stickyHeaderHeight + 104}px)`,
          gridTemplateRows: "auto minmax(0, 1fr)",
        }}
      >
        <header ref={compactHeaderRef} className="plant-blocks-header grid items-end gap-5">
          <div className="min-w-0">
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-ey-green-deep">
              <span
                aria-hidden
                className="h-3 w-1.5 shrink-0 rounded-sm"
                style={{ backgroundColor: "#FFE600" }}
              />
              Section 04
            </p>
            <h2
              style={{ fontSize: "2.75rem", lineHeight: 1.02 }}
              className="mt-1 font-semibold text-ey-green-deep"
            >
              Security Zones &amp; Critical Plant Assets
            </h2>
            <p className="mt-1 text-lg leading-[1.3] text-muted-foreground">
              Select a plant type and asset to examine its risk exposure and mapped security
              controls.
            </p>
          </div>

          <div className="pb-0.5">
            <p className="mb-1.5 text-right text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Plant type
            </p>
            <div
              role="tablist"
              aria-label="Select plant type"
              className="inline-flex rounded-lg border border-hairline bg-surface p-1 shadow-card"
            >
              {plantTypes.map((type) => {
                const selected = type.id === plantType;
                return (
                  <button
                    key={type.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => selectPlantType(type.id)}
                    className={`rounded-md px-4 py-2 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ey-gold focus-visible:ring-offset-1 ${
                      selected
                        ? "bg-navy text-navy-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        <div
          data-plant-workspace
          className="plant-blocks-workspace grid min-h-0 gap-4"
          style={
            {
              "--plant-workspace-height": `calc(100vh - ${stickyHeaderHeight + compactHeaderHeight + 116}px)`,
            } as CSSProperties
          }
        >
          <div className="flex min-h-0 flex-col rounded-xl border border-hairline bg-surface p-3.5 shadow-card">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-hairline pb-2">
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                {(Object.keys(zoneMeta) as Array<PlantBlock["zone"]>).map((zone) => (
                  <span
                    key={zone}
                    style={{ fontSize: 11 }}
                    className="flex items-center gap-1.5 text-muted-foreground"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-[3px] border"
                      style={{
                        background: zoneMeta[zone].fill,
                        borderColor: zoneMeta[zone].border,
                      }}
                    />
                    {zoneLegend(zone)}
                  </span>
                ))}
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                <MousePointerClick className="h-3.5 w-3.5" aria-hidden="true" />
                Select a block
              </span>
            </div>

            <div className="min-h-0 flex-1" style={{ flex: "1 1 0%", minHeight: 0, width: "100%" }}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1000 620"
                preserveAspectRatio="xMidYMid meet"
                role="group"
                aria-label={`Interactive ${plantTypes.find((type) => type.id === plantType)?.label} power plant block diagram`}
                className="h-full w-full select-none"
                style={{ display: "block", height: "100%", width: "100%" }}
              >
                <defs>
                  <pattern
                    id={`plantGrid-${plantType}`}
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M40 0H0V40"
                      fill="none"
                      stroke="var(--hairline)"
                      strokeWidth="1"
                      opacity="0.7"
                    />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="1000" height="620" fill={`url(#plantGrid-${plantType})`} />

                <g
                  role="button"
                  tabIndex={0}
                  aria-pressed={activeId === fence.id}
                  aria-label={fence.name}
                  className="cursor-pointer outline-none focus-visible:outline-none"
                  onClick={() => selectBlock(fence.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      selectBlock(fence.id);
                    }
                  }}
                >
                  <rect
                    x={fence.shape.x}
                    y={fence.shape.y}
                    width={fence.shape.w}
                    height={fence.shape.h}
                    rx="10"
                    fill="none"
                    stroke="#FFE600"
                    strokeWidth={activeId === fence.id ? 6 : 3}
                    strokeDasharray="14 8"
                  />
                  <rect
                    x={fence.shape.x}
                    y={fence.shape.y}
                    width={fence.shape.w}
                    height={fence.shape.h}
                    rx="10"
                    fill="none"
                    stroke="transparent"
                    strokeWidth="18"
                    style={{ pointerEvents: "stroke" }}
                  />
                  <text
                    x={fence.shape.x + 14}
                    y={fence.shape.y - 10}
                    className="pointer-events-none fill-muted-foreground font-semibold uppercase tracking-[0.16em]"
                    style={{ fontSize: 18 }}
                  >
                    Plant boundary and perimeter
                  </text>
                </g>

                {innerBlocks.map((block) => {
                  const selected = block.id === activeId;
                  return (
                    <g
                      key={block.id}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selected}
                      aria-label={block.name}
                      className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-brand [&:hover>rect]:stroke-brand"
                      onClick={() => selectBlock(block.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          selectBlock(block.id);
                        }
                      }}
                    >
                      <rect
                        x={block.shape.x}
                        y={block.shape.y}
                        width={block.shape.w}
                        height={block.shape.h}
                        rx="8"
                        fill={zoneMeta[block.zone].fill}
                        stroke={selected ? "#FFE600" : zoneMeta[block.zone].border}
                        strokeWidth={selected ? 3.5 : 1.5}
                        className="transition-[stroke,filter] duration-200"
                        style={selected ? { filter: "brightness(1.03)" } : undefined}
                      />
                      <AssetBlockLabel block={block} />
                    </g>
                  );
                })}

                <path
                  d="M810 310 H815"
                  stroke="var(--navy)"
                  strokeWidth="2"
                  strokeDasharray="6 5"
                  fill="none"
                />
              </svg>
            </div>

            <div
              data-risk-control-callout
              className="mt-1.5 grid shrink-0 items-center gap-3 rounded-lg border px-3 py-2"
              style={{
                backgroundColor: "#eef3db",
                borderColor: "#a8b77a",
                gridTemplateColumns: "2rem 9.25rem minmax(0, 1fr)",
                minHeight: 60,
              }}
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ey-green-deep text-ey-yellow">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-base font-semibold leading-tight text-ey-green-deep">
                Risk-controlled design
              </p>
              <div className="min-w-0">
                <p className="text-xs font-medium leading-tight text-foreground/80">
                  Asset Criticality × Threat Exposure × Vulnerability × Consequence × Response
                  Capability → Required Security Posture
                </p>
                <p className="mt-0.5 text-xs leading-tight text-muted-foreground">
                  Controls are derived from risk, not from product availability.
                </p>
              </div>
            </div>

            <p className="shrink-0 border-t border-hairline pt-1.5 text-[0.7rem] leading-tight text-muted-foreground">
              Note: zone boundaries, block inventory and control selection to be confirmed against
              plant layout drawings during the as-is assessment.
            </p>
          </div>

          <aside
            aria-live="polite"
            className="flex min-h-0 flex-col rounded-xl border border-hairline bg-navy text-navy-foreground shadow-lift"
            style={{ padding: "1.125rem" }}
          >
            <div className="shrink-0">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                Zone {active.zone} · {active.zoneLabel}
              </p>
              <h3 style={{ lineHeight: 1.12 }} className="mt-1 text-xl font-semibold">
                {active.name}
              </h3>
              <p style={{ lineHeight: 1.3 }} className="mt-1.5 text-lg text-navy-muted">
                {active.why}
              </p>
            </div>

            <div
              className="grid min-h-0 flex-1 gap-4 border-t border-white/10"
              style={{
                gridTemplateColumns: "minmax(0, 47fr) minmax(0, 53fr)",
                marginTop: 10,
                paddingTop: 10,
              }}
            >
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-navy-muted">
                  <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" /> Key exposures
                </p>
                <ul className="mt-2 space-y-1">
                  {active.risks.map((risk) => (
                    <li key={risk} style={{ lineHeight: 1.3 }} className="flex gap-1.5 text-lg">
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      <span className="min-w-0">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="min-w-0 border-l border-white/10 pl-3">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-navy-muted">
                  Mapped solutions
                </p>
                <ul className="mt-2 space-y-1">
                  {active.solutions.map((solution) => (
                    <li key={solution} style={{ lineHeight: 1.3 }} className="flex gap-1.5 text-lg">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      <span className="min-w-0">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
