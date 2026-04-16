import fs from "node:fs";
import path from "node:path";

export interface HomePageContent {
  hero_title: string;
  hero_summary: string;
  hero_primary_cta_label: string;
  hero_primary_cta_link: string;
  hero_secondary_cta_label: string;
  hero_secondary_cta_link: string;
  hero_image: string;
  intro_heading: string;
  intro_body: string;
}

const homePath = path.join(process.cwd(), "content", "pages", "home.md");

const defaults: HomePageContent = {
  hero_title: "Rural Hall Alliance",
  hero_summary: "",
  hero_primary_cta_label: "View News",
  hero_primary_cta_link: "/news",
  hero_secondary_cta_label: "Calendar",
  hero_secondary_cta_link: "/calendar",
  hero_image: "",
  intro_heading: "",
  intro_body: ""
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

export function getHomePageContent(): HomePageContent {
  try {
    const raw = fs.readFileSync(homePath, "utf8");
    const data = parseFrontmatter(raw);
    return {
      hero_title: data.hero_title ?? defaults.hero_title,
      hero_summary: data.hero_summary ?? defaults.hero_summary,
      hero_primary_cta_label: data.hero_primary_cta_label ?? defaults.hero_primary_cta_label,
      hero_primary_cta_link: data.hero_primary_cta_link ?? defaults.hero_primary_cta_link,
      hero_secondary_cta_label: data.hero_secondary_cta_label ?? defaults.hero_secondary_cta_label,
      hero_secondary_cta_link: data.hero_secondary_cta_link ?? defaults.hero_secondary_cta_link,
      hero_image: (data.hero_image ?? "").trim(),
      intro_heading: data.intro_heading ?? defaults.intro_heading,
      intro_body: data.intro_body ?? defaults.intro_body
    };
  } catch {
    return { ...defaults };
  }
}
