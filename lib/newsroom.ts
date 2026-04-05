import fs from "node:fs";
import path from "node:path";

export interface NewsroomEntryMeta {
  title: string;
  slug: string;
  date: string;
  category: string;
  summary: string;
}

const newsroomDir = path.join(process.cwd(), "content", "newsroom");

function parseFrontmatter(fileContent: string): { data: Record<string, any>; body: string } {
  // Minimal frontmatter parser for key: value pairs and simple multi-line body
  if (!fileContent.startsWith("---")) return { data: {}, body: fileContent };
  const end = fileContent.indexOf("---", 3);
  const head = fileContent.slice(3, end).trim();
  const body = fileContent.slice(end + 3).trim();
  const data: Record<string, any> = {};
  head.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > -1) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      data[key] = val.replace(/^"|"$/g, "");
    }
  });
  return { data, body };
}

export function getAllNewsroomEntries(): Array<NewsroomEntryMeta & { body: string }> {
  const files = fs.readdirSync(newsroomDir).filter((f) => f.endsWith(".md"));
  const entries = files.map((filename) => {
    const content = fs.readFileSync(path.join(newsroomDir, filename), "utf8");
    const { data, body } = parseFrontmatter(content);
    return {
      title: String(data.title || ""),
      slug: String(data.slug || path.basename(filename, ".md")),
      date: String(data.date || ""),
      category: String(data.category || ""),
      summary: String(data.summary || ""),
      body
    };
  });
  entries.sort((a, b) => (a.date < b.date ? 1 : -1));
  return entries;
}

export function getNewsroomEntryBySlug(slug: string) {
  const entries = getAllNewsroomEntries();
  return entries.find((e) => e.slug === slug) || null;
}

/** Human-readable date for lists and article headers (handles YYYY-MM-DD and ISO datetimes). */
export function formatNewsroomDisplayDate(dateStr: string): string {
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
