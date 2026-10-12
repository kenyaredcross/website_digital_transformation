const LOCAL_FRAPPE_API_URL = "http://redcross.local:8000";

/**
 * Keep the local bench default for development, but require a public Frappe
 * origin in production so deployments never silently target redcross.local.
 */
export function getFrappeApiUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_FRAPPE_API_URL?.trim();
  if (configuredUrl) return configuredUrl.replace(/\/$/, "");

  if (process.env.NODE_ENV !== "production") return LOCAL_FRAPPE_API_URL;

  throw new Error(
    "NEXT_PUBLIC_FRAPPE_API_URL is required in production. Set it to the public URL of the Frappe backend in Vercel Project Settings > Environment Variables.",
  );
}

export function frappeFileUrl(path: string | null | undefined): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const frappeApiUrl = getFrappeApiUrl();

  if (path.startsWith("/")) {
    return `${frappeApiUrl}${path}`;
  }

  return `${frappeApiUrl}/${path}`;
}

interface FrappeListResponse<T> {
  message: {
    data: T[];
    total: number;
    limit: number;
    start: number;
    has_next: boolean;
  };
}

interface FrappeSingleResponse<T> {
  message: T;
}

export async function frappeList<T>(
  doctype: string,
  options: {
    limit?: number;
    start?: number;
    filters?: Record<string, unknown>;
  } = {},
): Promise<FrappeListResponse<T>["message"]> {
  const params = new URLSearchParams();

  params.set("doctype", doctype);
  params.set("limit", String(options.limit ?? 100));
  params.set("start", String(options.start ?? 0));

  if (options.filters) {
    params.set("filters", JSON.stringify(options.filters));
  }

  const response = await fetch(
    `${getFrappeApiUrl()}/api/method/redcross_digital.api.list_docs?${params.toString()}`,
    {
      next: {
        revalidate: 300,
        tags: [`frappe:${doctype}`],
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Frappe list_docs failed for ${doctype}: ${response.status} ${response.statusText}`,
    );
  }

  const result: FrappeListResponse<T> = await response.json();
  if (!result.message || !Array.isArray(result.message.data)) {
    throw new Error(`Frappe list_docs returned an invalid response for ${doctype}.`);
  }
  return result.message;
}

export async function frappeListAll<T>(
  doctype: string,
  options: { limit?: number; filters?: Record<string, unknown> } = {},
): Promise<T[]> {
  const limit = Math.max(1, Math.min(options.limit ?? 100, 500));
  const first = await frappeList<T>(doctype, { ...options, limit, start: 0 });
  const pages: T[][] = [first.data];

  for (let start = limit; start < first.total; start += limit) {
    const page = await frappeList<T>(doctype, { ...options, limit, start });
    if (page.data.length === 0) break;
    pages.push(page.data);
  }

  return pages.flat();
}

export async function frappeGet<T>(
  doctype: string,
  name: string,
): Promise<T> {
  const params = new URLSearchParams({
    doctype,
    name,
  });

  const response = await fetch(
    `${getFrappeApiUrl()}/api/method/redcross_digital.api.get_doc?${params.toString()}`,
    {
      next: {
        revalidate: 300,
        tags: [`frappe:${doctype}`],
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Frappe API error: ${response.status} ${response.statusText}`,
    );
  }

  const result: FrappeSingleResponse<T> = await response.json();

  return result.message;
}

export async function frappeCreateDoc<T = Record<string, unknown>>(
  doctype: string,
  doc: Record<string, unknown>
): Promise<T> {
  const frappeApiUrl = getFrappeApiUrl();
  const url = `${frappeApiUrl}/api/resource/${encodeURIComponent(doctype)}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(doc),
    });

    if (res.ok) {
      const data = await res.json();
      return (data.data || data.message || data) as T;
    }
  } catch (err) {
    console.warn("Resource POST to Frappe failed, trying method call:", err);
  }

  const methodUrl = `${frappeApiUrl}/api/method/redcross_digital.api.create_doc`;
  const response = await fetch(methodUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ doctype, doc }),
  });

  if (!response.ok) {
    throw new Error(`Frappe API create error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  return (result.message || result.data || result) as T;
}
