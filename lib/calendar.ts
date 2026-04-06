import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface CalendarEntry {
  title: string;
  date: string;
  time?: string;
  location?: string;
  address?: string;
  external_link?: string;
  summary?: string;
}

const calendarDir = path.join(process.cwd(), "content", "calendar");

/** Accepts MM/DD/YYYY (preferred in content) or legacy YYYY-MM-DD. */
export function parseCalendarDateString(dateStr: string): Date | null {
  const s = dateStr.trim();
  if (!s) return null;

  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    const y = Number(iso[1]);
    const mo = Number(iso[2]) - 1;
    const d = Number(iso[3]);
    const dt = new Date(y, mo, d);
    if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return null;
    return dt;
  }

  const us = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (us) {
    const monthIndex = Number(us[1]) - 1;
    const day = Number(us[2]);
    const y = Number(us[3]);
    if (monthIndex < 0 || monthIndex > 11 || day < 1 || day > 31) return null;
    const dt = new Date(y, monthIndex, day);
    if (dt.getFullYear() !== y || dt.getMonth() !== monthIndex || dt.getDate() !== day) {
      return null;
    }
    return dt;
  }

  return null;
}

function ordinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

/** e.g. Monday, April 13th 2026 */
export function formatCalendarDate(dateStr: string): string {
  const dt = parseCalendarDateString(dateStr);
  if (!dt) return dateStr.trim();
  const weekday = dt.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = dt.toLocaleDateString("en-US", { month: "long" });
  const day = dt.getDate();
  const year = dt.getFullYear();
  return `${weekday}, ${monthName} ${day}${ordinalSuffix(day)} ${year}`;
}

function compareEntriesByDate(a: CalendarEntry, b: CalendarEntry, direction: 1 | -1): number {
  const da = parseCalendarDateString(a.date);
  const db = parseCalendarDateString(b.date);
  if (!da && !db) return 0;
  if (!da) return 1;
  if (!db) return -1;
  const cmp = da.getTime() - db.getTime();
  if (cmp === 0) return 0;
  return direction * (cmp > 0 ? 1 : -1);
}

/** Upcoming (today onward) ascending; past descending. Skips entries with invalid dates. */
export function splitCalendarEntries(
  entries: CalendarEntry[],
  reference: Date = new Date()
): { upcoming: CalendarEntry[]; past: CalendarEntry[] } {
  const ref = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate());
  const refMs = ref.getTime();
  const upcoming: CalendarEntry[] = [];
  const past: CalendarEntry[] = [];
  for (const e of entries) {
    const d = parseCalendarDateString(e.date);
    if (!d) continue;
    d.setHours(0, 0, 0, 0);
    if (d.getTime() >= refMs) upcoming.push(e);
    else past.push(e);
  }
  upcoming.sort((a, b) => compareEntriesByDate(a, b, 1));
  past.sort((a, b) => compareEntriesByDate(a, b, -1));
  return { upcoming, past };
}

/** Next upcoming events, soonest first (for home preview). */
export function getUpcomingCalendarPreview(limit: number, reference: Date = new Date()) {
  const n = Math.max(0, Math.floor(limit));
  const { upcoming } = splitCalendarEntries(getCalendarEntries(), reference);
  return upcoming.slice(0, n);
}

export function getCalendarEntries(): CalendarEntry[] {
  const files = fs.readdirSync(calendarDir).filter((f) => f.endsWith(".md"));
  const entries = files.map((filename) => {
    const raw = fs.readFileSync(path.join(calendarDir, filename), "utf8");
    const { data } = matter(raw);
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
      date: str("date"),
      time: opt("time"),
      location: opt("location"),
      address: opt("address"),
      external_link: opt("external_link"),
      summary: opt("summary")
    };
  });
  entries.sort((a, b) => compareEntriesByDate(a, b, 1));
  return entries;
}
