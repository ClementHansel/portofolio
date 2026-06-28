# Phase 3 Demos Upgrade — Requirements

## Overview
Upgrade the 3 interactive demos from simulated toys into real-world-caliber systems that showcase CTO-level engineering understanding. Each demo must feel like a production tool that a client or employer could immediately recognize as "this person builds real systems."

---

## Demo 1: IoT Circuit Lab (Replaces current IoT Dashboard)

### Purpose
An interactive ESP32/Arduino circuit simulator where users can drag components onto a breadboard, wire them together, and see the result in real-time. This demonstrates deep IoT/embedded systems expertise — not just dashboards, but understanding of the hardware layer.

### Requirements

- [ ] **REQ-IOT-1**: Canvas-based breadboard workspace where users can place components visually
- [ ] **REQ-IOT-2**: Component library with at minimum: ESP32 board, LED (multiple colors), resistor, temperature sensor (DHT22), push button, buzzer, OLED display (simulated), servo motor, relay, photoresistor (LDR)
- [ ] **REQ-IOT-3**: Wiring system — click-to-connect pins with visual wire routing between component pins
- [ ] **REQ-IOT-4**: Real-time simulation engine that computes circuit state (which LEDs are on, sensor readings, display output) based on connections
- [ ] **REQ-IOT-5**: Predefined project templates users can load: "Blink LED", "Temperature Monitor", "Motion Sensor Alarm", "Smart Light (LDR + LED)", "Servo Control"
- [ ] **REQ-IOT-6**: Code panel showing the Arduino/C++ code that would run on the ESP32 for the current circuit configuration
- [ ] **REQ-IOT-7**: Serial monitor simulation showing console output (sensor readings, debug messages)
- [ ] **REQ-IOT-8**: Pin diagram overlay on the ESP32 showing GPIO labels when hovered
- [ ] **REQ-IOT-9**: Circuit validation — detect shorts, missing ground, unconnected pins — display warnings
- [ ] **REQ-IOT-10**: Responsive design — works on tablet and desktop (minimum 768px width)
- [ ] **REQ-IOT-11**: Data flow visualization — animated dots showing current flow direction through wires when simulation is running

### User Flow
1. User opens IoT Circuit Lab
2. Sees breadboard workspace + component drawer on the left
3. Drags an ESP32 onto the board
4. Drags an LED + resistor
5. Clicks pins to create wires
6. Hits "Run" — LED lights up in simulation
7. Code panel shows the corresponding Arduino code
8. Serial monitor shows "LED ON" messages

---

## Demo 2: AI Task Agent (Replaces current AI Playground)

### Purpose
A 3D avatar character (using the existing `mainCharacter.glb` model in the project) that moves around a virtual workspace and performs tasks. Users can assign tasks, watch the avatar animate through work states, and see real-time progress. This demonstrates AI/automation orchestration — the kind of agent systems CTOs build.

### Requirements

- [ ] **REQ-AI-1**: Three.js scene with a ground plane workspace and the 3D character model loaded from `/assets/models/mainCharacter.glb`
- [ ] **REQ-AI-2**: Character has at minimum 3 animation states: idle (breathing), walking (moves to task location), working (typing/building gesture)
- [ ] **REQ-AI-3**: Task queue panel where users can add tasks from a predefined list: "Deploy Server", "Run Tests", "Analyze Data", "Build Frontend", "Train Model", "Fix Bug", "Review Code"
- [ ] **REQ-AI-4**: Each task has a simulated duration (3-15 seconds), a task station location in the 3D scene, and a progress bar
- [ ] **REQ-AI-5**: When a task is assigned, the avatar walks to the task station, plays the "working" animation, and progress bar fills over the duration
- [ ] **REQ-AI-6**: Task completion triggers a success particle effect and the avatar returns to idle or picks up the next task from the queue
- [ ] **REQ-AI-7**: Multiple task stations visible in the 3D scene (represented as desks/terminals at different positions)
- [ ] **REQ-AI-8**: Real-time log panel showing task state changes: "Walking to Deploy Server station...", "Working on Deploy Server...", "Deploy Server complete ✓"
- [ ] **REQ-AI-9**: Task stats panel showing: tasks completed, average duration, current queue depth
- [ ] **REQ-AI-10**: Orbit camera controls so user can rotate around the scene
- [ ] **REQ-AI-11**: If the model has no embedded animations, use procedural animation (bobbing for idle, position lerp for walking, arm movement for working)

### User Flow
1. User sees 3D scene with avatar standing at center (idle animation)
2. User clicks "Deploy Server" from task list
3. Avatar turns and walks toward the server rack station
4. Avatar starts "working" animation, progress bar fills
5. On complete: particle burst, log updates, avatar walks back
6. User can queue multiple tasks — avatar executes them sequentially

---

## Demo 3: DevOps Command Center (Upgraded CI/CD Pipeline)

### Purpose
Upgrade from a simple pipeline visualizer to a full DORA metrics dashboard with multi-environment promotion, rollback, infrastructure topology, and incident tracking. This is what a CTO actually monitors.

### Requirements

- [ ] **REQ-CICD-1**: DORA metrics panel showing the 4 key indicators: Deployment Frequency (deploys/week), Lead Time for Changes (hours), Change Failure Rate (%), Mean Time to Recovery (minutes)
- [ ] **REQ-CICD-2**: Each DORA metric shows a trend sparkline (last 8 data points) and a performance rating (Elite/High/Medium/Low based on industry benchmarks)
- [ ] **REQ-CICD-3**: Multi-environment promotion flow: Development → Staging → Production, each with independent pipeline status and approval gates
- [ ] **REQ-CICD-4**: Approval gate simulation — Staging → Production requires a "click to approve" step (simulating manual review gates)
- [ ] **REQ-CICD-5**: One-click rollback button that reverts to previous deployment version with animated revert flow
- [ ] **REQ-CICD-6**: Infrastructure topology map showing services as nodes with dependency arrows (API → Database, API → Cache, Frontend → API, Worker → Queue)
- [ ] **REQ-CICD-7**: Service health indicators on topology nodes (green/yellow/red) that change based on pipeline outcomes
- [ ] **REQ-CICD-8**: Incident timeline — when a deployment fails, an incident is created with: detection time, response time, resolution time (these feed the MTTR metric)
- [ ] **REQ-CICD-9**: Deployment history table with: commit hash, author, message, environment, duration, status, timestamp
- [ ] **REQ-CICD-10**: Team velocity chart — bar chart showing deployments per day for the last 14 days
- [ ] **REQ-CICD-11**: Pipeline stages retained from current: Checkout → Install → Lint → Test → Build → Deploy → Health Check
- [ ] **REQ-CICD-12**: Live build logs retained from current (colored output)

### User Flow
1. User sees DORA metrics summary at top (4 cards with sparklines)
2. Below: 3-column environment view (Dev | Staging | Prod) each showing latest deployment
3. User clicks "Deploy to Dev" — pipeline animates through stages
4. On success, "Promote to Staging" button appears
5. User promotes — staging pipeline runs
6. "Approve for Production" gate appears — user clicks approve
7. Production pipeline runs — if it fails, incident is created, MTTR timer starts
8. User can click "Rollback" to revert production
9. All metrics update in real-time based on simulated actions

---

## Non-Functional Requirements

- [ ] **REQ-NF-1**: All 3 demos load in under 3 seconds on first visit (lazy load heavy components)
- [ ] **REQ-NF-2**: Works on desktop Chrome, Firefox, Safari, Edge (no IE support needed)
- [ ] **REQ-NF-3**: Keyboard accessible — all interactive elements reachable via Tab
- [ ] **REQ-NF-4**: Reduced motion — respects `prefers-reduced-motion` media query
- [ ] **REQ-NF-5**: Mobile-friendly information architecture (some demos may be desktop-only for interaction but should display gracefully on mobile with a "best on desktop" message)
- [ ] **REQ-NF-6**: Each demo includes a brief explainer panel describing what it demonstrates and the real-world system it represents

---

## Success Criteria

1. A visiting CTO/technical hiring manager sees these demos and thinks "this person understands production systems at a deep level"
2. The IoT Circuit Lab demonstrates hardware-to-software bridge expertise (not just frontend)
3. The AI Task Agent demonstrates understanding of task orchestration, state machines, and 3D visualization
4. The DevOps Command Center demonstrates fluency in deployment culture, metrics-driven engineering, and operational excellence
5. Each demo has a clear real-world analogue: Wokwi/Tinkercad (IoT), AI agent orchestration platforms (AI), Datadog/Sleuth/LinearB (DevOps)
