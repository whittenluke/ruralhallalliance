import {
  formatNewsroomDisplayDate,
  getAllNewsroomEntries,
  getNewsroomEntryBySlug
} from "@/lib/newsroom";
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
  const displayDate = formatNewsroomDisplayDate(entry.date);

  return (
    <div className="container">
      <article className="newsroom-article">
        <p className="newsroom-article-back">
          <Link href="/newsroom">← Back to Newsroom</Link>
        </p>
        <header className="newsroom-article-header">
          <h1 className="page-title">{entry.title}</h1>
          <p className="newsroom-article-meta">
            {displayDate ? (
              <>
                <time dateTime={entry.date}>{displayDate}</time>
                {entry.category ? (
                  <>
                    <span className="newsroom-preview-meta-sep" aria-hidden>
                      ·
                    </span>
                    <span>{entry.category}</span>
                  </>
                ) : null}
              </>
            ) : (
              entry.category
            )}
          </p>
        </header>
        <div className="newsroom-article-body prose">
          {entry.summary ? <p className="newsroom-article-deck">{entry.summary}</p> : null}
          <div className="newsroom-article-text">{entry.body.trim()}</div>
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const entries = getAllNewsroomEntries();
  return entries.map((e) => ({ slug: e.slug }));
}
