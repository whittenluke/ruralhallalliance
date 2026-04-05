import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { getSiteSettings } from "@/lib/site-settings";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap"
});

const defaultDescription =
  "Official site for Rural Hall Alliance: newsroom, membership, media inquiries, and community resources.";

export async function generateMetadata(): Promise<Metadata> {
  const s = getSiteSettings();
  return {
    title: s.site_title,
    description: s.site_tagline?.trim() ? s.site_tagline : defaultDescription
  };
}

const headerNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "/membership", label: "Membership" },
  { href: "/calendar", label: "Calendar" },
  { href: "/contact", label: "Contact" }
] as const;

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const settings = getSiteSettings();

  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className={inter.className}>
        <header className="site-header">
          <div className="container">
            <a className="brand" href="/" aria-label={settings.site_title}>
              <img
                src="/rural-hall-alliance-logo-dark.png"
                alt={settings.site_title}
              />
            </a>
            <div className="site-header-actions">
              <nav className="nav" aria-label="Primary">
                {headerNav.map(({ href, label }) => (
                  <a key={href} href={href}>
                    {label}
                  </a>
                ))}
              </nav>
              <a className="btn btn-primary header-cta" href="/media">
                Media Inquiries
              </a>
            </div>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <nav className="footer-nav" aria-label="Footer">
              {headerNav.map(({ href, label }) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
              <a href="/media">Media Inquiries</a>
            </nav>
            <div className="footer-meta">
              <p className="org-name">{settings.site_title}</p>
              {(settings.general_email || settings.media_email) && (
                <p className="footer-emails">
                  {settings.general_email ? (
                    <>
                      <a href={`mailto:${settings.general_email}`}>
                        {settings.general_email}
                      </a>
                      {settings.media_email ? " · " : ""}
                    </>
                  ) : null}
                  {settings.media_email ? (
                    <a href={`mailto:${settings.media_email}`}>
                      {settings.media_email}
                    </a>
                  ) : null}
                </p>
              )}
              {settings.footer_text ? (
                <p className="footer-legal">{settings.footer_text}</p>
              ) : (
                <p className="footer-legal">
                  &copy; {new Date().getFullYear()} {settings.site_title}
                </p>
              )}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
