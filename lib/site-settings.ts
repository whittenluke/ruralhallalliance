import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

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

function pickString(data: Record<string, unknown>, key: string): string {
  const v = data[key];
  if (v == null) return "";
  return String(v).trim();
}

export function getSiteSettings(): SiteSettings {
  try {
    const raw = fs.readFileSync(settingsPath, "utf8");
    const { data } = matter(raw);
    const frontmatter = data as Record<string, unknown>;
    return {
      site_title: pickString(frontmatter, "site_title") || defaults.site_title,
      site_tagline: pickString(frontmatter, "site_tagline") || defaults.site_tagline,
      general_email: pickString(frontmatter, "general_email") || defaults.general_email,
      media_email: pickString(frontmatter, "media_email") || defaults.media_email,
      footer_text: pickString(frontmatter, "footer_text") || defaults.footer_text
    };
  } catch {
    return { ...defaults };
  }
}
