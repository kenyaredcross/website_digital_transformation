export async function fetchEntityData<T = unknown>(entity: string): Promise<T> {
  const res = await fetch(`/api/data/${entity}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${entity} data`);
  }
  return res.json();
}

export async function createEntityData<T = unknown>(entity: string, data: unknown): Promise<T> {
  const res = await fetch(`/api/data/${entity}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || `Failed to create item in ${entity}`);
  }
  return (json.item || json) as T;
}

export async function updateEntityData<T = unknown>(entity: string, data: unknown): Promise<T> {
  const res = await fetch(`/api/data/${entity}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || `Failed to update item in ${entity}`);
  }
  return (json.item || json.data || json) as T;
}

export async function deleteEntityData(entity: string, id: string): Promise<boolean> {
  const res = await fetch(`/api/data/${entity}?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || `Failed to delete item from ${entity}`);
  }
  return json.success;
}
