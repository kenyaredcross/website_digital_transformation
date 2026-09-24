export interface DigitalStory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  authorRole: string;
  tag: string;
  coverImage?: string;
  challenge: string;
  people: string;
  solution: string;
  experience: string;
  learning: string;
  impact: string;
  safeguardingNote?: string;
}

export const digitalStories: DigitalStory[] = [
  {
    id: "story-001",
    slug: "mobile-data-collection-garissa",
    title: "From Paper to Palm: Mobile Data Collection in Garissa",
    subtitle: "How field volunteers in Garissa County replaced paper forms with smartphones — and transformed community health assessments overnight.",
    date: "2026-08-12",
    author: "Amina Hassan",
    authorRole: "Field Coordinator, Garissa County",
    tag: "Health & Community",
    challenge:
      "Field volunteers across Garissa County spent up to three days manually transcribing handwritten household assessment forms. Data errors were common, reports arrived late, and decision-makers had no real-time visibility into evolving health situations on the ground.",
    people:
      "Fourteen community health volunteers — many of whom had never used a smartphone before — worked alongside two data officers and a digital transformation lead. Their collective experience of the old process drove the design of the new one.",
    solution:
      "Using KoboToolbox integrated with the KRCS data platform, the team digitised the household assessment form into a mobile-friendly survey. Volunteers received two days of training on data entry, GPS tagging, and offline sync. The backend team built an automated validation pipeline that flagged anomalies before data reached the dashboard.",
    experience:
      "\"The first week was the hardest,\" recalls volunteer Fatuma Yussuf. \"But by week two, I was finishing assessments in half the time and my supervisor could see my work the same day. That felt powerful.\" Data officers noted a dramatic drop in back-and-forth correction cycles.",
    learning:
      "Device familiarity is the biggest barrier, not willingness. Short, hands-on training sessions work far better than manuals. Building an offline-first workflow was non-negotiable in low-connectivity areas.",
    impact:
      "Data collection time dropped by 62%. Errors in the dataset fell from 18% to under 3% within the first quarter. County health authorities now receive weekly automated summaries instead of monthly paper reports.",
    safeguardingNote:
      "All participant names used in this story are with explicit consent. Household-level data is anonymised before leaving the device.",
  },
  {
    id: "story-002",
    slug: "gis-flood-response-tana-river",
    title: "Mapping the Flood: GIS-Driven Response in Tana River",
    subtitle: "When floods struck Tana River County, a small GIS team turned satellite imagery and community data into life-saving evacuation maps in under 48 hours.",
    date: "2026-07-03",
    author: "Daniel Otieno",
    authorRole: "GIS Analyst, KRCS Digital Hub",
    tag: "Disaster Response",
    challenge:
      "The 2026 Tana River floods displaced over 12,000 people within 72 hours. Response teams had no up-to-date maps of affected areas, road accessibility, or population density at sub-location level. Decisions were being made on guesswork.",
    people:
      "A three-person GIS team, working with national disaster response coordinators and county government liaisons, mobilised rapidly. Community scouts provided real-time ground-truth data via WhatsApp, which was integrated into the mapping workflow.",
    solution:
      "The team used Sentinel-2 satellite imagery processed in Google Earth Engine to delineate flood extents. Community scout reports were geocoded and layered onto the map. The final product — a printable PDF atlas and a live web map — was shared with all response teams via a secure link.",
    experience:
      "\"We were updating the map every six hours,\" says GIS analyst Peter Mwangi. \"When coordinators told us they were routing trucks based on our road-accessibility layer, we knew this was working.\" The speed and accuracy surprised even veteran responders.",
    learning:
      "Pre-established community scout networks are as important as the technology. Satellite imagery without ground truth leads to errors. Keeping outputs simple — printable PDFs alongside live dashboards — ensures field teams with poor connectivity still benefit.",
    impact:
      "Evacuation routes were optimised for 23 villages, reducing average travel time by 40%. Aid pre-positioning was based on the population-density layer, ensuring equitable distribution. Post-response debrief confirmed zero duplicate distributions in mapped areas.",
  },
  {
    id: "story-003",
    slug: "digital-cash-transfer-kajiado",
    title: "Cash in a Click: Dignified Digital Transfers in Kajiado",
    subtitle: "Replacing manual cash distribution with mobile money in drought-affected Kajiado — and what it revealed about trust, dignity, and financial inclusion.",
    date: "2026-06-18",
    author: "Grace Wanjiru",
    authorRole: "Livelihoods Programme Officer",
    tag: "Financial Inclusion",
    challenge:
      "Beneficiaries in remote Kajiado sub-counties travelled up to 40 kilometres to collect cash assistance, often spending a significant portion of the transfer on transport. Manual distribution events also created safety concerns and required large logistics teams.",
    people:
      "Programme officers worked closely with 340 beneficiary households, many of them elderly women, and partnered with a local mobile money agent network. Digital literacy sessions were co-designed with community elders to ensure cultural appropriateness.",
    solution:
      "Beneficiaries were onboarded onto a mobile money platform using a simplified registration flow designed for low-literacy users. Transfers were disbursed directly to phones. A network of 12 local agents provided cash-out support within a 5km radius of each beneficiary.",
    experience:
      "\"I used to fear the distribution day,\" says beneficiary Nasieku Tipis. \"Now the money comes to me. I decide when I collect it, I don't have to rush.\" Programme officers noted a significant shift in dignity — beneficiaries felt in control for the first time.",
    learning:
      "Digital cash works only if the last-mile agent network is reliable. Building trust takes longer than building the system. Involving community elders early prevents adoption resistance. Mobile money literacy is a prerequisite, not an afterthought.",
    impact:
      "Transport costs for beneficiaries dropped by an average of KES 800 per distribution cycle. Distribution time per 100 beneficiaries fell from 6 hours to under 45 minutes. 94% of beneficiaries successfully cashed out within 24 hours of transfer.",
    safeguardingNote:
      "Beneficiary identities have been anonymised in published materials. Data is stored in compliance with KRCS data protection policy.",
  },
];
