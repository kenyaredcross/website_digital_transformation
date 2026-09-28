export type UserRole = "super_admin" | "admin" | "blogger";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export function canAccessEntity(role: UserRole, entity: string): boolean {
  return role === "super_admin" && entity.length > 0;
}

export function canAccessRoute(role: UserRole, routePath: string): boolean {
  if (role === "super_admin") return routePath.startsWith("/admin");
  if (role === "blogger") return ["/admin/blogs", "/admin/content"].some((route) => routePath === route || routePath.startsWith(`${route}/`));
  return ["/admin", "/admin/blogs", "/admin/content", "/admin/projects", "/admin/people", "/admin/partners", "/admin/testimonials", "/admin/countries", "/admin/thematic-areas", "/admin/media"].some((route) => routePath === route || routePath.startsWith(`${route}/`));
}
