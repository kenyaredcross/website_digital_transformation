import { frappeList, frappeGet, frappeFileUrl } from "./client";
import type { BlogPost } from "@/types";

export interface FrappeBlogDoc {
  name: string;
  external_id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[] | string;
  category: BlogPost["category"];
  published_date: string;
  read_time: string;
  author:
    | {
        name: string;
        role: string;
        avatar: string;
      }
    | string;
  cover_image: string;
  flickr_album_url?: string;
  gallery_images?: string[] | string;
  video_embed_url?: string;
  tags: string[] | string;
  featured?: boolean | number;
}

/** Prepend the Frappe origin for files stored on the Frappe backend. */
function formatImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/files/") || path.startsWith("files/")) {
    return frappeFileUrl(path);
  }
  return path;
}

/** Formats ISO dates ("2024-08-18") to user-friendly strings ("August 18, 2024"). */
function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  if (dateStr.includes(",")) return dateStr;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function parseJsonIfNeeded<T>(val: unknown, fallback: T): T {
  if (typeof val === "string") {
    try {
      return (JSON.parse(val) as T) ?? fallback;
    } catch {
      return fallback;
    }
  }
  if (val !== null && val !== undefined) {
    return val as T;
  }
  return fallback;
}

function mapBlogPost(raw: FrappeBlogDoc & Record<string, unknown>): BlogPost {
  const id = String(raw.external_id || raw.id || raw.name || "");
  const slug = String(raw.slug || id);
  const title = String(raw.title || "");
  const excerpt = String(raw.excerpt || "");

  const content = parseJsonIfNeeded<string[]>(raw.content, []);
  const category = (raw.category || "Early Warning") as BlogPost["category"];
  const publishedDate = formatDate(String(raw.published_date || ""));
  const readTime = String(raw.read_time || "5 min read");

  const rawAuthor = parseJsonIfNeeded<{ name: string; role: string; avatar: string }>(raw.author, {
    name: "Kenya Red Cross",
    role: "Editorial Team",
    avatar: "/assets/images/logo/KRCS_logo.jpeg",
  });

  const author = {
    name: String(rawAuthor.name || "Kenya Red Cross"),
    role: String(rawAuthor.role || "Editorial Team"),
    avatar: formatImageUrl(rawAuthor.avatar),
  };

  const coverImage = formatImageUrl(String(raw.cover_image || ""));
  const flickrAlbumUrl = raw.flickr_album_url ? String(raw.flickr_album_url) : undefined;

  const rawGallery = parseJsonIfNeeded<string[]>(raw.gallery_images, []);
  const galleryImages = Array.isArray(rawGallery) ? rawGallery.map(formatImageUrl) : undefined;

  const videoEmbedUrl = raw.video_embed_url ? String(raw.video_embed_url) : undefined;
  const tags = parseJsonIfNeeded<string[]>(raw.tags, []);
  const featured = Boolean(raw.featured);

  return {
    id,
    slug,
    title,
    excerpt,
    content: Array.isArray(content) ? content : [String(content)],
    category,
    publishedDate,
    readTime,
    author,
    coverImage,
    flickrAlbumUrl,
    galleryImages,
    videoEmbedUrl,
    tags: Array.isArray(tags) ? tags : [],
    featured,
  };
}

export async function getBlogs(): Promise<BlogPost[]> {
  const response = await frappeList<FrappeBlogDoc>("Blogs", {
    limit: 100,
  });
  return response.data.map((item) =>
    mapBlogPost(item as FrappeBlogDoc & Record<string, unknown>)
  );
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  const blogs = await getBlogs();
  const found = blogs.find((b) => b.slug === slug || b.id === slug);
  if (found) {
    return found;
  }
  try {
    const raw = await frappeGet<FrappeBlogDoc>("Blogs", slug);
    return mapBlogPost(raw as FrappeBlogDoc & Record<string, unknown>);
  } catch {
    return undefined;
  }
}

export async function getFeaturedBlogs(): Promise<BlogPost[]> {
  const blogs = await getBlogs();
  return blogs.filter((b) => b.featured);
}
