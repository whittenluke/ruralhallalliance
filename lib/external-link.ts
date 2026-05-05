import type { AnchorHTMLAttributes } from "react";

/**
 * Full URL or protocol-relative → open in new tab; paths (/news), relative, mailto, tel stay same tab.
 */
export function anchorPropsForHref(href: string): Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel"
> {
  const h = href.trim();
  if (!h) return {};
  if (/^mailto:|^tel:/i.test(h)) return {};
  if (h.startsWith("/") && !h.startsWith("//")) return {};
  if (/^https?:\/\//i.test(h) || h.startsWith("//")) {
    return { target: "_blank", rel: "noopener noreferrer" };
  }
  return {};
}
