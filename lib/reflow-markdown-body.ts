/**
 * Normalizes pasted / hard-wrapped prose so Markdown renders full-width paragraphs
 * instead of many short lines (classic book or HTML paste into the CMS).
 */

const FENCE_TOKEN = (i: number) => `\n\n<<<FENCE${i}>>>\n\n`;

function isListBlock(p: string): boolean {
  const lines = p.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length < 2) return false;
  return lines.every(
    (l) =>
      /^\s{0,3}[-*+]\s/.test(l) ||
      /^\s{0,3}\d{1,3}\.\s/.test(l)
  );
}

function looksLikeTable(p: string): boolean {
  const lines = p.split("\n").filter((l) => l.includes("|"));
  return lines.length >= 2;
}

function isStructuralBlock(p: string): boolean {
  const t = p.trim();
  if (!t) return true;
  if (/^<<<FENCE\d+>>>$/.test(t)) return true;
  if (/^#{1,6}\s/.test(t)) return true;
  if (isListBlock(t)) return true;
  if (looksLikeTable(t)) return true;
  if (/^>\s/.test(t)) return true;
  /* Single list-item line — don’t merge into adjacent prose */
  if (/^\s{0,3}[-*+]\s\S/.test(t)) return true;
  if (/^\s{0,3}\d{1,3}\.\s\S/.test(t)) return true;
  return false;
}

/** Collapse hard line breaks inside a prose fragment to spaces. */
function reflowLinesToParagraph(p: string): string {
  return p
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .join(" ")
    .replace(/[ \t]+/g, " ")
    .trim();
}

/**
 * Merge consecutive short one-line “paragraphs” (common when HTML uses <p> per sentence
 * or each line became its own block after paste).
 */
function mergeShortParagraphRuns(blocks: string[], shortMax = 240): string[] {
  const out: string[] = [];
  let run = "";

  const flush = () => {
    if (run) {
      out.push(run);
      run = "";
    }
  };

  for (const raw of blocks) {
    const t = raw.trim();
    if (!t) continue;

    if (isStructuralBlock(t)) {
      flush();
      if (/^<<<FENCE\d+>>>$/.test(t)) {
        out.push(t);
      } else if (/^#{1,6}\s/.test(t)) {
        const lines = t.split("\n");
        const head = lines[0];
        const rest = lines.slice(1).join("\n").trim();
        out.push(rest ? `${head}\n\n${reflowLinesToParagraph(rest)}` : head);
      } else {
        out.push(t);
      }
      continue;
    }

    const singleLine = !t.includes("\n");
    const short = t.length <= shortMax;

    if (singleLine && short) {
      run = run ? `${run} ${t}` : t;
    } else {
      flush();
      out.push(singleLine ? t : reflowLinesToParagraph(t));
    }
  }
  flush();
  return out;
}

/**
 * Prepare markdown body for ReactMarkdown: reflow hard-wrapped book/HTML pastes into
 * proper paragraphs so text wraps at the container edge.
 */
export function reflowMarkdownBodyForNews(body: string): string {
  const trimmed = body.trim();
  if (!trimmed) return "";

  const fences: string[] = [];
  let text = trimmed.replace(/```[\s\S]*?```/g, (fence) => {
    const i = fences.length;
    fences.push(fence);
    return FENCE_TOKEN(i);
  });

  const segments = text.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);

  const reflowed = segments.map((segment) => {
    if (/^<<<FENCE(\d+)>>>$/.exec(segment)) return segment;
    if (isStructuralBlock(segment) && !/^#{1,6}\s/.test(segment)) return segment;
    if (/^#{1,6}\s/.test(segment)) {
      const lines = segment.split("\n");
      const head = lines[0];
      const rest = lines.slice(1).join("\n");
      if (!rest.trim()) return head;
      return `${head}\n\n${reflowLinesToParagraph(rest)}`;
    }
    return reflowLinesToParagraph(segment);
  });

  const merged = mergeShortParagraphRuns(reflowed);

  let out = merged.join("\n\n");

  out = out.replace(/<<<FENCE(\d+)>>>/g, (_, id) => fences[Number(id)] ?? "");

  return out.replace(/\n{3,}/g, "\n\n").trim();
}
