#!/usr/bin/env node
/**
 * Uploads partner logos to Frappe and updates each Partners DocType record
 * with the returned /files/... path.
 *
 * Usage: node upload-partner-logos.mjs
 */

const FRAPPE_BASE = "http://redcross.local:8000";
const fs = await import("fs");
const path = await import("path");
const FormData = (await import("form-data")).default;
const fetch = (await import("node-fetch")).default;

// Map: Partners DocType "name" (external_id) → local image path
const PARTNER_LOGOS = [
  { name: "esa",                  file: "public/assets/images/partners/esa.jpg" },
  { name: "safaricom-foundation", file: "public/assets/images/partners/safaricom_foundation.png" },
  { name: "university-nairobi",   file: "public/assets/images/partners/uon.jpg" },
  { name: "world-bank",           file: "public/assets/images/partners/GFDRR.jpeg" },
  { name: "google-org",           file: "public/assets/images/partners/google.jpg" },
  { name: "un-ocha",              file: "public/assets/images/partners/ocha.jpg" },
  { name: "icrc",                 file: "public/assets/images/partners/icrc.jpg" },
  { name: "ifrc",                 file: "public/assets/images/partners/ifrc.jpg" },
  { name: "krcs",                 file: "public/assets/images/logo/KRCS_logo.jpeg" },
];

const REPO_ROOT = new URL(".", import.meta.url).pathname;

async function uploadFile(localPath) {
  const absPath = path.join(REPO_ROOT, localPath);
  const filename = path.basename(absPath);
  const fileBuffer = fs.readFileSync(absPath);

  const form = new FormData();
  form.append("file", fileBuffer, { filename });
  form.append("is_private", "0");
  form.append("folder", "Home/Attachments");

  const res = await fetch(`${FRAPPE_BASE}/api/method/upload_file`, {
    method: "POST",
    headers: form.getHeaders(),
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed for ${filename}: ${res.status} ${text}`);
  }

  const json = await res.json();
  // Frappe returns { message: { file_url: "/files/..." } }
  const fileUrl = json?.message?.file_url;
  if (!fileUrl) throw new Error(`No file_url in response for ${filename}: ${JSON.stringify(json)}`);
  return fileUrl;
}

async function updatePartnerLogo(docName, fileUrl) {
  const res = await fetch(
    `${FRAPPE_BASE}/api/method/redcross_digital.api.update_doc`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctype: "Partners", name: docName, data: { logo: fileUrl } }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Update failed for ${docName}: ${res.status} ${text}`);
  }

  return res.json();
}

for (const { name, file } of PARTNER_LOGOS) {
  process.stdout.write(`[${name}] Uploading ${file} ... `);
  try {
    const fileUrl = await uploadFile(file);
    process.stdout.write(`→ ${fileUrl}  `);
    await updatePartnerLogo(name, fileUrl);
    console.log("✓ updated");
  } catch (err) {
    console.error(`\n  ✗ ERROR: ${err.message}`);
  }
}

console.log("\nDone.");
