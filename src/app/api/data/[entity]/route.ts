import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, decodeSessionToken, canAccessEntity } from "@/lib/auth";
import {
  getEntityData,
  createEntityItem,
  updateEntityItem,
  deleteEntityItem,
} from "@/lib/data-store";

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return decodeSessionToken(token);
}

import {
  getBlogs,
  getProjects,
  getPartners,
  getTestimonials,
  getCountries,
  getThematicAreas,
  getSiteConfig,
  getInnovations,
} from "@/lib/get-data";
import { getKnowledgeResources, getDigitalStories, getNewsItems } from "@/lib/frappe/knowledge-content";

// GET /api/data/[entity]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ entity: string }> }
) {
  const { entity } = await params;
  try {
    if (entity === "blogs") {
      const data = await getBlogs();
      return NextResponse.json(data);
    }
    if (entity === "projects") {
      const data = await getProjects();
      return NextResponse.json(data);
    }
    if (entity === "partners") {
      const data = await getPartners();
      return NextResponse.json(data);
    }
    if (entity === "testimonials") {
      const data = await getTestimonials();
      return NextResponse.json(data);
    }
    if (entity === "countries") {
      const data = await getCountries();
      return NextResponse.json(data);
    }
    if (entity === "thematicAreas" || entity === "thematic-areas") {
      const data = await getThematicAreas();
      return NextResponse.json(data);
    }
    if (entity === "innovations") {
      const data = await getInnovations();
      return NextResponse.json(data);
    }
    if (entity === "knowledge-resources") {
      return NextResponse.json(await getKnowledgeResources());
    }
    if (entity === "digital-stories") {
      return NextResponse.json(await getDigitalStories());
    }
    if (entity === "news-items") {
      return NextResponse.json(await getNewsItems());
    }
    if (entity === "site") {
      const data = await getSiteConfig();
      return NextResponse.json(data);
    }
    const data = getEntityData(entity);
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch data.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// POST /api/data/[entity] -> Create new item
export async function POST(
  request: Request,
  { params }: { params: Promise<{ entity: string }> }
) {
  const { entity } = await params;
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
  }

  if (!canAccessEntity(user.role, entity)) {
    return NextResponse.json(
      { error: `Forbidden. Role '${user.role}' cannot modify '${entity}'.` },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const createdItem = createEntityItem(entity, body);
    return NextResponse.json({ success: true, item: createdItem }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create item.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// PUT /api/data/[entity] -> Update existing item or single entity config
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ entity: string }> }
) {
  const { entity } = await params;
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
  }

  if (!canAccessEntity(user.role, entity)) {
    return NextResponse.json(
      { error: `Forbidden. Role '${user.role}' cannot modify '${entity}'.` },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { id, ...updatedFields } = body;

    if (!id && (entity === "site" || entity === "about")) {
      // Single object model update
      const updatedData = updateEntityItem(entity, "", body);
      return NextResponse.json({ success: true, data: updatedData });
    }

    if (!id) {
      return NextResponse.json({ error: "Item ID is required for update." }, { status: 400 });
    }

    const updatedItem = updateEntityItem(entity, id, updatedFields);
    return NextResponse.json({ success: true, item: updatedItem });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update item.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

// DELETE /api/data/[entity]?id=xxx -> Delete item by ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ entity: string }> }
) {
  const { entity } = await params;
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
  }

  if (!canAccessEntity(user.role, entity)) {
    return NextResponse.json(
      { error: `Forbidden. Role '${user.role}' cannot delete items in '${entity}'.` },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Item ID query parameter is required." }, { status: 400 });
    }

    const success = deleteEntityItem(entity, id);
    if (!success) {
      return NextResponse.json({ error: "Item not found or could not be deleted." }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete item.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
