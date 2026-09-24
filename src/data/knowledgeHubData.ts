// ── Image Assets ──────────────────────────────────────────────────────────────
export const DT_UPDATES_IMAGES = [
  "/assets/images/dt_updates/app.jpg",
  "/assets/images/dt_updates/app_phone.jpg",
  "/assets/images/dt_updates/hunger.jpg",
  "/assets/images/dt_updates/hunger_s.jpg",
  "/assets/images/dt_updates/learning.jpg",
  "/assets/images/dt_updates/meeting.jpg",
  "/assets/images/dt_updates/person_standing.jpg",
  "/assets/images/dt_updates/person_standingl.jpg",
  "/assets/images/dt_updates/person_standings.jpg",
  "/assets/images/dt_updates/relief.jpg",
  "/assets/images/dt_updates/reliefs.jpg",
  "/assets/images/dt_updates/teaching.jpg",
  "/assets/images/dt_updates/whites.jpg",
] as const;

export type DtUpdateImage = (typeof DT_UPDATES_IMAGES)[number];

// ── Types ─────────────────────────────────────────────────────────────────────

export type ResourceType =
  | "Project Report"
  | "Case Study"
  | "Research"
  | "Digital Guide"
  | "Training Material"
  | "Data & Digital Standard"
  | "Lessons Learned"
  | "Innovation Documentation"
  | "Publication"
  | "Presentation"
  | "Webinar";

export type AudienceType =
  | "All Staff"
  | "Technical Teams"
  | "Field Staff"
  | "Leadership"
  | "Partners"
  | "Public";

export interface KnowledgeResource {
  id: string;
  title: string;
  type: ResourceType;
  date: string; // ISO date string
  department: string;
  owner: string;
  version: string;
  audience: AudienceType[];
  description: string;
  tags: string[];
}

export interface InnovationStep {
  id: string;
  label: string;
  question: string;
  description: string;
  icon: string; // emoji or short text icon identifier
  color: string; // tailwind color class fragment e.g. "red" | "amber" | "emerald"
}

// ── Innovation & Research Framework Steps ─────────────────────────────────────

export const INNOVATION_STEPS: InnovationStep[] = [
  {
    id: "what-tested",
    label: "What We Tested",
    question: "What did we test?",
    description:
      "A clear description of the initiative, technology, process, or approach that was trialled during the innovation cycle.",
    icon: "🔬",
    color: "blue",
  },
  {
    id: "why-tested",
    label: "Why We Tested It",
    question: "Why did we test it?",
    description:
      "The humanitarian need, operational gap, or opportunity that motivated the experiment and justified the investment of resources.",
    icon: "💡",
    color: "amber",
  },
  {
    id: "what-learned",
    label: "What We Learned",
    question: "What did we learn?",
    description:
      "Key insights, data findings, user feedback, and unexpected outcomes gathered throughout the testing and experimentation phase.",
    icon: "📚",
    color: "purple",
  },
  {
    id: "what-worked",
    label: "What Worked",
    question: "What worked well?",
    description:
      "Specific elements, approaches, or components that delivered positive results and contributed to the success of the initiative.",
    icon: "✅",
    color: "emerald",
  },
  {
    id: "what-didnt-work",
    label: "What Did Not Work",
    question: "What did not work?",
    description:
      "Honest documentation of failures, limitations, barriers, and areas where the approach fell short of expectations or design intentions.",
    icon: "⚠️",
    color: "red",
  },
  {
    id: "what-improved",
    label: "What Could Be Improved",
    question: "What could be improved?",
    description:
      "Actionable recommendations for refinement — covering design, technology, implementation processes, team capacity, and stakeholder engagement.",
    icon: "🔧",
    color: "orange",
  },
  {
    id: "next-steps",
    label: "Adapt, Scale, or Discontinue",
    question: "Should we adapt, scale, or discontinue?",
    description:
      "A considered recommendation on whether the approach should be refined and retested, scaled to wider deployment, or formally discontinued based on evidence.",
    icon: "🚀",
    color: "teal",
  },
];

// ── Knowledge Resources ───────────────────────────────────────────────────────

export const KNOWLEDGE_RESOURCES: KnowledgeResource[] = [
  {
    id: "kr-001",
    title: "Digital Cash Transfer Platform: End-to-Year Evaluation Report",
    type: "Project Report",
    date: "2024-11-15",
    department: "Digital Transformation",
    owner: "Cash & Markets Unit",
    version: "v2.1",
    audience: ["Leadership", "Partners", "Technical Teams"],
    description:
      "Comprehensive evaluation of the mobile-based cash transfer platform deployed across Turkana, Marsabit and Garissa counties — covering beneficiary reach, transfer success rates, system uptime, and cost-efficiency metrics.",
    tags: ["cash transfer", "mobile money", "evaluation", "financial inclusion"],
  },
  {
    id: "kr-002",
    title: "Early Warning System — Anticipatory Action Framework",
    type: "Case Study",
    date: "2024-09-20",
    department: "GIS & Spatial Intelligence",
    owner: "Early Warning Team",
    version: "v1.0",
    audience: ["All Staff", "Partners"],
    description:
      "A detailed case study examining how real-time satellite rainfall data, river gauge telemetry and community-level SMS alerts were integrated to trigger pre-positioned relief operations in the Tana River basin before peak flooding.",
    tags: ["early warning", "anticipatory action", "flooding", "GIS"],
  },
  {
    id: "kr-003",
    title: "Community Health Information System — Technical Architecture Guide",
    type: "Digital Guide",
    date: "2024-08-05",
    department: "Digital Products",
    owner: "Health Informatics Team",
    version: "v3.0",
    audience: ["Technical Teams"],
    description:
      "Step-by-step technical documentation for deploying, configuring, and maintaining the Community Health Information System (CHIS) used by community health volunteers across KRCS operational counties.",
    tags: ["health", "CHIS", "technical guide", "community health"],
  },
  {
    id: "kr-004",
    title: "GIS Data Standards for Humanitarian Operations",
    type: "Data & Digital Standard",
    date: "2024-07-12",
    department: "GIS & Spatial Intelligence",
    owner: "Data Governance Office",
    version: "v1.2",
    audience: ["Technical Teams", "Field Staff", "Partners"],
    description:
      "Official Kenya Red Cross standards for spatial data collection, coordinate reference systems, data quality assurance, and interoperability with IFRC and UN OCHA data platforms.",
    tags: ["GIS", "standards", "data quality", "spatial data"],
  },
  {
    id: "kr-005",
    title: "Digital Literacy for Field Staff — Training Programme",
    type: "Training Material",
    date: "2024-06-30",
    department: "Capacity Building",
    owner: "Learning & Development Unit",
    version: "v2.3",
    audience: ["Field Staff", "All Staff"],
    description:
      "Structured 5-day training curriculum covering smartphone data collection with KoBoToolbox, offline mapping with ODK, and secure data handling for frontline KRCS volunteers and county coordinators.",
    tags: ["training", "digital literacy", "KoBoToolbox", "field staff"],
  },
  {
    id: "kr-006",
    title: "AI-Assisted Needs Assessment: Pilot Lessons Learned",
    type: "Lessons Learned",
    date: "2024-05-18",
    department: "Innovation Lab",
    owner: "AI & Data Science Team",
    version: "v1.0",
    audience: ["Leadership", "Technical Teams", "Partners"],
    description:
      "An honest post-mortem of the six-month pilot using machine learning models to predict household vulnerability scores in drought-affected areas — documenting what worked, what failed, and what the team would do differently.",
    tags: ["AI", "machine learning", "needs assessment", "lessons learned"],
  },
  {
    id: "kr-007",
    title: "Drone Mapping for Flood Damage Assessment — Innovation Documentation",
    type: "Innovation Documentation",
    date: "2024-04-22",
    department: "Innovation Lab",
    owner: "Geospatial Innovations Team",
    version: "v1.1",
    audience: ["Technical Teams", "Leadership"],
    description:
      "Full documentation of the drone-based rapid damage assessment pilot in West Pokot, including regulatory compliance, flight planning, orthomosaic processing, and integration of outputs into KRCS response plans.",
    tags: ["drones", "damage assessment", "flood response", "innovation"],
  },
  {
    id: "kr-008",
    title: "Data for Humanity: KRCS Annual Digital Transformation Report 2023",
    type: "Publication",
    date: "2024-03-01",
    department: "Digital Transformation",
    owner: "DT Department",
    version: "v1.0",
    audience: ["Public", "Partners", "Leadership"],
    description:
      "Annual flagship publication showcasing the full scope of digital transformation work at Kenya Red Cross — including programme highlights, system deployments, partnership outcomes, and forward-looking strategy for 2024–2026.",
    tags: ["annual report", "digital transformation", "strategy", "publication"],
  },
];

// ── Resource Type Filter Options ──────────────────────────────────────────────

export const RESOURCE_TYPES: ResourceType[] = [
  "Project Report",
  "Case Study",
  "Research",
  "Digital Guide",
  "Training Material",
  "Data & Digital Standard",
  "Lessons Learned",
  "Innovation Documentation",
  "Publication",
  "Presentation",
  "Webinar",
];

export const AUDIENCE_TYPES: AudienceType[] = [
  "All Staff",
  "Technical Teams",
  "Field Staff",
  "Leadership",
  "Partners",
  "Public",
];

// ── Type colour map ───────────────────────────────────────────────────────────

export const RESOURCE_TYPE_COLORS: Record<ResourceType, string> = {
  "Project Report": "blue",
  "Case Study": "violet",
  "Research": "purple",
  "Digital Guide": "cyan",
  "Training Material": "green",
  "Data & Digital Standard": "slate",
  "Lessons Learned": "amber",
  "Innovation Documentation": "orange",
  "Publication": "red",
  "Presentation": "pink",
  "Webinar": "teal",
};
