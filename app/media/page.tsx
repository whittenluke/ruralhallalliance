import { FormSubmitButton, NetlifyForm } from "@/components/netlify-form";
import { getMediaPageContent } from "@/lib/media-page";

export default function MediaPage() {
  const page = getMediaPageContent();

  return (
    <div className="container">
      <section>
        <h1>{page.title}</h1>
        {page.summary ? <p>{page.summary}</p> : null}
        {page.media_email ? (
          <p>
            <a href={`mailto:${page.media_email}`}>{page.media_email}</a>
          </p>
        ) : null}
        <NetlifyForm name="media-inquiries" formName="media-inquiries">
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
            Outlet
            <input type="text" name="outlet_name" />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Phone
            <input type="tel" name="phone_number" />
          </label>
          <label>
            Deadline
            <input type="text" name="deadline" />
          </label>
          <label>
            Topic
            <input type="text" name="topic" />
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
