import Link from "next/link";
import { formatNewsroomDisplayDate, getAllNewsroomEntries } from "@/lib/newsroom";

export default function NewsroomIndexPage() {
  const entries = getAllNewsroomEntries();

  return (
    <div className="container newsroom-page">
      <section className="newsroom-archive-section" aria-label="Newsroom archive">
        <header className="newsroom-archive-header">
          <h1 className="page-title">Newsroom</h1>
          <p className="page-lede newsroom-archive-lede">
            A public archive of official communications.
          </p>
        </header>

        {entries.length === 0 ? (
          <p className="newsroom-archive-empty">No entries have been published yet.</p>
        ) : (
          <ul className="newsroom-archive-list">
            {entries.map((e) => {
              const href = `/newsroom/${e.slug}`;
              const displayDate = formatNewsroomDisplayDate(e.date);
              return (
                <li key={e.slug} className="newsroom-archive-row">
                  <article className="newsroom-preview">
                    <h2 className="newsroom-preview-title">
                      <Link href={href}>{e.title}</Link>
                    </h2>
                    {displayDate || e.category ? (
                      <p className="newsroom-preview-meta">
                        {displayDate ? (
                          <>
                            <time dateTime={e.date}>{displayDate}</time>
                            {e.category ? (
                              <>
                                <span className="newsroom-preview-meta-sep" aria-hidden>
                                  ·
                                </span>
                                <span className="newsroom-preview-category">{e.category}</span>
                              </>
                            ) : null}
                          </>
                        ) : (
                          <span className="newsroom-preview-category">{e.category}</span>
                        )}
                      </p>
                    ) : null}
                    {e.summary ? (
                      <p className="newsroom-preview-summary">{e.summary}</p>
                    ) : null}
                    <p className="newsroom-preview-cta">
                      <Link href={href} className="newsroom-read-more">
                        Read more
                        <span className="visually-hidden">: {e.title}</span>
                      </Link>
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
