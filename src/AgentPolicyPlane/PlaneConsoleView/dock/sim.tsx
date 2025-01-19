// src/AgentPolicyPlane/PlaneConsoleView/dock/sim.tsx
// src/AgentPolicyPlane/sample-outputs.ts

export const OUTPUT_1 = `## Video Analysis Report
**Timestamp:** 2025-01-19 14:30 EST
**Location:** Downtown River District

### Key Observations
- Multiple intersections showing standing water 2-3 feet deep
- Traffic signals malfunctioning at Main & River St
- Emergency vehicles navigating through flooded areas
- Civilians attempting to wade through flood waters
- Structural damage visible on riverside buildings

### Critical Concerns
- Water level rising at approximately 2 inches per hour
- Two stranded vehicles with possible occupants
- Bridge structural integrity may be compromised
- Power lines down in northwest quadrant

### People Count
- ~25 civilians visible in affected areas
- 3 emergency response vehicles
- 2 rescue boats deployed`;

export const OUTPUT_2 = `# Emergency Services Situation Report
**Time:** 14:45 EST
**Reporting Units:** Station 7, 12, 15

## Active Response Units
- Engine 7: Water rescue operations
- Ladder 12: Building evacuation
- EMS Units: 3 ambulances deployed

## Incidents in Progress
1. Water rescue at 123 River Street
   - 2 adults, 1 child
   - Second floor evacuation needed
   
2. Medical emergency at Riverside Apartments
   - Elderly resident requires evacuation
   - Medical equipment needs power
   
3. Structure assessment at Downtown Bridge
   - Signs of stress on support columns
   - Engineering team requested

## Resource Status
- Swift water rescue team: Engaged
- Additional boats requested
- Helicopter support inbound`;

export const OUTPUT_3 = {
  labels: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
  datasets: [
    {
      label: "Water Emergency Calls",
      data: [5, 12, 25, 45, 62, 78],
      color: "#FF0000",
    },
    {
      label: "Medical Emergency",
      data: [3, 8, 15, 22, 28, 35],
      color: "#00FF00",
    },
    {
      label: "Evacuation Requests",
      data: [2, 5, 18, 35, 48, 55],
      color: "#0000FF",
    },
  ],
  anomalyThreshold: 40,
  metadata: {
    callVolume: "Critical",
    trendDirection: "Increasing",
    peakTime: "14:30 EST",
  },
};

export const OUTPUT_4 = `# Social Media Distress Signals Analysis
**Last Updated:** 14:50 EST

## Verified Emergency Reports

### Twitter
1. @resident_jane: "Water rising fast on Oak Street. Entire first floor flooded. Need help! #downtownflood"
   - Location confirmed
   - Multiple corroborating reports
   - Photos verified

2. @local_news: "Live: Rescue boats deployed on Main Street. Multiple families being evacuated."
   - Official news source
   - Video footage verified
   - Location matches emergency response data

### Facebook
- Community Group "Downtown Residents":
  - Multiple reports of power outages in Riverside district
  - Coordination of volunteer efforts at Community Center
  - Photos of flooding at Central Park verified

### Telegram
- Emergency Channel Updates:
  - Sandbag distribution at Fire Station 7
  - Medical supply needs at Riverside Apartments
  - Real-time flood level updates from residents

## Warning Signals
- Rising water levels reported in previously unaffected areas
- Multiple requests for boat rescue
- Reports of contaminated water`;

export const OUTPUT_5 = `# Comprehensive Situation Summary
**Generated:** 15:00 EST, January 19, 2025

## Current Emergency Status: CRITICAL

### Flood Conditions
- Downtown river district experiencing severe flooding
- Water levels: 2-3 feet and rising
- Rate of rise: ~2 inches per hour
- Affected area: 12 square blocks

### Impact Assessment
1. Infrastructure
   - Multiple roads impassable
   - Bridge structural concerns
   - Power outages affecting 300+ residences
   - Communications systems stable

2. Human Impact
   - 45+ evacuation requests pending
   - 25+ people requiring immediate assistance
   - 3 medical emergencies reported
   - No casualties reported

3. Resource Deployment
   - 3 EMS units active
   - 2 rescue boats deployed
   - Additional resources inbound
   - Volunteer center established

### Critical Needs
- Additional water rescue teams
- Emergency power generators
- Medical supply distribution
- Expanded evacuation capacity`;

export const OUTPUT_6 = {
  riskLevel: "CRITICAL",
  requiresOverride: true,
  factors: [
    {
      category: "Life Safety",
      level: "High",
      details: "Multiple active rescue operations required",
    },
    {
      category: "Infrastructure",
      level: "Severe",
      details: "Critical systems compromised",
    },
    {
      category: "Resource Capacity",
      level: "Strained",
      details: "Emergency services at 85% capacity",
    },
  ],
  recommendations: [
    "Immediate evacuation of affected areas",
    "Deploy all available rescue resources",
    "Activate mutual aid agreements",
  ],
  validationStatus: "Verified by multiple sources",
};

export const OUTPUT_7 = `# Emergency Response Action Plan
**Effective:** 15:15 EST, January 19, 2025

## IMMEDIATE ACTIONS REQUIRED

### 1. Priority Rescue Operations
- Deploy all available water rescue teams to:
  * 123 River Street (family with child)
  * Riverside Apartments (medical emergency)
  * Oak Street (multiple stranded residents)

### 2. Infrastructure Security
- Close Downtown Bridge to all traffic
- Establish power restoration to critical facilities
- Deploy emergency pumping stations

### 3. Resource Allocation
- Activate mutual aid agreements
- Request state emergency resources
- Establish emergency shelter at Community Center

### 4. Medical Response
- Set up medical triage at Fire Station 7
- Coordinate hospital preparations
- Deploy mobile medical units

## Execution Timeline
1. Hour 1: Initial rescue operations
2. Hour 2: Infrastructure stabilization
3. Hour 3: Shelter establishment
4. Hour 4: Resource reallocation

## Communication Protocols
- Emergency broadcast every 30 minutes
- Direct communication with rescue teams
- Public updates via official channels`;

export const OUTPUT_8 = [
  {
    timestamp: "15:20:00 EST",
    recipient: "Fire Station 7",
    status: "Delivered",
    message: "Deploy water rescue teams to River Street",
    response: "Acknowledged, teams deploying",
  },
  {
    timestamp: "15:20:30 EST",
    recipient: "EMS Central",
    status: "Delivered",
    message: "Medical emergency at Riverside Apartments",
    response: "Units dispatched",
  },
  {
    timestamp: "15:21:00 EST",
    recipient: "Police Command",
    status: "Delivered",
    message: "Close Downtown Bridge immediately",
    response: "Proceeding with closure",
  },
  {
    timestamp: "15:21:30 EST",
    recipient: "Emergency Management",
    status: "Delivered",
    message: "Activate emergency response plan",
    response: "Plan activated, resources mobilizing",
  },
];
