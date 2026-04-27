import ReactMarkdown from "react-markdown";
import { getGovernancePageContent } from "@/lib/content-pages";

export default function GovernancePage() {
  const page = getGovernancePageContent();

  return (
    <div className="container">
      <section className="governance-page">
        <h1 className="page-title">{page.title}</h1>
        {page.summary ? <p className="page-lede">{page.summary}</p> : null}
        {page.body ? (
          <div className="prose governance-page-body">
            <ReactMarkdown>{page.body}</ReactMarkdown>
          </div>
        ) : null}
      </section>
    </div>
  );
}
