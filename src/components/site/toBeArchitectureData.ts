import {
  Activity,
  AlarmClock,
  Album,
  Archive,
  BatteryCharging,
  Bell,
  Brain,
  Building2,
  Camera,
  Cctv,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Cloud,
  Database,
  Fingerprint,
  Flame,
  Gauge,
  HardDrive,
  KeyRound,
  LayoutDashboard,
  Lock,
  Map,
  Monitor,
  MonitorPlay,
  Network,
  Plane,
  Radar,
  RadioTower,
  RefreshCcw,
  Repeat,
  Router,
  Satellite,
  ScanLine,
  Server,
  Shield,
  ShieldCheck,
  Siren,
  Smartphone,
  Split,
  Thermometer,
  Users,
  Video,
  Wifi,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Component = { icon: LucideIcon; label: string; detail: string };

export type ArchLayer = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  emphasis?: boolean;
  /** Number of components shown in the default executive view. */
  primary: number;
  components: Component[];
};

/** Ordered bottom-up; rendered top-down by reversing. */
export const archLayers: ArchLayer[] = [
  {
    id: "field",
    number: "01",
    title: "Field detection & identity",
    subtitle: "Sense - Detect - Identify",
    primary: 4,
    components: [
      { icon: Camera, label: "Fixed cameras", detail: "Zone coverage at gates, corridors and critical equipment." },
      { icon: Cctv, label: "PTZ cameras", detail: "Slew-to-cue verification of alarms across long sight lines." },
      { icon: Thermometer, label: "Thermal cameras", detail: "Night, smoke and hotspot detection in hazardous zones." },
      { icon: ScanLine, label: "ANPR", detail: "Vehicle identity at gates, weighbridge and fuel logistics." },
      { icon: Fingerprint, label: "Face / biometric access", detail: "Identity-bound entry for plant and contractor workforce." },
      { icon: Split, label: "Fence & intrusion sensors", detail: "PIDS, IR beams and vibration sensing on the perimeter." },
      { icon: Radar, label: "C-UAS radar / RF detection", detail: "Airspace detection and classification of drone activity." },
      { icon: Plane, label: "Surveillance drones", detail: "Tethered and docked UAV patrol of large or remote assets." },
    ],
  },
  {
    id: "edge",
    number: "02",
    title: "Edge compute & resilient network",
    subtitle: "Process - Transport - Preserve",
    primary: 4,
    components: [
      { icon: Server, label: "Edge AI / analytics nodes", detail: "Detection at source; only events travel upstream." },
      { icon: HardDrive, label: "Local NVR / edge storage", detail: "Continuity of recording through link or power loss." },
      { icon: Router, label: "PoE & aggregation switches", detail: "Industrial-grade, managed, powered field aggregation." },
      { icon: Network, label: "Fibre backbone", detail: "Redundant ring topology across plant and switchyard." },
      { icon: Wifi, label: "Wireless / 4G / 5G", detail: "Coverage for ash dykes, mines, dams and remote arrays." },
      { icon: BatteryCharging, label: "UPS / resilient field power", detail: "Ride-through power for field devices and edge nodes." },
      { icon: Split, label: "OT-IT gateway / DMZ", detail: "Controlled, one-way-by-default flows out of plant zones." },
      { icon: Clock, label: "Time synchronisation", detail: "Common clock so evidence timelines are defensible." },
    ],
  },
  {
    id: "platform",
    number: "03",
    title: "Security intelligence & platform",
    subtitle: "Correlate - Analyse - Understand",
    primary: 5,
    components: [
      { icon: Video, label: "VMS", detail: "Live view, playback and recording policy across all sites." },
      { icon: Brain, label: "AI video analytics", detail: "Intrusion, loitering, PPE, object and behaviour detection." },
      { icon: Shield, label: "PSIM / ICCC", detail: "Single operating picture and cross-system orchestration." },
      { icon: KeyRound, label: "Access & visitor management", detail: "Passes, contractor validity and zone authorisation." },
      { icon: Split, label: "Alarm correlation", detail: "Rules that fuse sensor, access and video into one alarm." },
      { icon: Map, label: "GIS", detail: "Every event pinned to a zone, asset and response route." },
      { icon: Satellite, label: "Drone / airspace awareness", detail: "Fused air picture with track history and no-fly overlays." },
      { icon: Album, label: "Evidence management", detail: "Locked, chain-of-custody video and event packages." },
      { icon: Database, label: "Storage & retention", detail: "Tiered hot, archive and evidence retention by policy." },
    ],
  },
  {
    id: "command",
    number: "04",
    title: "Command, response & decision",
    subtitle: "See - Decide - Act",
    primary: 4,
    components: [
      { icon: MonitorPlay, label: "Command-centre video wall", detail: "Shared operational picture for the watch team." },
      { icon: Monitor, label: "Operator workstations", detail: "Role-based views with alarm queue and verification." },
      { icon: ClipboardList, label: "Incident management", detail: "Case, timeline and closure record for every alarm." },
      { icon: Repeat, label: "SOP workflows", detail: "Each alarm type mapped to a defined, owned response." },
      { icon: Bell, label: "Alert & escalation", detail: "Tiered notification from operator to plant leadership." },
      { icon: Siren, label: "Dispatch", detail: "Nearest patrol tasked with live video on the move." },
      { icon: LayoutDashboard, label: "Executive MIS / KPI dashboard", detail: "Station and fleet-level security performance view." },
      { icon: Smartphone, label: "Mobile app for field responders", detail: "Live stream, task and closure capture in the field." },
    ],
  },
  {
    id: "governance",
    number: "05",
    title: "Governance & operational resilience",
    subtitle: "Measure - Govern - Improve",
    primary: 4,
    components: [
      { icon: Gauge, label: "Security KPIs / SLA", detail: "Detection, verification and closure times as measures." },
      { icon: ClipboardCheck, label: "Audit trails", detail: "Who saw what, when and what action followed." },
      { icon: Activity, label: "System health", detail: "Device, storage and link availability monitoring." },
      { icon: Album, label: "Incident reporting", detail: "Standard reporting to management and authorities." },
      { icon: Archive, label: "Asset lifecycle", detail: "Device inventory, obsolescence and refresh planning." },
      { icon: Wrench, label: "AMC / maintenance", detail: "Contracted upkeep, spares and response obligations." },
      { icon: AlarmClock, label: "Drills & exercises", detail: "Rehearsed response with measured outcomes." },
      { icon: RefreshCcw, label: "Periodic risk reassessment", detail: "Re-baselining as threat and plant profile change." },
    ],
  },
];

/** Flow payloads, indexed by the layer the data is leaving. */
export const flows: Record<string, string> = {
  field: "Video - Telemetry - Identity - Sensor events",
  edge: "Edge Processing · Resilient Transport · Recording Continuity",
  platform: "Correlated events - Alarms - Evidence - Situational awareness",
  command: "Outcomes - Response times - Audit record",
};

export type RailGroup = { caption?: string; items: Component[] };

export const cyberRail: RailGroup[] = [
  {
    caption: "Security-system controls",
    items: [
      { icon: Network, label: "Security network segmentation", detail: "Dedicated zones for CCTV, access control, perimeter and command systems." },
      { icon: Shield, label: "Firewall / DMZ protection", detail: "Allow-listed flows between security, OT and enterprise networks." },
      { icon: ShieldCheck, label: "Secure device & edge configuration", detail: "Hardening baseline for cameras, controllers, servers and edge devices." },
      { icon: Fingerprint, label: "Controlled system access", detail: "Role-based administration of VMS, ACS and security platforms." },
      { icon: Network, label: "Secure remote support", detail: "Controlled OEM and integrator maintenance paths with auditable access." },
      { icon: RefreshCcw, label: "Firmware & patch governance", detail: "Managed updates for field devices, servers and security appliances." },
      { icon: ClipboardCheck, label: "Audit logging & traceability", detail: "Operator, administrator, configuration, export and alarm actions retained for accountability and forensic traceability." },
      { icon: Cloud, label: "Backup / DR for security systems", detail: "Recoverable configurations, evidence and core security platforms." },
    ],
  },
  {
    caption: "InfoSec dependencies",
    items: [
      { icon: Fingerprint, label: "IAM / MFA", detail: "Enterprise identity services consumed by security platforms." },
      { icon: Lock, label: "PKI / certificates", detail: "Enterprise certificate services for trusted devices and encrypted sessions." },
      { icon: Monitor, label: "SIEM integration", detail: "Relevant security-system logs and events forwarded to the enterprise SIEM." },
    ],
  },
];

export const integrationRail: RailGroup[] = [
  {
    caption: "Plant / enterprise",
    items: [
      { icon: Server, label: "SCADA / DCS", detail: "Process context alongside the security event." },
      { icon: Flame, label: "Fire alarm & safety systems", detail: "Fire and gas alarms surfaced in the same workflow." },
      { icon: Database, label: "ERP", detail: "Asset, contract and spares linkage." },
      { icon: Users, label: "HR / contractor systems", detail: "Authoritative identity and validity of workforce." },
      { icon: Wrench, label: "CMMS", detail: "Faults raised as maintenance work orders." },
      { icon: Monitor, label: "Enterprise Cyber SOC", detail: "Joint physical and cyber incident handling." },
    ],
  },
  {
    caption: "Agencies & authorities",
    items: [
      { icon: ShieldCheck, label: "Plant security / CISF", detail: "Where applicable to the station." },
      { icon: Siren, label: "Police / emergency services", detail: "Verified escalation with location and evidence." },
      { icon: Flame, label: "Fire & rescue services", detail: "Coordinated response for plant fire events." },
      { icon: Building2, label: "State / district authorities", detail: "Disaster management and situational reporting." },
      { icon: Shield, label: "CERT-In / cyber agencies", detail: "Reporting obligations and advisories." },
      { icon: RadioTower, label: "Regulatory & statutory authorities", detail: "CEA, drone-rule and grid-security compliance." },
    ],
  },
];

export const principles = [
  "Secure by design",
  "Resilient by default",
  "Open & interoperable",
  "Human in the loop",
  "Auditable operations",
];
