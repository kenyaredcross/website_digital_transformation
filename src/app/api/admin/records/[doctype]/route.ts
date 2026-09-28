import { NextResponse } from "next/server";
import { frappeAdminRequest } from "@/lib/frappe/admin-session";
import { isAdminDoctype, isSubmissionDoctype } from "@/lib/frappe/admin-doctypes";

type Context = { params: Promise<{ doctype: string }> };

async function target(context: Context) {
  const { doctype: encoded } = await context.params;
  const doctype = decodeURIComponent(encoded);
  if (!isAdminDoctype(doctype) && !isSubmissionDoctype(doctype)) return null;
  return { doctype, url: `/api/resource/${encodeURIComponent(doctype)}` };
}

function errorMessage(payload: Record<string, unknown>, fallback: string): string {
  const raw = payload.exception || payload._server_messages || payload.message;
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw)) return raw.join("; ");
  return fallback;
}

export async function GET(request: Request, context: Context) {
  const resource = await target(context);
  if (!resource) return NextResponse.json({ error: "Unsupported DocType." }, { status: 400 });
  const search = new URL(request.url).searchParams;
  const requestedLimit = Math.max(1, Math.min(Number(search.get("limit") || 100), 500));
  const start = Math.max(0, Number(search.get("start") || 0));
  const params = new URLSearchParams({ fields: JSON.stringify(["*"]), limit_page_length: String(requestedLimit), limit_start: String(start), order_by: "modified desc" });
  if (search.has("filters")) params.set("filters", search.get("filters")!);
  if (search.has("name")) {
    const response = await frappeAdminRequest(`${resource.url}/${encodeURIComponent(search.get("name")!)}?fields=${encodeURIComponent(JSON.stringify(["*"]))}`);
    const payload = await response.json().catch(() => ({}));
    return response.ok ? NextResponse.json(payload.data) : NextResponse.json({ error: errorMessage(payload, "Record not found.") }, { status: response.status });
  }
  const response = await frappeAdminRequest(`${resource.url}?${params.toString()}`);
  const payload = await response.json().catch(() => ({}));
  return response.ok ? NextResponse.json(payload.data || []) : NextResponse.json({ error: errorMessage(payload, "Unable to load records.") }, { status: response.status });
}

export async function POST(request: Request, context: Context) {
  const resource = await target(context);
  if (!resource || !isAdminDoctype(resource.doctype)) return NextResponse.json({ error: "Unsupported or read-only DocType." }, { status: 400 });
  const response = await frappeAdminRequest(resource.url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(await request.json()) });
  const payload = await response.json().catch(() => ({}));
  return response.ok ? NextResponse.json(payload.data, { status: 201 }) : NextResponse.json({ error: errorMessage(payload, "Unable to create record.") }, { status: response.status });
}

export async function PUT(request: Request, context: Context) {
  const resource = await target(context);
  if (!resource || !isAdminDoctype(resource.doctype)) return NextResponse.json({ error: "Unsupported or read-only DocType." }, { status: 400 });
  const body = await request.json() as Record<string, unknown>;
  const name = String(body.name || "");
  if (!name) return NextResponse.json({ error: "Record name is required." }, { status: 400 });
  const response = await frappeAdminRequest(`${resource.url}/${encodeURIComponent(name)}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const payload = await response.json().catch(() => ({}));
  return response.ok ? NextResponse.json(payload.data) : NextResponse.json({ error: errorMessage(payload, "Unable to update record.") }, { status: response.status });
}

export async function DELETE(request: Request, context: Context) {
  const resource = await target(context);
  if (!resource || !isAdminDoctype(resource.doctype)) return NextResponse.json({ error: "Unsupported or read-only DocType." }, { status: 400 });
  const name = new URL(request.url).searchParams.get("name");
  if (!name) return NextResponse.json({ error: "Record name is required." }, { status: 400 });
  const response = await frappeAdminRequest(`${resource.url}/${encodeURIComponent(name)}`, { method: "DELETE" });
  const payload = await response.json().catch(() => ({}));
  return response.ok ? NextResponse.json({ success: true, name }) : NextResponse.json({ error: errorMessage(payload, "Unable to delete record.") }, { status: response.status });
}
