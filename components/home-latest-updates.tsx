import Link from "next/link";
import { formatNewsDisplayDate, getLatestNewsEntries } from "@/lib/news";

export function HomeLatestUpdates() {
  const entries = getLatestNewsEntries(3);

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
          <Link href="/news" className="home-section-all-link">
            All news
          </Link>
        </header>

        {entries.length === 0 ? (
          <p className="news-archive-empty">No news entries yet.</p>
        ) : (
          <ul className="news-archive-list home-elevated-list">
            {entries.map((e) => {
              const href = `/news/${e.slug}`;
              const displayDate = formatNewsDisplayDate(e.date);
              return (
                <li key={e.slug} className="news-archive-row">
                  <article className="news-preview">
                    <h3 className="news-preview-title">
                      <Link href={href}>{e.title}</Link>
                    </h3>
                    {displayDate || e.category ? (
                      <p className="news-preview-meta">
                        {displayDate ? (
                          <>
                            <time dateTime={e.date}>{displayDate}</time>
                            {e.category ? (
                              <>
                                <span className="news-preview-meta-sep" aria-hidden>
                                  ·
                                </span>
                                <span className="news-preview-category">{e.category}</span>
                              </>
                            ) : null}
                          </>
                        ) : (
                          <span className="news-preview-category">{e.category}</span>
                        )}
                      </p>
                    ) : null}
                    {e.summary ? (
                      <p className="news-preview-summary">{e.summary}</p>
                    ) : null}
                    <p className="news-preview-cta">
                      <Link href={href} className="news-read-more">
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
