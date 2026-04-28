import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

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

/** YAML/Decap sometimes writes `null` or `~` — treat as empty so we don’t render mailto:null */
function normalizeOptionalString(v: unknown): string {
  const s = v == null ? "" : String(v).trim();
  if (!s) return "";
  const lower = s.toLowerCase();
  if (lower === "null" || lower === "~" || lower === "undefined") return "";
  return s;
}

export function getMediaPageContent(): MediaPageContent {
  try {
    const raw = fs.readFileSync(mediaPath, "utf8");
    const { data } = matter(raw);
    const frontmatter = data as Record<string, unknown>;
    return {
      title: normalizeOptionalString(frontmatter.title) || defaults.title,
      /* Empty in Decap should mean no lede — don’t substitute copy from defaults */
      summary: normalizeOptionalString(frontmatter.summary),
      media_email: normalizeOptionalString(frontmatter.media_email) || defaults.media_email
    };
  } catch {
    return { ...defaults };
  }
}
