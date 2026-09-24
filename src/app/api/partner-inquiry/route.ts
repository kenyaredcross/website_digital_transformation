import { NextResponse } from "next/server";
import { createEntityItem } from "@/lib/data-store";
import { frappeCreateDoc } from "@/lib/frappe/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, organization, phone, collaborationArea, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Full name, work email, and message proposal are required." },
        { status: 400 }
      );
    }

    const docPayload = {
      doctype: "Partner Inquiry",
      organization_name: organization || "Not specified",
      contact_person: name,
      email: email,
      phone_number: phone || "",
      collaboration_area: collaborationArea || "General Partnering",
      proposal_summary: message,
      submission_date: new Date().toISOString(),
      status: "Received",
    };

    // 1. Persist locally to storage/partnerInquiries.json
    let localItem: Record<string, unknown> = {};
    try {
      localItem = createEntityItem("partnerInquiries", docPayload);
    } catch (err) {
      console.warn("Local storage fallback warning:", err);
    }

    // 2. Persist to Frappe DB / MariaDB DocType "Partner Inquiry"
    let frappeDoc: unknown = null;
    let frappeSynced = false;
    try {
      frappeDoc = await frappeCreateDoc("Partner Inquiry", docPayload);
      frappeSynced = true;
    } catch (frappeError) {
      console.warn("Frappe API direct call failed (will store locally):", frappeError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Partnering inquiry received successfully!",
        item: localItem,
        frappeSynced,
        frappeDoc,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
