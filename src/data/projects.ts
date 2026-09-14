import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "vmms",
    slug: "vmms",
    title: "Volunteer and Membership Management System (VMMS)",
    category: "Platforms",
    year: 2024,
    description:
      "The Volunteer Management and Membership System (VMMS) is a digital platform used by the Kenya Red Cross Society to manage the end-to-end volunteer and membership lifecycle. It brings together volunteer registration, membership, opportunities, deployments, learning, reporting and coordination in one platform.",
    shortDescription:
      "Centralized digital platform managing the end-to-end volunteer and membership lifecycle for Kenya Red Cross Society.",
    challenge:
      "Before VMMS, volunteer and membership information was managed across different processes and systems, making it difficult to maintain accurate records, coordinate volunteers, track participation and quickly identify suitable volunteers for opportunities and deployments.",
    solution:
      "VMMS introduced a centralised digital platform for managing the volunteer and membership lifecycle—from registration and approval to opportunities, training, deployment, reporting and recognition.",
    impact:
      "The platform has improved visibility and coordination of volunteers in the field, making it easier for branches and coordinators to identify, communicate with and deploy volunteers, while giving volunteers better access to opportunities and a more streamlined experience.",
    impactMetrics: [
      { label: "Lifecycle Support", value: "End-to-End" },
      { label: "Coordination", value: "Branch & Field" },
      { label: "Deployment Access", value: "Streamlined" },
    ],
    technologies: ["React", "Vue.js", "Python", "REST APIs", "PostgreSQL"],
    thematicAreaSlug: "digital-products",
    countries: ["TZ", "GM"],
    teamIds: ["p1", "p2", "p3", "p5"],
    partnerIds: ["ifrc", "safaricom-foundation"],
    featured: true,
    image: "/assets/images/dt_updates/learning.jpg",
    gallery: [
      "/assets/images/dt_updates/learning.jpg",
      "/assets/images/dt_updates/app.jpg",
    ],
    demoUrl: "https://onerc.redcross.or.ke/",
  },
  {
    id: "donations-platform",
    slug: "donations-platform",
    title: "The Donations Platform",
    category: "Digital Products",
    year: 2024,
    description:
      "The Donations Platform is a digital fundraising and donation management platform designed to make it easier for the Kenya Red Cross Society to create and manage fundraising campaigns, receive donations, and track contributions. It provides a centralised experience for both donors and internal teams, with support for digital payment options and donation-related information.",
    shortDescription:
      "Centralized digital fundraising and donation management platform for Kenya Red Cross Society.",
    challenge:
      "Before the platform, donation processes were less centralised and more dependent on manual coordination, making it difficult to provide a consistent donation experience and maintain clear visibility of contributions across different fundraising activities. Campaign information, payment processes and donation records could also require additional manual follow-up and reconciliation.",
    solution:
      "The Donations Platform provides a centralised digital channel for fundraising and donations. Teams can create campaigns, provide campaign information, configure donation options and receive contributions through supported digital payment methods. It also creates a more structured way to manage and monitor donation activities.",
    impact:
      "The platform has made fundraising more accessible and convenient for donors, allowing them to support campaigns through a digital channel. For Kenya Red Cross teams, it improves visibility, organisation and management of fundraising activities, while reducing reliance on fragmented or manual processes and creating a better foundation for tracking and reporting donations.",
    impactMetrics: [
      { label: "Fundraising Channel", value: "Centralized Digital" },
      { label: "Payment Integration", value: "Multi-Option Digital" },
      { label: "Reconciliation", value: "Automated Tracking" },
    ],
    technologies: ["Vue.js", "Python", "M-PESA API", "PostgreSQL", "Tailwind CSS"],
    thematicAreaSlug: "digital-products",
    countries: ["KE"],
    teamIds: ["p3", "p4", "p6", "p7"],
    partnerIds: ["safaricom-foundation", "ifrc"],
    featured: true,
    image: "/assets/images/dt_updates/app.jpg",
    gallery: [
      "/assets/images/dt_updates/app.jpg",
      "/assets/images/dt_updates/app_phone.jpg",
    ],
    demoUrl: "https://donations.redcross.or.ke/",
  },
  {
    id: "cbs",
    slug: "cbs",
    title: "Community-Based Surveillance (CBS)",
    category: "Data Services",
    year: 2024,
    description:
      "The Community-Based Surveillance (CBS) platform supports the collection, management and monitoring of health-related information reported by communities and frontline volunteers. It helps connect information from the community level with response teams, enabling potential health risks and events to be identified and followed up more efficiently.",
    shortDescription:
      "Digital health surveillance platform connecting frontline community alerts with rapid response teams.",
    challenge:
      "Before the digital CBS platform, community-level information was often collected through manual and fragmented reporting processes. This could make it difficult to submit information quickly, consolidate reports, monitor emerging health events and ensure that the right teams received information for follow-up.",
    solution:
      "The CBS platform provides a centralised digital system for community-based reporting and surveillance. Volunteers and community responders can submit alerts and relevant information, while designated teams can review, manage and follow up on reports through a structured workflow.",
    impact:
      "The platform has strengthened community-level disease and event reporting, giving response teams better visibility of information coming from the field. It supports faster reporting, improved coordination and more timely follow-up, helping teams identify and respond to potential health risks earlier.",
    impactMetrics: [
      { label: "Reporting Speed", value: "Real-time Field Alerts" },
      { label: "Community Coverage", value: "Frontline Volunteers" },
      { label: "Health Risk Action", value: "Early Detection" },
    ],
    technologies: ["React", "Node.js", "REST APIs", "Mapbox GL", "PostgreSQL"],
    thematicAreaSlug: "data-services",
    countries: ["KE"],
    teamIds: ["p1", "p4", "p5", "p8"],
    partnerIds: ["un-ocha", "icrc", "google-org"],
    featured: true,
    image: "/assets/images/dt_updates/person_standingl.jpg",
    gallery: [
      "/assets/images/dt_updates/person_standingl.jpg",
    ],
    demoUrl: "https://cbs.redcross.or.ke/",
  },
  {
    id: "africa-localization-hub",
    slug: "africa-localization-hub",
    title: "Africa Localisation Hub",
    category: "Platforms",
    year: 2024,
    description:
      "The Localisation Hub is a digital platform designed to centralise and showcase information, resources and initiatives related to localisation within the National Society. It provides a common space for teams and partners to access relevant content, share knowledge and improve visibility of localisation efforts.",
    shortDescription:
      "Centralized knowledge hub showcasing localisation initiatives, resources, and impact across Africa.",
    challenge:
      "Before the Localisation Hub, localisation-related information and resources were spread across different documents, platforms and teams, making it difficult to find information, share knowledge and maintain a consistent view of ongoing initiatives and progress.",
    solution:
      "The Localisation Hub provides a centralised digital space for organising, managing and sharing localisation content. It brings relevant resources and information together in one place, with structured content workflows to support review, approval and publication.",
    impact:
      "The platform has improved access to localisation information and knowledge, making it easier for teams and partners to find relevant resources and understand ongoing initiatives. It also provides greater visibility of Kenya Red Cross Society's localisation work and impact.",
    impactMetrics: [
      { label: "Knowledge Access", value: "Centralized Repository" },
      { label: "Partner Reach", value: "Pan-African Consortium" },
      { label: "Content Workflow", value: "Structured Publishing" },
    ],
    technologies: ["React", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    thematicAreaSlug: "digital-products",
    countries: ["KE", "ZA"],
    teamIds: ["p2", "p3", "p7", "p8"],
    partnerIds: ["ifrc", "google-org", "world-bank"],
    featured: true,
    image: "/assets/images/dt_updates/reliefs.jpg",
    gallery: [
      "/assets/images/dt_updates/reliefs.jpg",
    ],
    demoUrl: "https://africalocalizationhub.org/ans-hub",
  },
];
