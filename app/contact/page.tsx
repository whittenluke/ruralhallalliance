import { FormSubmitButton, NetlifyForm } from "@/components/netlify-form";
import { getContactPageContent } from "@/lib/content-pages";

export default function ContactPage() {
  const page = getContactPageContent();
  return (
    <div className="container">
      <section>
        <h1 className="page-title">{page.title}</h1>
        {page.summary ? <p className="page-lede">{page.summary}</p> : null}
        {page.general_email ? (
          <p>
            <a href={`mailto:${page.general_email}`}>{page.general_email}</a>
          </p>
        ) : null}
        <NetlifyForm name="contact" formName="contact">
          <p hidden>
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>
          <label>
            Full Name
            <input type="text" name="full_name" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Subject
            <input type="text" name="subject" />
          </label>
          <label>
            Message
            <textarea name="message" rows={5} required />
          </label>
          <FormSubmitButton />
        </NetlifyForm>
      </section>
    </div>
  );
}
