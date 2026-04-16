import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Inter, Newsreader } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { primaryNav } from "@/lib/navigation";
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
  "Official site for Rural Hall Alliance: news, membership, media inquiries, and community resources.";

export async function generateMetadata(): Promise<Metadata> {
  const s = getSiteSettings();
  return {
    title: s.site_title,
    description: s.site_tagline?.trim() ? s.site_tagline : defaultDescription,
    manifest: "/favicons/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicons/favicon.ico" },
        { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" }
      ],
      apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
    }
  };
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const settings = getSiteSettings();

  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className={inter.className}>
        <SiteHeader siteTitle={settings.site_title} />
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <nav className="footer-nav" aria-label="Footer">
              {primaryNav.map(({ href, label }) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
              <a href="/media">Media Inquiries</a>
            </nav>
            <div className="footer-meta">
              <Link className="footer-brand" href="/">
                <img
                  className="footer-logo"
                  src="/rural-hall-alliance-logo-dark.png"
                  alt={settings.site_title}
                />
              </Link>
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
