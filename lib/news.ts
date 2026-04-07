import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface NewsEntryMeta {
  title: string;
  slug: string;
  date: string;
  category: string;
  summary: string;
  /** Public URL path from Decap `public_folder`, e.g. `/uploads/photo.webp` */
  featured_image?: string;
}

const newsDir = path.join(process.cwd(), "content", "news");

/** Ensures paths from CMS resolve under `public/`. */
export function normalizePublicAssetPath(urlOrPath: string): string {
  const s = urlOrPath.trim();
  if (!s) return "";
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  return s.startsWith("/") ? s : `/${s}`;
}

export function getAllNewsEntries(): Array<NewsEntryMeta & { body: string }> {
  if (!fs.existsSync(newsDir)) {
    return [];
  }
  const files = fs.readdirSync(newsDir).filter((f) => f.endsWith(".md"));
  const entries = files.map((filename) => {
    const raw = fs.readFileSync(path.join(newsDir, filename), "utf8");
    const { data, content } = matter(raw);
    const d = data as Record<string, unknown>;
    const str = (k: string) => (d[k] == null ? "" : String(d[k]).trim());
    const opt = (k: string) => {
      const v = d[k];
      if (v == null) return undefined;
      const s = String(v).trim();
      return s || undefined;
    };
    return {
      title: str("title"),
      slug: str("slug") || path.basename(filename, ".md"),
      date: str("date"),
      category: str("category"),
      summary: str("summary"),
      featured_image: opt("featured_image"),
      body: content.trim()
    };
  });
  entries.sort((a, b) => (a.date < b.date ? 1 : -1));
  return entries;
}

export function getNewsEntryBySlug(slug: string) {
  const entries = getAllNewsEntries();
  return entries.find((e) => e.slug === slug) || null;
}

/** Newest-first slice for home and previews. */
export function getLatestNewsEntries(limit: number) {
  const n = Math.max(0, Math.floor(limit));
  return getAllNewsEntries().slice(0, n);
}

/** Human-readable date for lists and article headers (handles YYYY-MM-DD and ISO datetimes). */
export function formatNewsDisplayDate(dateStr: string): string {
  const s = dateStr.trim();
  if (!s) return "";
  const d = s.includes("T") ? new Date(s) : new Date(`${s}T12:00:00`);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
