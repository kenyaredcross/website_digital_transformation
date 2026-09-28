import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/frappe/admin-session";
import { getBlogs, getProjects, getPartners, getTestimonials, getCountries, getThematicAreas, getSiteConfig, getInnovations } from "@/lib/get-data";
import { getPeople } from "@/lib/frappe/people";
import { getKnowledgeResources, getDigitalStories, getNewsItems } from "@/lib/frappe/knowledge-content";

type Context = { params: Promise<{ entity: string }> };

export async function GET(_request: Request, { params }: Context) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "Unauthorized. Sign in with a Frappe System Manager account." }, { status: 401 });
  const { entity } = await params;
  try {
    const loaders: Record<string, () => Promise<unknown>> = {
      blogs: getBlogs, projects: getProjects, people: getPeople, partners: getPartners,
      testimonials: getTestimonials, countries: getCountries, thematicAreas: getThematicAreas,
      "thematic-areas": getThematicAreas, site: getSiteConfig, innovations: getInnovations,
      "knowledge-resources": getKnowledgeResources, "digital-stories": getDigitalStories, "news-items": getNewsItems,
    };
    const load = loaders[entity];
    if (!load) return NextResponse.json({ error: `Unsupported Frappe entity: ${entity}` }, { status: 404 });
    return NextResponse.json(await load());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to read Frappe records.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

async function readOnlyMigrationNotice() {
  return NextResponse.json({ error: "The legacy editor is read-only. Use Admin → Frappe Data & Inbox for Frappe CRUD." }, { status: 410 });
}

export async function POST() {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  return readOnlyMigrationNotice();
}

export async function PUT() {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  return readOnlyMigrationNotice();
}

export async function DELETE() {
  if (!(await getAdminUser())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  return readOnlyMigrationNotice();
}
