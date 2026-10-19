const MAX_PUBLIC_SUBMISSION_BYTES = 24 * 1024;

export class RequestBodyError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "RequestBodyError";
  }
}

export async function readPublicSubmission(request: Request): Promise<Record<string, unknown>> {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_PUBLIC_SUBMISSION_BYTES) {
    throw new RequestBodyError("Submission is too large.", 413);
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    throw new RequestBodyError("Submission must use JSON.", 415);
  }

  if (!request.body) {
    throw new RequestBodyError("Submission body is required.", 400);
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_PUBLIC_SUBMISSION_BYTES) {
        await reader.cancel();
        throw new RequestBodyError("Submission is too large.", 413);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  let payload: unknown;
  try {
    payload = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body));
  } catch {
    throw new RequestBodyError("Submission must contain valid JSON.", 400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new RequestBodyError("Submission must be a JSON object.", 400);
  }

  return payload as Record<string, unknown>;
}

export function requestBodyErrorResponse(error: unknown): Response | null {
  if (error instanceof RequestBodyError) {
    return Response.json({ error: error.message }, { status: error.status });
  }
  return null;
}
