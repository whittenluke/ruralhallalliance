import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rural Hall Alliance",
  description:
    "Official site for Rural Hall Alliance: newsroom, membership, media inquiries, and community resources."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <a className="brand" href="/" aria-label="Rural Hall Alliance">
              <img
                src="/uploads/rural-hall-alliance-logo-light.svg"
                alt="Rural Hall Alliance"
                height="28"
                style={{ verticalAlign: "middle" }}
              />
            </a>
            <nav className="nav">
              <a href="/about">About</a>
              <a href="/newsroom">Newsroom</a>
              <a href="/media">Media</a>
              <a href="/membership">Membership</a>
              <a href="/contact">Contact</a>
              <a href="/calendar">Calendar</a>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Rural Hall Alliance</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
