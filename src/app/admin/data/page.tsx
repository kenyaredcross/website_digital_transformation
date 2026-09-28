"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Database, Inbox, Plus, Pencil, Trash2, X, Save, Upload, RefreshCw } from "lucide-react";
import { ADMIN_DOCTYPES, SUBMISSION_DOCTYPES } from "@/lib/frappe/admin-doctypes";

type FieldMeta = { fieldname: string; label?: string; fieldtype: string; options?: string; reqd?: number; description?: string; default?: unknown };
type RecordData = Record<string, unknown>;

const LABELS: Record<string, string> = {
  Person: "People", Projects: "Projects", Countries: "Countries", "Thematic Areas": "Thematic Areas", "Digital Story": "Digital Stories",
  "Knowledge Resource": "Knowledge Resources", "News Item": "News Items", Testimonials: "Testimonials", Innovations: "Innovations",
  Partners: "Partners", Blogs: "Blogs", Site: "Site Configuration", Inquiry: "Inquiries", "Partnership Proposal": "Partnership Proposals", Feedback: "Feedback",
};

function display(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export default function AdminDataPage() {
  const [mode, setMode] = useState<"content" | "inbox">("content");
  const [doctype, setDoctype] = useState<string>(ADMIN_DOCTYPES[0]);
  const [records, setRecords] = useState<RecordData[]>([]);
  const [fields, setFields] = useState<FieldMeta[]>([]);
  const [selectedName, setSelectedName] = useState<string>(SUBMISSION_DOCTYPES[0]);
  const [submissions, setSubmissions] = useState<RecordData[]>([]);
  const [editing, setEditing] = useState<RecordData | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<RecordData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const activeDoctype = mode === "content" ? doctype : selectedName;
  const isEditing = Boolean(editing?.name);

  const loadContent = useCallback(async (target: string) => {
    setLoading(true); setError("");
    try {
      const [schemaResponse, recordsResponse] = await Promise.all([
        fetch(`/api/admin/schema?doctype=${encodeURIComponent(target)}`, { cache: "no-store" }),
        fetch(`/api/admin/records/${encodeURIComponent(target)}?limit=500`, { cache: "no-store" }),
      ]);
      const schema = await schemaResponse.json();
      const data = await recordsResponse.json();
      if (!schemaResponse.ok) throw new Error(schema.error || "Unable to load DocType fields.");
      if (!recordsResponse.ok) throw new Error(data.error || "Unable to load records.");
      setFields(schema.fields || []); setRecords(Array.isArray(data) ? data : []);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to load Frappe records."); }
    finally { setLoading(false); }
  }, []);

  const loadSubmissions = useCallback(async (target: string) => {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/admin/records/${encodeURIComponent(target)}?limit=500`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load submissions.");
      setSubmissions(Array.isArray(data) ? data : []);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to load submissions."); }
    finally { setLoading(false); }
  }, []);

  // These effects synchronize the selected Frappe resource with the visible table.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { if (mode === "content") void loadContent(doctype); }, [mode, doctype, loadContent]);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { if (mode === "inbox") void loadSubmissions(selectedName); }, [mode, selectedName, loadSubmissions]);

  const columns = useMemo(() => {
    if (!records.length) return fields.filter((field) => ["Data", "Link", "Select", "Date", "Check"].includes(field.fieldtype)).slice(0, 6);
    const preferred = ["title", "full_name", "country_name", "partner_name", "author_name", "subject", "proposal_title", "name"];
    const fieldNames = new Set(records.flatMap((record) => Object.keys(record)));
    const keys = preferred.filter((key) => fieldNames.has(key));
    for (const field of fields) if (keys.length < 6 && fieldNames.has(field.fieldname) && !keys.includes(field.fieldname) && !["Table", "Table MultiSelect", "Text Editor", "Code"].includes(field.fieldtype)) keys.push(field.fieldname);
    return keys.slice(0, 6).map((key) => fields.find((field) => field.fieldname === key) || { fieldname: key, label: key, fieldtype: "Data" });
  }, [fields, records]);

  function startCreate() {
    const initial: RecordData = {};
    for (const field of fields) if (field.default !== undefined) initial[field.fieldname] = field.default;
    setEditing(null); setForm(initial); setFormOpen(true); setError(""); setNotice("");
  }

  async function startEdit(record: RecordData) {
    const name = String(record.name || "");
    if (!name) return;
    setError(""); setNotice(""); setLoading(true);
    try {
      const response = await fetch(`/api/admin/records/${encodeURIComponent(doctype)}?name=${encodeURIComponent(name)}`, { cache: "no-store" });
      const fullRecord = await response.json();
      if (!response.ok) throw new Error(fullRecord.error || "Unable to load record details.");
      setEditing(fullRecord); setForm({ ...fullRecord }); setFormOpen(true);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to load record details."); }
    finally { setLoading(false); }
  }

  function updateField(field: FieldMeta, value: unknown) { setForm((previous) => ({ ...previous, [field.fieldname]: value })); }

  async function uploadFile(field: FieldMeta, file?: File) {
    if (!file) return;
    const body = new FormData(); body.set("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "File upload failed.");
    updateField(field, result.file_url);
  }

  async function saveRecord(event: React.FormEvent) {
    event.preventDefault(); setError(""); setNotice("");
    try {
      const editableNames = new Set(fields.map((field) => field.fieldname));
      const payload = Object.fromEntries(Object.entries(form).filter(([key]) => key === "name" || editableNames.has(key)));
      for (const field of fields) if (["Table", "Table MultiSelect"].includes(field.fieldtype) && typeof payload[field.fieldname] === "string") payload[field.fieldname] = JSON.parse(payload[field.fieldname] as string);
      const response = await fetch(`/api/admin/records/${encodeURIComponent(doctype)}`, {
        method: isEditing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save record.");
      setEditing(null); setForm({}); setFormOpen(false); setNotice(isEditing ? "Record updated in Frappe." : "Record created in Frappe.");
      await loadContent(doctype);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to save record."); }
  }

  async function deleteRecord(record: RecordData) {
    const name = String(record.name || "");
    if (!name || !window.confirm(`Delete ${name} from ${doctype}? This cannot be undone.`)) return;
    setError(""); setNotice("");
    try {
      const response = await fetch(`/api/admin/records/${encodeURIComponent(doctype)}?name=${encodeURIComponent(name)}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to delete record.");
      setNotice("Record deleted from Frappe."); await loadContent(doctype);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to delete record."); }
  }

  function renderInput(field: FieldMeta) {
    const value = form[field.fieldname];
    const common = "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500";
    if (field.fieldname === "name" && isEditing) return <input className={`${common} opacity-60`} value={String(value || "")} disabled />;
    if (field.fieldtype === "Check") return <input type="checkbox" checked={Boolean(Number(value) || value === true)} onChange={(event) => updateField(field, event.target.checked ? 1 : 0)} className="h-4 w-4 accent-red-500" />;
    if (field.fieldtype === "Select") {
      const options = (field.options || "").split("\n").filter(Boolean);
      return <select className={common} value={String(value ?? "")} required={Boolean(field.reqd)} onChange={(event) => updateField(field, event.target.value)}><option value="">Select…</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>;
    }
    if (["Attach", "Attach Image"].includes(field.fieldtype)) return <div className="space-y-2"><input className={common} value={String(value || "")} placeholder="/files/asset.jpg" onChange={(event) => updateField(field, event.target.value)} /><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-300 hover:bg-slate-700"><Upload className="h-3.5 w-3.5" />Upload to Frappe<input type="file" accept={field.fieldtype === "Attach Image" ? "image/*" : undefined} className="hidden" onChange={(event) => void uploadFile(field, event.target.files?.[0]).catch((e) => setError(e instanceof Error ? e.message : "Upload failed."))} /></label>{typeof value === "string" && value.startsWith("/files/") && <a className="text-xs text-sky-400 underline" href={`${process.env.NEXT_PUBLIC_FRAPPE_API_URL || "http://redcross.local:8000"}${value}`} target="_blank">Preview attachment</a>}</div>;
    if (["Text", "Long Text", "Text Editor", "Code", "JSON", "Table", "Table MultiSelect"].includes(field.fieldtype)) {
      const shown = typeof value === "string" ? value : value == null ? (field.fieldtype.includes("Table") ? "[]" : "") : JSON.stringify(value, null, 2);
      return <textarea className={`${common} min-h-28 font-mono text-xs`} required={Boolean(field.reqd)} value={shown} placeholder={field.fieldtype.includes("Table") ? "Enter a JSON array of child rows" : ""} onChange={(event) => updateField(field, event.target.value)} />;
    }
    const type = field.fieldtype === "Date" ? "date" : field.fieldtype === "Datetime" ? "datetime-local" : field.fieldtype === "Int" ? "number" : field.fieldtype === "Check" ? "checkbox" : "text";
    return <input className={common} type={type} required={Boolean(field.reqd)} value={String(value ?? "")} onChange={(event) => updateField(field, field.fieldtype === "Int" ? Number(event.target.value) : event.target.value)} />;
  }

  return <div className="space-y-6">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-red-400">Frappe administration</p><h1 className="mt-1 text-2xl font-bold text-white">Data & submissions</h1><p className="mt-1 text-sm text-slate-400">Create, view, update and delete website records in Frappe.</p></div>
      <div className="flex gap-2"><button onClick={() => { setMode("content"); setEditing(null); setFormOpen(false); }} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm ${mode === "content" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"}`}><Database className="h-4 w-4" />Content</button><button onClick={() => { setMode("inbox"); setEditing(null); setFormOpen(false); }} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm ${mode === "inbox" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"}`}><Inbox className="h-4 w-4" />Submissions</button></div>
    </div>
    {error && <div className="rounded-lg border border-red-900 bg-red-950/50 p-3 text-sm text-red-200">{error}</div>}{notice && <div className="rounded-lg border border-emerald-900 bg-emerald-950/40 p-3 text-sm text-emerald-200">{notice}</div>}

    <div className="flex flex-wrap items-end justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
      <label className="min-w-64 flex-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{mode === "content" ? "DocType" : "Submission inbox"}<select className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white" value={activeDoctype} onChange={(event) => mode === "content" ? (setDoctype(event.target.value), setEditing(null), setForm({}), setFormOpen(false)) : setSelectedName(event.target.value)}>{(mode === "content" ? ADMIN_DOCTYPES : SUBMISSION_DOCTYPES).map((item) => <option key={item} value={item}>{LABELS[item] || item}</option>)}</select></label>
      <div className="flex gap-2"><button onClick={() => mode === "content" ? void loadContent(doctype) : void loadSubmissions(selectedName)} className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2.5 text-sm text-slate-200 hover:bg-slate-700"><RefreshCw className="h-4 w-4" />Refresh</button>{mode === "content" && <button onClick={startCreate} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-red-500"><Plus className="h-4 w-4" />New record</button>}</div>
    </div>

    {mode === "content" && formOpen && <form onSubmit={saveRecord} className="rounded-xl border border-slate-800 bg-slate-900 p-5"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold text-white">{isEditing ? `Edit ${String(editing?.name)}` : `New ${LABELS[doctype] || doctype} record`}</h2><button type="button" onClick={() => { setEditing(null); setForm({}); setFormOpen(false); }} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"><X className="h-4 w-4" /></button></div><div className="grid gap-4 md:grid-cols-2">{fields.map((field) => <label key={field.fieldname} className={`block text-xs font-medium text-slate-300 ${["Text", "Long Text", "Text Editor", "Code", "JSON", "Table", "Table MultiSelect"].includes(field.fieldtype) ? "md:col-span-2" : ""}`}><span className="mb-1.5 block">{field.label || field.fieldname}{field.reqd ? <span className="text-red-400"> *</span> : null}</span>{renderInput(field)}{field.description && <span className="mt-1 block text-[11px] text-slate-500">{field.description}</span>}</label>)}</div><button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white"><Save className="h-4 w-4" />{isEditing ? "Save changes" : "Create record"}</button></form>}

    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900"><div className="flex items-center justify-between border-b border-slate-800 px-4 py-3"><h2 className="font-semibold text-white">{LABELS[activeDoctype] || activeDoctype}</h2><span className="text-xs text-slate-500">{mode === "content" ? `${records.length} records` : `${submissions.length} submissions`}</span></div>{loading ? <div className="p-10 text-center text-sm text-slate-400">Loading from Frappe…</div> : mode === "content" ? records.length === 0 ? <p className="p-10 text-center text-sm text-slate-500">No records found.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-950/70 text-xs uppercase tracking-wide text-slate-500"><tr>{columns.map((column) => <th key={column.fieldname} className="px-4 py-3">{column.label || column.fieldname}</th>)}<th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-800">{records.map((record, index) => <tr key={String(record.name || index)} className="hover:bg-slate-800/40">{columns.map((column) => <td key={column.fieldname} className="max-w-sm truncate px-4 py-3 text-slate-300" title={display(record[column.fieldname])}>{column.fieldtype === "Check" ? (record[column.fieldname] ? "Yes" : "No") : display(record[column.fieldname])}</td>)}<td className="whitespace-nowrap px-4 py-3 text-right"><button onClick={() => startEdit(record)} title="Edit" className="mr-1 rounded-md p-2 text-sky-300 hover:bg-slate-700"><Pencil className="h-4 w-4" /></button><button onClick={() => void deleteRecord(record)} title="Delete" className="rounded-md p-2 text-red-300 hover:bg-slate-700"><Trash2 className="h-4 w-4" /></button></td></tr>)}</tbody></table></div> : submissions.length === 0 ? <p className="p-10 text-center text-sm text-slate-500">No submissions found.</p> : <div className="divide-y divide-slate-800">{submissions.map((record, index) => <details key={String(record.name || index)} className="group px-4 py-3"><summary className="flex cursor-pointer list-none items-center justify-between gap-4"><span className="min-w-0"><span className="block truncate font-medium text-white">{display(record.subject || record.proposal_title || record.full_name || record.organization || record.name)}</span><span className="mt-1 block truncate text-xs text-slate-500">{display(record.full_name || record.contact_person || record.email)} · {display(record.submitted_at || record.creation)}</span></span><span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">{display(record.status)}</span></summary><dl className="mt-4 grid gap-x-6 gap-y-3 border-t border-slate-800 pt-4 sm:grid-cols-2">{Object.entries(record).filter(([key, value]) => value != null && !["doctype", "docstatus", "idx", "owner", "modified_by"].includes(key) && typeof value !== "object").map(([key, value]) => <div key={key}><dt className="text-[10px] uppercase tracking-wider text-slate-500">{key.replaceAll("_", " ")}</dt><dd className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-200">{display(value)}</dd></div>)}</dl></details>)}</div>}</div>
    <p className="text-xs text-slate-500">The submissions inbox is read-only. Record changes are checked and saved by Frappe using your System Manager session.</p>
  </div>;
}
