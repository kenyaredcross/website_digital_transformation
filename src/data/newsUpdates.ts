export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  department: string;
  category: "Digital Projects" | "Innovation" | "Partnerships" | "Events" | "Policy";
  summary: string;
  content: string;
  resources?: { label: string; url: string }[];
  imageAlt?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "news-001",
    slug: "erm-system-launch-2026",
    title: "KRCS Launches Integrated Emergency Response Management System",
    date: "2026-09-10",
    author: "Digital Transformation Unit",
    department: "ICT & Digital Transformation",
    category: "Digital Projects",
    summary:
      "Kenya Red Cross Society officially launched its Integrated Emergency Response Management (IERM) system, consolidating incident reporting, resource tracking, and volunteer dispatch into a single platform for the first time.",
    content: `After 18 months of development and piloting across five counties, the KRCS Integrated Emergency Response Management (IERM) system went live on 1 September 2026. The platform replaces a fragmented collection of spreadsheets, phone calls, and paper logs with a real-time dashboard accessible to response coordinators at national and county levels.

The IERM system integrates with the existing volunteer management database, allowing dispatchers to identify and mobilise nearby volunteers within minutes of an incident report. Resource inventories — vehicles, medical supplies, tents — are updated automatically as items are checked out.

"This is the infrastructure we have needed for a decade," said the Head of Emergency Response. "Now when we receive an alert, the system helps us ask the right questions: Who is closest? What do they need? Where are the gaps?"

The system was developed in partnership with the KRCS Digital Hub team and an open-source humanitarian technology consortium. All code will be contributed back to the humanitarian commons under a CC BY 4.0 licence.`,
    resources: [
      { label: "IERM System Overview (PDF)", url: "#" },
      { label: "User Guide for County Coordinators", url: "#" },
    ],
  },
  {
    id: "news-002",
    slug: "ai-health-surveillance-partnership",
    title: "KRCS and University of Nairobi Partner on AI-Powered Disease Surveillance",
    date: "2026-08-28",
    author: "Programmes & Partnerships",
    department: "Health Programmes",
    category: "Partnerships",
    summary:
      "A new partnership between KRCS and the University of Nairobi's School of Computing will develop machine-learning models to detect early signals of disease outbreaks from community health worker reports.",
    content: `Kenya Red Cross Society and the University of Nairobi (UoN) School of Computing have signed a two-year Memorandum of Understanding to co-develop an AI-assisted disease surveillance tool for community-level health data.

The project — funded through a grant from a global health innovation fund — will train natural language processing (NLP) models on anonymised KRCS community health worker (CHW) report data. The models are designed to detect statistical anomalies that might indicate early-stage disease clustering, triggering alerts before a formal outbreak declaration.

"Community health workers are often the first to see something unusual," noted the Principal Investigator from UoN. "This tool gives them a way to surface that observation automatically, at scale."

The first phase will focus on respiratory and diarrhoeal disease signals in five high-density counties. A privacy-by-design framework — including differential privacy techniques — will govern all model training.

An open beta for county health officers is planned for Q1 2027.`,
    resources: [
      { label: "MoU Summary Document", url: "#" },
      { label: "Privacy Framework Overview", url: "#" },
    ],
  },
  {
    id: "news-003",
    slug: "digital-transformation-conference-2026",
    title: "KRCS to Host East Africa Humanitarian Technology Conference in Nairobi",
    date: "2026-08-05",
    author: "Communications & Events",
    department: "External Relations",
    category: "Events",
    summary:
      "Kenya Red Cross Society will host the 3rd East Africa Humanitarian Technology Conference on 14–15 November 2026, bringing together NGOs, government agencies, and tech companies to share innovations in humanitarian response.",
    content: `Kenya Red Cross Society is proud to announce it will host the 3rd East Africa Humanitarian Technology Conference (EAHTC 2026) at the Kenyatta International Convention Centre, Nairobi, on 14–15 November 2026.

The conference theme — **"From Pilot to Scale: Sustaining Digital Transformation in Humanitarian Work"** — reflects the sector's growing need to move beyond proof-of-concept projects and embed technology into durable, funded operational systems.

Expected participants include delegates from 14 countries, representatives from UNHCR, WFP, OCHA, and the ICRC, as well as innovators from Kenya's technology ecosystem.

**Key sessions will include:**
- Responsible AI in field operations
- Community-led data governance
- Financing digital transformation at National Society level
- Open-source tools for humanitarian logistics

Speakers and the full programme will be announced in October. Early registration is open for National Society staff at a subsidised rate.

All sessions will be livestreamed and recordings made publicly available.`,
    resources: [
      { label: "Conference Website", url: "#" },
      { label: "Call for Abstracts", url: "#" },
      { label: "Subsidised Registration Form", url: "#" },
    ],
  },
];
