import {
  formatNewsDisplayDate,
  getAllNewsEntries,
  getNewsEntryBySlug,
  normalizePublicAssetPath
} from "@/lib/news";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { reflowMarkdownBodyForNews } from "@/lib/reflow-markdown-body";

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const entry = getNewsEntryBySlug(params.slug);
  if (!entry) {
    return (
      <div className="container">
        <section>
          <p>Entry not found.</p>
          <p>
            <Link href="/news">Back to News</Link>
          </p>
        </section>
      </div>
    );
  }
  const displayDate = formatNewsDisplayDate(entry.date);

  return (
    <div className="container">
      <article className="news-article">
        <p className="news-article-back">
          <Link href="/news">← Back to News</Link>
        </p>
        <header className="news-article-header">
          <h1 className="page-title">{entry.title}</h1>
          <p className="news-article-meta">
            {displayDate ? (
              <>
                <time dateTime={entry.date}>{displayDate}</time>
                {entry.category ? (
                  <>
                    <span className="news-preview-meta-sep" aria-hidden>
                      ·
                    </span>
                    <span className="news-preview-category">{entry.category}</span>
                  </>
                ) : null}
              </>
            ) : (
              entry.category
            )}
          </p>
        </header>
        {entry.featured_image ? (
          <figure className="news-article-featured">
            <img
              src={normalizePublicAssetPath(entry.featured_image)}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </figure>
        ) : null}
        <div className="news-article-body prose">
          {entry.summary ? <p className="news-article-deck">{entry.summary}</p> : null}
          {entry.body.trim() ? (
            <div className="news-article-text news-article-text--markdown">
              <ReactMarkdown>{reflowMarkdownBodyForNews(entry.body)}</ReactMarkdown>
            </div>
          ) : null}
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const entries = getAllNewsEntries();
  return entries.map((e) => ({ slug: e.slug }));
}
