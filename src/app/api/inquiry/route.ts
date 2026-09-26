import { NextResponse } from "next/server";

const FRAPPE_API_URL = process.env.NEXT_PUBLIC_FRAPPE_API_URL || "http://redcross.local:8000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(`${FRAPPE_API_URL}/api/method/redcross_digital.api.submit_inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result._server_messages || result.exception || "Failed to submit inquiry to Frappe.");
    }
    return NextResponse.json({ success: true, frappeSynced: true, name: result.message?.name, message: "Inquiry saved to Frappe." }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error processing inquiry.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
