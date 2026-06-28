# Implementation Plan: Phase 3 Demos Upgrade

## Overview

Upgrade three portfolio demos into production-grade engineering showcases. Implementation follows Engine/Renderer separation — pure TypeScript logic engines first (testable without DOM), then React rendering shells. Shared infrastructure and types are set up first, followed by demo-specific engines, UI/rendering layers, and finally property-based tests.

## Tasks

- [ ] 1. Shared infrastructure and project setup
  - [ ] 1.1 Set up directory structure and shared types
    - Create `src/components/demos/iot/`, `src/components/demos/ai/`, `src/components/demos/cicd/` with sub-folders: engine, canvas/scene, panels, hooks, data/logic, animation (AI only), topology/metrics/incidents/history/pipeline (CICD)
    - Create each demo's `types.ts` with all TypeScript interfaces from design
    - _Requirements: REQ-NF-1, REQ-NF-6_

  - [ ] 1.2 Install dev dependencies and configure testing
    - Add `fast-check` and `vitest` as dev dependencies
    - Create vitest config targeting `__tests__/**/*.test.ts` and `**/*.property.test.ts`
    - _Requirements: REQ-NF-1_

  - [ ] 1.3 Create demos page with tab controller and dynamic imports
    - Create `src/app/(main)/demos/page.tsx` with tab navigation (IoT Circuit Lab | AI Task Agent | DevOps Command Center)
    - Use `next/dynamic` with `{ ssr: false }` for each demo's main component
    - Include brief explainer panel per demo describing real-world analogue
    - Implement `prefers-reduced-motion` detection hook shared across demos
    - _Requirements: REQ-NF-1, REQ-NF-4, REQ-NF-6_

- [ ] 2. IoT Circuit Lab — Engine Layer (Pure TypeScript)
  - [ ] 2.1 Implement ComponentModels and ComponentLibrary
    - Create `engine/ComponentModels.ts` with stamp functions for each component type (resistor, LED, sensor, MCU, actuator, passive)
    - Create `data/ComponentLibrary.ts` with full specs for all component types defined in `ComponentType` union
    - Create `data/ESP32Pinout.ts` with 38-pin ESP32-DevKit-C pinout data
    - _Requirements: REQ-IOT-2, REQ-IOT-8_

  - [ ] 2.2 Implement CircuitGraph and netlist representation
    - Create `engine/CircuitGraph.ts` with netlist/adjacency representation
    - Implement `buildNetlist()` — groups connected pins into nets
    - Implement `addWire()` / `removeWire()` / `addComponent()` / `removeComponent()` graph mutations
    - _Requirements: REQ-IOT-3, REQ-IOT-4_

  - [ ] 2.3 Implement NodalAnalysis (MNA matrix solver)
    - Create `engine/NodalAnalysis.ts` with Modified Nodal Analysis solver
    - Build conductance matrix G from component stamp functions
    - Build source vector from voltage/current sources (ESP32 GPIO outputs as ideal 3.3V sources)
    - Gaussian elimination solver for systems up to 50 nodes
    - Return `MNAResult` with node voltages and branch currents
    - _Requirements: REQ-IOT-4_

  - [ ] 2.4 Implement CircuitValidator
    - Create `engine/CircuitValidator.ts` with error detection algorithms
    - Detect short circuits (direct VCC-to-GND connections)
    - Detect missing ground paths for components
    - Detect floating/unconnected pins
    - Detect overcurrent conditions (exceeding pin maxCurrent)
    - Return structured `CircuitError[]` and `CircuitWarning[]`
    - _Requirements: REQ-IOT-9_

  - [ ] 2.5 Implement SimulationEngine and ESP32 Runtime
    - Create `engine/SimulationEngine.ts` with tick-based simulation loop (20Hz)
    - Implement `simulateTick()` — updates dynamic component states, re-solves MNA, computes component outputs
    - Create ESP32 runtime interpreter supporting: `pinMode`, `digitalWrite`, `digitalRead`, `analogRead`, `analogWrite`, `Serial.println`, `delay`, `millis()`, `map()`
    - Implement `ExecutionPlan` interpreter that steps through operations deterministically
    - _Requirements: REQ-IOT-4, REQ-IOT-7_

  - [ ] 2.6 Implement ArduinoCodeGenerator
    - Create `codegen/ArduinoCodeGenerator.ts` — generates idiomatic Arduino C++ from circuit state
    - Include proper `#include` directives based on components used
    - Generate `setup()` with pin modes, Serial.begin, library init
    - Generate `loop()` with sensor reads, conditional logic, actuator control
    - Use non-blocking `millis()` patterns instead of `delay()`
    - Create `codegen/CodeTemplates.ts` with per-component code snippets
    - Output parallel `ExecutionPlan` for runtime interpreter
    - _Requirements: REQ-IOT-6_

  - [ ] 2.7 Implement ProjectTemplates
    - Create `data/ProjectTemplates.ts` with 5 predefined circuits: "Blink LED", "Temperature Monitor", "Motion Sensor Alarm", "Smart Light (LDR + LED)", "Servo Control"
    - Each template defines components, positions, wires, and expected behavior
    - _Requirements: REQ-IOT-5_

  - [ ]* 2.8 Write property tests for IoT engine modules
    - **Property 1: Wire Creation Produces Graph Edge** — For any two valid pins on different components, creating a wire produces a corresponding edge in the circuit graph
    - **Validates: Requirements REQ-IOT-3**

  - [ ]* 2.9 Write property test for NodalAnalysis (Ohm's Law)
    - **Property 2: Nodal Analysis Solves Correctly** — For any circuit with a resistor R between nets V1 and V2, current equals (V1 - V2) / R
    - **Validates: Requirements REQ-IOT-4**

  - [ ]* 2.10 Write property test for ArduinoCodeGenerator
    - **Property 3: Code Generator References Correct Pins** — For any valid circuit, generated code contains `pinMode` declarations for all GPIO pins, `setup()`, and `loop()`
    - **Validates: Requirements REQ-IOT-6**

  - [ ]* 2.11 Write property test for CircuitValidator
    - **Property 4: Circuit Validator Detects Errors Without False Positives** — Short circuits produce "short" error, missing ground produces "missing_ground" error, valid circuits produce zero errors
    - **Validates: Requirements REQ-IOT-9, REQ-IOT-5**

- [ ] 3. AI Task Agent — Logic Layer (Pure TypeScript)
  - [ ] 3.1 Implement TaskQueue with priority ordering
    - Create `logic/TaskQueue.ts` with priority queue (critical > high > normal > low, FIFO within same priority)
    - Implement `enqueue()`, `dequeue()`, `peek()`, `reorder()`, `size()`, `isEmpty()`
    - Create `logic/TaskDefinitions.ts` with 7 predefined tasks (Deploy Server, Run Tests, Analyze Data, Build Frontend, Train Model, Fix Bug, Review Code) including durations, station assignments, icons, subtasks
    - _Requirements: REQ-AI-3, REQ-AI-4_

  - [ ] 3.2 Implement AgentFSM (Event-Sourced Finite State Machine)
    - Create `logic/AgentFSM.ts` with pure `transition()` function
    - Implement all states: idle, walking, arriving, working, celebrating, returning
    - Implement event handling: task_assigned, tick, reached_station, task_progress, task_complete, task_failed, reached_center, queue_reordered, cancel_current
    - Return `FSMTransitionResult` with next context and side effects (logs, particles, stats)
    - All transitions logged with timestamps for replay capability
    - _Requirements: REQ-AI-2, REQ-AI-5, REQ-AI-6, REQ-AI-8_

  - [ ] 3.3 Implement PathPlanner and StatsCalculator
    - Create `logic/PathPlanner.ts` with hub-and-spoke path planning (agent returns to center, walks to target station)
    - Stations arranged in semicircle at radius 6, 7 stations at 25.7° intervals
    - Walking speed: 2.5 units/second with ease-in-out
    - Create `logic/StatsCalculator.ts` with running statistics: totalCompleted, averageDuration, throughputPerMinute (rolling 60s), efficiency, currentStreak
    - _Requirements: REQ-AI-5, REQ-AI-9_

  - [ ]* 3.4 Write property test for TaskQueue
    - **Property 5: Task Queue Addition Invariant** — Adding a task increases pending length by exactly 1, and the task appears at the tail of the pending list
    - **Validates: Requirements REQ-AI-3**

  - [ ]* 3.5 Write property test for AgentFSM lifecycle
    - **Property 6: Agent FSM Lifecycle Correctness** — Task assignment transitions through idle → walking → working → returning → (idle | walking). Non-empty queue after completion goes to walking; empty queue goes to idle.
    - **Validates: Requirements REQ-AI-5, REQ-AI-6**

  - [ ]* 3.6 Write property test for FSM log entries
    - **Property 7: FSM Transitions Produce Log Entries** — Every state transition appends a log entry with monotonically increasing timestamps
    - **Validates: Requirements REQ-AI-8**

  - [ ]* 3.7 Write property test for task statistics
    - **Property 8: Task Statistics Correctness** — Average duration equals sum of durations divided by count; totalCompleted equals completed array length
    - **Validates: Requirements REQ-AI-9**

- [ ] 4. DevOps Command Center — Engine Layer (Pure TypeScript)
  - [ ] 4.1 Implement DeploymentEngine (Event-Sourced State Machine)
    - Create `engine/DeploymentEngine.ts` with `reduce()` function folding events into `DeploymentEngineState`
    - Implement `dispatch()` command handler that validates and emits `EngineEvent[]`
    - Support all event types: DEPLOY_TRIGGERED, STAGE_STARTED, STAGE_COMPLETED, STAGE_FAILED, PIPELINE_SUCCESS, PIPELINE_FAILED, PROMOTION_REQUESTED, PROMOTION_APPROVED, PROMOTION_REJECTED, ROLLBACK_TRIGGERED, ROLLBACK_COMPLETED, INCIDENT_CREATED, INCIDENT_UPDATED, SERVICE_HEALTH_CHANGED
    - Enforce business rules: no promotion without approval, no deploy while running, sequential environment promotion only
    - _Requirements: REQ-CICD-3, REQ-CICD-4, REQ-CICD-5, REQ-CICD-11_

  - [ ] 4.2 Implement MetricsCalculator (DORA computation)
    - Create `engine/MetricsCalculator.ts` with `computeDORA()` from event log
    - Deployment Frequency: successful prod deploys per week
    - Lead Time: median time from commit to prod deploy
    - Change Failure Rate: % of prod deploys that trigger incidents
    - MTTR: median time from incident detection to resolution
    - Implement `classifyMetric()` using DORA benchmarks (elite/high/medium/low thresholds)
    - Implement `computeTrend()` for sparkline direction
    - _Requirements: REQ-CICD-1, REQ-CICD-2_

  - [ ] 4.3 Implement TopologyEngine and IncidentEngine
    - Create `engine/TopologyEngine.ts` with `computeServiceHealth()` — derives node health from deployments and incidents, propagates degradation downstream through dependency edges
    - Define service topology: Frontend → API → Database, API → Cache, Worker → Queue, CDN → Frontend, Auth → API
    - Create `incidents/IncidentEngine.ts` — auto-creates incidents on pipeline failure with severity based on environment, tracks MTTR lifecycle
    - _Requirements: REQ-CICD-6, REQ-CICD-7, REQ-CICD-8_

  - [ ] 4.4 Implement SimulationData and ScenarioRunner
    - Create `engine/SimulationData.ts` with realistic fake data generators (7-char commit hashes, author names, commit messages, semver versions)
    - Create `engine/ScenarioRunner.ts` with pre-scripted auto-play scenario: deploy dev → promote staging → approve prod → prod fails → incident created → rollback → resolve
    - _Requirements: REQ-CICD-9, REQ-CICD-10_

  - [ ]* 4.5 Write property tests for DORA metrics
    - **Property 9: DORA Metrics Computed From Deployment History** — Deployment frequency equals successful deploys / window duration; velocity chart daily counts equal deployments for each day
    - **Validates: Requirements REQ-CICD-1, REQ-CICD-10**

  - [ ]* 4.6 Write property test for DORA rating classification
    - **Property 10: DORA Rating Classification** — Frequency ≥7/week → "elite", lead time ≤1hr → "elite", CFR ≤5% → "elite", MTTR ≤60min → "elite". Monotonic boundaries for all levels.
    - **Validates: Requirements REQ-CICD-2**

  - [ ]* 4.7 Write property test for environment promotion rules
    - **Property 11: Environment Promotion Respects Ordering and Gates** — Promotion only targets next sequential environment; production requires explicit approval event
    - **Validates: Requirements REQ-CICD-3, REQ-CICD-4**

  - [ ]* 4.8 Write property test for rollback behavior
    - **Property 12: Rollback Restores Previous Version** — Rollback sets current version to previous version; environment status becomes "rolled-back"
    - **Validates: Requirements REQ-CICD-5**

  - [ ]* 4.9 Write property test for service health propagation
    - **Property 13: Service Health Reflects Pipeline Outcomes** — Successful deploy → "healthy"; failed deploy → "degraded" or "down"
    - **Validates: Requirements REQ-CICD-7**

  - [ ]* 4.10 Write property test for incident creation
    - **Property 14: Failed Deployment Creates Incident** — Failed deployment creates incident with detectedAt = failure timestamp, correct deploymentId, severity = "critical" for production
    - **Validates: Requirements REQ-CICD-8**

  - [ ]* 4.11 Write property test for pipeline stage ordering
    - **Property 15: Pipeline Stages Execute in Order** — Stages execute in exact sequence: checkout → install → lint → test → build → deploy → healthcheck. No stage begins before previous completes.
    - **Validates: Requirements REQ-CICD-11**

- [ ] 5. Checkpoint — Engine layer validation
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. IoT Circuit Lab — UI/Rendering Layer
  - [ ] 6.1 Implement CircuitCanvas with SVG breadboard and component rendering
    - Create `canvas/CircuitCanvas.tsx` — SVG + Canvas hybrid renderer
    - Create `canvas/BreadboardSVG.tsx` — realistic 830-hole breadboard with power rails
    - Create `canvas/ComponentSVG.tsx` — SVG visuals for each component type (IC packages, axial resistors, LEDs, etc.)
    - Implement snap-to-grid placement on breadboard coordinates
    - _Requirements: REQ-IOT-1, REQ-IOT-2_

  - [ ] 6.2 Implement wiring system and current flow overlay
    - Create `canvas/WireRenderer.tsx` — Bezier curve wires between pins, click-to-connect interaction (start pin → end pin)
    - Create `canvas/CurrentFlowOverlay.tsx` — Canvas overlay with animated electron dots moving along wire paths at speed proportional to current
    - Wire path routing with collision avoidance around components
    - _Requirements: REQ-IOT-3, REQ-IOT-11_

  - [ ] 6.3 Implement ComponentDrawer and drag-and-drop system
    - Create `panels/ComponentDrawer.tsx` — categorized component list with search, drag source
    - Create `hooks/useDragAndDrop.ts` — pointer event handling for component placement on breadboard
    - Categories: MCU, Sensors, Actuators, Passive, Displays
    - Max 20 components limit with disabled button when reached
    - _Requirements: REQ-IOT-1, REQ-IOT-2_

  - [ ] 6.4 Implement CodePanel and SerialMonitor
    - Create `panels/CodePanel.tsx` — syntax-highlighted Arduino code display (inline Prism.js or simple tokenizer)
    - Create `panels/SerialMonitor.tsx` — terminal-style output with timestamps, colored by message type
    - Code panel updates in real-time as circuit changes
    - Serial monitor shows sensor readings and debug messages during simulation
    - _Requirements: REQ-IOT-6, REQ-IOT-7_

  - [ ] 6.5 Implement PinDiagram overlay and PropertyInspector
    - Create `panels/PinDiagram.tsx` — interactive GPIO reference overlay on ESP32, shows pin labels on hover
    - Create `panels/PropertyInspector.tsx` — editable properties for selected component (resistance value, LED color, sensor reading)
    - _Requirements: REQ-IOT-8_

  - [ ] 6.6 Wire up IoTCircuitLab main container with state management
    - Create `IoTCircuitLab.tsx` — 3-panel layout (drawer | canvas | code+serial)
    - Create `hooks/useCircuitState.ts` — central state hook managing components, wires, simulation status
    - Create `hooks/useSimulation.ts` — requestAnimationFrame loop driving SimulationEngine at 20Hz
    - Connect template loading, run/stop controls, and circuit validation display
    - Implement error overlay with highlighted affected wires/components
    - _Requirements: REQ-IOT-1, REQ-IOT-4, REQ-IOT-5, REQ-IOT-9, REQ-IOT-10_

- [ ] 7. AI Task Agent — 3D Scene and UI Layer
  - [ ] 7.1 Implement ProceduralAnimator and BoneMapping
    - Create `animation/ProceduralAnimator.ts` — IK-based procedural animation system
    - Implement idle (breathing oscillation, arm sway, head micro-movement), walking (IK step cycle, arm counter-swing, bob), working (typing gesture, head focus), celebrating (arms raise, jump)
    - Create `animation/AnimationBlender.ts` — crossfade between animation states
    - Create `animation/BoneMapping.ts` — maps generic bone names to GLB skeleton structure
    - _Requirements: REQ-AI-2, REQ-AI-11_

  - [ ] 7.2 Implement AgentScene with character, stations, and environment
    - Create `scene/AgentScene.tsx` — R3F Canvas with lighting (directional + ambient + 7 point lights), shadows, HDR environment map
    - Create `scene/Character.tsx` — GLB loader from `/assets/models/mainCharacter.glb` with ProceduralAnimator integration, fallback capsule geometry on load failure
    - Create `scene/WorkspaceGround.tsx` — 20x20 grid with subtle metallic material
    - Create `scene/TaskStations.tsx` — 7 procedural mesh stations in semicircle (server_rack, terminal, database, monitor_wall, workbench, ml_cluster, war_room) with glow colors and labels
    - _Requirements: REQ-AI-1, REQ-AI-7, REQ-AI-11_

  - [ ] 7.3 Implement path visualization and particle effects
    - Create `scene/PathVisualizer.tsx` — dashed line showing planned movement path
    - Create `scene/ParticleEffect.tsx` — GPU particle burst on task completion with station glow color
    - Create `scene/MiniMap.tsx` — overhead 2D view of agent position and stations
    - Implement OrbitControls for camera rotation
    - Add post-processing: subtle SSAO + bloom for station glow
    - _Requirements: REQ-AI-5, REQ-AI-6, REQ-AI-10_

  - [ ] 7.4 Implement TaskQueuePanel and LogPanel
    - Create `panels/TaskQueuePanel.tsx` — draggable task list with priority badges, add-task buttons for all 7 predefined tasks, queue limit of 20
    - Create `panels/LogPanel.tsx` — virtualized real-time log (handles 1000+ entries) with color-coded entries
    - Create `panels/StatsPanel.tsx` — animated counters, throughput chart, efficiency metric
    - Create `panels/AgentStatusBadge.tsx` — current state indicator with timer
    - _Requirements: REQ-AI-3, REQ-AI-8, REQ-AI-9_

  - [ ] 7.5 Wire up AITaskAgent main container with state hooks
    - Create `AITaskAgent.tsx` — split view layout (3D scene left, panels right)
    - Connect AgentFSM + TaskQueue + PathPlanner via custom hook
    - Implement tick loop driving FSM with deltaTime, syncing 3D character position with FSM state
    - Handle WebGL fallback (detect via renderer capabilities, show 2D panels-only mode)
    - _Requirements: REQ-AI-1, REQ-AI-4, REQ-AI-5_

- [ ] 8. DevOps Command Center — UI/Rendering Layer
  - [ ] 8.1 Implement DORA Metrics panel with sparklines
    - Create `metrics/DORAMetrics.tsx` — 4 metric cards with animated counters (Framer Motion)
    - Create `metrics/Sparkline.tsx` — Canvas-rendered mini line chart with gradient fill (8 data points)
    - Create `metrics/TrendIndicator.tsx` — up/down/stable arrow with delta percentage
    - Create `metrics/MetricRating.ts` — classification display (Elite/High/Medium/Low badges with color coding)
    - _Requirements: REQ-CICD-1, REQ-CICD-2_

  - [ ] 8.2 Implement EnvironmentFlow with pipeline stages and gates
    - Create `pipeline/EnvironmentFlow.tsx` — 3-column responsive layout (Dev | Staging | Prod) with current version and status
    - Create `pipeline/PipelineStages.tsx` — animated stage progression (7 stages) with duration timers, GSAP-driven stage transitions
    - Create `pipeline/ApprovalGate.tsx` — modal with reviewer info, approve/reject buttons (simulating manual review)
    - Create `pipeline/RollbackFlow.tsx` — animated revert with version comparison, confirms previous version restoration
    - _Requirements: REQ-CICD-3, REQ-CICD-4, REQ-CICD-5, REQ-CICD-11_

  - [ ] 8.3 Implement InfraTopology with force-directed graph
    - Create `topology/InfraTopology.tsx` — Canvas-based force-directed layout with spring physics (settles in ~1s)
    - Create `topology/ServiceNode.tsx` — circle nodes with health ring (green/yellow/red stroke), icon center, request count
    - Create `topology/DependencyEdge.tsx` — curved lines with animated dots showing data flow direction, throughput labels
    - Interaction: hover for metrics tooltip, click to highlight dependency chain
    - _Requirements: REQ-CICD-6, REQ-CICD-7_

  - [ ] 8.4 Implement IncidentTimeline and DeploymentHistory
    - Create `incidents/IncidentTimeline.tsx` — vertical timeline with severity markers (critical/major/minor color coding)
    - Create `incidents/IncidentCard.tsx` — expandable card with MTTR timer, status progression, action history
    - Create `history/DeploymentHistory.tsx` — sortable/filterable table with virtual scroll (commit hash, author, message, environment, duration, status, timestamp)
    - Create `history/VelocityChart.tsx` — Canvas stacked bar chart showing deploys/day for 14 days
    - Create `pipeline/BuildLogs.tsx` — ANSI-colored terminal output per stage
    - _Requirements: REQ-CICD-8, REQ-CICD-9, REQ-CICD-10, REQ-CICD-12_

  - [ ] 8.5 Wire up DevOpsCommandCenter main container with state and auto-play
    - Create `DevOpsCommandCenter.tsx` — command center aesthetic layout (DORA top, env flow middle, topology + incidents bottom)
    - Create `hooks/useDeploymentState.ts` — central state hook managing DeploymentEngineState
    - Create `hooks/useAutoSimulation.ts` — auto-play mode running pre-scripted scenario
    - Connect all panels to engine state, implement action button debouncing (300ms)
    - _Requirements: REQ-CICD-1, REQ-CICD-3, REQ-CICD-6, REQ-CICD-8_

- [ ] 9. Checkpoint — UI layer integration
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Accessibility, responsiveness, and polish
  - [ ] 10.1 Implement accessibility and reduced motion support
    - Add `aria-label` to all interactive elements across all 3 demos
    - Implement keyboard navigation (Tab through all controls, Enter/Space to activate)
    - Implement `prefers-reduced-motion` — replace animations with instant transitions, disable particles, keep sparklines static
    - Add "Best viewed on desktop" message for mobile viewports (<768px) on IoT and AI demos
    - _Requirements: REQ-NF-3, REQ-NF-4, REQ-NF-5_

  - [ ] 10.2 Implement responsive layouts and error boundaries
    - IoT Circuit Lab: responsive 3-panel layout (stacks vertically on tablet)
    - DevOps Command Center: responsive grid (2-column on tablet, single on mobile)
    - Wrap each demo in React Error Boundary with reset button
    - Canvas/WebGL errors caught at component level, not propagated to page
    - _Requirements: REQ-IOT-10, REQ-NF-2, REQ-NF-5_

  - [ ]* 10.3 Write unit tests for component library completeness and template loading
    - Test all ComponentType values have entries in ComponentLibrary
    - Test all 5 ProjectTemplates load valid circuit configurations
    - Test ESP32Pinout has all 38 pins with correct labels
    - Test all 7 TaskDefinitions have valid station assignments
    - Test topology ServiceNode graph is fully connected
    - _Requirements: REQ-IOT-2, REQ-IOT-5, REQ-IOT-8, REQ-AI-4, REQ-CICD-6_

- [ ] 11. Final checkpoint — Full integration validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation after engine and UI layers
- Property tests validate universal correctness properties from the design document using fast-check
- Unit tests validate specific examples and edge cases
- Engine layers (tasks 2-4) are pure TypeScript with zero DOM/React dependencies — fully testable in isolation
- UI layers (tasks 6-8) are thin React rendering shells subscribing to engine state via hooks
- The project uses TypeScript, React Three Fiber, Framer Motion, GSAP, and fast-check for property testing

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3"] },
    { "id": 2, "tasks": ["2.1", "3.1", "4.1"] },
    { "id": 3, "tasks": ["2.2", "3.2", "4.2", "4.3"] },
    { "id": 4, "tasks": ["2.3", "2.4", "3.3", "4.4"] },
    { "id": 5, "tasks": ["2.5", "2.6", "3.4", "3.5", "3.6", "3.7"] },
    { "id": 6, "tasks": ["2.7", "2.8", "2.9", "2.10", "2.11", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10", "4.11"] },
    { "id": 7, "tasks": ["6.1", "7.1", "8.1"] },
    { "id": 8, "tasks": ["6.2", "6.3", "7.2", "8.2"] },
    { "id": 9, "tasks": ["6.4", "6.5", "7.3", "7.4", "8.3", "8.4"] },
    { "id": 10, "tasks": ["6.6", "7.5", "8.5"] },
    { "id": 11, "tasks": ["10.1", "10.2"] },
    { "id": 12, "tasks": ["10.3"] }
  ]
}
```
