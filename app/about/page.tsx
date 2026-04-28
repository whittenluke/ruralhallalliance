import { getAboutPageContent } from "@/lib/content-pages";
import ReactMarkdown from "react-markdown";

function AboutMarkdownBlock({ markdown }: { markdown: string }) {
  const trimmed = markdown.trim();
  if (!trimmed) return null;
  return (
    <div className="about-page-block about-page-markdown">
      <ReactMarkdown>{trimmed}</ReactMarkdown>
    </div>
  );
}

export default function AboutPage() {
  const page = getAboutPageContent();

  return (
    <div className="container">
      <section className="about-page">
        <h1 className="page-title">{page.title}</h1>
        {page.summary ? <p className="page-lede">{page.summary}</p> : null}

        {page.mission_heading ? (
          <h2 className="about-page-subheading">{page.mission_heading}</h2>
        ) : null}
        <AboutMarkdownBlock markdown={page.mission_body} />

        {page.who_we_serve_heading ? (
          <h2 className="about-page-subheading">{page.who_we_serve_heading}</h2>
        ) : null}
        <AboutMarkdownBlock markdown={page.who_we_serve_body} />

        <AboutMarkdownBlock markdown={page.body} />
      </section>
    </div>
  );
}
