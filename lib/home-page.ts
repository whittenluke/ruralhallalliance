import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

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

function pickString(data: Record<string, unknown>, key: string): string {
  const v = data[key];
  if (v == null) return "";
  return String(v).trim();
}

export function getHomePageContent(): HomePageContent {
  try {
    const raw = fs.readFileSync(homePath, "utf8");
    const { data } = matter(raw);
    const frontmatter = data as Record<string, unknown>;
    return {
      hero_title: pickString(frontmatter, "hero_title") || defaults.hero_title,
      hero_summary: pickString(frontmatter, "hero_summary") || defaults.hero_summary,
      hero_primary_cta_label:
        pickString(frontmatter, "hero_primary_cta_label") || defaults.hero_primary_cta_label,
      hero_primary_cta_link:
        pickString(frontmatter, "hero_primary_cta_link") || defaults.hero_primary_cta_link,
      hero_secondary_cta_label:
        pickString(frontmatter, "hero_secondary_cta_label") || defaults.hero_secondary_cta_label,
      hero_secondary_cta_link:
        pickString(frontmatter, "hero_secondary_cta_link") || defaults.hero_secondary_cta_link,
      hero_image: pickString(frontmatter, "hero_image"),
      intro_heading: pickString(frontmatter, "intro_heading") || defaults.intro_heading,
      intro_body: pickString(frontmatter, "intro_body") || defaults.intro_body
    };
  } catch {
    return { ...defaults };
  }
}
