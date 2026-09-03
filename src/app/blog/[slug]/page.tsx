import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogs";
import { ArrowLeft, ArrowRight, Calendar, Clock, Video, ExternalLink, Tag } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return blogs.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${post.title} | Kenya Red Cross Digital Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogs.filter((b) => b.id !== post.id).slice(0, 3);

  return (
    <div className="pt-28 pb-20 bg-slate-950 text-white min-h-screen">
      {/* Article Hero */}
      <section className="py-12 md:py-20 border-b border-slate-800 bg-grid-pattern opacity-95">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-red-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Stories
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-950 text-red-400 border border-red-800">
              {post.category}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {post.publishedDate}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Author Header */}
          <div className="pt-4 flex items-center gap-4 border-t border-slate-800/80">
            <div className="w-12 h-12 rounded-full bg-red-950 text-red-400 border border-red-800 font-mono font-bold text-base flex items-center justify-center">
              {post.author.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <span className="block text-sm font-bold text-white">{post.author.name}</span>
              <span className="text-xs font-mono text-slate-400">{post.author.role}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Cover Image */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-[16/9] rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 shadow-2xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {post.flickrAlbumUrl && (
            <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span>Photo Source: Kenya Red Cross Society Official Archives</span>
              <a
                href={post.flickrAlbumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>View Original Album on Flickr</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Article Content & Embedded Video */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Article Text Paragraphs */}
          <div className="prose prose-invert max-w-none space-y-6 text-slate-300 text-base leading-relaxed">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Embedded Video Section */}
          {post.videoEmbedUrl && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                <Video className="w-4 h-4" /> Field Video Demonstration
              </div>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <iframe
                  src={post.videoEmbedUrl}
                  title={`${post.title} Video`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Additional Gallery Photos */}
          {post.galleryImages && post.galleryImages.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <h3 className="text-xl font-bold text-white font-mono">Field Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.galleryImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative w-full aspect-[4/3] rounded-xl bg-slate-900 overflow-hidden border border-slate-800"
                  >
                    <Image
                      src={imgUrl}
                      alt={`Gallery Photo ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="pt-6 border-t border-slate-800 flex items-center gap-3">
            <Tag className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      {relatedPosts.length > 0 && (
        <section className="py-16 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-2xl font-bold text-white">More Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <div
                  key={rp.id}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-red-400">
                      {rp.category}
                    </span>
                    <h3 className="text-base font-bold text-white line-clamp-2">{rp.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{rp.excerpt}</p>
                  </div>
                  <Link
                    href={`/blog/${rp.slug}`}
                    className="mt-4 text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
