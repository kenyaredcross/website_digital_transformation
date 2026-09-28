import { NextResponse } from "next/server";
import { FRAPPE_CSRF_COOKIE, FRAPPE_SID_COOKIE, frappeLogin } from "@/lib/frappe/admin-session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });

    const result = await frappeLogin(String(email).trim(), String(password));
    const response = NextResponse.json({ success: true, user: result.user });
    const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 12 };
    if (result.sid) response.cookies.set(FRAPPE_SID_COOKIE, result.sid, cookieOptions);
    if (result.csrf) response.cookies.set(FRAPPE_CSRF_COOKIE, result.csrf, cookieOptions);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Frappe login failed.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
