export type UseCase = {
  id: number;
  name: string;
  group: string;
  zone: string;
  plantTypes?: string;
  chain: { detect: string; correlate: string; respond: string };
  detects: string;
  matters: string;
  response: string[];
};

export const groupOrder = [
  "Generation and electrical assets",
  "Material and movement integrity",
  "Safety and process events",
  "Remote and distributed assets",
  "System integrity and investigation",
];

export const useCases: UseCase[] = [
  {
    id: 1,
    name: "Perimeter intrusion",
    group: "Generation and electrical assets",
    zone: "Zone A — perimeter",
    chain: { detect: "Thermal / PTZ · line crossing", correlate: "PIDS + GIS map", respond: "Guard dispatch" },
    detects:
      "Fence climb, cut or crossing of the outer boundary line detected by thermal cameras and perimeter intrusion detection.",
    matters:
      "The boundary is the first and cheapest place to stop an event; late detection converts a trespass into an asset incident.",
    response: [
      "Alert with camera slew to zone",
      "Verify on thermal and visible feed",
      "Dispatch nearest patrol",
      "Log against fence segment ID",
    ],
  },
  {
    id: 2,
    name: "Intrusion near switchyard / transformer zone",
    group: "Generation and electrical assets",
    zone: "Zone B — generation and electrical",
    chain: { detect: "Fixed / PTZ · intrusion", correlate: "GIS + work permit", respond: "Security alert" },
    detects:
      "Human presence inside the switchyard fence line, transformer bays or cable galleries outside sanctioned work windows.",
    matters:
      "A single transformer or bay compromise can force a unit trip or partial generation loss, with long replacement lead times.",
    response: [
      "Alert on ICCC video wall",
      "Cross-check against work permit",
      "Dispatch patrol with shift in-charge",
      "Log against unit and bay ID",
    ],
  },
  {
    id: 3,
    name: "Unauthorised approach to coal conveyor or CHP",
    group: "Generation and electrical assets",
    zone: "Zone B — fuel handling",
    plantTypes: "Thermal",
    chain: { detect: "Fixed · person detection", correlate: "CHP clearance + ACS", respond: "CHP control room" },
    detects:
      "Approach to conveyor galleries, transfer points, crusher house or junction towers by persons without CHP clearance.",
    matters:
      "CHP areas combine nip-point fatality risk with fuel-pilferage exposure on a continuously running system.",
    response: [
      "Alert to CHP control room",
      "Verify maintenance clearance",
      "Stop-belt decision if required",
      "Record in CHP shift log",
    ],
  },
  {
    id: 4,
    name: "Contractor entering restricted generation block",
    group: "Generation and electrical assets",
    zone: "Zone B — generation",
    chain: { detect: "Dome · person / face", correlate: "ACS + contractor record", respond: "Engineer-in-charge" },
    detects:
      "Contractor badge or face seen in turbine hall, boiler area or unit block outside the sanctioned scope, area or time window.",
    matters:
      "Contractor movement discipline is the most frequent breakdown point in plant access control and audit findings.",
    response: ["Alert engineer-in-charge", "Escort out of block", "Entry against contractor record", "Monthly compliance trend"],
  },
  {
    id: 5,
    name: "Unauthorised access to control-room approaches",
    group: "Generation and electrical assets",
    zone: "Zone C — control and IT",
    chain: { detect: "Dome · person detection", correlate: "ACS interlock + OT SOC", respond: "Shift charge engineer" },
    detects:
      "Movement in unit control room lobbies, UPS and relay rooms, or server and SCADA room approaches without dual authorisation.",
    matters: "Physical proximity to control and OT assets is a direct sabotage and cyber-physical exposure path.",
    response: [
      "Interlock alarm at door",
      "Operator visual verification",
      "Escalate to shift charge engineer",
      "Notify OT security / SOC",
    ],
  },
  {
    id: 6,
    name: "Cable and copper theft",
    group: "Material and movement integrity",
    zone: "Zone B — cable trenches and yards",
    chain: { detect: "Fixed / thermal · intrusion", correlate: "PIDS + zone map", respond: "Patrol" },
    detects:
      "Night-time presence, digging or trench-cover disturbance along cable routes, earth-mat areas and idle equipment yards.",
    matters:
      "Copper and cable loss carries a disproportionate restoration cost and can disable protection or auxiliary supply.",
    response: ["Thermal alert on trench route", "Confirm no permitted work", "Dispatch patrol to segment", "FIR-grade evidence pack"],
  },
  {
    id: 7,
    name: "Material removal from stores / scrap area",
    group: "Material and movement integrity",
    zone: "Zone C — stores and scrap",
    chain: { detect: "Fixed · object / loading", correlate: "Gate pass + ERP", respond: "Stores security" },
    detects:
      "Loading, hand-carry or after-hours movement of material from stores yards, scrap bays or dismantled-equipment areas.",
    matters:
      "Scrap and spares movement is where value leakage is hardest to reconstruct after the fact without indexed video.",
    response: ["Alert stores security post", "Match against gate pass", "Retrieve indexed video clip", "Raise deviation to materials head"],
  },
  {
    id: 8,
    name: "Wrong vehicle entering fuel or hazardous-material route",
    group: "Material and movement integrity",
    zone: "Zone A — gates and internal roads",
    chain: { detect: "ANPR / LPR · vehicle", correlate: "ACS + weighbridge", respond: "Gate denial" },
    detects:
      "ANPR mismatch, unapproved lane use or a vehicle diverging from the declared fuel, oil, chemical or ash route.",
    matters: "Route deviation drives both fuel quantity-integrity loss and hazardous-material safety exposure inside the plant.",
    response: ["ANPR flag at gate", "Stop and verify challan", "Weighbridge cross-check", "Route deviation report"],
  },
  {
    id: 9,
    name: "Suspicious vehicle behaviour",
    group: "Material and movement integrity",
    zone: "Zone A — approaches and gates",
    chain: { detect: "ANPR / PTZ · behaviour", correlate: "ACS + watchlist", respond: "Verification" },
    detects:
      "Repeat passes, prolonged dwell near boundary or gates, or a plate appearing on a watchlist across multiple approach cameras.",
    matters: "Pre-attack reconnaissance and organised pilferage both show up as vehicle behaviour long before an intrusion.",
    response: ["Behaviour alert to ICCC", "Watchlist and history check", "Field verification by patrol", "Escalate to district police if repeated"],
  },
  {
    id: 10,
    name: "Transformer / oil-area fire and smoke corroboration",
    group: "Safety and process events",
    zone: "Zone B — transformers and oil storage",
    chain: { detect: "Thermal · heat / flame", correlate: "FAS + SCADA", respond: "Emergency response" },
    detects:
      "Visual smoke or flame signature and thermal rise in transformer yard, oil storage, coal stockyard or cable galleries.",
    matters: "Coal-yard smouldering and cable-gallery fires need visual confirmation to avoid both false trips and delayed response.",
    response: ["Corroborate with fire detection", "Notify plant fire station", "Guide tender to nearest access", "Attach clip to incident record"],
  },
  {
    id: 11,
    name: "Thermal hotspot on rotating or conveying equipment",
    group: "Safety and process events",
    zone: "Zone B — mills, conveyors, cable galleries",
    plantTypes: "Thermal",
    chain: { detect: "Thermal · anomaly", correlate: "SCADA / FAS", respond: "Inspection" },
    detects:
      "Temperature-trend anomaly on conveyor idlers, mill bearings, bus ducts or cable trays against a learned baseline.",
    matters: "Most fuel-path fires begin as a bearing or idler hotspot that is visible on thermal hours before ignition.",
    response: ["Hotspot alert with trend chart", "Correlate with SCADA load data", "Raise inspection work order", "Track to closure in CMMS"],
  },
  {
    id: 12,
    name: "Person-down / worker fall",
    group: "Safety and process events",
    zone: "Zone B — plant areas and structures",
    chain: { detect: "Fixed · person-down", correlate: "Safety + occupancy", respond: "Emergency medical" },
    detects: "Fall, prolonged prone posture or immobility in walkways, structures, silos, ash areas or lone-worker zones.",
    matters: "Lone-worker incidents in remote plant areas are usually discovered late; detection time is survival time.",
    response: ["Person-down alert to ICCC", "Camera confirmation of posture", "Dispatch ambulance and safety officer", "Incident record with clip"],
  },
  {
    id: 13,
    name: "PPE violation in mandated zone",
    group: "Safety and process events",
    zone: "Zone B — mandated PPE areas",
    chain: { detect: "Fixed · PPE analytic", correlate: "HSE + contractor record", respond: "Supervisor" },
    detects: "Missing helmet, harness, high-visibility jacket or footwear where PPE is mandatory, including work-at-height.",
    matters: "PPE compliance is a measurable safety KPI and a recurring audit and insurance observation.",
    response: ["Snapshot to area supervisor", "On-the-spot correction", "Tag to contractor scorecard", "Weekly HSE compliance trend"],
  },
  {
    id: 14,
    name: "Personnel remaining inside hazardous zone after shutdown",
    group: "Safety and process events",
    zone: "Zone B — hazardous areas",
    chain: { detect: "Fixed · occupancy", correlate: "Permit + LOTO", respond: "Re-energisation block" },
    detects:
      "Occupancy in ESP, mill, ash hopper, penstock or confined-space areas after the permit or shutdown window closes.",
    matters: "Man-in-zone verification before re-energisation is a life-safety control, not only a security control.",
    response: ["Block re-energisation clearance", "Zone announcement and sweep", "Safety officer confirmation", "Permit closure with video evidence"],
  },
  {
    id: 15,
    name: "Gas-area intrusion in Ex-rated zone",
    group: "Safety and process events",
    zone: "Zone B — Ex-rated areas",
    plantTypes: "Thermal / gas",
    chain: { detect: "Ex-rated camera · intrusion", correlate: "Gas detection", respond: "Emergency protocol" },
    detects:
      "Unauthorised entry into hydrogen, fuel-oil, gas-skid or chlorine handling areas, correlated with gas-detector state.",
    matters: "Entry into a flammable or toxic zone during an abnormal gas reading is a mass-casualty scenario.",
    response: ["Interlocked alarm at zone entry", "Check live gas-detector reading", "Evacuate and isolate", "Notify emergency controller"],
  },
  {
    id: 16,
    name: "BESS thermal event",
    group: "Safety and process events",
    zone: "Zone B — battery energy storage",
    plantTypes: "Solar / BESS (where applicable)",
    chain: { detect: "Thermal · heat anomaly", correlate: "BMS / FAS", respond: "Emergency protocol" },
    detects: "Cell or container temperature anomaly, venting or smoke signature at battery containers and inverter rooms.",
    matters: "Thermal runaway escalates in minutes and demands a different response protocol from a conventional fire.",
    response: ["Thermal alarm with container ID", "Correlate BMS cell data", "Isolate string and evacuate radius", "Fire response per BESS protocol"],
  },
  {
    id: 17,
    name: "Solar-field intrusion and module theft",
    group: "Remote and distributed assets",
    zone: "Zone B — PV array field",
    plantTypes: "Solar",
    chain: { detect: "Thermal / PTZ · intrusion", correlate: "GIS array map", respond: "Patrol" },
    detects: "Boundary breach or movement between panel rows, inverter stations and module storage across a large open field.",
    matters: "Module and cable theft across a sparsely manned field is a steady generation and capex loss.",
    response: ["Row-level alert on GIS map", "Verify on thermal feed", "Dispatch mobile patrol", "Loss reconciliation with O&M"],
  },
  {
    id: 18,
    name: "Remote asset / turbine enclosure access",
    group: "Remote and distributed assets",
    zone: "Zone B — remote enclosures",
    plantTypes: "Wind / remote (where applicable)",
    chain: { detect: "Fixed · door / access", correlate: "ACS + work order", respond: "Alert and verify" },
    detects: "Door opening or presence inside unmanned turbine bases, switching kiosks, pump houses and telecom huts.",
    matters: "Unmanned assets are attacked precisely because nobody is watching, and outage attribution is slow.",
    response: ["Door-open alert with site ID", "Match against work order", "Two-way audio challenge", "Field team dispatch"],
  },
  {
    id: 19,
    name: "Dam, intake and reservoir approach",
    group: "Remote and distributed assets",
    zone: "Zone C — water systems",
    plantTypes: "Hydro / thermal",
    chain: { detect: "Long-range PTZ · intrusion", correlate: "GIS + intake control", respond: "Patrol" },
    detects:
      "Boats, swimmers, unauthorised persons or vehicles near intake structures, forebay, dam crest, gates or reservoir approaches.",
    matters: "Cooling-water or hydro intake interference can halt generation and carries contamination and public-safety consequences.",
    response: ["Alert intake / dam control", "Thermal camera verification", "Marine or shoreline patrol", "Coordinate with local police"],
  },
  {
    id: 20,
    name: "Tunnel and water-conductor system intrusion",
    group: "Remote and distributed assets",
    zone: "Zone B — water-conductor system",
    plantTypes: "Hydro",
    chain: { detect: "Thermal / fixed · intrusion", correlate: "Access control", respond: "Controlled response" },
    detects: "Entry at adits, surge shafts, penstock galleries or tunnel portals outside inspection windows.",
    matters: "Tunnel access is both a sabotage route to the machine hall and a confined-space fatality risk.",
    response: ["Portal alarm to ICCC", "Confirm no inspection permit", "Seal portal and dispatch team", "Log with tunnel chainage"],
  },
  {
    id: 21,
    name: "Drone approach towards critical assets",
    group: "Remote and distributed assets",
    zone: "Zone A — airspace",
    chain: { detect: "EO / IR + RF · UAV track", correlate: "Counter-UAS", respond: "Designated agency" },
    detects: "RF or radar detection of a UAV track approaching switchyard, cooling towers, boiler structures or fuel storage.",
    matters:
      "Aerial reconnaissance and payload risk over critical generation assets is a declared national-security concern for sensitive plants.",
    response: ["Airspace track on ICCC", "Record track and evidence pack", "Notify designated agency / police", "Follow approved C-UAS protocol"],
  },
  {
    id: 22,
    name: "Crowd build-up at gate during labour disturbance",
    group: "Remote and distributed assets",
    zone: "Zone A — gates",
    chain: { detect: "PTZ · crowd density", correlate: "PSOC + HR / IR", respond: "Security and admin" },
    detects: "Crowd density and dwell-time thresholds crossed at main gate, contractor gate or administrative approaches.",
    matters: "Gate obstruction during an industrial-relations event is a direct threat to coal receipt, shift change and generation continuity.",
    response: ["Density alert to ICCC", "Notify plant HR / IR and admin", "Reinforce gate and divert traffic", "Liaise with district authorities"],
  },
  {
    id: 23,
    name: "Camera loss or tampering at critical coverage",
    group: "System integrity and investigation",
    zone: "Zone A — perimeter and gates",
    chain: { detect: "Fixed · tamper / signal loss", correlate: "VMS health", respond: "Maintenance SLA" },
    detects: "Signal loss, defocus, spray, obstruction or reorientation on perimeter, switchyard and gate cameras.",
    matters: "Deliberate blinding of critical coverage is usually a precursor event, and silent camera loss defeats the whole estate.",
    response: ["Health alarm with criticality tier", "Adjacent-camera compensating view", "Technician ticket with SLA clock", "Uptime reporting to plant head"],
  },
  {
    id: 24,
    name: "Abandoned object or unattended package",
    group: "System integrity and investigation",
    zone: "Zone A and C — gates, admin, public interface",
    chain: { detect: "Fixed / PTZ · object left", correlate: "PSOC review", respond: "Investigation" },
    detects: "Bag, package or unattended equipment remaining static beyond threshold near gates, admin blocks or transport bays.",
    matters: "Unattended-object protocol is a baseline expectation for critical infrastructure and audit readiness.",
    response: ["Object alert with dwell time", "Backtrack who placed it", "Cordon and inform security head", "Bomb-disposal protocol if unresolved"],
  },
  {
    id: 25,
    name: "Equipment tampering on critical assets",
    group: "System integrity and investigation",
    zone: "Zone B — plant equipment",
    chain: { detect: "Fixed · object / tamper", correlate: "CMMS + ACS", respond: "Maintenance and security" },
    detects: "Interference with panels, valves, relay enclosures, earth connections or metering and instrumentation.",
    matters: "Tampering blends into maintenance activity and is only separable when video is indexed against work orders.",
    response: ["Tamper alert with asset tag", "Match against CMMS work order", "Joint maintenance and security review", "Root-cause and access tightening"],
  },
  {
    id: 26,
    name: "Multi-camera post-event investigation",
    group: "System integrity and investigation",
    zone: "Plant-wide",
    chain: { detect: "Multiple · tracking / search", correlate: "VMS + AI search", respond: "Investigation pack" },
    detects: "Appearance and attribute search to reconstruct a person or vehicle track across the full camera estate and time window.",
    matters:
      "Investigation speed determines whether an incident becomes an accountable case or an unexplained loss in the register.",
    response: ["Define time and area window", "Attribute / appearance search", "Assemble chain-of-custody clip set", "Close case in incident register"],
  },
];
