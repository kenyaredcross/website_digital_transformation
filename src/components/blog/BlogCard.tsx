import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types";
import { Clock, Video } from "lucide-react";

export type BlogCardVariant = "featured" | "standard" | "wide" | "compact";

interface BlogCardProps {
  post: BlogPost;
  variant?: BlogCardVariant;
  priority?: boolean;
}

/* Shared shell. Radius varies by hierarchy on purpose — the featured card is
   softer and larger, the compact card is squarer and quieter. */
const shell =
  "group relative isolate flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 " +
  "transition-colors duration-200 hover:border-red-500/60 focus-within:border-red-500 " +
  "focus-within:ring-2 focus-within:ring-red-500/30 shadow-sm";

/* The whole card is clickable via one stretched anchor on the title.
   No duplicate links, one tab stop, works with keyboard and screen readers. */
const stretched =
  "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none";

function Meta({ post, className = "" }: { post: BlogPost; className?: string }) {
  return (
    <div
      className={`flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 ${className}`}
    >
      <span>{post.publishedDate}</span>
      <span aria-hidden className="h-3 w-px bg-slate-300 dark:bg-slate-700" />
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" aria-hidden />
        {post.readTime}
      </span>
    </div>
  );
}

function Category({ post }: { post: BlogPost }) {
  return (
    <span className="text-xs font-semibold tracking-wide text-red-600 dark:text-red-400">
      {post.category}
    </span>
  );
}

function VideoTag() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/85 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm dark:bg-slate-950/85">
      <Video className="h-3 w-3" aria-hidden />
      Includes video
    </span>
  );
}

function Cover({
  post,
  priority,
  className,
  sizes,
}: {
  post: BlogPost;
  priority?: boolean;
  className: string;
  sizes: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-950 ${className}`}>
      <Image
        src={post.coverImage}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        unoptimized
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      {post.videoEmbedUrl && (
        <div className="absolute left-4 top-4 z-10">
          <VideoTag />
        </div>
      )}
    </div>
  );
}

export function BlogCard({ post, variant = "standard", priority }: BlogCardProps) {
  const href = `/blog/${post.slug}`;

  /* ── Featured: tall, image-led, the anchor of the composition ── */
  if (variant === "featured") {
    return (
      <article className={`${shell} h-full flex-col overflow-hidden rounded-3xl`}>
        <Cover
          post={post}
          priority={priority}
          className="min-h-[260px] w-full flex-1 lg:min-h-[320px]"
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
        <div className="flex flex-col gap-4 p-7 lg:p-9">
          <Category post={post} />
          <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-slate-900 transition-colors group-hover:text-red-700 dark:text-white dark:group-hover:text-red-400 lg:text-[2.6rem]">
            <Link href={href} className={stretched}>
              {post.title}
            </Link>
          </h2>
          <p className="max-w-[62ch] text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {post.excerpt}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
            <Author post={post} showRole />
            <Meta post={post} />
          </div>
        </div>
      </article>
    );
  }

  /* ── Wide: horizontal, image beside text. Breaks the vertical rhythm. ── */
  if (variant === "wide") {
    return (
      <article className={`${shell} h-full flex-col overflow-hidden rounded-2xl sm:flex-row`}>
        <Cover
          post={post}
          className="aspect-[16/10] w-full sm:aspect-auto sm:w-[42%] sm:min-h-[240px] sm:shrink-0"
          sizes="(max-width: 640px) 100vw, 34vw"
        />
        <div className="flex flex-1 flex-col gap-3 p-6 sm:justify-center sm:p-8">
          <Category post={post} />
          <h3 className="text-2xl font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-red-700 dark:text-white dark:group-hover:text-red-400">
            <Link href={href} className={stretched}>
              {post.title}
            </Link>
          </h3>
          <p className="line-clamp-2 max-w-[60ch] text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {post.excerpt}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
            <Author post={post} />
            <Meta post={post} />
          </div>
        </div>
      </article>
    );
  }

  /* ── Compact: no image. This is what keeps the page from reading as a grid. ── */
  if (variant === "compact") {
    return (
      <article
        className={`${shell} h-full flex-col justify-between gap-6 rounded-2xl border-l-4 border-l-red-600 p-6 dark:border-l-red-600`}
      >
        <div className="flex flex-col gap-3">
          <Category post={post} />
          <h3 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-red-700 dark:text-white dark:group-hover:text-red-400">
            <Link href={href} className={stretched}>
              {post.title}
            </Link>
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {post.excerpt}
          </p>
        </div>
        <Meta post={post} />
      </article>
    );
  }

  /* ── Standard ── */
  return (
    <article className={`${shell} h-full flex-col overflow-hidden rounded-2xl`}>
      <Cover
        post={post}
        priority={priority}
        className="aspect-[3/2] w-full"
        sizes="(max-width: 1024px) 100vw, 40vw"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <Category post={post} />
        <h3 className="text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-red-700 dark:text-white dark:group-hover:text-red-400">
          <Link href={href} className={stretched}>
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {post.excerpt}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <Author post={post} />
          <Meta post={post} />
        </div>
      </div>
    </article>
  );
}

function Author({ post, showRole = false }: { post: BlogPost; showRole?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-red-100 ring-1 ring-red-200 dark:bg-red-950 dark:ring-red-900">
        {post.author.avatar ? (
          <Image src={post.author.avatar} alt="" fill sizes="28px" className="object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-red-600 dark:text-red-400">
            {post.author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        )}
      </div>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">
          {post.author.name}
        </p>
        {showRole && post.author.role && (
          <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
            {post.author.role}
          </p>
        )}
      </div>
    </div>
  );
}
