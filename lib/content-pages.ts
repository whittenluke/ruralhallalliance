import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const pagesDir = path.join(process.cwd(), "content", "pages");

/** Treat NBSP-only / whitespace-only CMS values as empty so optional fields don’t “stick”. */
function pickString(data: Record<string, unknown>, key: string): string {
  const v = data[key];
  if (v == null) return "";
  const s = String(v).replace(/\u00a0/g, " ").trim();
  return s.replace(/^[\s\u200b\u200c\u200d\u2060\ufeff]+$/u, "") ? s : "";
}

function readPage(basename: string): { data: Record<string, unknown>; content: string } {
  try {
    const raw = fs.readFileSync(path.join(pagesDir, `${basename}.md`), "utf8");
    const { data, content } = matter(raw);
    return { data: data as Record<string, unknown>, content: content.trim() };
  } catch {
    return { data: {}, content: "" };
  }
}

export interface PageTitleSummary {
  title: string;
  summary: string;
}

export function getCalendarPageContent(): PageTitleSummary {
  const defaults: PageTitleSummary = {
    title: "Calendar",
    summary:
      "Meetings and local events. Upcoming items are listed first, followed by past events."
  };
  const { data } = readPage("calendar-page");
  return {
    title: pickString(data, "title") || defaults.title,
    summary: pickString(data, "summary") || defaults.summary
  };
}

export function getNewsPageContent(): PageTitleSummary {
  const defaults: PageTitleSummary = {
    title: "News",
    summary: "A public archive of official communications."
  };
  const { data } = readPage("news-page");
  return {
    title: pickString(data, "title") || defaults.title,
    summary: pickString(data, "summary") || defaults.summary
  };
}

export function getMembershipPageContent(): PageTitleSummary {
  const defaults: PageTitleSummary = {
    title: "Membership",
    summary:
      "Structured intake path for people interested in joining or participating."
  };
  const { data } = readPage("membership");
  return {
    title: pickString(data, "title") || defaults.title,
    summary: pickString(data, "summary") || defaults.summary
  };
}

export interface ContactPageContent extends PageTitleSummary {
  general_email: string;
}

export function getContactPageContent(): ContactPageContent {
  const defaults: ContactPageContent = {
    title: "Contact Us",
    summary: "General communication channel for non-media inquiries.",
    general_email: ""
  };
  const { data } = readPage("contact");
  return {
    title: pickString(data, "title") || defaults.title,
    summary: pickString(data, "summary") || defaults.summary,
    general_email: pickString(data, "general_email") || defaults.general_email
  };
}

export interface GovernancePageContent extends PageTitleSummary {
  body: string;
}

export function getGovernancePageContent(): GovernancePageContent {
  const defaults: GovernancePageContent = {
    title: "Governance",
    summary: "",
    body: ""
  };
  const { data, content } = readPage("governance");
  return {
    title: pickString(data, "title") || defaults.title,
    summary: pickString(data, "summary") || defaults.summary,
    // Decap "Body" content should be the source of truth; frontmatter `body`
    // is kept only as fallback for legacy entries.
    body: content || pickString(data, "body") || defaults.body
  };
}

export interface AboutPageContent {
  title: string;
  summary: string;
  mission_heading: string;
  mission_body: string;
  who_we_serve_heading: string;
  who_we_serve_body: string;
  body: string;
}

export function getAboutPageContent(): AboutPageContent {
  const defaults: AboutPageContent = {
    title: "About Us",
    summary:
      "This page explains who the organization is, what it exists to do, and who it represents.",
    mission_heading: "",
    mission_body: "",
    who_we_serve_heading: "",
    who_we_serve_body: "",
    body: ""
  };
  const { data } = readPage("about");
  return {
    title: pickString(data, "title") || defaults.title,
    summary: pickString(data, "summary") || defaults.summary,
    mission_heading: pickString(data, "mission_heading") || defaults.mission_heading,
    mission_body: pickString(data, "mission_body") || defaults.mission_body,
    who_we_serve_heading:
      pickString(data, "who_we_serve_heading") || defaults.who_we_serve_heading,
    who_we_serve_body: pickString(data, "who_we_serve_body") || defaults.who_we_serve_body,
    body: pickString(data, "body") || defaults.body
  };
}
