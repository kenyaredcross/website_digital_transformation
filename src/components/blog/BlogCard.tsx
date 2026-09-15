import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types";
import { ArrowRight, Clock, Video, Calendar } from "lucide-react";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md">
      <div>
        {/* Cover Image Container */}
        <div className="relative w-full aspect-video bg-slate-100 dark:bg-slate-950 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            unoptimized // Allows Flickr and remote imagery without optimization errors
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

          {/* Video Indicator Badge */}
          {post.videoEmbedUrl && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow">
              <Video className="w-3 h-3" /> Video Included
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-white/90 dark:bg-slate-950/90 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/80 backdrop-blur-sm shadow-sm">
              {post.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {post.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Author & CTA */}
      <div className="p-6 pt-0 space-y-4">
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-red-200 dark:border-red-800 shrink-0 bg-red-100 dark:bg-red-950">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="font-mono font-bold text-red-600 dark:text-red-400 text-[10px] flex items-center justify-center h-full w-full">
                  {post.author.name.split(" ").map((n) => n[0]).join("")}
                </span>
              )}
            </div>
            <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-medium truncate max-w-[140px]">
              {post.author.name}
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
          >
            <span>Read Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
