import { getAllNewsroomEntries, getNewsroomEntryBySlug } from "@/lib/newsroom";
import Link from "next/link";

export default function NewsroomDetailPage({ params }: { params: { slug: string } }) {
  const entry = getNewsroomEntryBySlug(params.slug);
  if (!entry) {
    return (
      <div className="container">
        <section>
          <p>Entry not found.</p>
          <p>
            <Link href="/newsroom">Back to Newsroom</Link>
          </p>
        </section>
      </div>
    );
  }
  return (
    <div className="container">
    <section>
      <p>
        <Link href="/newsroom">← Back to Newsroom</Link>
      </p>
      <h1 className="page-title">{entry.title}</h1>
      <p>
        {entry.date} • {entry.category}
      </p>
      <article>
        <p>{entry.summary}</p>
        <div style={{ whiteSpace: "pre-wrap" }}>{entry.body}</div>
      </article>
    </section>
    </div>
  );
}

export async function generateStaticParams() {
  const entries = getAllNewsroomEntries();
  return entries.map((e) => ({ slug: e.slug }));
}
