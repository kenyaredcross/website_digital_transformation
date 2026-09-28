import { NextResponse } from "next/server";
import { frappeAdminRequest } from "@/lib/frappe/admin-session";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
  const frappeForm = new FormData();
  frappeForm.set("file", file, file.name);
  frappeForm.set("is_private", "0");
  const response = await frappeAdminRequest("/api/method/upload_file", { method: "POST", body: frappeForm });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) return NextResponse.json({ error: payload.exception || "File upload failed." }, { status: response.status });
  return NextResponse.json({ file_url: payload.message?.file_url });
}
