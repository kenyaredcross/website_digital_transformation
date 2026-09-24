const FRAPPE_API_URL =
  process.env.NEXT_PUBLIC_FRAPPE_API_URL || "http://redcross.local:8000";

export function frappeFileUrl(path: string | null | undefined): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (path.startsWith("/")) {
    return `${FRAPPE_API_URL}${path}`;
  }

  return `${FRAPPE_API_URL}/${path}`;
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

  try {
    const response = await fetch(
      `${FRAPPE_API_URL}/api/method/redcross_digital.api.list_docs?${params.toString()}`,
      {
        next: {
          revalidate: 300,
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Frappe API error: ${response.status} ${response.statusText}`,
      );
    }

    const result: FrappeListResponse<T> = await response.json();

    return result.message;
  } catch (err) {
    console.warn(`Frappe list_docs offline or unreachable for ${doctype}:`, err instanceof Error ? err.message : err);
    return { data: [], total: 0, limit: options.limit ?? 100, start: options.start ?? 0, has_next: false };
  }
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
    `${FRAPPE_API_URL}/api/method/redcross_digital.api.get_doc?${params.toString()}`,
    {
      next: {
        revalidate: 300,
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
  const url = `${FRAPPE_API_URL}/api/resource/${encodeURIComponent(doctype)}`;
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

  const methodUrl = `${FRAPPE_API_URL}/api/method/redcross_digital.api.create_doc`;
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

