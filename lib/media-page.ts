import fs from "node:fs";
import path from "node:path";

export interface MediaPageContent {
  title: string;
  summary: string;
  media_email: string;
}

const mediaPath = path.join(process.cwd(), "content", "pages", "media.md");

const defaults: MediaPageContent = {
  title: "Media Inquiries",
  summary: "Direct, professional contact path for reporters.",
  media_email: ""
};

function parseFrontmatter(fileContent: string): Record<string, string> {
  if (!fileContent.startsWith("---")) return {};
  const end = fileContent.indexOf("---", 3);
  if (end === -1) return {};
  const head = fileContent.slice(3, end).trim();
  const data: Record<string, string> = {};
  head.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > -1) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      data[key] = val;
    }
  });
  return data;
}

/** YAML/Decap sometimes writes `null` or `~` — treat as empty so we don’t render mailto:null */
function normalizeOptionalString(v: string | undefined): string {
  const s = (v ?? "").trim();
  if (!s) return "";
  const lower = s.toLowerCase();
  if (lower === "null" || lower === "~" || lower === "undefined") return "";
  return s;
}

export function getMediaPageContent(): MediaPageContent {
  try {
    const raw = fs.readFileSync(mediaPath, "utf8");
    const data = parseFrontmatter(raw);
    return {
      title: data.title?.trim() || defaults.title,
      /* Empty in Decap should mean no lede — don’t substitute copy from defaults */
      summary: normalizeOptionalString(data.summary),
      media_email: normalizeOptionalString(data.media_email) || defaults.media_email
    };
  } catch {
    return { ...defaults };
  }
}
