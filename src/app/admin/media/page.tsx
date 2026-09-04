"use client";

import { useEffect, useState } from "react";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
  Copy,
  RefreshCw,
  FileImage,
} from "lucide-react";

interface MediaAsset {
  id: string;
  filename: string;
  relativePath: string;
  folder: string;
  sizeBytes: number;
  updatedAt: string;
}

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string>("all");

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [replaceTarget, setReplaceTarget] = useState<MediaAsset | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaAsset | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Upload Form State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadFolder, setUploadFolder] = useState("people");
  const [customFilename, setCustomFilename] = useState("");

  // Replace Form State
  const [replaceFile, setReplaceFile] = useState<File | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.assets)) {
          setAssets(data.assets);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load media assets:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyPath = (pathStr: string) => {
    navigator.clipboard.writeText(pathStr);
    showToast(`Copied path: ${pathStr}`);
  };

  const reloadMediaAssets = async () => {
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      if (data.success && Array.isArray(data.assets)) {
        setAssets(data.assets);
      }
    } catch (err) {
      console.error("Failed to reload media assets:", err);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("folder", uploadFolder);
      if (customFilename.trim()) {
        formData.append("customFilename", customFilename.trim());
      }

      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      showToast("Image uploaded successfully!");
      setIsUploadOpen(false);
      setUploadFile(null);
      setCustomFilename("");
      reloadMediaAssets();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplaceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replaceFile || !replaceTarget) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("file", replaceFile);
      formData.append("relativePath", replaceTarget.relativePath);

      const res = await fetch("/api/media", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to replace image");
      }

      showToast("Image replaced successfully!");
      setReplaceTarget(null);
      setReplaceFile(null);
      reloadMediaAssets();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Replace failed";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!deleteTarget) return;
    setSubmitting(true);

    try {
      const res = await fetch(
        `/api/media?relativePath=${encodeURIComponent(deleteTarget.relativePath)}`,
        { method: "DELETE" }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete image");
      }

      showToast("Image deleted successfully!");
      setDeleteTarget(null);
      reloadMediaAssets();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Delete failed";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.filename.toLowerCase().includes(search.toLowerCase()) ||
      asset.relativePath.toLowerCase().includes(search.toLowerCase());
    const matchesFolder = selectedFolder === "all" || asset.folder === selectedFolder;
    return matchesSearch && matchesFolder;
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
            <FileImage className="w-6 h-6 text-pink-400" />
            <span>Public Assets & Media Library</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Add, edit, replace, or delete images in the <code className="text-pink-400">public/assets/</code> project directory.
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-4 py-2.5 bg-[#EE2435] hover:bg-[#d41c2c] text-white font-semibold rounded-xl flex items-center gap-2 text-sm shadow-lg shadow-[#EE2435]/25 transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Search & Folder Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search image filenames or paths..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#EE2435]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["all", "people", "portfolio", "blogs", "partners", "general"].map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedFolder === folder
                  ? "bg-[#EE2435] text-white shadow-md shadow-[#EE2435]/20"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {folder}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <div className="w-8 h-8 border-2 border-pink-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading media library...
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
          <ImageIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No images found</h3>
          <p className="text-xs text-slate-500 mt-1">Upload images to populate this directory folder.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.relativePath}
                  alt={asset.filename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-bold text-pink-300 rounded uppercase">
                  {asset.folder}
                </span>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <div className="text-xs font-bold text-white truncate" title={asset.filename}>
                    {asset.filename}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate font-mono mt-0.5" title={asset.relativePath}>
                    {asset.relativePath}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <span>{formatSize(asset.sizeBytes)}</span>
                  <button
                    onClick={() => handleCopyPath(asset.relativePath)}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Path</span>
                  </button>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setReplaceTarget(asset)}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                    <span>Change</span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(asset)}
                    className="px-2.5 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#EE2435]" />
                <span>Upload Asset Image</span>
              </h2>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Asset Folder *</label>
                <select
                  value={uploadFolder}
                  onChange={(e) => setUploadFolder(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                >
                  <option value="people">People (/assets/images/people/)</option>
                  <option value="portfolio">Portfolio (/assets/images/portfolio/)</option>
                  <option value="blogs">Blogs (/assets/images/blogs/)</option>
                  <option value="partners">Partners (/assets/images/partners/)</option>
                  <option value="general">General (/assets/images/general/)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Image File *</label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm text-slate-400 focus:outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#EE2435] file:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Custom Filename (Optional, e.g. p15)
                </label>
                <input
                  type="text"
                  value={customFilename}
                  onChange={(e) => setCustomFilename(e.target.value)}
                  placeholder="Leave empty for original filename"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !uploadFile}
                  className="px-5 py-2.5 bg-[#EE2435] hover:bg-[#d41c2c] text-white rounded-xl text-xs font-semibold shadow-lg shadow-[#EE2435]/25 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Uploading..." : "Save Image to Assets"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REPLACE / CHANGE MODAL */}
      {replaceTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-400" />
                <span>Replace Image File</span>
              </h2>
              <button
                onClick={() => setReplaceTarget(null)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReplaceSubmit} className="p-6 space-y-4">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs">
                <span className="text-slate-400">Target File to Overwrite:</span>
                <div className="font-mono text-blue-400 font-bold truncate mt-0.5">
                  {replaceTarget.relativePath}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Upload New Replacement Image *</label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => setReplaceFile(e.target.files?.[0] || null)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm text-slate-400 focus:outline-none file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReplaceTarget(null)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !replaceFile}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/25 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Replacing..." : "Overwrite Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-800 text-[#EE2435] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Delete Asset Image?</h3>
              <p className="text-slate-400 text-xs mt-1">
                Are you sure you want to permanently delete <code className="text-red-400">{deleteTarget.filename}</code> from <code className="text-slate-300">{deleteTarget.relativePath}</code>?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSubmit}
                disabled={submitting}
                className="px-4 py-2 bg-[#EE2435] hover:bg-[#d41c2c] text-white rounded-xl text-xs font-semibold shadow-lg cursor-pointer disabled:opacity-50"
              >
                {submitting ? "Removing..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
