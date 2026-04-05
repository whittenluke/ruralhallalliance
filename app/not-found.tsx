import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <section>
        <h1>Page not found</h1>
        <p>The page you requested does not exist or has been moved.</p>
        <p>
          <Link href="/">Return home</Link>
        </p>
      </section>
    </div>
  );
}
