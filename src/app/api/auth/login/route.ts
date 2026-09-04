import { NextResponse } from "next/server";
import { HARDCODED_USERS, encodeSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const foundRecord = HARDCODED_USERS[normalizedEmail];

    if (!foundRecord || foundRecord.passwordHash !== password) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const sessionToken = encodeSessionToken(foundRecord.user);

    const response = NextResponse.json({
      success: true,
      user: foundRecord.user,
    });

    response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
