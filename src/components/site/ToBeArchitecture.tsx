import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MutableRefObject,
  type RefObject,
} from "react";

import { cn } from "@/lib/utils";
import {
  archLayers,
  cyberRail,
  flows,
  integrationRail,
  type ArchLayer,
  type Component,
  type RailGroup,
} from "./toBeArchitectureData";
import "./ToBeArchitecture.css";

type ArchitectureState = "overview" | ArchLayer["id"];
type IconTone = "light" | "dark";

const rawIconModules = import.meta.glob("/src/assets/security-architecture/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const iconSources = Object.fromEntries(
  Object.entries(rawIconModules).map(([file, raw]) => [
    file
      .split("/")
      .pop()!
      .replace(/\.svg$/, ""),
    raw,
  ]),
) as Record<string, string>;

const layerVisuals: Record<string, { anchor: string; representatives: string[]; outcome: string }> =
  {
    field: {
      anchor: "fixed-cameras",
      representatives: [
        "fixed-cameras",
        "face-biometric-access",
        "fence-intrusion-sensors",
        "c-uas-radar-rf-detection",
      ],
      outcome: "outcome-field",
    },
    edge: {
      anchor: "edge-ai-analytics-nodes",
      representatives: [
        "edge-ai-analytics-nodes",
        "local-nvr-edge-storage",
        "poe-aggregation-switches",
        "fibre-backbone",
      ],
      outcome: "outcome-edge",
    },
    platform: {
      anchor: "psim-iccc",
      representatives: ["vms", "ai-video-analytics", "psim-iccc", "gis"],
      outcome: "outcome-platform",
    },
    command: {
      anchor: "command-centre-video-wall",
      representatives: [
        "command-centre-video-wall",
        "operator-workstations",
        "command-centre-incident-workflow",
        "dispatch",
      ],
      outcome: "outcome-command",
    },
    governance: {
      anchor: "security-kpis-sla",
      representatives: ["security-kpis-sla", "audit-trails", "system-health", "amc-maintenance"],
      outcome: "outcome-governance",
    },
  };

const capabilityIcons: Record<string, string> = {
  "Fixed cameras": "fixed-cameras",
  "PTZ cameras": "ptz-cameras",
  "Thermal cameras": "thermal-cameras",
  ANPR: "anpr",
  "Face / biometric access": "face-biometric-access",
  "Fence & intrusion sensors": "fence-intrusion-sensors",
  "C-UAS radar / RF detection": "c-uas-radar-rf-detection",
  "Surveillance drones": "surveillance-drones",
  "Edge AI / analytics nodes": "edge-ai-analytics-nodes",
  "Local NVR / edge storage": "local-nvr-edge-storage",
  "PoE & aggregation switches": "poe-aggregation-switches",
  "Fibre backbone": "fibre-backbone",
  "Wireless / 4G / 5G": "wireless-4g-5g",
  "UPS / resilient field power": "ups-resilient-field-power",
  "OT-IT gateway / DMZ": "ot-it-gateway-dmz",
  "Time synchronisation": "time-synchronisation",
  VMS: "vms",
  "AI video analytics": "ai-video-analytics",
  "PSIM / ICCC": "psim-iccc",
  "Access & visitor management": "access-visitor-management",
  "Alarm correlation": "alarm-correlation",
  GIS: "gis",
  "Drone / airspace awareness": "drone-airspace-awareness",
  "Evidence management": "evidence-management",
  "Storage & retention": "storage-retention",
  "Command-centre video wall": "command-centre-video-wall",
  "Operator workstations": "operator-workstations",
  "Incident management": "incident-management",
  "SOP workflows": "sop-workflows",
  "Alert & escalation": "alert-escalation",
  Dispatch: "dispatch",
  "Executive MIS / KPI dashboard": "executive-mis-kpi-dashboard",
  "Mobile app for field responders": "mobile-app-field-responders",
  "Security KPIs / SLA": "security-kpis-sla",
  "Audit trails": "audit-trails",
  "System health": "system-health",
  "Incident reporting": "incident-reporting",
  "Asset lifecycle": "asset-lifecycle",
  "AMC / maintenance": "amc-maintenance",
  "Drills & exercises": "drills-exercises",
  "Periodic risk reassessment": "periodic-risk-reassessment",
};

const railIcons: Record<string, string> = {
  "Security network segmentation": "network-segmentation",
  "Firewall / DMZ protection": "firewalls-dmz",
  "Secure device & edge configuration": "device-hardening",
  "Controlled system access": "iam-mfa",
  "Secure remote support": "network-segmentation",
  "Firmware & patch governance": "patch-management",
  "Audit logging & traceability": "audit-trails",
  "Backup / DR for security systems": "backup-disaster-recovery",
  "IAM / MFA": "iam-mfa",
  "PKI / certificates": "encryption-pki",
  "SIEM integration": "cyber-soc",
  "SCADA / DCS": "scada-dcs",
  "Fire alarm & safety systems": "fire-systems",
  ERP: "erp",
  "HR / contractor systems": "hr-contractor-systems",
  CMMS: "cmms",
  "Enterprise Cyber SOC": "cyber-soc",
  "Plant security / CISF": "plant-security-cisf",
  "Police / emergency services": "police-emergency-services",
  "Fire & rescue services": "fire-services",
  "State / district authorities": "state-district-authorities",
  "CERT-In / cyber agencies": "cert-in-cyber-agencies",
  "Regulatory & statutory authorities": "regulatory-interfaces",
};

const regulatoryExplanation =
  "Applicable interfaces vary by site and deployment. They may include DGCA/Digital Sky for authorised drone operations and airspace status, CISF where deployed, and other security or border agencies where jurisdiction requires.";

const counterUasExplanation =
  "Plant systems provide detection, classification and verification. Intervention or neutralisation is coordinated with authorised government agencies.";

function SecurityArchitectureIcon({
  name,
  tone = "light",
  size,
  className,
}: {
  name: string;
  tone?: IconTone;
  size: number;
  className?: string;
}) {
  const markup = useMemo(() => {
    const source = iconSources[name];
    if (!source) return "";
    const colors =
      tone === "dark"
        ? "color:#FFFFFF;--icon-accent:#FFE600"
        : "color:#1A1A24;--icon-accent:#FFE600";
    return source.replace(/style="[^"]*"/, `style="${colors}"`);
  }, [name, tone]);

  return (
    <span
      aria-hidden="true"
      className={cn("s06-icon inline-block shrink-0", className)}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

function ArchitectureRail({ side, groups }: { side: "left" | "right"; groups: RailGroup[] }) {
  const left = side === "left";
  const [regulatoryOpen, setRegulatoryOpen] = useState(false);
  return (
    <aside
      data-architecture-rail={side}
      className={cn(
        "s06-rail h-auto min-w-0 rounded-lg bg-[#1A1A24] px-3.5 py-3.5 text-white",
        left ? "s06-rail-left" : "s06-rail-right",
      )}
      aria-label={left ? "Cyber safeguards for security systems" : "Enterprise and external integration"}
    >
      <div className="s06-rail-header flex items-start gap-2.5">
        <SecurityArchitectureIcon
          name={left ? "device-hardening" : "psim-iccc"}
          tone="dark"
          size={32}
        />
        <h3 className={cn("font-bold leading-[1.12]", left ? "text-[15px]" : "text-sm")}>
          {left ? (
            <>
              Cyber Safeguards for
              <br />
              Security Systems
            </>
          ) : (
            <>
              Enterprise &<br />
              external integration
            </>
          )}
        </h3>
      </div>

      <div className="s06-rail-body">
        {groups.map((group, groupIndex) => (
          <div
            key={group.caption ?? "all"}
            className={cn("s06-rail-group", !left && `s06-rail-group-${groupIndex + 1}`)}
          >
            {group.caption ? (
              <p className="s06-rail-caption font-bold uppercase tracking-[0.04em] text-[#FFE600]">
                {group.caption}
              </p>
            ) : null}
            <ul className="s06-rail-list">
              {group.items.map((item) => {
                const explainsRegulation = item.label === "Regulatory & statutory authorities";
                const railIconName =
                  railIcons[item.label] ??
                  (item.label === "Audit logging & traceability"
                    ? "audit-trails"
                    : item.label === "SIEM integration"
                      ? "cyber-soc"
                      : "system-health");
                return (
                  <li
                    key={item.label}
                    className={cn(
                      "s06-rail-item flex min-w-0 items-center",
                      explainsRegulation && "s06-regulatory-item relative",
                    )}
                  >
                    <SecurityArchitectureIcon name={railIconName} tone="dark" size={20} />
                    <span className="s06-rail-label min-w-0 font-semibold text-white">
                      {explainsRegulation ? (
                        <>
                          Regulatory &amp;
                          <br />
                          statutory authorities
                        </>
                      ) : (
                        item.label
                      )}
                    </span>
                    {explainsRegulation ? (
                      <span
                        className="s06-rail-info-slot"
                        data-open={regulatoryOpen ? "true" : "false"}
                      >
                        <button
                          type="button"
                          className="s06-explanation-marker s06-regulatory-button"
                          aria-label="More information about regulatory and statutory authorities."
                          aria-describedby="section06-regulatory-explanation"
                          aria-expanded={regulatoryOpen}
                          onClick={() => setRegulatoryOpen((open) => !open)}
                          onKeyDown={(event) => {
                            if (event.key === "Escape") {
                              event.stopPropagation();
                              setRegulatoryOpen(false);
                            }
                          }}
                          onBlur={(event) => {
                            if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
                              setRegulatoryOpen(false);
                            }
                          }}
                        >
                          i
                        </button>
                        <span
                          id="section06-regulatory-explanation"
                          role="tooltip"
                          className="s06-regulatory-tooltip"
                        >
                          {regulatoryExplanation}
                        </span>
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}

function FlowArrow() {
  return (
    <span aria-hidden="true" className="s06-flow-arrow">
      <span className="s06-flow-stem" />
      <span className="s06-flow-head" />
    </span>
  );
}

function ArchitectureOverview({
  onSelect,
  buttonRefs,
}: {
  onSelect: (layer: ArchLayer) => void;
  buttonRefs: MutableRefObject<Record<string, HTMLButtonElement | null>>;
}) {
  const topDown = [...archLayers].reverse();
  return (
    <div data-architecture-centre="overview" className="s06-centre s06-overview min-w-0">
      {topDown.map((layer, index) => {
        const visual = layerVisuals[layer.id]!;
        const inset = (4 - index) * 12;
        return (
          <div key={layer.id}>
            <button
              ref={(node) => {
                buttonRefs.current[layer.id] = node;
              }}
              type="button"
              onClick={() => onSelect(layer)}
              aria-label={`Open Layer ${layer.number}: ${layer.title}`}
              className={cn(
                "s06-layer-button group relative block w-full overflow-hidden text-left outline-none",
                index % 2 === 0 ? "bg-[#E5E5EC]" : "bg-[#F2F2F2]",
              )}
              style={{
                width: `calc(100% - ${inset * 2}px)`,
                marginInline: `${inset}px`,
                clipPath: "polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%)",
              }}
            >
              <span aria-hidden="true" className="s06-layer-edge" />
              <span className="s06-layer-grid">
                <span className="s06-layer-anchor">
                  <SecurityArchitectureIcon name={visual.anchor} tone="dark" size={32} />
                </span>
                <span className="s06-layer-copy">
                  <span className="block text-[11px] font-bold leading-none text-[#494965]">
                    LAYER {layer.number}
                  </span>
                  <span className="s06-overview-layer-title mt-1 block font-bold leading-none text-[#1A1A24]">
                    {layer.title}
                  </span>
                  <span className="mt-1 block text-[14px] font-semibold leading-none text-[#494965]">
                    {layer.subtitle.replaceAll(" - ", " · ")}
                  </span>
                </span>
                <span className="s06-layer-representatives">
                  {visual.representatives.map((iconName) => (
                    <span key={iconName} className="s06-representative-icon">
                      <SecurityArchitectureIcon name={iconName} size={26} />
                    </span>
                  ))}
                </span>
              </span>
              <span className="s06-layer-border" />
            </button>
            {index < topDown.length - 1 ? <FlowArrow /> : null}
          </div>
        );
      })}
    </div>
  );
}

function CapabilityCell({ item, dense }: { item: Component; dense: boolean }) {
  const explainsCounterUas = item.label === "C-UAS radar / RF detection";
  return (
    <article
      data-capability-cell={item.label}
      className={cn(
        "s06-capability-cell min-h-0 min-w-0 border border-[#D4D4DA] bg-white",
        explainsCounterUas && "s06-explained-capability",
      )}
      tabIndex={explainsCounterUas ? 0 : undefined}
      aria-describedby={explainsCounterUas ? "section06-counter-uas-explanation" : undefined}
    >
      <div className="flex min-w-0 items-start gap-2.5">
        <SecurityArchitectureIcon name={capabilityIcons[item.label]!} size={26} />
        <h4
          className={cn(
            "min-w-0 font-bold leading-[1.05] text-[#1A1A24]",
            dense ? "text-[15px]" : "text-base",
          )}
        >
          {item.label}
          {explainsCounterUas ? (
            <span className="s06-explanation-marker" aria-hidden="true">
              i
            </span>
          ) : null}
        </h4>
      </div>
      <p
        className={cn(
          "mt-1 text-[#494965]",
          dense ? "text-[13px] leading-[1.22]" : "text-sm leading-[1.15]",
        )}
      >
        {item.detail}
      </p>
      {explainsCounterUas ? (
        <span
          id="section06-counter-uas-explanation"
          role="tooltip"
          className="s06-capability-tooltip"
        >
          {counterUasExplanation}
        </span>
      ) : null}
    </article>
  );
}

function ArchitectureDetail({
  layer,
  onOverview,
  onSelect,
  headingRef,
}: {
  layer: ArchLayer;
  onOverview: () => void;
  onSelect: (layer: ArchLayer, focusNavigator?: boolean) => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
}) {
  const navigatorRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const visual = layerVisuals[layer.id]!;
  const dense = layer.components.length === 9;
  const layerIndex = archLayers.findIndex((item) => item.id === layer.id);

  const handleNavigatorKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    event.stopPropagation();
    const next = Math.max(
      0,
      Math.min(archLayers.length - 1, index + (event.key === "ArrowRight" ? 1 : -1)),
    );
    navigatorRefs.current[next]?.focus();
    onSelect(archLayers[next]!, true);
  };

  return (
    <div
      data-architecture-centre="detail"
      data-selected-layer={layer.id}
      className="s06-centre s06-detail min-w-0 rounded-lg border border-[#C8C8D0] bg-[#F2F2F2] px-3.5"
    >
      <div className="s06-detail-header relative">
        <button
          type="button"
          onClick={onOverview}
          className="s06-overview-return absolute left-0 top-3 rounded-full border border-[#B8B8C1] bg-white font-bold text-[#1A1A24] outline-none"
        >
          ← Architecture overview
        </button>
        <div
          role="group"
          aria-label="Architecture layers"
          className="s06-mini-nav absolute right-6 top-3 flex gap-2.5"
        >
          {archLayers.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => {
                navigatorRefs.current[index] = node;
              }}
              type="button"
              onClick={() => onSelect(item, true)}
              onKeyDown={(event) => handleNavigatorKey(event, index)}
              aria-pressed={index === layerIndex}
              aria-label={`Show Layer ${item.number}: ${item.title}`}
              className={cn(
                "s06-mini-button rounded border font-medium text-[#1A1A24] outline-none",
                index === layerIndex
                  ? "border-[#1A1A24] bg-[#FFE600] font-bold"
                  : "border-[#C8C8D0] bg-[#E5E5EC]",
              )}
            >
              {item.number}
            </button>
          ))}
        </div>
        <div className="s06-detail-identity absolute inset-x-0 bottom-1 flex items-center gap-3">
          <span className="s06-detail-anchor">
            <SecurityArchitectureIcon name={visual.anchor} tone="dark" size={34} />
          </span>
          <div className="min-w-0">
            <span className="block text-[11px] font-bold leading-none text-[#494965]">
              LAYER {layer.number}
            </span>
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="s06-detail-title mt-1 font-bold leading-none text-[#1A1A24] outline-none"
            >
              {layer.title}
            </h3>
          </div>
          <p className="s06-detail-verbs ml-auto font-bold text-[#494965]">
            {layer.subtitle.replaceAll(" - ", " · ")}
          </p>
        </div>
      </div>

      <div
        data-dense={dense ? "true" : "false"}
        className={cn(
          "s06-capability-grid mt-2 grid min-w-0",
          dense
            ? "grid-cols-1 gap-[7px] sm:grid-cols-3 sm:grid-rows-3"
            : "grid-cols-1 gap-x-3 gap-y-[5px] sm:grid-cols-2 sm:grid-rows-4",
        )}
      >
        {layer.components.map((item) => (
          <CapabilityCell key={item.label} item={item} dense={dense} />
        ))}
      </div>

      <div className="s06-outcome mt-7 flex items-center gap-2 border-l-[7px] border-[#FFE600] bg-[#1A1A24] px-2.5 text-white">
        <SecurityArchitectureIcon name={visual.outcome} tone="dark" size={21} />
        <p className="s06-outcome-text font-bold leading-none">
          {flows[layer.id] ?? "Measured performance · Governed operations · Continuous improvement"}
        </p>
      </div>
    </div>
  );
}

export function ToBeArchitecture() {
  const [state, setState] = useState<ArchitectureState>("overview");
  const overviewButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const detailHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const returnLayerRef = useRef<string | null>(null);
  const focusHeadingOnOpenRef = useRef(false);
  const selectedLayer =
    state === "overview" ? null : (archLayers.find((layer) => layer.id === state) ?? null);

  const openLayer = (layer: ArchLayer, fromNavigator = false) => {
    if (state === "overview") returnLayerRef.current = layer.id;
    focusHeadingOnOpenRef.current = !fromNavigator;
    setState(layer.id);
  };

  const returnToOverview = () => {
    const returnId = returnLayerRef.current;
    setState("overview");
    window.requestAnimationFrame(() => {
      if (returnId) overviewButtonRefs.current[returnId]?.focus({ preventScroll: true });
    });
  };

  useEffect(() => {
    if (selectedLayer && focusHeadingOnOpenRef.current) {
      focusHeadingOnOpenRef.current = false;
      detailHeadingRef.current?.focus({ preventScroll: true });
    }
  }, [selectedLayer]);

  useEffect(() => {
    if (!selectedLayer) return;
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      returnToOverview();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [selectedLayer]);

  return (
    <section id="to-be" className="s06-section scroll-mt-24 bg-ey-cream text-[#1A1A24]">
      <div className="s06-container mx-auto w-full px-5">
        <header>
          <p className="flex items-center gap-3 text-base font-semibold uppercase tracking-[0.22em] text-[#1A1A24]">
            <span aria-hidden="true" className="h-3 w-1.5 rounded-sm bg-[#FFE600]" />
            Section 06
          </p>
          <h2 className="s06-title mt-2 font-semibold text-[#1A1A24]">
            To-Be Integrated Security Architecture
          </h2>
          <p className="s06-intro mt-1.5 text-[#494965]">
            Read bottom-up: distributed sensing becomes transported data, then correlated
            intelligence, then coordinated human decision, then governed operational resilience —
            with cyber security and enterprise integration spanning every layer. Select any layer
            for the technical detail.
          </p>
        </header>

        <div
          data-section06-architecture
          data-view={state}
          className="s06-frame mt-4 grid min-w-0 gap-4"
        >
          <ArchitectureRail side="left" groups={cyberRail} />
          {selectedLayer ? (
            <ArchitectureDetail
              layer={selectedLayer}
              onOverview={returnToOverview}
              onSelect={openLayer}
              headingRef={detailHeadingRef}
            />
          ) : (
            <ArchitectureOverview onSelect={openLayer} buttonRefs={overviewButtonRefs} />
          )}
          <ArchitectureRail side="right" groups={integrationRail} />
        </div>
      </div>
    </section>
  );
}
