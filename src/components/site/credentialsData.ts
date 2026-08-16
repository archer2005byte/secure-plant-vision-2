export type CredentialCategory =
  | "power"
  | "safecity"
  | "iccc"
  | "erss"
  | "fire"
  | "police"
  | "cdrone";

export type CategoryMeta = {
  id: CredentialCategory;
  label: string;
  short: string;
  dot: string;
  text: string;
};

export const categories: CategoryMeta[] = [
  { id: "power", label: "Power sector", short: "Power", dot: "fill-ey-yellow", text: "text-ey-yellow" },
  { id: "safecity", label: "Safe city & statewide surveillance", short: "Safe city", dot: "fill-ey-coral", text: "text-ey-coral" },
  { id: "iccc", label: "ICCC & smart city", short: "ICCC", dot: "fill-ey-amber", text: "text-ey-amber" },
  { id: "erss", label: "Emergency response (ERSS)", short: "ERSS", dot: "fill-ey-cream", text: "text-ey-cream" },
  { id: "fire", label: "Fire & disaster management", short: "Fire", dot: "fill-ey-resilience", text: "text-ey-resilience" },
  { id: "police", label: "Police & large-scale surveillance", short: "Police / large-scale", dot: "fill-white", text: "text-white" },
  { id: "cdrone", label: "Counter-drone & specialised", short: "Counter-drone", dot: "fill-ey-gold", text: "text-ey-gold" },
];

export type Programme = {
  id: string;
  name: string;
  place: string;
  category: CredentialCategory;
  detail: string;
  lat: number;
  lng: number;
  /** small pixel nudge so co-located markers stay clickable */
  dx?: number;
  dy?: number;
};

export const programmes: Programme[] = [
  // Power sector
  {
    id: "mspgcl",
    name: "MSPGCL / MAHAGENCO — Centralized Monitoring Solution",
    place: "Maharashtra",
    category: "power",
    detail: "PMC for supply, installation and commissioning of CMS across 8 stations, 10,872 MW.",
    lat: 19.07,
    lng: 72.87,
    dx: -8,
    dy: -6,
  },
  {
    id: "uprvunl",
    name: "UPRVUNL — Real-time centralized monitoring (RTCMS) with AI/ML",
    place: "Uttar Pradesh",
    category: "power",
    detail: "PMC across 10 thermal stations, 9,745 MW — as-is/to-be, DPR, specifications, tendering.",
    lat: 26.85,
    lng: 80.95,
    dy: -7,
  },
  {
    id: "dvc",
    name: "Damodar Valley Corporation — procurement & analytics transformation",
    place: "Jharkhand / West Bengal",
    category: "power",
    detail: "8,075 MW corporation-wide: maturity assessment, operating model, KPI dashboards.",
    lat: 23.79,
    lng: 86.43,
  },
  {
    id: "npcil",
    name: "NPCIL — ERP implementation consultancy",
    place: "Fleet-wide, India",
    category: "power",
    detail: "8,780 MW nuclear fleet: RFP, bid evaluation, blueprint oversight, security assessment.",
    lat: 19.07,
    lng: 72.87,
    dx: -8,
    dy: 8,
  },
  {
    id: "nhdc",
    name: "NHDC — ERP implementation consultancy",
    place: "Madhya Pradesh",
    category: "power",
    detail: "1,520 MW hydro: programme management, SLA validation, configuration control audit.",
    lat: 23.25,
    lng: 77.41,
    dx: -9,
    dy: -8,
  },

  // Safe city / statewide surveillance
  {
    id: "delhi-safe",
    name: "Delhi Safe City",
    place: "Delhi",
    category: "safecity",
    detail: "City-scale surveillance programme design and implementation support.",
    lat: 28.61,
    lng: 77.21,
    dy: -6,
  },
  {
    id: "jk-safe",
    name: "Safe City Jammu & Kashmir",
    place: "Jammu & Kashmir",
    category: "safecity",
    detail: "Surveillance programme in an elevated-threat environment.",
    lat: 34.08,
    lng: 74.8,
  },
  {
    id: "blr-safe",
    name: "Bengaluru Safe City",
    place: "Karnataka",
    category: "safecity",
    detail: "Metropolitan safe city surveillance and command-centre programme.",
    lat: 12.97,
    lng: 77.59,
  },
  {
    id: "ap-surv",
    name: "Andhra Pradesh statewide surveillance",
    place: "Andhra Pradesh",
    category: "safecity",
    detail: "Statewide surveillance initiative across districts.",
    lat: 16.51,
    lng: 80.51,
  },
  {
    id: "mp-safe",
    name: "MP Safe Cities — statewide initiative",
    place: "Madhya Pradesh",
    category: "safecity",
    detail: "Statewide safe-city surveillance rollout.",
    lat: 23.25,
    lng: 77.41,
    dx: 4,
    dy: 2,
  },
  {
    id: "viswas",
    name: "Gujarat VISWAS project",
    place: "Gujarat",
    category: "safecity",
    detail: "Statewide video surveillance and analytics programme.",
    lat: 23.22,
    lng: 72.65,
  },
  {
    id: "ladakh",
    name: "Ladakh surveillance project",
    place: "Ladakh",
    category: "safecity",
    detail: "Remote, high-altitude surveillance in a border environment.",
    lat: 34.16,
    lng: 77.58,
  },
  {
    id: "gmda",
    name: "Gurugram Municipal Development Authority",
    place: "Haryana",
    category: "safecity",
    detail: "Urban surveillance programme advisory.",
    lat: 28.46,
    lng: 77.03,
    dx: -7,
    dy: 6,
  },

  // ICCC / smart city
  { id: "iccc-gurugram", name: "ICCC Gurugram", place: "Haryana", category: "iccc", detail: "Integrated Command and Control Centre programme.", lat: 28.45, lng: 77.02, dx: -12, dy: -2 },
  { id: "iccc-nagpur", name: "ICCC Nagpur", place: "Maharashtra", category: "iccc", detail: "Smart city command-centre programme.", lat: 21.15, lng: 79.09 },
  { id: "iccc-navimumbai", name: "ICCC Navi Mumbai", place: "Maharashtra", category: "iccc", detail: "Smart city command-centre programme.", lat: 19.03, lng: 73.03, dx: 7, dy: 4 },
  { id: "iccc-pcmc", name: "ICCC Pimpri-Chinchwad", place: "Maharashtra", category: "iccc", detail: "Smart city command-centre programme.", lat: 18.63, lng: 73.8 },
  { id: "iccc-nashik", name: "ICCC Nashik", place: "Maharashtra", category: "iccc", detail: "Smart city command-centre programme.", lat: 20.0, lng: 73.79 },
  { id: "iccc-csn", name: "ICCC Chhatrapati Sambhaji Nagar", place: "Maharashtra", category: "iccc", detail: "Smart city command-centre programme.", lat: 19.88, lng: 75.34 },
  { id: "iccc-jalandhar", name: "ICCC Jalandhar", place: "Punjab", category: "iccc", detail: "Smart city command-centre programme.", lat: 31.33, lng: 75.58 },
  { id: "iccc-amritsar", name: "ICCC Amritsar", place: "Punjab", category: "iccc", detail: "Smart city command-centre programme.", lat: 31.63, lng: 74.87 },
  { id: "iccc-bbsr", name: "ICCC Bhubaneshwar", place: "Odisha", category: "iccc", detail: "Smart city command-centre programme.", lat: 20.3, lng: 85.82, dy: -6 },
  { id: "iccc-prayagraj", name: "ICCC Prayagraj", place: "Uttar Pradesh", category: "iccc", detail: "Smart city command-centre programme.", lat: 25.44, lng: 81.85 },
  { id: "iccc-jaipur", name: "ICCC Jaipur", place: "Rajasthan", category: "iccc", detail: "Smart city command-centre programme.", lat: 26.91, lng: 75.79 },
  { id: "iccc-faridabad", name: "ICCC Faridabad", place: "Haryana", category: "iccc", detail: "Smart city command-centre programme.", lat: 28.41, lng: 77.31, dx: 8, dy: 8 },
  { id: "noida-itms", name: "Noida ITMS", place: "Uttar Pradesh", category: "iccc", detail: "Integrated traffic management system programme.", lat: 28.57, lng: 77.32, dx: 14, dy: 2 },
  { id: "iccc-lucknow", name: "ICCC Lucknow", place: "Uttar Pradesh", category: "iccc", detail: "Smart city command-centre programme.", lat: 26.85, lng: 80.95, dx: 7, dy: 4 },
  { id: "iccc-guwahati", name: "ICCC Guwahati", place: "Assam", category: "iccc", detail: "Smart city command-centre programme.", lat: 26.14, lng: 91.74 },

  // ERSS
  { id: "erss-cg", name: "ERSS Chhattisgarh", place: "Chhattisgarh", category: "erss", detail: "Emergency response support system (112) programme.", lat: 21.25, lng: 81.63, dy: -6 },
  { id: "erss-od", name: "ERSS Odisha", place: "Odisha", category: "erss", detail: "Emergency response support system (112) programme.", lat: 20.3, lng: 85.82, dx: 8, dy: 4 },
  { id: "erss-br", name: "ERSS Bihar", place: "Bihar", category: "erss", detail: "Emergency response support system (112) programme.", lat: 25.59, lng: 85.14, dy: -6 },
  { id: "erss-mp", name: "ERSS Madhya Pradesh", place: "Madhya Pradesh", category: "erss", detail: "Emergency response support system (112) programme.", lat: 23.25, lng: 77.41, dx: 12, dy: -6 },
  { id: "erss-mh", name: "ERSS Maharashtra", place: "Maharashtra", category: "erss", detail: "Emergency response support system (112) programme.", lat: 19.07, lng: 72.87, dx: -16, dy: 2 },
  { id: "erss-hr", name: "ERSS Haryana", place: "Haryana", category: "erss", detail: "Emergency response support system (112) programme.", lat: 30.69, lng: 76.85, dx: -8, dy: 6 },
  { id: "erss-up", name: "ERSS Uttar Pradesh", place: "Uttar Pradesh", category: "erss", detail: "Emergency response support system (112) programme.", lat: 26.85, lng: 80.95, dx: 14, dy: -4 },
  { id: "erss-blr", name: "ERSS Bengaluru", place: "Karnataka", category: "erss", detail: "City emergency response programme.", lat: 12.97, lng: 77.59, dx: 9, dy: 6 },
  { id: "erss-as", name: "ERSS Assam", place: "Assam", category: "erss", detail: "Emergency response support system (112) programme.", lat: 26.14, lng: 91.75, dx: 9, dy: 7 },

  // Fire & disaster
  { id: "fire-cg", name: "Fire & disaster management, Chhattisgarh", place: "Chhattisgarh", category: "fire", detail: "Fire and disaster response modernisation.", lat: 21.25, lng: 81.63, dx: 9, dy: 5 },
  { id: "fire-od", name: "Fire & disaster management, Odisha", place: "Odisha", category: "fire", detail: "Fire and disaster response modernisation.", lat: 20.3, lng: 85.82, dx: -1, dy: 10 },
  { id: "fire-mp", name: "Fire & disaster management, Madhya Pradesh", place: "Madhya Pradesh", category: "fire", detail: "Fire and disaster response modernisation.", lat: 23.25, lng: 77.41, dx: 6, dy: 11 },
  { id: "fire-mh", name: "Fire & disaster management, Maharashtra", place: "Maharashtra", category: "fire", detail: "Fire and disaster response modernisation.", lat: 19.07, lng: 72.87, dx: -1, dy: 12 },

  // Police / large-scale surveillance
  { id: "mp60", name: "Integrated security surveillance across 60 cities of MP", place: "Madhya Pradesh", category: "police", detail: "Statewide, multi-city integrated surveillance programme.", lat: 22.72, lng: 75.86 },
  { id: "ap-cloud", name: "Cloud-based IP CCTV surveillance, Andhra Pradesh", place: "Andhra Pradesh", category: "police", detail: "Statewide cloud video surveillance solution.", lat: 16.51, lng: 80.51, dx: 9, dy: 7 },
  { id: "sbi-cms", name: "Centralized Monitoring Station, State Bank of India", place: "Pan-India", category: "police", detail: "Enterprise-scale centralised monitoring station.", lat: 19.07, lng: 72.87, dx: 8, dy: -8 },
  { id: "hr-police", name: "CCTV for police stations and posts, Haryana", place: "Haryana", category: "police", detail: "Statewide police premises surveillance.", lat: 30.73, lng: 76.78, dx: 8, dy: -4 },
  { id: "br-police", name: "CCTV for police stations and posts, Bihar", place: "Bihar", category: "police", detail: "Statewide police premises surveillance.", lat: 25.59, lng: 85.14, dx: 9, dy: 5 },
  { id: "dtc", name: "IP-based CCTV in DTC and cluster buses", place: "Delhi", category: "police", detail: "Fleet-wide mobile surveillance across public transport.", lat: 28.61, lng: 77.21, dx: -13, dy: -8 },

  // Counter-drone
  {
    id: "cdrone-mrpl",
    name: "Counter-drone (C-UAS) feasibility study, Mangalore Refinery & Petrochemicals",
    place: "Karnataka",
    category: "cdrone",
    detail: "Counter-drone feasibility for a critical hydrocarbon installation.",
    lat: 12.87,
    lng: 74.84,
  },
];

export const powerEngagements = [
  {
    client: "Maharashtra State Power Generation Co. Ltd (MSPGCL / MAHAGENCO)",
    project: "Centralized Monitoring Solution (CMS) — supply, installation and commissioning",
    capacity: "10,872 MW (10,200 MW thermal, 672 MW gas)",
    role: "Project management consultancy",
    units: "660 / 500 / 250 / 210 MW units",
    stations:
      "Bhusawal, Chandrapur, Paras, Parli, Nashik, Koradi, Khaperkheda TPS and Uran GTPS",
    scope: [
      "As-is and to-be study",
      "DPR preparation and technical specifications",
      "RFP preparation and tendering",
      "Monitoring, review and post-implementation handover",
    ],
  },
  {
    client: "Uttar Pradesh Rajya Vidyut Utpadan Nigam Ltd (UPRVUNL)",
    project: "Real-time centralized monitoring system with AI/ML applications (RTCMS)",
    capacity: "9,745 MW (thermal)",
    role: "Project management consultancy",
    units: "660 / 500 / 250 / 210 MW units",
    stations:
      "Anpara A/B/D, Obra B/C, Harduaganj D/E, Parichha B/C, Panki C and Jawaharpur TPS",
    scope: [
      "As-is and to-be study",
      "DPR preparation and technical specifications",
      "RFP preparation and tendering",
      "Monitoring, review and knowledge transfer",
    ],
  },
  {
    client: "Damodar Valley Corporation (DVC)",
    project: "Procurement excellence transformation; analytics, AI and Gen AI capability building",
    capacity: "8,075.2 MW (7,928 MW thermal, 147.2 MW hydel)",
    role: "Consultancy services",
    units: "660 / 500 / 250 / 210 MW units",
    stations: "Corporation-wide engagement",
    scope: [
      "Tender management support and liquidation of pending tenders",
      "Maturity assessment, spend and gap analysis",
      "Operating model, SOPs, SLAs and DOA redesign",
      "Chairman's office KPI dashboards and analytics training",
    ],
  },
  {
    client: "Nuclear Power Corporation of India Ltd (NPCIL)",
    project: "Consultancy services for ERP implementation",
    capacity: "8,780 MW",
    role: "Project management consultancy",
    units: "1000 / 700 / 540 / 220 / 200 / 160 MW units",
    stations: "Fleet-wide ERP programme",
    scope: [
      "RFP preparation and bid evaluation support",
      "FRS validation, requirement mapping and RTM coverage",
      "Business blueprint oversight and implementation monitoring",
      "Go-live, stabilization, security assessment and governance",
    ],
  },
  {
    client: "Narmada Hydroelectric Development Corporation (NHDC)",
    project: "Consultancy services for ERP implementation",
    capacity: "1,520 MW (hydro)",
    role: "Project management consultancy",
    units: "125 / 65 MW units",
    stations: "Corporate office and project locations",
    scope: [
      "Programme management and system design review",
      "Validation of performance monitoring control interfaces",
      "Cloud test runs to validate SLAs",
      "Change and configuration control audit; ERP process audit",
    ],
  },
];