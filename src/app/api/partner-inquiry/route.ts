import { NextResponse } from "next/server";

const FRAPPE_API_URL = process.env.NEXT_PUBLIC_FRAPPE_API_URL || "http://redcross.local:8000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, organization, phone, collaborationArea, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Full name, work email, and message proposal are required." },
        { status: 400 }
      );
    }

    const docPayload = {
      organization: organization || "Not specified",
      contact_person: name,
      email: email,
      phone: phone || "",
      collaboration_area: collaborationArea || "General Partnering",
      proposal_title: subject || "Partnership proposal",
      proposal_summary: message,
    };
    const response = await fetch(`${FRAPPE_API_URL}/api/method/redcross_digital.api.submit_partnership_proposal`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(docPayload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result._server_messages || result.exception || "Failed to submit partnership proposal to Frappe.");
    return NextResponse.json({ success: true, frappeSynced: true, docName: result.message?.name, message: "Partnership proposal saved to Frappe." }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
