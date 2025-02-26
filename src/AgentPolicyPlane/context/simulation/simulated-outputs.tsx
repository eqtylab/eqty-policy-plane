// src/AgentPolicyPlane/context/simulation/simulated-outputs.tsx
export const OUTPUT_1 = `## Satellite Imagery Analysis Report
**Timestamp:** 2025-02-24 08:30 UTC
**Location:** Eastern Border Region

### Key Observations
- Multiple unauthorized vehicle convoys detected in restricted zone
- Communications array activated at Site Delta
- Unusual troop movements near checkpoint locations
- Civilian evacuation patterns observed in border villages
- New defensive positions identified at key terrain features

### Critical Concerns
- Activity level increasing approximately 35% over 72 hours
- Four unmarked transport vehicles on approach to restricted facility
- Cross-border infrastructure suddenly reinforced
- Unidentified electronic signatures detected in northwest sector

### Personnel Count
- ~120 military personnel visible in monitored areas
- 14 armored vehicles newly deployed
- 3 mobile command centers identified`;

export const OUTPUT_2 = `# SIGINT Collection Report
**Time:** 09:15 UTC
**Collection Units:** Station Echo, Foxtrot, Lima

## Active Collection Systems
- ELINT Platform Echo: Communications monitoring
- COMINT Node Foxtrot: Signal decryption
- Cyber Unit Lima: Network traffic analysis

## Intercepts in Progress
1. Encrypted communications at Grid 372-481
   - Military-grade encryption detected
   - Pattern matches known adversary protocols
   
2. Unusual data transmissions from Command Facility
   - Increased bandwidth consumption
   - New receiving endpoints identified
   
3. Frequency changes in border surveillance systems
   - Shift to alternative communications bands
   - Possible coordination for operations

## Collection Status
- Deep packet inspection: Active
- Additional collection platforms redirected
- UAV signal collection deploying`;

export const OUTPUT_3 = {
  labels: ["72hrs", "60hrs", "48hrs", "36hrs", "24hrs", "12hrs"],
  datasets: [
    {
      label: "Communications Volume",
      data: [28, 35, 42, 65, 87, 112],
      color: "#FF0000",
    },
    {
      label: "Troop Movements",
      data: [15, 18, 27, 38, 52, 78],
      color: "#00FF00",
    },
    {
      label: "Logistics Activities",
      data: [22, 25, 38, 57, 82, 95],
      color: "#0000FF",
    },
  ],
  anomalyThreshold: 60,
  metadata: {
    activityLevel: "Critical",
    trendDirection: "Rapidly Increasing",
    peakTime: "06:30 UTC",
  },
};

export const OUTPUT_4 = `# HUMINT Source Reports Analysis
**Last Updated:** 09:40 UTC

## Verified Intelligence Reports

### Source ALPHA-3
1. "Military reserve units mobilized in eastern district. Unusual timing and scale."
   - Source reliability: A1
   - Multiple corroborating reports
   - Timeline verified against SIGINT

2. "Command-level meeting called at Central Headquarters with unusual attendance."
   - Senior source confirmation
   - Attendance roster verified
   - Location matches previous pattern disruption

### Source BRAVO-7
- Regional Asset Network:
  - Multiple reports of fuel and ammunition stockpiling
  - Coordination of specialized units at Forward Base Charlie
  - Photos of equipment staging areas verified

### Source DELTA-2
- Field Operative Updates:
  - Command structure changes at Battalion level
  - Specialized equipment deployment observed
  - Real-time movement reporting from embedded assets

## Warning Indicators
- Command and control changes implemented ahead of schedule
- Multiple reports of leave cancellations
- Reports of communications blackout drills`;

export const OUTPUT_5 = `# Intelligence Fusion Summary
**Generated:** 10:00 UTC, February 24, 2025

## Current Threat Assessment: HIGH

### Operational Indicators
- Eastern border region showing significant military activity
- Force posture: Combat-ready and increasing
- Rate of deployment: ~15% per 24 hours
- Affected area: 80km border section

### Impact Assessment
1. Military Capability
   - Multiple combat units identified
   - Air defense systems activated
   - Electronic warfare equipment deployed
   - Communications secured and encrypted

2. Intent Indicators
   - Command and control activation patterns match previous operations
   - Logistics flow consistent with sustained operations
   - Pre-positioning of medical and support assets
   - Forward reconnaissance active

3. Resource Deployment
   - 15+ armored vehicles confirmed
   - 2 mobile command posts activated
   - Forward air assets positioned
   - Electronic warfare capabilities deployed

### Critical Intelligence Gaps
- Ultimate operational objectives
- Timeline for potential action
- Involvement of specialized units
- Coordination with non-military elements`;

export const OUTPUT_6 = {
  threatLevel: "HIGH",
  requiresEscalation: true,
  factors: [
    {
      category: "Military Forces",
      level: "Significant",
      details: "Combat-ready units positioned in key locations",
    },
    {
      category: "Command & Control",
      level: "Active",
      details: "Encrypted communications and command structure activated",
    },
    {
      category: "Intelligence Indicators",
      level: "Multiple",
      details: "Pattern consistent with pre-operational staging",
    },
  ],
  recommendations: [
    "Immediate escalation to senior leadership",
    "Increase collection across all intelligence disciplines",
    "Activate contingency planning",
  ],
  validationStatus: "Corroborated by multiple intelligence sources",
};

export const OUTPUT_7 = `# Intelligence Response Action Plan
**Effective:** 10:15 UTC, February 24, 2025

## IMMEDIATE ACTIONS REQUIRED

### 1. Priority Collection Operations
- Redirect satellite coverage to:
  * Grid sectors 372-481 (communications hub)
  * Eastern transportation corridors
  * Forward Operating Base locations

### 2. Intelligence Distribution
- Immediate dissemination to Joint Operations Center
- Notify NATO intelligence liaison officers
- Brief national security leadership

### 3. Resource Allocation
- Activate 24-hour analysis cell
- Request additional collection platforms
- Establish joint intelligence fusion team

### 4. Counterintelligence Measures
- Enhance operational security protocols
- Monitor for information leakage
- Implement deception countermeasures

## Execution Timeline
1. Hour 1: Enhanced collection operations
2. Hour 2: Initial assessment distribution
3. Hour 3: Interagency coordination
4. Hour 6: Comprehensive intelligence product

## Communication Protocols
- Secure briefings every 2 hours
- Direct communication with collection assets
- Updates via classified channels only`;

export const OUTPUT_8 = [
  {
    timestamp: "10:20:00 UTC",
    recipient: "Joint Operations Center",
    status: "Delivered",
    message: "Priority intelligence update on border activities",
    response: "Acknowledged, command briefing scheduled",
  },
  {
    timestamp: "10:20:30 UTC",
    recipient: "Collection Management",
    status: "Delivered",
    message: "Redirect SIGINT resources to Grid 372-481",
    response: "Assets redirecting, ETA 30 minutes",
  },
  {
    timestamp: "10:21:00 UTC",
    recipient: "NATO Liaison",
    status: "Delivered",
    message: "Activate intelligence sharing protocols",
    response: "Sharing activated, allied assets responding",
  },
  {
    timestamp: "10:21:30 UTC",
    recipient: "National Security Council",
    status: "Delivered",
    message: "Preliminary assessment of border activities",
    response: "Received, briefing scheduled for 11:00 UTC",
  },
];

export const OUTPUT_9 = `# CONSOLIDATED INTELLIGENCE REPORT
**Classification: TOP SECRET//NOFORN**
**Timestamp: 10:30 UTC, February 24, 2025**

## EXECUTIVE SUMMARY
Intelligence from multiple sources indicates significant military activity in the Eastern Border Region showing patterns consistent with preparation for offensive operations. Activity level has increased 35% over 72 hours with notable changes in command and control structures, communications patterns, and force positioning.

## SOURCE INTEGRATION

### GEOINT
- Satellite imagery confirms 14 armored vehicles newly deployed
- 3 mobile command centers established at Grid 372-481
- Defensive positions reinforced along 80km border section
- Unusual convoy patterns suggesting logistics buildup

### SIGINT
- Military-grade encrypted communications increased 112% in last 12 hours
- Command facility showing unusual data transmission patterns
- Frequency shifts detected in border surveillance systems
- Electronic signatures consistent with advanced EW systems

### HUMINT
- Source ALPHA-3 confirms military reserve mobilization
- Command-level meeting with unusual attendance reported
- Multiple sources verify ammunition and fuel stockpiling
- Leave cancellations implemented across multiple units

### OSINT
- Regional news reporting unusual military transport activity
- Social media showing increased military presence in border towns
- Commercial satellite imagery showing vehicle staging areas
- Increased security measures at government facilities

### LAW ENFORCEMENT
- Border security reports increased inspections and detentions
- Cross-border civilian traffic restricted at multiple checkpoints
- Surveillance of key government officials increased
- Unusual diplomatic security measures implemented

## ASSESSMENT CONFIDENCE
High confidence assessment based on multiple intelligence disciplines with source verification and cross-correlation.`;

export const OUTPUT_10 = `# PATTERN ANALYSIS REPORT
**Classification: TOP SECRET//NOFORN**
**Reference: INTEL-2025-0224-042**

## ACTIVITY PATTERN ASSESSMENT

### Timeline Analysis
- **72-48 Hours Prior:** Initial communications spike and logistics movement
- **48-24 Hours Prior:** Command activation and force positioning
- **24-12 Hours Prior:** Equipment deployment and communications security measures
- **Current Status:** Full operational posture indicators present

### Historical Pattern Matching
Analysis reveals 87% correlation with activity patterns observed prior to the April 2024 border incursion, with notable similarities in:
- Command and control activation sequence
- Communications security implementation
- Force positioning relative to terrain features
- Logistics flow patterns

### Anomaly Detection
The following deviations from historical patterns are noted:
1. More rapid deployment timeline (35% faster than previous operations)
2. Enhanced electronic warfare component presence
3. Higher level of operational security measures
4. Presence of specialized units not previously observed

### Indicator Analysis
| Indicator | Status | Confidence |
|-----------|--------|------------|
| Force Mobilization | CONFIRMED | HIGH |
| Command Activation | CONFIRMED | HIGH |
| Logistics Buildup | CONFIRMED | MEDIUM |
| Communications Security | CONFIRMED | HIGH |
| Air Defense Activation | PARTIAL | MEDIUM |
| Electronic Warfare | CONFIRMED | HIGH |

## DECEPTION ANALYSIS
Current patterns assessed as consistent with genuine operational preparation rather than deception operations based on:
- Resource commitment level
- Command involvement
- Operational security measures
- Deployment of high-value assets

## CONCLUSION
Intelligence indicators strongly suggest preparation for offensive operations with a high probability of activation within 24-48 hours based on current progression rate.`;

export const OUTPUT_11 = `# NATIONAL SECURITY PRIORITIES ASSESSMENT
**Classification: TOP SECRET//NOFORN**
**Timestamp: 11:15 UTC, February 24, 2025**

## ALIGNMENT WITH NATIONAL INTELLIGENCE PRIORITIES

### Priority 1: Border Security and Territorial Integrity
**DIRECT ALIGNMENT - CRITICAL**
- Current activities present immediate challenge to border security
- Territorial integrity potentially threatened by force posture
- Early warning indicators fully triggered
- Response threshold met for priority escalation

### Priority 2: Regional Stability Operations
**DIRECT ALIGNMENT - HIGH**
- Activity patterns indicate potential for regional destabilization
- Refugee flow implications if conflict erupts
- Economic disruption potential high
- Diplomatic implications require immediate attention

### Priority 3: Counter-Terrorism and Non-State Actors
**INDIRECT ALIGNMENT - MEDIUM**
- Potential for exploitation of instability by non-state actors
- Secondary effects on counter-terrorism operations
- Intelligence collection disruption possible
- Resources may require reallocation

### Priority 4: Weapons Proliferation Control
**MODERATE ALIGNMENT - MEDIUM**
- Movement of advanced weapons systems detected
- Potential transfer to non-state actors in region
- Verification of weapons systems compliance required
- Proliferation risk assessment needed

## INTELLIGENCE DIRECTIVES ALIGNMENT
Current intelligence collection and analysis efforts are properly aligned with National Intelligence Priorities Framework directives:
- Collection assets appropriately tasked
- Analysis resources correctly allocated
- Dissemination protocols following established guidelines
- Interagency coordination activated

## RECOMMENDED PRIORITY ADJUSTMENTS
1. Elevate eastern border region to Priority Designation Alpha
2. Increase collection allocation by 35%
3. Establish dedicated analysis cell for continuous assessment
4. Implement twice-daily briefing schedule for national leadership`;

export const OUTPUT_12 = {
  overall_threat_level: "SEVERE",
  confidence_level: "HIGH",
  timeframe: "IMMINENT (24-48 hours)",

  capability_assessment: [
    {
      category: "Ground Forces",
      strength: "Battalion-level",
      readiness: "Combat Ready",
      threat_rating: 85,
    },
    {
      category: "Command & Control",
      strength: "Fully Operational",
      readiness: "Active",
      threat_rating: 90,
    },
    {
      category: "Electronic Warfare",
      strength: "Advanced Systems",
      readiness: "Deployed",
      threat_rating: 80,
    },
    {
      category: "Logistics",
      strength: "Sustained Operations",
      readiness: "Positioned",
      threat_rating: 75,
    },
  ],

  intent_indicators: [
    "Command structure activated to operational level",
    "Forward positioning consistent with offensive operations",
    "Intelligence collection against defensive positions",
    "Communications security measures fully implemented",
  ],

  potential_scenarios: [
    {
      scenario: "Limited Border Incursion",
      probability: "HIGH (70%)",
      timeline: "24-48 hours",
      indicators_present: "15/18",
    },
    {
      scenario: "Full-Scale Offensive",
      probability: "MEDIUM (40%)",
      timeline: "48-72 hours",
      indicators_present: "9/15",
    },
    {
      scenario: "Show of Force Only",
      probability: "LOW (15%)",
      timeline: "Ongoing",
      indicators_present: "3/12",
    },
  ],

  recommended_readiness: "DEFCON 3",
};

export const OUTPUT_13 = `# SOURCE PROTECTION ASSESSMENT
**Classification: TOP SECRET//NOFORN**
**Timestamp: 11:30 UTC, February 24, 2025**

## CRITICAL SOURCE VULNERABILITY ANALYSIS

### HUMINT Sources
- **Source ALPHA-3:** HIGH RISK
  * Current position exposes source to counterintelligence scrutiny
  * Recent operational tempo increases exposure
  * Recommended Action: Temporary communication blackout

- **Source BRAVO-7:** MODERATE RISK
  * Network position provides some operational security
  * Increased military presence in area raises detection risk
  * Recommended Action: Switch to emergency communication protocols

- **Source DELTA-2:** SEVERE RISK
  * Embedded position extremely vulnerable during heightened alert
  * Access to critical information increases counterintelligence focus
  * Recommended Action: Consider immediate extraction

### Technical Collection Vulnerabilities
1. SIGINT collection platforms potentially compromised by:
   - Enhanced electronic warfare capabilities detected
   - Counter-surveillance measures observed
   - Signals intelligence countermeasures active

2. GEOINT vulnerabilities:
   - Increased counter-space activities
   - Weather degradation expected in next 12 hours
   - Physical masking of key facilities observed

## PROTECTIVE MEASURES IMPLEMENTATION

### Immediate Actions
- Transition HUMINT sources to emergency protocols
- Rotate SIGINT collection frequencies and methods
- Diversify GEOINT collection platforms
- Implement deception measures to mask collection focus

### Mid-term Protection Strategy
- Create alternate communication channels
- Establish emergency extraction protocols
- Develop counter-surveillance measures
- Implement source identity compartmentalization

## RISK MITIGATION TIMELINE
1. Hour 1-2: Emergency protocol activation
2. Hour 2-6: Communication security enhancement
3. Hour 6-12: Counterintelligence sweep
4. Hour 12-24: Full protection measures implementation

## REQUIRED RESOURCES
- Rapid reaction team on standby for extraction
- Technical countermeasures deployment
- Alternative communication systems
- Deception operation support`;

export const OUTPUT_14 = `# INTELLIGENCE PRODUCT
**Classification: TOP SECRET//NOFORN//ORCON**
**Product ID: IIR-2025-0224-EB-0001**
**Date: February 24, 2025**

## SITUATION ASSESSMENT

Intelligence from multiple sources with high reliability indicates preparation for significant military operations along the eastern border region. Activity patterns, force composition, and command and control indicators suggest preparations for offensive action within the next 24-48 hours.

## KEY FINDINGS

1. **Military Forces**
   - Battalion-strength forces positioned along 80km border section
   - Combat readiness achieved across multiple units
   - Special operations elements identified at three key locations
   - Air defense and electronic warfare capabilities fully deployed

2. **Command Intent**
   - Operational command structure activated
   - Communications security measures implemented
   - Intelligence collection focused on defensive positions and response capabilities
   - Logistics positioned for sustained operations

3. **Timeline Assessment**
   - Current Phase: Final Positioning (95% complete)
   - Estimated Window for Action: 24-48 hours
   - Readiness Level: Full Combat Capability
   - Deception Indicators: Minimal, assessed as genuine operational preparation

4. **Critical Vulnerabilities**
   - Command and control nodes at Grid 372-481
   - Logistics hub at Eastern Transportation Center
   - Communications relay station at Mountain Position Alpha
   - Forward fuel and ammunition depots

## ASSESSMENT CONFIDENCE

High confidence assessment based on multiple intelligence disciplines with source verification and cross-correlation. Alternative hypotheses considered and deemed less probable based on available intelligence.

## RECOMMENDED ACTIONS

1. **Immediate Military Response**
   - Increase force readiness along affected border section
   - Deploy counter-electronic warfare capabilities
   - Activate air defense and early warning systems
   - Position counter-mobility assets at key terrain features

2. **Intelligence Operations**
   - Maintain enhanced collection against identified targets
   - Focus SIGINT on command and control networks
   - Deploy additional HUMINT resources with access to decision makers
   - Increase UAV reconnaissance of staging areas

3. **Diplomatic Initiatives**
   - Engage through established military deconfliction channels
   - Initiate NATO consultation under Article 4
   - Prepare evidence package for international distribution
   - Activate bilateral security agreements

## UPDATES AND DISTRIBUTION

Continuous monitoring in effect with updates to follow at 2-hour intervals or as significant developments occur. Distribution to JOINT OPS, NATO INTEL, NSC, and authorized commands.`;

export const OUTPUT_15 = `# PRIORITY INTELLIGENCE DISSEMINATION
TO: JOINT OPERATIONS COMMAND
FROM: INTELLIGENCE DIRECTORATE
SUBJECT: IMMINENT THREAT ASSESSMENT - EASTERN BORDER
CLASSIFICATION: TOP SECRET//NOFORN//ORCON

SUMMARY: High confidence assessment of imminent military action along Eastern Border Region within 24-48 hours. Battalion-strength forces with full combat capability positioned. Command and control activated. All indicators consistent with offensive operations preparation.

KEY POINTS:
1. Force posture changed to offensive configuration
2. Command structure fully activated
3. Electronic warfare capabilities deployed
4. Logistics positioned for sustained operations
5. Historical pattern match: 87% correlation with April 2024 incursion

RECOMMENDED ACTIONS:
1. Increase defensive posture immediately
2. Activate contingency plans EAGLE SHIELD and SWIFT RESPONSE
3. Position counter-electronic warfare assets
4. Brief national leadership within 1 hour

BRIEFING SCHEDULED: 12:15 UTC via SECURE CONFERENCE ALPHA

RESPONSE REQUIRED: ACKNOWLEDGE RECEIPT AND CONFIRM BRIEFING ATTENDANCE

//END PRIORITY TRANSMISSION//`;

export const OUTPUT_16 = `# JOINT OPERATIONS INTELLIGENCE BRIEF
**Classification: NATO SECRET//REL TO USA, FVEY**
**OPERATION VIGILANT SHIELD**
**February 24, 2025**

## SITUATION OVERVIEW

Significant military activities detected along Eastern Border Region indicating preparation for offensive operations. Multiple intelligence sources with high reliability confirm battalion-strength forces positioned for potential action within 24-48 hours. This assessment has been validated through multi-source intelligence fusion and pattern analysis.

## INTELLIGENCE SUMMARY

### Observed Military Activities
- Combat-ready battalion-strength forces positioned along 80km border section
- Command and control nodes fully activated at Grid 372-481
- Electronic warfare systems deployed at key terrain features
- Logistics infrastructure positioned for sustained operations
- Special operations elements identified at three critical locations

### Assessment Confidence
Intelligence confidence level: HIGH
- Multiple intelligence disciplines confirming key indicators
- Pattern analysis shows 87% correlation with previous offensive operations
- Source reliability rated as high across collection platforms
- Technical and human intelligence in strong agreement

### Timeline Projection
- Current Phase: Final Positioning (95% complete)
- Estimated Window for Action: 24-48 hours
- Preparatory Activities: Complete
- Earliest Potential H-Hour: 06:00 UTC, February 25

## NATO IMPLICATIONS

### Article 4 Considerations
Current situation meets threshold for NATO consultation under Article 4 of the North Atlantic Treaty regarding threats to territorial integrity, political independence, and security.

### Joint Response Options
1. Enhanced Forward Presence reinforcement
2. Allied air policing mission expansion
3. Joint intelligence collection prioritization
4. Strategic communication coordination

### Intelligence Sharing Requirements
- Immediate distribution to all NATO allies
- Enhanced sharing with operational commands
- Support to NATO intelligence fusion center
- Real-time updates through secure NATO channels

## RECOMMENDED ACTIONS

### Military Response
- Increase readiness levels for rapid response forces
- Deploy additional ISR assets to affected region
- Enhance electronic warfare defensive posture
- Position strategic reserves for rapid deployment

### Political-Military Coordination
- Activate NATO Military Committee emergency session
- Brief North Atlantic Council within 3 hours
- Prepare for Defense Ministerial consultation
- Coordinate strategic messaging across Alliance

## UPDATES AND REPORTING

Continuous monitoring with formal updates at 2-hour intervals or as significant developments occur. Joint Intelligence Fusion Cell activated with allied liaison officers present. Next comprehensive assessment: 14:00 UTC.

//END OF BRIEF//`;
