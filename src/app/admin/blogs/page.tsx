"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { BlogPost } from "@/types";
import { fetchEntityData, createEntityData, updateEntityData, deleteEntityData } from "@/lib/api-client";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "AI & Innovation" as BlogPost["category"],
    contentStr: "",
    publishedDate: "",
    readTime: "5 min read",
    authorName: "Kenya Red Cross Digital Team",
    authorRole: "Innovation Contributor",
    authorAvatar: "/assets/images/people/p1.jpeg",
    coverImage: "",
    flickrAlbumUrl: "",
    galleryImagesStr: "",
    videoEmbedUrl: "",
    tagsStr: "",
    featured: false,
  });

  const loadBlogs = async () => {
    try {
      const data = await fetchEntityData<BlogPost[]>("blogs");
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchEntityData<BlogPost[]>("blogs")
      .then((data) => {
        if (isMounted) {
          setBlogs(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load blogs:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCreateModal = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      category: "AI & Innovation",
      contentStr: "",
      publishedDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: "5 min read",
      authorName: "Kenya Red Cross Digital Team",
      authorRole: "Innovation Contributor",
      authorAvatar: "/assets/images/people/p1.jpeg",
      coverImage: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800",
      flickrAlbumUrl: "https://www.flickr.com/photos/154940827@N06/55504073680/in/album-72177720335418161",
      galleryImagesStr: "",
      videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      tagsStr: "Digital, Innovation, Kenya Red Cross",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      category: blog.category,
      contentStr: Array.isArray(blog.content) ? blog.content.join("\n\n") : "",
      publishedDate: blog.publishedDate,
      readTime: blog.readTime,
      authorName: blog.author.name,
      authorRole: blog.author.role,
      authorAvatar: blog.author.avatar,
      coverImage: blog.coverImage,
      flickrAlbumUrl: blog.flickrAlbumUrl || "",
      galleryImagesStr: blog.galleryImages ? blog.galleryImages.join(", ") : "",
      videoEmbedUrl: blog.videoEmbedUrl || "",
      tagsStr: blog.tags ? blog.tags.join(", ") : "",
      featured: !!blog.featured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload: Partial<BlogPost> = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        excerpt: formData.excerpt,
        category: formData.category,
        content: formData.contentStr.split("\n\n").filter((p) => p.trim() !== ""),
        publishedDate: formData.publishedDate || "Recently Published",
        readTime: formData.readTime || "5 min read",
        author: {
          name: formData.authorName,
          role: formData.authorRole,
          avatar: formData.authorAvatar,
        },
        coverImage: formData.coverImage,
        flickrAlbumUrl: formData.flickrAlbumUrl || undefined,
        galleryImages: formData.galleryImagesStr
          ? formData.galleryImagesStr.split(",").map((s) => s.trim()).filter(Boolean)
          : undefined,
        videoEmbedUrl: formData.videoEmbedUrl || undefined,
        tags: formData.tagsStr.split(",").map((t) => t.trim()).filter(Boolean),
        featured: formData.featured,
      };

      if (editingBlog) {
        await updateEntityData("blogs", { id: editingBlog.id, ...payload });
        showToast("Blog post updated successfully!");
      } else {
        await createEntityData("blogs", payload);
        showToast("New blog post published successfully!");
      }

      setIsModalOpen(false);
      loadBlogs();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save blog post";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteBlogId) return;
    setSubmitting(true);

    try {
      await deleteEntityData("blogs", deleteBlogId);
      showToast("Blog post deleted successfully!");
      setDeleteBlogId(null);
      loadBlogs();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete blog post";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      b.author.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || b.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-[#EE2435]" />
            <span>Blog Posts Manager</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Create, edit, or delete articles and news updates for the Red Cross Digital platform.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2.5 bg-[#EE2435] hover:bg-[#d41c2c] text-white font-semibold rounded-xl flex items-center gap-2 text-sm shadow-lg shadow-[#EE2435]/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Blog</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by title, excerpt, author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#EE2435]"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
        >
          <option value="all">All Categories</option>
          <option value="Early Warning">Early Warning</option>
          <option value="Cash Aid">Cash Aid</option>
          <option value="GIS & Mapping">GIS & Mapping</option>
          <option value="AI & Innovation">AI & Innovation</option>
          <option value="Field Operations">Field Operations</option>
          <option value="Data Ethics">Data Ethics</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-xs uppercase font-semibold text-slate-400">
              <tr>
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Published</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="w-6 h-6 border-2 border-[#EE2435] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading blog posts...
                  </td>
                </tr>
              ) : filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No blog posts found.
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={blog.coverImage} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-semibold text-white line-clamp-1 flex items-center gap-2">
                            <span>{blog.title}</span>
                            {blog.featured && (
                              <span className="px-1.5 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] rounded font-bold">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1">{blog.excerpt}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium">
                        {blog.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs font-semibold text-white">{blog.author.name}</div>
                      <div className="text-[11px] text-slate-400">{blog.author.role}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
                      {blog.publishedDate}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(blog)}
                        title="Edit Blog"
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteBlogId(blog.id)}
                        title="Delete Blog"
                        className="p-2 bg-red-950/60 hover:bg-red-900/80 text-red-300 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl my-8 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#EE2435]" />
                <span>{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Article title..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Slug (URL friendly)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. ai-river-sensors-tana-river"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as BlogPost["category"] })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  >
                    <option value="Early Warning">Early Warning</option>
                    <option value="Cash Aid">Cash Aid</option>
                    <option value="GIS & Mapping">GIS & Mapping</option>
                    <option value="AI & Innovation">AI & Innovation</option>
                    <option value="Field Operations">Field Operations</option>
                    <option value="Data Ethics">Data Ethics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Published Date</label>
                  <input
                    type="text"
                    value={formData.publishedDate}
                    onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                    placeholder="August 18, 2024"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="5 min read"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Excerpt (Short Summary) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief overview of the article..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Content (Paragraphs separated by double line breaks) *
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.contentStr}
                  onChange={(e) => setFormData({ ...formData, contentStr: e.target.value })}
                  placeholder="Paragraph 1...\n\nParagraph 2...\n\nParagraph 3..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>

              {/* Author & Media Section */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Author & Media Links</div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Author Name</label>
                    <input
                      type="text"
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Author Role</label>
                    <input
                      type="text"
                      value={formData.authorRole}
                      onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Author Avatar URL</label>
                    <input
                      type="text"
                      value={formData.authorAvatar}
                      onChange={(e) => setFormData({ ...formData, authorAvatar: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Cover Image URL (Online Flickr/Unsplash Link) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Flickr Album URL</label>
                    <input
                      type="text"
                      value={formData.flickrAlbumUrl}
                      onChange={(e) => setFormData({ ...formData, flickrAlbumUrl: e.target.value })}
                      placeholder="https://www.flickr.com/photos/..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">YouTube Video Embed Link</label>
                    <input
                      type="text"
                      value={formData.videoEmbedUrl}
                      onChange={(e) => setFormData({ ...formData, videoEmbedUrl: e.target.value })}
                      placeholder="https://www.youtube.com/embed/..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tagsStr}
                    onChange={(e) => setFormData({ ...formData, tagsStr: e.target.value })}
                    placeholder="AI, Early Warning, M-PESA, IoT"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#EE2435] focus:ring-[#EE2435] border-slate-800 bg-slate-950"
                  />
                  <label htmlFor="featured" className="text-xs font-semibold text-slate-300 cursor-pointer">
                    Feature this post on home and blog header
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-[#EE2435] hover:bg-[#d41c2c] text-white rounded-xl text-xs font-semibold shadow-lg shadow-[#EE2435]/25 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Saving..." : editingBlog ? "Update Blog Post" : "Publish Blog Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteBlogId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-800 text-[#EE2435] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Delete Article?</h3>
              <p className="text-slate-400 text-xs mt-1">
                Are you sure you want to permanently remove this blog post from the data file? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteBlogId(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={submitting}
                className="px-4 py-2 bg-[#EE2435] hover:bg-[#d41c2c] text-white rounded-xl text-xs font-semibold shadow-lg shadow-[#EE2435]/25 cursor-pointer disabled:opacity-50"
              >
                {submitting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
