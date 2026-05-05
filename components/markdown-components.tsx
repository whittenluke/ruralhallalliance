import type { Components } from "react-markdown";
import { anchorPropsForHref } from "@/lib/external-link";

/** Shared anchors for ReactMarkdown: external http(s) opens new tab. */
export const markdownComponents: Components = {
  a: ({ href, children, ...props }) => (
    <a href={href} {...props} {...anchorPropsForHref(String(href ?? ""))}>
      {children}
    </a>
  )
};
