import { getAboutPageContent } from "@/lib/content-pages";

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
        {page.mission_body ? (
          <p className="about-page-block prose">{page.mission_body}</p>
        ) : null}

        {page.who_we_serve_heading ? (
          <h2 className="about-page-subheading">{page.who_we_serve_heading}</h2>
        ) : null}
        {page.who_we_serve_body ? (
          <p className="about-page-block prose">{page.who_we_serve_body}</p>
        ) : null}

        {page.body ? (
          <p className="about-page-block prose">{page.body}</p>
        ) : null}
      </section>
    </div>
  );
}
