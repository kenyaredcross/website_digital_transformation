import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { FRAPPE_CSRF_COOKIE, FRAPPE_SID_COOKIE, frappeUrl } from "@/lib/frappe/admin-session";

export async function POST() {
  const cookieStore = await cookies();
  const sid = cookieStore.get(FRAPPE_SID_COOKIE)?.value;
  const csrf = cookieStore.get(FRAPPE_CSRF_COOKIE)?.value;
  if (sid) {
    await fetch(frappeUrl("/api/method/logout"), {
      method: "POST",
      headers: { Cookie: `sid=${sid}${csrf ? `; csrf_token=${csrf}` : ""}`, ...(csrf ? { "X-Frappe-CSRF-Token": csrf } : {}) },
      cache: "no-store",
    }).catch(() => undefined);
  }
  const response = NextResponse.json({ success: true });
  for (const name of [FRAPPE_SID_COOKIE, FRAPPE_CSRF_COOKIE]) response.cookies.set(name, "", { httpOnly: true, expires: new Date(0), path: "/" });
  return response;
}
