import { NextResponse } from "next/server";
import { getPeople } from "@/lib/frappe/people";

export async function GET() {
  try {
    const people = await getPeople();

    return NextResponse.json({
      success: true,
      count: people.length,
      people: people.slice(0, 2),
    });
  } catch (error) {
    console.error("Frappe test error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
