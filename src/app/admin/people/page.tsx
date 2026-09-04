"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Person } from "@/types";
import { fetchEntityData, createEntityData, updateEntityData, deleteEntityData } from "@/lib/api-client";

export default function AdminPeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [deletePersonId, setDeletePersonId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    role: "",
    department: "Technology" as Person["department"],
    isVolunteer: false,
    bio: "",
    shortBio: "",
    avatar: "/assets/images/people/p1.jpeg",
    expertiseStr: "",
    email: "",
    linkedin: "",
    twitter: "",
    github: "",
    featured: false,
  });

  const loadPeople = async () => {
    try {
      const data = await fetchEntityData<Person[]>("people");
      setPeople(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load team members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchEntityData<Person[]>("people")
      .then((data) => {
        if (isMounted) {
          setPeople(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load team members:", err);
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
    setEditingPerson(null);
    setFormData({
      name: "",
      slug: "",
      role: "",
      department: "Technology",
      isVolunteer: false,
      bio: "",
      shortBio: "",
      avatar: "/assets/images/people/p1.jpeg",
      expertiseStr: "Software Engineering, Cloud, Python",
      email: "",
      linkedin: "",
      twitter: "",
      github: "",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Person) => {
    setEditingPerson(p);
    setFormData({
      name: p.name,
      slug: p.slug,
      role: p.role,
      department: p.department,
      isVolunteer: !!p.isVolunteer,
      bio: p.bio || "",
      shortBio: p.shortBio || "",
      avatar: p.avatar || "",
      expertiseStr: p.expertise ? p.expertise.join(", ") : "",
      email: p.email || "",
      linkedin: p.linkedin || "",
      twitter: p.twitter || "",
      github: p.github || "",
      featured: !!p.featured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload: Partial<Person> = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        role: formData.role,
        department: formData.department,
        isVolunteer: formData.isVolunteer,
        bio: formData.bio,
        shortBio: formData.shortBio || formData.bio.slice(0, 100),
        avatar: formData.avatar,
        expertise: formData.expertiseStr.split(",").map((s) => s.trim()).filter(Boolean),
        email: formData.email || undefined,
        linkedin: formData.linkedin || undefined,
        twitter: formData.twitter || undefined,
        github: formData.github || undefined,
        featured: formData.featured,
      };

      if (editingPerson) {
        await updateEntityData("people", { id: editingPerson.id, ...payload });
        showToast("Team member updated successfully!");
      } else {
        await createEntityData("people", payload);
        showToast("New team member added successfully!");
      }

      setIsModalOpen(false);
      loadPeople();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save person";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletePersonId) return;
    setSubmitting(true);

    try {
      await deleteEntityData("people", deletePersonId);
      showToast("Team member deleted successfully!");
      setDeletePersonId(null);
      loadPeople();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete person";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPeople = people.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === "all" || p.department === deptFilter;
    return matchesSearch && matchesDept;
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
            <Users className="w-6 h-6 text-emerald-400" />
            <span>People & Team Manager</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage leaders, architects, engineers, data scientists, and digital volunteers.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2.5 bg-[#EE2435] hover:bg-[#d41c2c] text-white font-semibold rounded-xl flex items-center gap-2 text-sm shadow-lg shadow-[#EE2435]/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#EE2435]"
          />
        </div>

        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
        >
          <option value="all">All Departments</option>
          <option value="Leadership">Leadership</option>
          <option value="Technology">Technology</option>
          <option value="Data">Data</option>
          <option value="GIS">GIS</option>
          <option value="Product">Product</option>
          <option value="Operations">Operations</option>
          <option value="Contributors">Contributors</option>
          <option value="Volunteers">Volunteers</option>
        </select>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-xs uppercase font-semibold text-slate-400">
              <tr>
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Expertise</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading team members...
                  </td>
                </tr>
              ) : filteredPeople.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No team members found.
                  </td>
                </tr>
              ) : (
                filteredPeople.map((person) => (
                  <tr key={person.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={person.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            <span>{person.name}</span>
                            {person.isVolunteer && (
                              <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded border border-emerald-500/30">
                                Volunteer
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400">{person.email || "No email"}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-xs font-medium text-slate-200">{person.role}</td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-medium">
                        {person.department}
                      </span>
                    </td>

                    <td className="px-6 py-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {person.expertise?.slice(0, 3).map((exp) => (
                          <span key={exp} className="px-2 py-0.5 bg-slate-950 text-slate-300 text-[10px] rounded border border-slate-800">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(person)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletePersonId(person.id)}
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl my-8 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <span>{editingPerson ? "Edit Member" : "Add Team Member"}</span>
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value as Person["department"] })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  >
                    <option value="Leadership">Leadership</option>
                    <option value="Technology">Technology</option>
                    <option value="Data">Data</option>
                    <option value="GIS">GIS</option>
                    <option value="Product">Product</option>
                    <option value="Operations">Operations</option>
                    <option value="Contributors">Contributors</option>
                    <option value="Volunteers">Volunteers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Avatar Image Path / Link *</label>
                  <input
                    type="text"
                    required
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="/assets/images/people/p1.jpeg or https://..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Bio Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Expertise Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.expertiseStr}
                  onChange={(e) => setFormData({ ...formData, expertiseStr: e.target.value })}
                  placeholder="Python, BigQuery, React, GIS"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVolunteer}
                    onChange={(e) => setFormData({ ...formData, isVolunteer: e.target.checked })}
                    className="w-4 h-4 rounded text-[#EE2435] border-slate-800 bg-slate-950"
                  />
                  <span>Is Digital Volunteer?</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#EE2435] border-slate-800 bg-slate-950"
                  />
                  <span>Featured Team Member</span>
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
                  {submitting ? "Saving..." : editingPerson ? "Update Member" : "Save Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletePersonId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-800 text-[#EE2435] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Delete Team Member?</h3>
              <p className="text-slate-400 text-xs mt-1">
                Are you sure you want to remove this person from the team roster?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletePersonId(null)}
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
