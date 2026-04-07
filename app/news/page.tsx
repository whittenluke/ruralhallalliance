import Link from "next/link";
import {
  formatNewsDisplayDate,
  getAllNewsEntries,
  normalizePublicAssetPath
} from "@/lib/news";

export default function NewsIndexPage() {
  const entries = getAllNewsEntries();

  return (
    <div className="container news-page">
      <section className="news-archive-section" aria-label="News archive">
        <header className="news-archive-header">
          <h1 className="page-title">News</h1>
          <p className="page-lede news-archive-lede">
            A public archive of official communications.
          </p>
        </header>

        {entries.length === 0 ? (
          <p className="news-archive-empty">No entries have been published yet.</p>
        ) : (
          <ul className="news-archive-list">
            {entries.map((e) => {
              const href = `/news/${e.slug}`;
              const displayDate = formatNewsDisplayDate(e.date);
              return (
                <li key={e.slug} className="news-archive-row">
                  <article
                    className={`news-preview${e.featured_image ? " news-preview--has-thumb" : ""}`}
                  >
                    {e.featured_image ? (
                      <Link href={href} className="news-preview-thumb-link" tabIndex={-1} aria-hidden>
                        <img
                          src={normalizePublicAssetPath(e.featured_image)}
                          alt=""
                          className="news-preview-thumb"
                          loading="lazy"
                          decoding="async"
                        />
                      </Link>
                    ) : null}
                    <div
                      className={
                        e.featured_image
                          ? "news-preview-content news-preview-content--beside-thumb"
                          : "news-preview-content"
                      }
                    >
                      <h2 className="news-preview-title">
                        <Link href={href}>{e.title}</Link>
                      </h2>
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
                      {e.summary ? <p className="news-preview-summary">{e.summary}</p> : null}
                      <p className="news-preview-cta">
                        <Link href={href} className="news-read-more">
                          Read more
                          <span className="visually-hidden">: {e.title}</span>
                        </Link>
                      </p>
                    </div>
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
