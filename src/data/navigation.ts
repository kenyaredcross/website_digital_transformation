export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    title: "About",
    href: "/about",
    description: "Our mission, vision, values and digital transformation approach.",
  },
  {
    title: "What We Do",
    href: "/what-we-do",
    description: "Explore our seven core thematic areas driving humanitarian technology.",
    children: [
      {
        title: "Knowledge Hub",
        href: "/knowledge-hub",
        description: "Resources, case studies and lessons learned from digital transformation.",
      },
      {
        title: "Innovation & Research",
        href: "/innovation-research",
        description: "Exploring new possibilities through structured experimentation and documentation.",
      },
    ],
  },
  {
    title: "Where We Work",
    href: "/where-we-work",
    description: "Our geographic reach across 47 Kenyan counties and regional operations.",
  },
  {
    title: "Portfolio",
    href: "/portfolio",
    description: "Digital products, data services, and platforms built for field impact.",
  },
  {
    title: "People",
    href: "/people",
    description: "Meet the engineers, data scientists, GIS experts, and field innovators.",
  },
  {
    title: "Partners",
    href: "/partners",
    description: "Collaborations with global tech firms, UN agencies, and research bodies.",
  },
  {
    title: "Stories",
    href: "/blog",
    description: "Field stories, blog posts, and news from KRCS digital programmes.",
    children: [
      {
        title: "Digital Stories",
        href: "/stories/digital-stories",
        description: "People behind the transformation — staff, volunteer, and community case studies.",
      },
      {
        title: "Blogs",
        href: "/blog",
        description: "Insights, field case studies, tech deployments, and post-mortems.",
      },
      {
        title: "News & Updates",
        href: "/stories/news-updates",
        description: "Announcements, milestones, partnerships, and events from the digital unit.",
      },
    ],
  },
];
