import "server-only";

import { cookies } from "next/headers";
import type { User } from "@/lib/auth";

const FRAPPE_URL = process.env.FRAPPE_URL || process.env.NEXT_PUBLIC_FRAPPE_API_URL || "http://redcross.local:8000";
export const FRAPPE_SID_COOKIE = "frappe_admin_sid";
export const FRAPPE_CSRF_COOKIE = "frappe_admin_csrf";

export function frappeUrl(path: string): string {
  return `${FRAPPE_URL.replace(/\/$/, "")}${path}`;
}

export function readSetCookie(headers: Headers, name: string): string | undefined {
  const setCookies = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : [headers.get("set-cookie") || ""];
  for (const cookie of setCookies) {
    const match = cookie.match(new RegExp(`(?:^|,\\s*)${name}=([^;]*)`));
    if (match) return match[1];
  }
  return undefined;
}

export async function frappeLogin(email: string, password: string): Promise<{ sid?: string; csrf?: string; user: User }> {
  const response = await fetch(frappeUrl("/api/method/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ usr: email, pwd: password }),
    cache: "no-store",
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.message !== "Logged In") {
    throw new Error(typeof payload.message === "string" ? payload.message : "Invalid Frappe credentials.");
  }

  const sid = readSetCookie(response.headers, "sid");
  const csrf = readSetCookie(response.headers, "csrf_token");
  const user = await getFrappeUser({ sid, csrf });
  if (!user) throw new Error("This Frappe account does not have System Manager access.");
  return { sid, csrf, user };
}

async function getFrappeUser(session?: { sid?: string; csrf?: string }): Promise<User | null> {
  const cookieStore = await cookies();
  const sid = session?.sid ?? cookieStore.get(FRAPPE_SID_COOKIE)?.value;
  const csrf = session?.csrf ?? cookieStore.get(FRAPPE_CSRF_COOKIE)?.value;
  if (!sid) return null;

  const response = await fetch(frappeUrl("/api/method/frappe.auth.get_logged_user"), {
    headers: { Cookie: `sid=${sid}${csrf ? `; csrf_token=${csrf}` : ""}`, Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) return null;
  const currentUser = (await response.json()).message as string;
  if (!currentUser || currentUser === "Guest") return null;

  const userResponse = await fetch(`${frappeUrl(`/api/resource/User/${encodeURIComponent(currentUser)}`)}?fields=${encodeURIComponent(JSON.stringify(["name", "full_name", "user_image", "roles"]))}`, {
    headers: { Cookie: `sid=${sid}${csrf ? `; csrf_token=${csrf}` : ""}`, Accept: "application/json" },
    cache: "no-store",
  });
  if (!userResponse.ok) return null;
  const record = (await userResponse.json()).data as { name: string; full_name?: string; user_image?: string; roles?: Array<{ role: string }> };
  if (!(record.roles || []).some((role) => role.role === "System Manager")) return null;
  return {
    id: record.name,
    email: record.name,
    name: record.full_name || record.name,
    role: "super_admin",
    avatar: record.user_image || undefined,
  };
}

export async function getAdminUser(): Promise<User | null> {
  return getFrappeUser();
}

export async function frappeAdminRequest(path: string, init: RequestInit = {}): Promise<Response> {
  const cookieStore = await cookies();
  const sid = cookieStore.get(FRAPPE_SID_COOKIE)?.value;
  const csrf = cookieStore.get(FRAPPE_CSRF_COOKIE)?.value;
  if (!sid || !(await getFrappeUser())) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  const headers = new Headers(init.headers);
  headers.set("Cookie", `sid=${sid}${csrf ? `; csrf_token=${csrf}` : ""}`);
  headers.set("Accept", "application/json");
  if (csrf) headers.set("X-Frappe-CSRF-Token", csrf);
  return fetch(frappeUrl(path), { ...init, headers, cache: "no-store" });
}

export async function hasAdminSession(): Promise<boolean> {
  return !!(await getAdminUser());
}
