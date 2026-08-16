import type { LucideIcon } from "lucide-react";
import {
  Building2,
  BatteryCharging,
  Cctv,
  Cpu,
  Droplets,
  Factory,
  Flame,
  Fuel,
  Home,
  Layers,
  Mountain,
  MonitorCog,
  Package,
  Radio,
  Recycle,
  ShieldCheck,
  SunMedium,
  TrainFront,
  Waves,
  Wrench,
  Zap,
} from "lucide-react";

export type PlantType = "thermal" | "hydro" | "solar";

export const plantTypes: Array<{ id: PlantType; label: string }> = [
  { id: "thermal", label: "Thermal" },
  { id: "hydro", label: "Hydro" },
  { id: "solar", label: "Solar / BESS" },
];

export type PlantBlock = {
  id: string;
  name: string;
  lines: string[];
  icon: LucideIcon;
  zone: "A" | "B" | "C" | "D";
  zoneLabel: string;
  why: string;
  risks: string[];
  solutions: string[];
  shape: { x: number; y: number; w: number; h: number };
};

export const zoneMeta: Record<PlantBlock["zone"], { label: string; fill: string; border: string }> = {
  A: { label: "Perimeter & access", fill: "#D0E8FA", border: "#1269AC" },
  B: { label: "Generation assets", fill: "#D2F4DC", border: "#228941" },
  C: { label: "Utilities & continuity", fill: "#FFD9D7", border: "#E80D00" },
  D: { label: "People, digital & off-site", fill: "#E5E5EC", border: "#494965" },
};

/** Zone B reads differently when there is no fuel chain. */
export const zoneBLabel: Record<PlantType, string> = {
  thermal: "Generation assets",
  hydro: "Generation assets",
  solar: "Generation assets",
};

const A = zoneMeta.A.label;
const C = zoneMeta.C.label;
const D = zoneMeta.D.label;

/* ------------------------------------------------------------------ */
/* Common security spine — identical across every plant type          */
/* ------------------------------------------------------------------ */

const perimeter: PlantBlock = {
  id: "perimeter",
  icon: Cctv,
  name: "Plant boundary and perimeter",
  lines: ["Plant boundary and perimeter"],
  zone: "A",
  zoneLabel: A,
  why: "First line of detection; most intrusion events begin at the boundary.",
  risks: ["Fence cutting and scaling", "Blind spots along long stretches", "Delayed response to breaches"],
  solutions: [
    "Thermal and PTZ cameras with overlapping coverage",
    "AI intrusion and line-crossing analytics with auto PTZ hand-off",
    "Fence-mounted vibration or fibre sensing tied to camera pre-sets",
    "Perimeter lighting and patrol-verification checkpoints",
  ],
  shape: { x: 30, y: 30, w: 780, h: 550 },
};

const commonBlocks: PlantBlock[] = [
  {
    id: "entry",
    icon: ShieldCheck,
    name: "Entry & access control",
    lines: ["Entry &", "access control"],
    zone: "A",
    zoneLabel: A,
    why: "The primary identity checkpoint controlling who and what enters.",
    risks: ["Tailgating", "Unverified contractors", "Manual, unauditable gate registers"],
    solutions: [
      "Boom barriers with ANPR and weighbridge integration",
      "Card or biometric access control with contractor validity rules",
      "Visitor management with photo capture and host approval",
      "Turnstiles with anti-tailgate detection alerts",
    ],
    shape: { x: 60, y: 60, w: 170, h: 110 },
  },
  {
    id: "stores",
    icon: Package,
    name: "Stores, workshops & logistics",
    lines: ["Stores, workshops", "& logistics"],
    zone: "A",
    zoneLabel: A,
    why: "High-value material movement and a common shrinkage point.",
    risks: ["Pilferage of spares and scrap", "Undocumented material exit", "Vehicle misuse"],
    solutions: [
      "Camera coverage at every dock and gate with retention policy",
      "Gate-pass workflow linked to video bookmarking",
      "Loitering and after-hours activity analytics",
      "Scrap-yard coverage with weighbridge cross-check",
    ],
    shape: { x: 60, y: 190, w: 170, h: 110 },
  },
  {
    id: "admin",
    icon: Building2,
    name: "Administration & personnel areas",
    lines: ["Administration", "& personnel"],
    zone: "D",
    zoneLabel: D,
    why: "Visitor and contractor movement concentrates here.",
    risks: ["Unescorted visitors", "Unsecured document and IT areas", "Workplace incidents"],
    solutions: [
      "Zoned access levels for offices and records rooms",
      "Reception and corridor coverage with face-capture quality",
      "Panic buttons routed to the command centre",
      "Occupancy and muster reporting from access data",
    ],
    shape: { x: 60, y: 320, w: 170, h: 110 },
  },
  {
    id: "township",
    icon: Home,
    name: "Township / residential areas",
    lines: ["Township /", "residential areas"],
    zone: "D",
    zoneLabel: D,
    why: "Mixed civilian footfall needs clear separation from operational zones.",
    risks: ["Uncontrolled movement into plant zones", "Community incidents", "Privacy exposure"],
    solutions: [
      "Segregation gates between township and plant zones",
      "Entry and exit ANPR on colony roads",
      "Privacy-masked coverage on residential frontage",
      "Community incident escalation SOP into the command centre",
    ],
    shape: { x: 60, y: 450, w: 170, h: 110 },
  },
  {
    id: "electrical",
    icon: Zap,
    name: "Switchyard, transformers & power evacuation",
    lines: ["Switchyard, transformers", "& power evacuation"],
    zone: "B",
    zoneLabel: zoneMeta.B.label,
    why: "Switchyard and transmission assets are high-impact sabotage and theft targets.",
    risks: ["Copper and earthing-strip theft", "Sabotage causing grid-level outage", "Arc-flash exposure"],
    solutions: [
      "Dual-technology detection: thermal plus radar in the switchyard",
      "Restricted-zone analytics with audio deterrence",
      "Cable-trench and earthing-strip tamper monitoring",
      "Interlocked access with operations clearance",
    ],
    shape: { x: 550, y: 60, w: 250, h: 130 },
  },
  {
    id: "control",
    icon: MonitorCog,
    name: "Main control room & security command centre",
    lines: ["Main control room &", "security command centre"],
    zone: "C",
    zoneLabel: C,
    why: "Restricted-access nerve centre requiring strict entry discipline.",
    risks: ["Unauthorised operator-console access", "Insider misuse", "Single point of failure"],
    solutions: [
      "Two-factor access with anti-passback and shift rostering",
      "Console-level video with audit-grade retention",
      "Integrated video wall, SOP workflows and incident logging",
      "Redundant links to a disaster-recovery monitoring position",
    ],
    shape: { x: 550, y: 210, w: 250, h: 90 },
  },
  {
    id: "emergency",
    icon: Flame,
    name: "Fire, emergency & safety systems",
    lines: ["Fire, emergency", "& safety systems"],
    zone: "C",
    zoneLabel: C,
    why: "Fire, muster and rescue routes must stay visible and unobstructed.",
    risks: ["Blocked escape routes", "Late fire detection", "Unaccounted personnel during evacuation"],
    solutions: [
      "Blocked-exit and obstruction detection analytics",
      "Thermal and flame or smoke video detection",
      "Muster-point cameras with access-based headcount",
      "One-touch emergency mode on the video wall and PA system",
    ],
    shape: { x: 550, y: 410, w: 250, h: 60 },
  },
  {
    id: "digital",
    icon: Cpu,
    name: "ICT, communications & OT infrastructure",
    lines: ["ICT, communications", "& OT infrastructure"],
    zone: "D",
    zoneLabel: D,
    why: "Network rooms and links underpin every surveillance control.",
    risks: ["Physical access to switches and recorders", "OT/IT convergence exposure", "Loss of video on link failure"],
    solutions: [
      "Locked, monitored racks with door-open alerts",
      "Segmented surveillance VLAN with hardened devices",
      "Edge recording with store-and-forward on link loss",
      "Health monitoring for camera, storage and link availability",
    ],
    shape: { x: 550, y: 490, w: 250, h: 70 },
  },
];

const offsiteShape = { x: 815, y: 225, w: 180, h: 170 };

/** Water block wording differs by plant type; footprint stays identical. */
const waterShape = { x: 550, y: 320, w: 250, h: 70 };

function waterBlock(name: string, lines: string[], why: string): PlantBlock {
  return {
    id: "water",
    icon: Droplets,
    name,
    lines,
    zone: "C",
    zoneLabel: C,
    why,
    risks: ["Intake or dosing tampering", "Remote unmanned locations", "Drowning and access hazards"],
    solutions: [
      "Solar-powered wireless cameras at intake and pump houses",
      "Water-edge intrusion analytics and audio warning",
      "Tamper alerts on dosing, valve and treatment enclosures",
      "SCADA alarm correlation with video in the command centre",
    ],
    shape: waterShape,
  };
}

/* ------------------------------------------------------------------ */
/* Thermal                                                             */
/* ------------------------------------------------------------------ */

const thermalCore: PlantBlock[] = [
  {
    id: "coal-receipt",
    icon: TrainFront,
    name: "Coal receipt: railway siding, wagon tippler & truck tippler",
    lines: ["Coal receipt: railway siding,", "wagon & truck tippler"],
    zone: "B",
    zoneLabel: zoneBLabel.thermal,
    why: "Fuel enters the plant here; quantity and quality integrity is decided at this point.",
    risks: [
      "Wagon and truck coal pilferage in the siding corridor",
      "Quantity and grade manipulation at the tippler",
      "Uncontrolled third-party railway staff movement",
      "Long, poorly lit siding corridor outside the main fence",
    ],
    solutions: [
      "ANPR and wagon-number capture with tippler reconciliation",
      "Tippler-area cameras with tamper and obstruction detection",
      "Thermal plus radar detection along the siding corridor",
      "Evidence-grade retention of coal receipt video for billing disputes",
    ],
    shape: { x: 260, y: 60, w: 260, h: 100 },
  },
  {
    id: "coal-stockyard",
    icon: Fuel,
    name: "Coal stockyard & conveyor system",
    lines: ["Coal stockyard &", "conveyor system"],
    zone: "B",
    zoneLabel: zoneBLabel.thermal,
    why: "Largest open footprint on site, with continuous heavy vehicle and belt movement.",
    risks: [
      "Stock diversion and unauthorised vehicle movement",
      "Spontaneous combustion in the stockpile",
      "Conveyor tampering, spillage and belt fires",
      "Unsafe access near moving equipment",
    ],
    solutions: [
      "Stockyard PTZ with volumetric survey and stock-vs-book support",
      "Thermal hotspot detection across the stockpile",
      "Transfer-point cameras with belt-deviation and spillage analytics",
      "Safety-zone intrusion and PPE compliance detection",
    ],
    shape: { x: 260, y: 175, w: 260, h: 95 },
  },
  {
    id: "chp",
    icon: Wrench,
    name: "Coal handling plant (CHP) & crusher house",
    lines: ["Coal handling plant (CHP)", "& crusher house"],
    zone: "B",
    zoneLabel: zoneBLabel.thermal,
    why: "Confined, dusty and noisy area where safety incidents and stoppages concentrate.",
    risks: ["Man-down incidents in confined areas", "Junction-house fires", "Unauthorised maintenance access"],
    solutions: [
      "Dust-rated and explosion-proof cameras in crusher and junction houses",
      "Man-down and no-motion analytics with command-centre alerting",
      "Thermal monitoring at drive units and gearboxes",
      "Video-verified permit-to-work and lockout compliance",
    ],
    shape: { x: 260, y: 285, w: 260, h: 80 },
  },
  {
    id: "generation-thermal",
    icon: Factory,
    name: "Main plant: boiler, turbine-generator, ESP & auxiliaries",
    lines: ["Main plant: boiler,", "turbine-generator, ESP & aux"],
    zone: "B",
    zoneLabel: zoneBLabel.thermal,
    why: "Core asset; unauthorised presence has immediate safety and availability consequence.",
    risks: ["Unauthorised entry to hazardous areas", "Sabotage of critical equipment", "Delayed emergency detection"],
    solutions: [
      "Layered access control at boiler, turbine and ESP entries",
      "High-temperature and explosion-proof rated cameras",
      "Restricted-zone intrusion and man-down analytics",
      "Video-verified permit-to-work and lockout compliance",
    ],
    shape: { x: 260, y: 380, w: 260, h: 100 },
  },
  {
    id: "ash",
    icon: Recycle,
    name: "Ash handling system, ash dyke & ash pond",
    lines: ["Ash handling system,", "ash dyke & ash pond"],
    zone: "C",
    zoneLabel: C,
    why: "Ash movement is a compliance-sensitive and revenue-sensitive material flow.",
    risks: [
      "Unauthorised ash lifting and disposal",
      "Dyke breach and unsafe water-edge access",
      "Effluent and discharge violations",
    ],
    solutions: [
      "Ash-dyke perimeter cameras with vehicle counting and ANPR",
      "Gate-pass reconciliation for every ash transport trip",
      "Water-edge intrusion analytics on pond boundaries",
      "Discharge-point coverage retained as compliance evidence",
    ],
    shape: { x: 260, y: 495, w: 260, h: 65 },
  },
  {
    id: "offsite-thermal",
    icon: Mountain,
    name: "Captive mine / mine-to-plant corridor (where applicable)",
    lines: ["Captive mine /", "mine-to-plant", "corridor"],
    zone: "D",
    zoneLabel: D,
    why: "Fuel logistics outside the fence: mine, road corridor, MGR line and intake points.",
    risks: [
      "En-route coal pilferage and diversion",
      "No detection capability along the corridor",
      "No power or connectivity at remote nodes",
      "Slow response due to distance",
    ],
    solutions: [
      "Solar and battery powered camera nodes at chokepoints",
      "GPS and ANPR-based trip reconciliation from mine to plant",
      "4G/5G or point-to-point wireless backhaul with event-only streaming",
      "Central alarm handling with local response protocols",
    ],
    shape: offsiteShape,
  },
  waterBlock(
    "Water intake, treatment & cooling systems",
    ["Water intake, treatment", "& cooling systems"],
    "Raw water intake, DM plant, CW system and cooling towers directly gate generation availability.",
  ),
];

/* ------------------------------------------------------------------ */
/* Hydro                                                              */
/* ------------------------------------------------------------------ */

const hydroCore: PlantBlock[] = [
  {
    id: "dam",
    icon: Waves,
    name: "Dam, spillway & gate structures",
    lines: ["Dam, spillway", "& gate structures"],
    zone: "B",
    zoneLabel: zoneBLabel.hydro,
    why: "A national-consequence structure with public approach roads and crest access.",
    risks: [
      "Public and tourist access on the dam crest",
      "Sabotage or tampering with gate-hoist controls",
      "Boat approach from the reservoir side",
      "Long structure with limited lighting and manning",
    ],
    solutions: [
      "Crest and gallery access control with anti-passback",
      "Long-range thermal and radar covering upstream water approach",
      "Tamper and door-open alarms on hoist and gate control rooms",
      "Public-approach ANPR with visitor escort workflow",
    ],
    shape: { x: 260, y: 60, w: 260, h: 100 },
  },
  {
    id: "intake-penstock",
    icon: Droplets,
    name: "Intake, water-conductor system, penstock & surge shaft",
    lines: ["Intake, water-conductor", "system, penstock", "& surge shaft"],
    zone: "B",
    zoneLabel: zoneBLabel.hydro,
    why: "The water conduction system: any interference stops generation immediately.",
    risks: [
      "Interference at trash racks and intake gates",
      "Unmonitored tunnel and shaft portals",
      "Landslide or debris blockage detected late",
    ],
    solutions: [
      "Portal and adit access control with intrusion analytics",
      "Ruggedised cameras at intake, surge shaft and valve houses",
      "Slope and debris monitoring correlated with video",
      "SCADA level and flow alarm correlation in the command centre",
    ],
    shape: { x: 260, y: 175, w: 260, h: 95 },
  },
  {
    id: "powerhouse",
    icon: Factory,
    name: "Powerhouse & machine hall",
    lines: ["Powerhouse &", "machine hall"],
    zone: "B",
    zoneLabel: zoneBLabel.hydro,
    why: "Core asset, frequently underground, with restricted egress and poor connectivity.",
    risks: [
      "Unauthorised presence in the machine hall",
      "Confined-space and man-down exposure",
      "Single access tunnel as a chokepoint",
    ],
    solutions: [
      "Layered access control at tunnel entry and machine-hall levels",
      "Low-light and vibration-tolerant cameras with man-down analytics",
      "Leaky-feeder or fibre communication for underground coverage",
      "Headcount reconciliation from access data for evacuation",
    ],
    shape: { x: 260, y: 285, w: 260, h: 100 },
  },
  {
    id: "tailrace",
    icon: Layers,
    name: "Tailrace & downstream river channel",
    lines: ["Tailrace & downstream", "river channel"],
    zone: "C",
    zoneLabel: C,
    why: "Public-adjacent water release area with a real drowning and trespass risk.",
    risks: ["Public entry into the release channel", "Late warning before water release", "Unsafe fishing and bathing"],
    solutions: [
      "Water-edge intrusion analytics with automated audio warning",
      "Siren and PA integration tied to release schedules",
      "Thermal coverage of the downstream stretch",
      "Incident escalation SOP into the command centre",
    ],
    shape: { x: 260, y: 400, w: 260, h: 75 },
  },
  {
    id: "reservoir",
    icon: Waves,
    name: "Reservoir, dam approaches & vulnerable shoreline areas",
    lines: ["Reservoir, dam approaches", "& shoreline areas"],
    zone: "A",
    zoneLabel: A,
    why: "The largest and least controllable approach surface to the asset.",
    risks: ["Unauthorised boats and waterborne approach", "No fence line on the water side", "Vast unmanned shoreline"],
    solutions: [
      "Coastal-grade radar with camera slew-to-cue",
      "Long-range thermal PTZ on the water side",
      "Virtual water-boundary analytics with escalation tiers",
      "Patrol-boat coordination workflow from the command centre",
    ],
    shape: { x: 260, y: 490, w: 260, h: 70 },
  },
  {
    id: "offsite-hydro",
    icon: Mountain,
    name: "Access roads, adits/tunnels & hill-slope approaches",
    lines: ["Access roads,", "adits / tunnels &", "hill-slope approaches"],
    zone: "D",
    zoneLabel: D,
    why: "Remote terrain access is the practical determinant of response time.",
    risks: [
      "Single vulnerable access road",
      "No detection along tunnels and corridors",
      "No power or connectivity at remote nodes",
      "Weather-driven isolation of the site",
    ],
    solutions: [
      "Solar and battery powered camera nodes at chokepoints",
      "ANPR at approach-road checkpoints",
      "Point-to-point wireless or satellite backhaul with event-only streaming",
      "Local response protocol with central alarm handling",
    ],
    shape: offsiteShape,
  },
  waterBlock(
    "Station water & drainage systems",
    ["Station water &", "drainage systems"],
    "Station service water, dewatering and drainage systems that keep the powerhouse operable.",
  ),
];

/* ------------------------------------------------------------------ */
/* Solar / renewable                                                  */
/* ------------------------------------------------------------------ */

const solarCore: PlantBlock[] = [
  {
    id: "module-array",
    icon: SunMedium,
    name: "PV module array fields / blocks",
    lines: ["PV module array", "fields / blocks"],
    zone: "B",
    zoneLabel: zoneBLabel.solar,
    why: "Very large, low-value-per-point but high-aggregate asset spread over open land.",
    risks: [
      "Module and DC cable theft across a wide area",
      "Row-level incidents detected only during patrols",
      "Vegetation and animal intrusion",
      "Sparse power and network availability in the field",
    ],
    solutions: [
      "Zoned virtual fencing with row-level intrusion analytics",
      "Solar-powered wireless camera nodes on array blocks",
      "DC string tamper and disconnect alarms correlated with video",
      "Drone or UAV patrol for periodic area sweeps",
    ],
    shape: { x: 260, y: 60, w: 260, h: 110 },
  },
  {
    id: "inverter-transformer",
    icon: Zap,
    name: "Inverter stations & inverter transformers",
    lines: ["Inverter stations &", "inverter transformers"],
    zone: "B",
    zoneLabel: zoneBLabel.solar,
    why: "Concentrated high-value equipment distributed unmanned across the field.",
    risks: ["Copper and oil theft", "Unauthorised enclosure entry", "Fire in unmanned skids"],
    solutions: [
      "Door-open and tamper alarms on every inverter enclosure",
      "Local camera with edge analytics and event-only upload",
      "Thermal detection for early fire and overheating",
      "Audio deterrence with command-centre talk-down",
    ],
    shape: { x: 260, y: 185, w: 260, h: 85 },
  },
  {
    id: "bess",
    icon: BatteryCharging,
    name: "Battery energy storage system (BESS) (where applicable)",
    lines: ["Battery energy storage", "system (BESS)"],
    zone: "B",
    zoneLabel: zoneBLabel.solar,
    why: "High-value, safety-critical containerised asset with thermal-runaway exposure.",
    risks: ["Unauthorised container access", "Thermal runaway and fire", "Loss of monitoring on link failure"],
    solutions: [
      "Two-factor access control on container doors",
      "Thermal and gas detection integrated with video verification",
      "Interlocked emergency SOP on the video wall",
      "Edge recording with store-and-forward on link loss",
    ],
    shape: { x: 260, y: 285, w: 260, h: 85 },
  },
  {
    id: "om-store",
    icon: Package,
    name: "O&M facilities, spares & module-cleaning systems",
    lines: ["O&M facilities, spares &", "module-cleaning systems"],
    zone: "C",
    zoneLabel: C,
    why: "Spare modules, inverters and water systems that keep availability up.",
    risks: ["Spare-module pilferage", "Contractor movement without escort", "Water system tampering"],
    solutions: [
      "Camera coverage at store docks with gate-pass linkage",
      "Contractor access validity rules with time-bound credentials",
      "Tamper alarms on pump houses and water tanks",
      "After-hours activity analytics",
    ],
    shape: { x: 260, y: 385, w: 260, h: 85 },
  },
  {
    id: "solar-perimeter-corridor",
    icon: Cctv,
    name: "Remote / unmanned plant perimeter",
    lines: ["Remote / unmanned", "plant perimeter"],
    zone: "A",
    zoneLabel: A,
    why: "Perimeter length per MW is far higher than in a thermal station, with minimal manning.",
    risks: ["Kilometres of fence with few guards", "No mains power along stretches", "High false-alarm burden"],
    solutions: [
      "Solar-powered thermal detection nodes at fixed intervals",
      "Multi-sensor confirmation to suppress false alarms",
      "Prioritised alarm queue with response-time tracking",
      "Mobile patrol dispatch and verification from the command centre",
    ],
    shape: { x: 260, y: 485, w: 260, h: 75 },
  },
  {
    id: "offsite-solar",
    icon: Radio,
    name: "Transmission corridor & pooling substation",
    lines: ["Transmission corridor", "& pooling substation"],
    zone: "D",
    zoneLabel: D,
    why: "Power leaves through a long corridor and a frequently remote pooling substation.",
    risks: [
      "Tower and conductor theft along the corridor",
      "Unmanned pooling substation",
      "No detection or connectivity along the route",
    ],
    solutions: [
      "Unmanned substation coverage with remote gate release",
      "Tower-base tamper sensing at critical spans",
      "4G/5G or wireless backhaul with event-only streaming",
      "Joint response protocol with the transmission licensee",
    ],
    shape: offsiteShape,
  },
  waterBlock(
    "Module-cleaning water system",
    ["Module-cleaning", "water system"],
    "Water storage and dosing for module cleaning; tampering degrades generation yield.",
  ),
];

export const plantBlocksByType: Record<PlantType, PlantBlock[]> = {
  thermal: [perimeter, ...commonBlocks, ...thermalCore],
  hydro: [perimeter, ...commonBlocks, ...hydroCore],
  solar: [perimeter, ...commonBlocks, ...solarCore],
};

/** Default (thermal) set, kept for convenience. */
export const plantBlocks = plantBlocksByType.thermal;
