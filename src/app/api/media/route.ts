import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { SESSION_COOKIE_NAME, decodeSessionToken } from "@/lib/auth";

const PUBLIC_ASSETS_DIR = path.join(process.cwd(), "public", "assets");

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return decodeSessionToken(token);
}

interface MediaAsset {
  id: string;
  filename: string;
  relativePath: string;
  folder: string;
  sizeBytes: number;
  updatedAt: string;
}

function scanMediaFiles(dirPath: string, baseDir: string = PUBLIC_ASSETS_DIR): MediaAsset[] {
  let results: MediaAsset[] = [];
  if (!fs.existsSync(dirPath)) return results;

  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      results = results.concat(scanMediaFiles(fullPath, baseDir));
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".avif"].includes(ext)) {
        const relativeFromPublic = fullPath.replace(path.join(process.cwd(), "public"), "");
        const stats = fs.statSync(fullPath);
        const folderParts = relativeFromPublic.split("/").filter(Boolean);
        const folder = folderParts.length > 2 ? folderParts[2] : "general";

        results.push({
          id: Buffer.from(relativeFromPublic).toString("base64"),
          filename: item.name,
          relativePath: relativeFromPublic,
          folder,
          sizeBytes: stats.size,
          updatedAt: stats.mtime.toISOString(),
        });
      }
    }
  }

  return results;
}

// GET /api/media -> List all image assets in public/assets/
export async function GET() {
  ensureDir(PUBLIC_ASSETS_DIR);
  ensureDir(path.join(PUBLIC_ASSETS_DIR, "images", "people"));
  ensureDir(path.join(PUBLIC_ASSETS_DIR, "images", "portfolio"));
  ensureDir(path.join(PUBLIC_ASSETS_DIR, "images", "blogs"));
  ensureDir(path.join(PUBLIC_ASSETS_DIR, "images", "partners"));

  const assets = scanMediaFiles(PUBLIC_ASSETS_DIR);
  return NextResponse.json({ success: true, assets });
}

// POST /api/media -> Upload new image file
export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user || user.role === "blogger") {
    // Only super_admin and admin can manage global image assets
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";
    const customName = (formData.get("customFilename") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No image file uploaded." }, { status: 400 });
    }

    const targetDir = path.join(PUBLIC_ASSETS_DIR, "images", folder);
    ensureDir(targetDir);

    const ext = path.extname(file.name).toLowerCase() || ".jpeg";
    const safeFilename = customName
      ? `${customName.toLowerCase().replace(/[^a-z0-9_-]+/g, "-")}${ext}`
      : `${Date.now()}_${file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-")}`;

    const filePath = path.join(targetDir, safeFilename);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(filePath, buffer);

    const relativePath = `/assets/images/${folder}/${safeFilename}`;
    return NextResponse.json({
      success: true,
      asset: {
        id: Buffer.from(relativePath).toString("base64"),
        filename: safeFilename,
        relativePath,
        folder,
        sizeBytes: buffer.length,
        updatedAt: new Date().toISOString(),
      },
    }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to upload image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT /api/media -> Replace an existing image file
export async function PUT(request: Request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const relativePath = formData.get("relativePath") as string | null;

    if (!file || !relativePath) {
      return NextResponse.json({ error: "File and target relativePath are required." }, { status: 400 });
    }

    const fullPath = path.join(process.cwd(), "public", relativePath);
    ensureDir(path.dirname(fullPath));

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(fullPath, buffer);

    return NextResponse.json({
      success: true,
      asset: {
        id: Buffer.from(relativePath).toString("base64"),
        filename: path.basename(relativePath),
        relativePath,
        sizeBytes: buffer.length,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to replace image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/media?relativePath=xxx -> Delete an image file
export async function DELETE(request: Request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const relativePath = searchParams.get("relativePath");

    if (!relativePath) {
      return NextResponse.json({ error: "relativePath parameter is required." }, { status: 400 });
    }

    const fullPath = path.join(process.cwd(), "public", relativePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    return NextResponse.json({ success: true, relativePath });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
