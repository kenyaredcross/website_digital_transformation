// ── Innovation & Research Data ────────────────────────────────────────────────

export interface InnovationProject {
  id: string;
  title: string;
  status: "Scaled" | "Adapted" | "Discontinued" | "Ongoing" | "Pilot";
  category: string;
  period: string;        // e.g. "Mar 2024 – Aug 2024"
  location: string;
  lead: string;
  team: string;
  partnerOrgs: string[];
  cover: string;         // image path
  tagline: string;
  whatWeTested: string;
  whyWeTested: string;
  whatWeLearned: string;
  whatWorked: string[];
  whatDidntWork: string[];
  whatToImprove: string[];
  recommendation: string;
  tags: string[];
  featured?: boolean;
  color: "red" | "blue" | "amber" | "emerald" | "purple" | "orange" | "teal";
}

export const INNOVATION_PROJECTS: InnovationProject[] = [
  {
    id: "ip-001",
    title: "AI-Assisted Rapid Needs Assessment via SMS Chatbot",
    status: "Adapted",
    category: "Artificial Intelligence",
    period: "Jan 2024 – Jun 2024",
    location: "Turkana & Marsabit Counties",
    lead: "Dr. Amina Waweru",
    team: "AI & Data Science Unit",
    partnerOrgs: ["GSMA Mobile for Humanitarian Innovation", "Safaricom Foundation"],
    cover: "/assets/images/dt_updates/app_phone.jpg",
    tagline: "Can a simple SMS chatbot reliably capture household vulnerability data in low-connectivity areas?",
    whatWeTested:
      "A conversational SMS chatbot powered by a fine-tuned LLM to conduct structured household needs assessments in Kiswahili and Turkana dialects, without requiring internet access.",
    whyWeTested:
      "Traditional household surveys are time-intensive and require trained enumerators. We wanted to test whether automated SMS outreach could collect high-quality vulnerability data at scale during the 2024 drought response window.",
    whatWeLearned:
      "Completion rates were 61% — higher than anticipated for first deployment. Dialect gaps in training data caused 18% of responses to be misclassified. Rural respondents preferred short, single-question flows over multi-step dialogue trees.",
    whatWorked: [
      "Kiswahili question flows had 78% completion rate and strong data quality scores",
      "Integration with the national M-PESA infrastructure for participant verification",
      "Automated flagging of high-vulnerability households for field follow-up within 2 hours",
    ],
    whatDidntWork: [
      "Turkana-dialect NLP model underperformed due to insufficient training corpus",
      "Long dialogue trees (>7 questions) caused 34% drop-off mid-conversation",
      "Phone number deduplication failed for shared household devices",
    ],
    whatToImprove: [
      "Partner with Turkana County linguistics faculty to expand dialect training data",
      "Redesign flows to maximum 5 questions per session with follow-up linked sessions",
      "Implement household-level identifiers beyond phone numbers",
    ],
    recommendation:
      "Adapt and re-pilot with improved dialect models and shorter conversational flows. Scale to Kiswahili-dominant counties pending Q4 2024 re-evaluation.",
    tags: ["AI", "SMS", "needs assessment", "Turkana", "NLP"],
    featured: true,
    color: "blue",
  },
  {
    id: "ip-002",
    title: "Drone-Based Flood Damage Mapping in West Pokot",
    status: "Scaled",
    category: "Geospatial Technology",
    period: "Oct 2023 – Feb 2024",
    location: "West Pokot County",
    lead: "James Omondi",
    team: "Geospatial Innovations Team",
    partnerOrgs: ["IFRC Geneva Tech Lab", "Kenya Civil Aviation Authority"],
    cover: "/assets/images/dt_updates/relief.jpg",
    tagline: "Can drone orthomosaics replace ground surveys for post-flood damage assessments?",
    whatWeTested:
      "Fixed-wing drone flights across 4,200 km² of flood-affected terrain in West Pokot to generate high-resolution orthomosaic maps and damage classification models, replacing 3-week ground survey campaigns.",
    whyWeTested:
      "The 2023 El Niño floods made large areas inaccessible to ground teams. We needed rapid damage quantification to trigger anticipatory finance transfers within 72 hours of peak flooding.",
    whatWeLearned:
      "Drone-based assessments reduced data collection time from 21 days to 4 days and captured damage in areas completely unreachable by field teams. Classification models achieved 84% accuracy against ground truth validation.",
    whatWorked: [
      "4-day full coverage versus 21-day traditional survey — 81% time reduction",
      "Orthomosaic outputs ingested directly into KRCS GIS dashboard",
      "84% structure damage classification accuracy validated by field teams",
      "Triggered anticipatory cash transfers for 3,200 households within 72 hours",
    ],
    whatDidntWork: [
      "KCAA regulatory approval took 11 days, delaying initial deployment",
      "Battery performance dropped 40% in cold highland conditions above 2,400m",
      "Cloud cover on 3 of 8 survey days required repeat missions",
    ],
    whatToImprove: [
      "Pre-negotiate standing KCAA emergency permits for disaster response corridors",
      "Procure cold-weather battery systems rated to -5°C",
      "Integrate satellite SAR imagery as cloud-cover backup",
    ],
    recommendation:
      "Scale to all KRCS operational counties. Embed drone capability into standard Disaster Response Operating Procedures by Q1 2025.",
    tags: ["drones", "GIS", "flood response", "damage assessment", "anticipatory action"],
    featured: true,
    color: "teal",
  },
  {
    id: "ip-003",
    title: "Community Health Worker Digital Supervision Platform",
    status: "Scaled",
    category: "Digital Health",
    period: "Apr 2023 – Dec 2023",
    location: "Kisumu, Siaya & Homabay Counties",
    lead: "Grace Atieno",
    team: "Health Informatics Team",
    partnerOrgs: ["USAID Kenya", "Amref Health Africa"],
    cover: "/assets/images/dt_updates/teaching.jpg",
    tagline: "Can digital supervision replace in-person visits for Community Health Workers without compromising quality?",
    whatWeTested:
      "A lightweight Android app for CHW supervisors to conduct remote performance reviews, track household visit rates, and flag at-risk volunteers — replacing fortnightly in-person supervision visits.",
    whyWeTested:
      "Supervision costs consumed 22% of the CHW programme budget. Remote supervision was theorised to reduce costs while maintaining quality, allowing reallocation of savings to CHW stipends.",
    whatWeLearned:
      "Remote supervision reduced programme costs by 34% while maintaining 96% of quality indicators. Supervisors reported increased reach — average caseloads grew from 12 to 19 CHWs per supervisor.",
    whatWorked: [
      "34% cost reduction in supervision, reinvested into CHW training and tools",
      "Monthly active CHW rate improved from 71% to 89% with real-time engagement prompts",
      "Integrated data dashboards surfaced underperforming areas 2 weeks earlier than before",
    ],
    whatDidntWork: [
      "Older supervisors (50+) required significantly more onboarding support than anticipated",
      "Offline sync failures on 2G networks caused data loss for 8% of sessions",
      "Relationship quality between supervisor and CHW perceived as weaker by CHWs",
    ],
    whatToImprove: [
      "Combine monthly digital check-ins with quarterly in-person visits to preserve relationships",
      "Strengthen offline-first architecture for 2G/EDGE environments",
      "Develop simplified UI mode for low-digital-literacy supervisors",
    ],
    recommendation:
      "Scale nationally with hybrid digital-physical supervision model. Budget for 2 days per quarter in-person visits alongside the digital platform.",
    tags: ["digital health", "CHW", "supervision", "Kisumu", "Amref"],
    featured: true,
    color: "emerald",
  },
  {
    id: "ip-004",
    title: "Parametric Flood Insurance for Smallholder Farmers",
    status: "Pilot",
    category: "Climate Finance",
    period: "Feb 2024 – Ongoing",
    location: "Tana River & Garissa Counties",
    lead: "Hassan Adan",
    team: "Cash & Markets Innovation Unit",
    partnerOrgs: ["Swiss Re Institute", "APA Insurance", "World Food Programme"],
    cover: "/assets/images/dt_updates/hunger.jpg",
    tagline: "Can satellite river-gauge data trigger automatic insurance payouts for flood-affected farmers without claims adjustment?",
    whatWeTested:
      "A parametric micro-insurance product that automatically triggers payouts when satellite-monitored river levels exceed pre-agreed thresholds, eliminating the traditional claims assessment process for 1,800 smallholder farmers.",
    whyWeTested:
      "Traditional insurance claims processes take 45–90 days, long after affected farmers need funds for replanting. Parametric approaches promised payouts within 5 days of trigger events.",
    whatWeLearned:
      "First trigger event (April 2024) validated the model — 1,247 farmers received M-PESA payouts within 4.2 days of the river gauge threshold being exceeded. Basis risk (paying farmers who weren't actually flooded) affected approximately 12% of beneficiaries.",
    whatWorked: [
      "4.2-day average payout from trigger event — versus 67-day industry average",
      "Zero fraud incidents versus 8% fraud rate in traditional claims",
      "94% farmer satisfaction with speed and transparency of the mechanism",
    ],
    whatDidntWork: [
      "12% basis risk — farmers paid out who had no flood damage due to microclimatic variation",
      "Premium affordability remains a barrier — 31% of targeted farmers could not afford",
      "River gauge data had 6-hour latency affecting trigger precision",
    ],
    whatToImprove: [
      "Incorporate community-level validation step to reduce basis risk below 8%",
      "Develop premium subsidy mechanism for ultra-poor farmers in partnership with donors",
      "Upgrade to real-time gauge telemetry to reduce data latency to under 30 minutes",
    ],
    recommendation:
      "Continue pilot through full 2024–2025 flood season. Recommend scale decision by March 2025 pending second-season data.",
    tags: ["parametric insurance", "climate finance", "Tana River", "smallholder", "M-PESA"],
    featured: true,
    color: "amber",
  },
  {
    id: "ip-005",
    title: "Offline-First eLearning Platform for Field Volunteers",
    status: "Adapted",
    category: "Digital Learning",
    period: "Jul 2023 – Nov 2023",
    location: "Nationwide (47 Counties)",
    lead: "Mary Njoroge",
    team: "Learning & Development Unit",
    partnerOrgs: ["Digital Promise Global", "Andela"],
    cover: "/assets/images/dt_updates/learning.jpg",
    tagline: "Can offline-first mobile learning improve training completion rates for volunteers in low-connectivity counties?",
    whatWeTested:
      "An offline-first Progressive Web App (PWA) for volunteer training, delivering 12 core modules in Kiswahili with embedded video, quizzes, and competency assessments — syncing results when connectivity returns.",
    whyWeTested:
      "Traditional face-to-face training reaches only 34% of registered volunteers annually due to logistics costs. We hypothesised that a mobile-first approach could increase annual coverage to 70%+.",
    whatWeLearned:
      "Platform coverage reached 61% of registered volunteers within 4 months. Completion rates varied dramatically by county — urban counties averaged 79% completion; arid/semi-arid land counties averaged 38%.",
    whatWorked: [
      "61% volunteer coverage in 4 months vs 34% annual baseline for traditional training",
      "Quiz-based competency assessments correlated strongly with field performance (r=0.71)",
      "Kiswahili audio narration reduced literacy barriers and improved engagement time 2.3x",
    ],
    whatDidntWork: [
      "Initial PWA bundle size (280MB) was too large for low-storage Android devices",
      "Video content consumed device storage disproportionately in ASAL counties",
      "Supervisor verification of completions was manual and prone to gaming",
    ],
    whatToImprove: [
      "Compress and stream video content progressively rather than full pre-download",
      "Introduce biometric or supervised assessment verification for high-stakes modules",
      "Partner with Safaricom to explore zero-rating of platform data",
    ],
    recommendation:
      "Adapt PWA with reduced storage footprint (<50MB) and re-pilot in 10 ASAL counties in Q1 2025.",
    tags: ["eLearning", "PWA", "volunteers", "digital skills", "offline-first"],
    color: "purple",
  },
  {
    id: "ip-006",
    title: "Real-Time Food Security Dashboard Using Market Price Data",
    status: "Scaled",
    category: "Data & Analytics",
    period: "Sep 2023 – Mar 2024",
    location: "Arid & Semi-Arid Lands (23 Counties)",
    lead: "Peter Kimani",
    team: "Data Science & Analytics Team",
    partnerOrgs: ["WFP VAM Unit", "FAO Kenya", "FEWS NET"],
    cover: "/assets/images/dt_updates/whites.jpg",
    tagline: "Can automated market price monitoring predict food insecurity spikes 30 days in advance?",
    whatWeTested:
      "An automated pipeline ingesting weekly commodity prices from 340 markets across 23 ASAL counties into a gradient-boosted prediction model to forecast food insecurity classifications 4 weeks ahead of standard IPC reporting cycles.",
    whyWeTested:
      "IPC food security updates lag field reality by 6–8 weeks. Anticipatory finance mechanisms require forward-looking data. We wanted to see if market prices alone could serve as a leading indicator.",
    whatWeLearned:
      "The model predicted IPC Phase 3+ classification with 81% accuracy at a 30-day horizon, outperforming the 60-day FAO baseline model. False positives (over-predictions) were 14%.",
    whatWorked: [
      "81% accuracy at 30-day IPC Phase 3+ prediction — validated against 18 months of historic data",
      "Automated alerts triggered 4 anticipatory response actions, saving an estimated KES 12M vs reactive response",
      "Real-time dashboard adopted by Kerio Valley Development Authority and 3 donor agencies",
    ],
    whatDidntWork: [
      "14% false positive rate caused alert fatigue among response coordinators",
      "Market price data from 7 counties had significant quality gaps (>25% missing weekly entries)",
      "Model degraded during non-seasonal events (conflict disruptions, COVID aftershocks)",
    ],
    whatToImprove: [
      "Integrate non-market signals (conflict alerts, rainfall anomaly, livestock prices) to reduce false positives",
      "Establish data quality SLAs with county market information systems",
      "Re-train model quarterly to capture emerging market dynamics",
    ],
    recommendation:
      "Scale to national deployment. Recommend integration into Kenya's National Drought Management Authority early warning dashboard by Q2 2025.",
    tags: ["food security", "machine learning", "anticipatory action", "market data", "IPC"],
    color: "orange",
  },
];

// ── Status config ─────────────────────────────────────────────────────────────

export interface StatusConfig {
  label: string;
  bg: string;
  text: string;
  border: string;
  dot: string;
}

export const STATUS_CONFIG: Record<InnovationProject["status"], StatusConfig> = {
  Scaled: {
    label: "Scaled",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800/50",
    dot: "bg-emerald-500",
  },
  Adapted: {
    label: "Adapted & Continuing",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800/50",
    dot: "bg-blue-500",
  },
  Discontinued: {
    label: "Discontinued",
    bg: "bg-slate-100 dark:bg-slate-800/40",
    text: "text-slate-600 dark:text-slate-400",
    border: "border-slate-200 dark:border-slate-700",
    dot: "bg-slate-400",
  },
  Ongoing: {
    label: "Ongoing Pilot",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800/50",
    dot: "bg-amber-500",
  },
  Pilot: {
    label: "Active Pilot",
    bg: "bg-purple-50 dark:bg-purple-950/40",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800/50",
    dot: "bg-purple-500",
  },
};

// ── Category colour map ───────────────────────────────────────────────────────

export const CATEGORY_COLORS: Record<string, string> = {
  "Artificial Intelligence": "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  "Geospatial Technology": "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300",
  "Digital Health": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  "Climate Finance": "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
  "Digital Learning": "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  "Data & Analytics": "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
};

// ── What-we-document dimensions (the 7 key pillars) ──────────────────────────

export const INNOVATION_DIMENSIONS = [
  { id: "tested",    emoji: "🔬", label: "What We Tested",          color: "blue" },
  { id: "why",       emoji: "💡", label: "Why We Tested It",        color: "amber" },
  { id: "learned",   emoji: "📚", label: "What We Learned",         color: "purple" },
  { id: "worked",    emoji: "✅", label: "What Worked",             color: "emerald" },
  { id: "didnt",     emoji: "⚠️", label: "What Did Not Work",       color: "red" },
  { id: "improved",  emoji: "🔧", label: "What Could Be Improved",  color: "orange" },
  { id: "next",      emoji: "🚀", label: "Adapt, Scale, or Discontinue", color: "teal" },
] as const;

export type InnovationCategory = string;
export const INNOVATION_CATEGORIES: InnovationCategory[] = [
  "Artificial Intelligence",
  "Geospatial Technology",
  "Digital Health",
  "Climate Finance",
  "Digital Learning",
  "Data & Analytics",
];
