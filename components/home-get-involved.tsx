import Link from "next/link";

const links = [
  { href: "/membership", label: "Membership", hint: "Join or express interest" },
  { href: "/contact", label: "Contact", hint: "General inquiries" },
  { href: "/media", label: "Media Inquiries", hint: "Reporters and outlets" }
] as const;

export function HomeGetInvolved() {
  return (
    <section className="home-section home-section--navy" aria-labelledby="home-involve-heading">
      <div className="container home-involve-inner">
        <header className="home-involve-header">
          <h2 id="home-involve-heading" className="home-involve-title">
            Get Involved
          </h2>
          <p className="home-involve-lede">
            Connect with Rural Hall Alliance
          </p>
        </header>
        <ul className="home-involve-list">
          {links.map(({ href, label, hint }) => (
            <li key={href} className="home-involve-item">
              <Link href={href} className="home-involve-card">
                <span className="home-involve-card-label">{label}</span>
                <span className="home-involve-card-hint">{hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
