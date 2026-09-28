import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/frappe/admin-session";

export async function GET() {
  const user = await getAdminUser();
  return NextResponse.json({ authenticated: !!user, user });
}
