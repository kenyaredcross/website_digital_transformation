export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "Digital Products" | "Data Services" | "Platforms" | "Mobile" | "GIS" | "AI";
  year: number;
  description: string;
  shortDescription: string;
  challenge: string;
  solution: string;
  impact: string;
  impactMetrics?: { label: string; value: string }[];
  technologies: string[];
  thematicAreaSlug: string;
  countries: string[];
  teamIds: string[];
  partnerIds?: string[];
  featured?: boolean;
  image: string;
  gallery?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface Person {
  id: string;
  slug: string;
  name: string;
  role: string;
  department: "Leadership" | "Technology" | "Data" | "GIS" | "Product" | "Operations" | "Contributors";
  bio: string;
  shortBio: string;
  avatar: string;
  expertise: string[];
  email?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  featured?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  category: "Strategic" | "Technology" | "Implementation" | "Funding";
  logo: string;
  description: string;
  website: string;
  collaborationFocus: string;
  featured?: boolean;
}

export interface Country {
  id: string;
  code: string; // ISO 2 letter code e.g. KE, UG, TZ
  name: string;
  region: string;
  isActive: boolean;
  shortDescription: string;
  activeInitiativesCount: number;
  digitalProductsCount: number;
  dataServicesCount: number;
  keyInitiatives: string[];
  coordinates: { lat: number; lng: number };
}

export interface ThematicArea {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  capabilities: { title: string; description: string }[];
  impactMetrics: { label: string; value: string }[];
  iconName: string;
  featuredImageUrl: string;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: string;
  numberValue: number;
  suffix: string;
  description: string;
  placeholder?: boolean;
}

export interface Technology {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Data & AI" | "GIS & Cloud" | "Mobile & IoT";
  iconName: string;
}

export interface ValueItem {
  number: string;
  title: string;
  description: string;
}

export interface ApproachStep {
  step: number;
  title: string;
  description: string;
  iconName: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface AboutData {
  heroHeading: string;
  heroSubheading: string;
  whoWeAreTitle: string;
  whoWeAreParagraphs: string[];
  mission: string;
  vision: string;
  values: ValueItem[];
  approach: ApproachStep[];
  milestones: Milestone[];
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  officialRedCrossUrl: string;
  contact: {
    email: string;
    phone: string;
    emergencyLine: string;
    location: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    workingHours: string;
  };
  social: {
    twitter: string;
    facebook: string;
    linkedin: string;
    github: string;
    youtube: string;
  };
}
