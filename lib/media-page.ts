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

export function getMediaPageContent(): MediaPageContent {
  try {
    const raw = fs.readFileSync(mediaPath, "utf8");
    const data = parseFrontmatter(raw);
    return {
      title: data.title?.trim() || defaults.title,
      summary: data.summary?.trim() || defaults.summary,
      media_email: data.media_email?.trim() || defaults.media_email
    };
  } catch {
    return { ...defaults };
  }
}
