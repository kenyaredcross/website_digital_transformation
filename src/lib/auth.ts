export type UserRole = "super_admin" | "admin" | "blogger";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export const HARDCODED_USERS: Record<string, { user: User; passwordHash: string }> = {
  "superadmin@redcross.or.ke": {
    user: {
      id: "u_super_admin",
      email: "superadmin@redcross.or.ke",
      name: "Super Administrator",
      role: "super_admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    passwordHash: "superadmin123",
  },
  "admin@redcross.or.ke": {
    user: {
      id: "u_admin",
      email: "admin@redcross.or.ke",
      name: "Content Administrator",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    passwordHash: "admin123",
  },
  "blogger@redcross.or.ke": {
    user: {
      id: "u_blogger",
      email: "blogger@redcross.or.ke",
      name: "Blog Content Creator",
      role: "blogger",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    passwordHash: "blogger123",
  },
};

export const SESSION_COOKIE_NAME = "krcs_admin_session";

// Allowed entities per role
export const ROLE_PERMISSIONS: Record<UserRole, { entities: string[]; routes: string[] }> = {
  super_admin: {
    entities: ["blogs", "projects", "people", "partners", "testimonials", "countries", "thematicAreas", "site", "about", "media", "knowledge-resources", "digital-stories", "news-items"],
    routes: [
      "/admin",
      "/admin/blogs",
      "/admin/content",
      "/admin/projects",
      "/admin/people",
      "/admin/partners",
      "/admin/testimonials",
      "/admin/countries",
      "/admin/thematic-areas",
      "/admin/media",
      "/admin/settings",
    ],
  },
  admin: {
    entities: ["blogs", "projects", "people", "partners", "testimonials", "countries", "thematicAreas", "media", "knowledge-resources", "digital-stories", "news-items"],
    routes: [
      "/admin",
      "/admin/blogs",
      "/admin/content",
      "/admin/projects",
      "/admin/people",
      "/admin/partners",
      "/admin/testimonials",
      "/admin/countries",
      "/admin/thematic-areas",
      "/admin/media",
    ],
  },
  blogger: {
    entities: ["blogs", "knowledge-resources", "digital-stories", "news-items"],
    routes: ["/admin/blogs", "/admin/content"],
  },
};

export function canAccessEntity(role: UserRole, entity: string): boolean {
  return ROLE_PERMISSIONS[role]?.entities.includes(entity) ?? false;
}

export function canAccessRoute(role: UserRole, routePath: string): boolean {
  if (role === "blogger") {
    return ["/admin/blogs", "/admin/content"].some((route) => routePath === route || routePath.startsWith(`${route}/`));
  }
  const allowed = ROLE_PERMISSIONS[role]?.routes ?? [];
  return allowed.some((allowedRoute) => routePath === allowedRoute || routePath.startsWith(`${allowedRoute}/`));
}

export function encodeSessionToken(user: User): string {
  return Buffer.from(JSON.stringify(user)).toString("base64");
}

export function decodeSessionToken(token: string): User | null {
  try {
    const jsonStr = Buffer.from(token, "base64").toString("utf-8");
    return JSON.parse(jsonStr) as User;
  } catch {
    return null;
  }
}
