import { NextResponse } from "next/server";

const FRAPPE_API_URL =
  process.env.NEXT_PUBLIC_FRAPPE_API_URL || "http://redcross.local:8000";

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
      throw new Error(result._server_messages || result.exception || "Failed to submit feedback to Frappe.");
    }

    return NextResponse.json({
      success: true,
      frappeSynced: true,
      name: result.message?.name,
      message: "Your feedback has been successfully submitted and logged into MariaDB.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error processing feedback submission.";
    console.error("[api/feedback] Error:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
