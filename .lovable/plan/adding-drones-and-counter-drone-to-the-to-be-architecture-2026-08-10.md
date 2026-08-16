# Adding drones and counter-drone to the to-be architecture

Both belong in Section 06, but they are two different things and should not sit in the same box:

- **Surveillance drones** are a *sensor* — another way of acquiring video, alongside cameras. They belong in **Layer 01 (field detection)**, with their ground control and video ingest touching Layer 02 and 03.
- **Counter-drone (C-UAS)** is a *threat-detection and response capability* — detect, identify, track, then mitigate. Detection sits in **Layer 01**, correlation in **Layer 03**, and response authority is external (police / regulator), so it also gets a **right-rail** entry.

## What gets added where

**Layer 01 — Field detection & identity capture**
- Surveillance drone / UAV patrol (icon: drone/plane)
- Drone docking station & tethered drone
- RF detection & spectrum sensor (C-UAS)
- Radar / drone detection — already present, relabelled to make its C-UAS role explicit
- EO/IR drone tracking camera

**Layer 02 — Edge compute & network**
- Drone video downlink & ground control station

**Layer 03 — VMS, analytics, PSIM & ICCC**
- Airspace picture & drone track fusion (drone tracks correlated with ground alarms on one timeline)

**Layer 04 — Use & consumption layer**
- Drone-incident SOP view in the command centre (launch authorisation, no-fly overlay)

**Left rail — Cyber & OT security**
- Drone link security & GNSS spoofing resilience

**Right rail — External integrations**
- New cluster entry: DigiSky / MoCA drone rules compliance, and police / CISF for mitigation authority (jamming and takedown are legally restricted, so the deck should say the mitigation decision is agency-led, not plant-led)

## Presentation note

A short line under the stack noting that mitigation options are governed by Indian regulation and are exercised in coordination with the designated agency — keeps the slide credible with a PSU security head.

## Technical detail

Single file change: `src/components/site/ToBeArchitecture.tsx` — new entries in the `layers`, `cyberRail`, and `integrationRail` data arrays, plus the lucide icons (`Plane`, `RadioTower`, `Satellite`, `Ban`) added to the existing import. No layout or component changes; the chip grids reflow automatically.
