"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Project } from "@/types";
import { fetchEntityData, createEntityData, updateEntityData, deleteEntityData } from "@/lib/api-client";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Digital Products" as Project["category"],
    year: new Date().getFullYear(),
    shortDescription: "",
    description: "",
    challenge: "",
    solution: "",
    impact: "",
    technologiesStr: "",
    thematicAreaSlug: "digital-humanitarian-products",
    countriesStr: "KE",
    teamIdsStr: "p1, p2",
    partnerIdsStr: "",
    image: "",
    demoUrl: "",
    githubUrl: "",
    featured: false,
  });

  const loadProjects = async () => {
    try {
      const data = await fetchEntityData<Project[]>("projects");
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchEntityData<Project[]>("projects")
      .then((data) => {
        if (isMounted) {
          setProjects(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
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
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      category: "Digital Products",
      year: new Date().getFullYear(),
      shortDescription: "",
      description: "",
      challenge: "",
      solution: "",
      impact: "",
      technologiesStr: "Next.js, TypeScript, Tailwind, Python",
      thematicAreaSlug: "digital-humanitarian-products",
      countriesStr: "KE",
      teamIdsStr: "p1, p2",
      partnerIdsStr: "",
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800",
      demoUrl: "",
      githubUrl: "",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (proj: Project) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      slug: proj.slug,
      category: proj.category,
      year: proj.year,
      shortDescription: proj.shortDescription || "",
      description: proj.description || "",
      challenge: proj.challenge || "",
      solution: proj.solution || "",
      impact: proj.impact || "",
      technologiesStr: proj.technologies ? proj.technologies.join(", ") : "",
      thematicAreaSlug: proj.thematicAreaSlug || "digital-humanitarian-products",
      countriesStr: proj.countries ? proj.countries.join(", ") : "KE",
      teamIdsStr: proj.teamIds ? proj.teamIds.join(", ") : "",
      partnerIdsStr: proj.partnerIds ? proj.partnerIds.join(", ") : "",
      image: proj.image || "",
      demoUrl: proj.demoUrl || "",
      githubUrl: proj.githubUrl || "",
      featured: !!proj.featured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload: Partial<Project> = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        category: formData.category,
        year: Number(formData.year),
        shortDescription: formData.shortDescription,
        description: formData.description,
        challenge: formData.challenge,
        solution: formData.solution,
        impact: formData.impact,
        technologies: formData.technologiesStr.split(",").map((s) => s.trim()).filter(Boolean),
        thematicAreaSlug: formData.thematicAreaSlug,
        countries: formData.countriesStr.split(",").map((s) => s.trim()).filter(Boolean),
        teamIds: formData.teamIdsStr.split(",").map((s) => s.trim()).filter(Boolean),
        partnerIds: formData.partnerIdsStr
          ? formData.partnerIdsStr.split(",").map((s) => s.trim()).filter(Boolean)
          : undefined,
        image: formData.image,
        demoUrl: formData.demoUrl || undefined,
        githubUrl: formData.githubUrl || undefined,
        featured: formData.featured,
      };

      if (editingProject) {
        await updateEntityData("projects", { id: editingProject.id, ...payload });
        showToast("Project updated successfully!");
      } else {
        await createEntityData("projects", payload);
        showToast("New project created successfully!");
      }

      setIsModalOpen(false);
      loadProjects();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save project";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteProjectId) return;
    setSubmitting(true);

    try {
      await deleteEntityData("projects", deleteProjectId);
      showToast("Project deleted successfully!");
      setDeleteProjectId(null);
      loadProjects();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete project";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-blue-400" />
            <span>Projects & Portfolio Manager</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage humanitarian digital products, AI systems, GIS maps, and tech solutions.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2.5 bg-[#EE2435] hover:bg-[#d41c2c] text-white font-semibold rounded-xl flex items-center gap-2 text-sm shadow-lg shadow-[#EE2435]/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects..."
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
          <option value="Digital Products">Digital Products</option>
          <option value="Data Services">Data Services</option>
          <option value="Platforms">Platforms</option>
          <option value="Mobile">Mobile</option>
          <option value="GIS">GIS</option>
          <option value="AI">AI</option>
        </select>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-xs uppercase font-semibold text-slate-400">
              <tr>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4">Tech Stack</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading projects...
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No projects found.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={proj.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-semibold text-white line-clamp-1 flex items-center gap-2">
                            <span>{proj.title}</span>
                            {proj.featured && (
                              <span className="px-1.5 py-0.5 bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[10px] rounded font-bold">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1">{proj.shortDescription}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-blue-400 rounded-lg text-xs font-medium">
                        {proj.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">{proj.year}</td>

                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies?.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-0.5 bg-slate-950 text-slate-300 text-[10px] rounded border border-slate-800">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(proj)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteProjectId(proj.id)}
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
                <Briefcase className="w-5 h-5 text-blue-400" />
                <span>{editingProject ? "Edit Project" : "Create New Project"}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Project["category"] })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  >
                    <option value="Digital Products">Digital Products</option>
                    <option value="Data Services">Data Services</option>
                    <option value="Platforms">Platforms</option>
                    <option value="Mobile">Mobile</option>
                    <option value="GIS">GIS</option>
                    <option value="AI">AI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Year</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Thematic Area Slug</label>
                  <input
                    type="text"
                    value={formData.thematicAreaSlug}
                    onChange={(e) => setFormData({ ...formData, thematicAreaSlug: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Challenge</label>
                  <textarea
                    rows={2}
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Solution</label>
                  <textarea
                    rows={2}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Impact</label>
                  <textarea
                    rows={2}
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.technologiesStr}
                    onChange={(e) => setFormData({ ...formData, technologiesStr: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL *</label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredProject"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#EE2435] focus:ring-[#EE2435] border-slate-800 bg-slate-950"
                />
                <label htmlFor="featuredProject" className="text-xs font-semibold text-slate-300 cursor-pointer">
                  Feature this project on home portfolio section
                </label>
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
                  className="px-5 py-2.5 bg-[#EE2435] hover:bg-[#d41c2c] text-white rounded-xl text-xs font-semibold shadow-lg shadow-[#EE2435]/25 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteProjectId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-800 text-[#EE2435] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Delete Project?</h3>
              <p className="text-slate-400 text-xs mt-1">
                Are you sure you want to delete this project? It will be removed from the portfolio list.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteProjectId(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={submitting}
                className="px-4 py-2 bg-[#EE2435] hover:bg-[#d41c2c] text-white rounded-xl text-xs font-semibold shadow-lg cursor-pointer disabled:opacity-50"
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
