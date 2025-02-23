Overview of First Responder Notification Pipeline

The pipeline is designed to intelligently process emergency situations and notify investigators through a sophisticated multi-path workflow:

Path 1 - Video Analysis:

- Collects video footage from surveillance systems
- Uses NVIDIA's mixed-modal LLMs to analyze the footage and generate a summary analysis

Path 2 - OSINT Collection (runs concurrently):

- Gathers data from three sources:
  1. EMS station reports
  2. Local dispatch logs (with anomaly detection)
  3. Social media distress signals (Twitter, Facebook, Telegram)
- A Summarizer agent combines these inputs into a comprehensive situation report

Convergence & Safety Checks:

- A NEMO guardrail system analyzes the summary for:
  - Urgency of first responder notification
  - Critical situations (life-threatening scenarios)
  - Potential misinformation
- Video analysis and OSINT summaries are merged
- An agent prioritizes events and suggests tactical approaches

Safety Override:

- Due to the high-stakes nature of decisions involving human life, the system requires human authorization before proceeding
- This is especially important when dealing with social media inputs and potential misinformation

Final Steps:

1. Generation of formal response plan with full context and tactical decisions
2. Automatic notification of first responders through:
   - AI-powered calls via Twilio
   - Apptek integration
   - Faxed reports

The system combines automated intelligence with human oversight to ensure both rapid response and appropriate safety checks.

The pipeline starts with x2 concurrent paths of jobs.

- _Start_:
  - 1:
    - videos feed provided by system-> (Collect Video Footage) -> outputs footage
    - --> (Analyze Footage) -> outputs summary analysis (uses NVIDIA mixed-modal llms to analyze and report)
  - 2:
    - An event turns on three nodes/agents collecting OSINT
      - (Partner Report): Agent collects partner reports from local EMS stations (text based)... it reports or any relevant information to the flooding disaster
      - (Calls for service): this agent parses all local dispatch logs and monitors frequency of reports. It detects anomaly alerts (it needs to output json for a chart to display). In the json it provides metadata about what it saw
      - (Social Media): this agent searchers local twitter, facebook, and telegram feeds for distress calls.
    - The three previous outputs are provided to a Summarizer agent. This agent crafts a summary of key events in markdown form. The agent is reporting on the current situation and need for response.
    - A nemo guardrail analyzes the summary.
      - Is there a need to continue distress call and notify investigators?
      - Is there any potential information from social media feeds that could indicate either a very serious situation (human life at stake, misinformation, etc)
- _Midway-Funnel_
  - The nemo guardrail may let the summary through to the next agent and the pipeline continues. At this point the video footage summary will be merged with the OSINT summary.
  - (Prioritize event on need and impact): This agent determines where and how first responders should focus their efforts. It outputs a priority report with a tactical approach suggested.
    - **Provisional Policy Override: (Grant AI-driven action in high-risk scenario) **Given the nature of the event, and inclusion of certain social media feeds and risk for issues such as judgement around human life, and/or inclusion of possible misinformation, a human must authorize the use of this pipeline beforehand. (typically relying on the nemo guardrail, as well as human judgement given the situation).
- Finale response and notification
  - (Establish the response plan): this agent will write a final response plan, that is formal, with adequate information for context and record keeping. This report is considered authoritative. It is both tactical and comprehensive of decisions to be made about how to notify investigators.
  - (Notify investigators): this agent will utilize twilio and apptek tooling to have an ai make calls through a direct hotline to first responders. The final report is also faxed. (3 total tool calls).
