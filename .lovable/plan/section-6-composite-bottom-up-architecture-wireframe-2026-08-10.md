# Section 6 — Composite bottom-up architecture wireframe

Replace the current five-box composite diagram with a single stacked wireframe read from the bottom up, with two cross-cutting rails (cyber on the left, integrations on the right).

## Layout

```text
                         +---------------------------------------------+
                         |  4. USER / CONSUMPTION LAYER                |
                         |  Central command centre - remote/regional   |
   +------------+        |  monitoring - mobile app - workstations -   |        +----------------+
   |            |        |  video wall - executive MIS dashboard       |        |                |
   |  CYBER &   |        +---------------------------------------------+        | EXTERNAL       |
   |  OT        |                          ^                                   | INTEGRATIONS   |
   |  SECURITY  |        +---------------------------------------------+        |                |
   |            |        |  3. VMS, ANALYTICS & PSIM                   |        | State police / |
   |  (vertical |        |  VMS core - AI analytics - ANPR engine -    |        | control room   |
   |   rail,    |<------>|  face match - alarm correlation - PSIM/SOC  |<------>| ERSS 112       |
   |   spans    |        |  - access & visitor mgmt - storage tiering  |        | Fire & CISF /  |
   |   all      |        +---------------------------------------------+        | plant security |
   |   layers)  |                          ^                                   | SCADA/DCS      |
   |            |        +---------------------------------------------+        | HR / ERP /     |
   |            |        |  2. EDGE COMPUTE & NETWORK                  |        | contractor db  |
   |            |<------>|  Edge AI node - NVR - PoE/aggregation sw -  |<------>| Disaster mgmt  |
   |            |        |  fibre ring - wireless/4G-5G - UPS/solar -  |        | authority      |
   |            |        |  OT-IT gateway - NTP/time sync              |        |                |
   +------------+        +---------------------------------------------+        +----------------+
                                            ^
                         +---------------------------------------------+
                         |  1. FIELD DETECTION & IDENTITY CAPTURE      |
                         |  icon row: fixed box cam - PTZ dome -       |
                         |  thermal - ANPR - explosion-proof - drone/  |
                         |  radar - fence sensor - access reader -     |
                         |  biometric/face terminal - turnstile/boom - |
                         |  panic/hooter - fire & gas detector         |
                         +---------------------------------------------+
```

Below the diagram: a thin governance strip (SOPs, drills, KPIs, AMC/SLA, audit) plus the existing tailoring note.

## Layer content

**1. Field detection & identity capture (bottom, widest, distinct icon per device type)**
Fixed box camera, PTZ dome, thermal/imaging camera, ANPR camera, explosion-proof camera, radar / drone-detection sensor, fence vibration/IR beam sensor, card access reader, face/biometric terminal, turnstile & boom barrier, panic button/hooter, fire & gas detector. Each shown as an icon tile with a short label so the device mix is readable at a glance.

**2. Edge compute & network**
Edge AI/analytics node, local NVR/edge storage, PoE and aggregation switches, fibre ring backbone, wireless/4G-5G nodes for remote assets, UPS and solar power for field nodes, OT-IT gateway with unidirectional/segmented path, NTP time synchronisation.

**3. VMS, analytics and PSIM**
VMS core, AI video analytics (intrusion, loitering, PPE, crowd, smoke/flame), ANPR and face-match engines, alarm correlation and rule engine, PSIM/SOC platform, access control and visitor management server, storage tiering and retention policy.

**4. User / consumption layer (top)**
Central command centre with video wall, regional or corporate monitoring view, security supervisor workstations, mobile app for roving guards and management, notification/alert channels, executive MIS and KPI dashboards. Role-based views shown per persona.

**Left cross-cutting rail — cyber and OT security (spans all four layers)**
Network segmentation and VLANs, firewalls and OT DMZ, device hardening and password policy, certificate/PKI and encrypted streams, identity and access management with MFA for command centre, patch and firmware management, log aggregation and SIEM, backup and disaster recovery, CEA/CERT-In cyber security guideline alignment.

**Right cross-cutting rail — external integrations (spans all four layers)**
State police control room, ERSS 112, fire services and CISF/plant security force, SCADA/DCS and plant operations, HR/ERP and contractor/labour database for access provisioning, district disaster management authority, and (placeholder) any state-level surveillance grid.

## Technical notes

- Rewrite `src/components/site/ToBeArchitecture.tsx`: one responsive CSS-grid composite (left rail | stacked layers | right rail) rather than an SVG, so text stays crisp and it reflows on mobile. Vertical connectors between layers drawn with bordered pseudo-elements plus a small arrow icon; horizontal connectors from each layer to both rails.
- Data-driven: arrays for `layers` (id, number, title, purpose, items with lucide icon), `cyberRail`, `integrationRail`, `governanceStrip`.
- Layer 1 renders items as an icon grid; layers 2-4 render as compact chip lists.
- Icons per device type from lucide-react (e.g. `Camera`, `Cctv`, `Video`, `Thermometer`, `ScanLine`, `Radar`, `Fence`, `CreditCard`, `Fingerprint`, `DoorClosed`, `Siren`, `Flame`, `Server`, `HardDrive`, `Network`, `Router`, `Wifi`, `BatteryCharging`, `Shuffle`, `Clock`, `Eye`, `Brain`, `Bell`, `LayoutDashboard`, `Smartphone`, `MonitorPlay`, `Users`, `Lock`, `ShieldCheck`, `Siren`, `PhoneCall`, `Building2`, `Database`).
- Colours use existing semantic tokens (navy, accent, zone tints) — no hardcoded hex.
- Mobile: rails collapse to full-width panels above (cyber) and below (integrations) the stack; layers keep bottom-up order on desktop and are labelled 1-4 so the reading order stays clear on small screens.
