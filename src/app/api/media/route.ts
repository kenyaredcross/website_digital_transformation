import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/frappe/admin-session";

const migrationNotice = "Use the Frappe Data & Inbox file uploader to store media in Frappe.";

export async function GET() {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ success: true, assets: [], message: migrationNotice });
}

export async function POST() {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ error: migrationNotice }, { status: 410 });
}

export async function PUT() {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ error: migrationNotice }, { status: 410 });
}

export async function DELETE() {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ error: migrationNotice }, { status: 410 });
}
