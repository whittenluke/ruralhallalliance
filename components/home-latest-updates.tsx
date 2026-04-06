import Link from "next/link";
import { formatNewsroomDisplayDate, getLatestNewsroomEntries } from "@/lib/newsroom";

export function HomeLatestUpdates() {
  const entries = getLatestNewsroomEntries(3);

  return (
    <section className="home-section home-section--alt" aria-labelledby="home-latest-heading">
      <div className="container home-latest-inner">
        <header className="home-section-head">
          <div className="home-section-head-text">
            <h2 id="home-latest-heading" className="home-section-title">
              Latest Updates
            </h2>
            <p className="home-section-lede">
              Recent official communications from Rural Hall Alliance.
            </p>
          </div>
          <Link href="/newsroom" className="home-section-all-link">
            All news
          </Link>
        </header>

        {entries.length === 0 ? (
          <p className="newsroom-archive-empty">No news entries yet.</p>
        ) : (
          <ul className="newsroom-archive-list home-elevated-list">
            {entries.map((e) => {
              const href = `/newsroom/${e.slug}`;
              const displayDate = formatNewsroomDisplayDate(e.date);
              return (
                <li key={e.slug} className="newsroom-archive-row">
                  <article className="newsroom-preview">
                    <h3 className="newsroom-preview-title">
                      <Link href={href}>{e.title}</Link>
                    </h3>
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
      </div>
    </section>
  );
}
