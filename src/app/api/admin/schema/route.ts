import { NextResponse } from "next/server";
import { frappeAdminRequest } from "@/lib/frappe/admin-session";
import { isAdminDoctype } from "@/lib/frappe/admin-doctypes";

export async function GET(request: Request) {
  const doctype = new URL(request.url).searchParams.get("doctype") || "";
  if (!isAdminDoctype(doctype)) return NextResponse.json({ error: "Unsupported DocType." }, { status: 400 });
  const response = await frappeAdminRequest(`/api/resource/DocType/${encodeURIComponent(doctype)}?fields=${encodeURIComponent(JSON.stringify(["name", "fields", "issingle"]))}`);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) return NextResponse.json({ error: payload.exception || payload._server_messages || "Unable to load DocType schema." }, { status: response.status });
  const meta = payload.data as { name: string; fields?: Array<Record<string, unknown>>; issingle?: number };
  return NextResponse.json({ name: meta.name, issingle: !!meta.issingle, fields: (meta.fields || []).filter((field) => field.fieldname && !field.hidden && !field.read_only && !["Section Break", "Column Break", "Tab Break", "HTML", "Button"].includes(String(field.fieldtype))) });
}
