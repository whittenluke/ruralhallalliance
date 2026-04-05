import Link from "next/link";
import { getAllNewsroomEntries } from "@/lib/newsroom";

export default function NewsroomIndexPage() {
  const entries = getAllNewsroomEntries();
  return (
    <div className="container">
    <section>
      <h1>Newsroom</h1>
      <p>A public archive of official communications.</p>
      <ul>
        {entries.map((e) => (
          <li key={e.slug}>
            <h3>
              <Link href={`/newsroom/${e.slug}`}>{e.title}</Link>
            </h3>
            <p>{e.date} • {e.category}</p>
            <p>{e.summary}</p>
          </li>
        ))}
      </ul>
    </section>
    </div>
  );
}
