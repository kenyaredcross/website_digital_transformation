"use client";

import { useEffect, useState } from "react";
import {
  Handshake,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { Partner } from "@/types";
import { fetchEntityData, createEntityData, updateEntityData, deleteEntityData } from "@/lib/api-client";

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [deletePartnerId, setDeletePartnerId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Strategic" as Partner["category"],
    logo: "",
    description: "",
    website: "",
    collaborationFocus: "",
    featured: false,
  });

  const loadPartners = async () => {
    try {
      const data = await fetchEntityData<Partner[]>("partners");
      setPartners(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load partners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchEntityData<Partner[]>("partners")
      .then((data) => {
        if (isMounted) {
          setPartners(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load partners:", err);
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
    setEditingPartner(null);
    setFormData({
      name: "",
      category: "Strategic",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150",
      description: "",
      website: "https://",
      collaborationFocus: "",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Partner) => {
    setEditingPartner(p);
    setFormData({
      name: p.name,
      category: p.category,
      logo: p.logo || "",
      description: p.description || "",
      website: p.website || "",
      collaborationFocus: p.collaborationFocus || "",
      featured: !!p.featured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload: Partial<Partner> = {
        name: formData.name,
        category: formData.category,
        logo: formData.logo,
        description: formData.description,
        website: formData.website,
        collaborationFocus: formData.collaborationFocus,
        featured: formData.featured,
      };

      if (editingPartner) {
        await updateEntityData("partners", { id: editingPartner.id, ...payload });
        showToast("Partner updated successfully!");
      } else {
        await createEntityData("partners", payload);
        showToast("New partner added successfully!");
      }

      setIsModalOpen(false);
      loadPartners();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save partner";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletePartnerId) return;
    setSubmitting(true);

    try {
      await deleteEntityData("partners", deletePartnerId);
      showToast("Partner deleted successfully!");
      setDeletePartnerId(null);
      loadPartners();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete partner";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPartners = partners.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.collaborationFocus.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
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
            <Handshake className="w-6 h-6 text-purple-400" />
            <span>Partnerships & Collaborations Manager</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage global donors, strategic organizations, tech allies, and implementation partners.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2.5 bg-[#EE2435] hover:bg-[#d41c2c] text-white font-semibold rounded-xl flex items-center gap-2 text-sm shadow-lg shadow-[#EE2435]/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Partner</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search partners..."
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
          <option value="Strategic">Strategic</option>
          <option value="Technology">Technology</option>
          <option value="Implementation">Implementation</option>
          <option value="Funding">Funding</option>
        </select>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-xs uppercase font-semibold text-slate-400">
              <tr>
                <th className="px-6 py-4">Partner</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Collaboration Focus</th>
                <th className="px-6 py-4">Website</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading partners...
                  </td>
                </tr>
              ) : filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No partners found.
                  </td>
                </tr>
              ) : (
                filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center p-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={partner.logo} alt="" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            <span>{partner.name}</span>
                            {partner.featured && (
                              <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-bold rounded border border-purple-500/30">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1">{partner.description}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-purple-400 rounded-lg text-xs font-medium">
                        {partner.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-300">{partner.collaborationFocus}</td>

                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(partner)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletePartnerId(partner.id)}
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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Handshake className="w-5 h-5 text-purple-400" />
                <span>{editingPartner ? "Edit Partner" : "Add New Partner"}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Partner Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Partner["category"] })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  >
                    <option value="Strategic">Strategic</option>
                    <option value="Technology">Technology</option>
                    <option value="Implementation">Implementation</option>
                    <option value="Funding">Funding</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Logo URL *</label>
                <input
                  type="text"
                  required
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Website URL</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Collaboration Focus</label>
                  <input
                    type="text"
                    value={formData.collaborationFocus}
                    onChange={(e) => setFormData({ ...formData, collaborationFocus: e.target.value })}
                    placeholder="e.g. AI Early Warning"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredPartner"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#EE2435] border-slate-800 bg-slate-950"
                />
                <label htmlFor="featuredPartner" className="text-xs font-semibold text-slate-300 cursor-pointer">
                  Feature this partner on home partner grid
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
                  {submitting ? "Saving..." : editingPartner ? "Update Partner" : "Add Partner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletePartnerId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-800 text-[#EE2435] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Delete Partner?</h3>
              <p className="text-slate-400 text-xs mt-1">
                Are you sure you want to remove this partner from the directory?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletePartnerId(null)}
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
