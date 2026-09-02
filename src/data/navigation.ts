export interface NavItem {
  title: string;
  href: string;
  description?: string;
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
    description: "Explore our four core thematic areas driving humanitarian technology.",
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
];
