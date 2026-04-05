import fs from "node:fs";
import path from "node:path";

export interface SiteSettings {
  site_title: string;
  site_tagline: string;
  general_email: string;
  media_email: string;
  footer_text: string;
}

const settingsPath = path.join(process.cwd(), "content", "settings", "site-settings.md");

const defaults: SiteSettings = {
  site_title: "Rural Hall Alliance",
  site_tagline: "",
  general_email: "",
  media_email: "",
  footer_text: ""
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
      const val = line.slice(idx + 1).trim();
      data[key] = val.replace(/^"|"$/g, "");
    }
  });
  return data;
}

export function getSiteSettings(): SiteSettings {
  try {
    const raw = fs.readFileSync(settingsPath, "utf8");
    const data = parseFrontmatter(raw);
    return {
      site_title: data.site_title ?? defaults.site_title,
      site_tagline: data.site_tagline ?? defaults.site_tagline,
      general_email: data.general_email ?? defaults.general_email,
      media_email: data.media_email ?? defaults.media_email,
      footer_text: data.footer_text ?? defaults.footer_text
    };
  } catch {
    return { ...defaults };
  }
}
