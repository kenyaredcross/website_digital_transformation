import { NextResponse } from "next/server";
import { readPublicSubmission, requestBodyErrorResponse } from "@/lib/security/request-body";

const FRAPPE_API_URL =
  process.env.NEXT_PUBLIC_FRAPPE_API_URL || "http://redcross.local:8000";

export async function POST(request: Request) {
  try {
    const body = await readPublicSubmission(request);

    const response = await fetch(
      `${FRAPPE_API_URL}/api/method/redcross_digital.api.submit_feedback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      const message = result._server_messages || "Failed to submit feedback to Frappe.";
      const status = response.status === 429 ? 429 : response.status < 500 ? response.status : 502;
      return NextResponse.json({ error: message }, { status });
    }

    return NextResponse.json({
      success: true,
      frappeSynced: true,
      name: result.message?.name,
      message: "Your feedback has been successfully submitted and logged into MariaDB.",
    });
  } catch (err: unknown) {
    const bodyError = requestBodyErrorResponse(err);
    if (bodyError) return bodyError;
    const message = err instanceof Error ? err.message : "Error processing feedback submission.";
    console.error("[api/feedback] Error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
