"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, type HTMLAttributes } from "react";
import { primaryNav } from "@/lib/navigation";

function navLinkIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type SiteHeaderProps = {
  siteTitle: string;
};

export function SiteHeader({ siteTitle }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState<boolean | null>(null);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const sync = () => setIsMobileNav(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (isMobileNav === false) setOpen(false);
  }, [isMobileNav]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const inertDrawer = isMobileNav === true && !open;

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link className="brand" href="/" aria-label={siteTitle}>
          <img src="/rural-hall-alliance-logo-dark.png" alt={siteTitle} />
        </Link>

        <button
          type="button"
          className="site-header-menu-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          <span className="site-header-menu-bars" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>

        {open && isMobileNav ? (
          <button
            type="button"
            className="site-header-backdrop"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
          />
        ) : null}

        <div
          id={panelId}
          className={`site-header-panel${open ? " site-header-panel--open" : ""}`}
          // inert: keep focus out of the drawer when closed on small screens
          {...(inertDrawer ? { inert: true } : {})}
        >
          <nav className="site-header-nav" aria-label="Primary">
            {primaryNav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={navLinkIsActive(pathname, href) ? "is-active" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            className="btn btn-primary site-header-cta"
            href="/media"
            onClick={() => setOpen(false)}
          >
            Media Inquiries
          </Link>
        </div>
      </div>
    </header>
  );
}
