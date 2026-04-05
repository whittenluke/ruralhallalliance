import fs from "node:fs";
import path from "node:path";

export interface CalendarEntry {
  title: string;
  date: string;
  time?: string;
  location?: string;
  external_link?: string;
  summary?: string;
}

const calendarDir = path.join(process.cwd(), "content", "calendar");

function parseFrontmatter(fileContent: string): Record<string, string> {
  if (!fileContent.startsWith("---")) return {};
  const end = fileContent.indexOf("---", 3);
  const head = fileContent.slice(3, end).trim();
  const data: Record<string, string> = {};
  head.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > -1) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      data[key] = val.replace(/^"|"$/g, "");
    }
  });
  return data;
}

export function getCalendarEntries(): CalendarEntry[] {
  const files = fs.readdirSync(calendarDir).filter((f) => f.endsWith(".md"));
  const entries = files.map((filename) => {
    const content = fs.readFileSync(path.join(calendarDir, filename), "utf8");
    const data = parseFrontmatter(content);
    return {
      title: String(data.title || ""),
      date: String(data.date || ""),
      time: data.time,
      location: data.location,
      external_link: data.external_link,
      summary: data.summary
    };
  });
  entries.sort((a, b) => (a.date > b.date ? 1 : -1));
  return entries;
}
