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
  department: "Leadership" | "Technology" | "Data" | "GIS" | "Product" | "Operations" | "Contributors" | "Volunteers";
  isVolunteer?: boolean;
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
  code: string;
  name: string;
  region: string;
  isActive: boolean;
  shortDescription: string;
  activeInitiativesCount: number;
  digitalProductsCount: number;
  dataServicesCount: number;
  keyInitiatives: string[];
  coordinates: { lat: number; lng: number };
  partner: string;
  since: number;
  image: string;
  imageAlt: string;
  fieldNote: string;
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
  projectSlug?: string | null;
  image?: string;
  imageCaption?: string;
  imageTag?: string;
}


export interface AboutData {
  heroHeading: string;
  heroSubheading: string;
  whoWeAreTitle: string;
  whoWeAreParagraphs: string[];
  mission: string;
  vision: string;
  visionSubtitle?: string;
  visionParagraphs?: string[];
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

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: "Early Warning" | "Cash Aid" | "GIS & Mapping" | "AI & Innovation" | "Field Operations" | "Data Ethics";
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string; 
  flickrAlbumUrl?: string;
  galleryImages?: string[]; 
  videoEmbedUrl?: string; 
  tags: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  organization: string;
  location: string;
  avatar: string;
  category:
    | "Field Volunteer"
    | "County Leadership"
    | "Community Beneficiary"
    | "International Partner"
    | "Field Operations"
    | "Procurement & Logistics"
    | "Regional Partner"
    | "Volunteer Management"
    | "Health & Surveillance"
    | "Strategic Partnerships";
  featured?: boolean;
}
