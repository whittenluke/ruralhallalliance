import { FormSubmitButton, NetlifyForm } from "@/components/netlify-form";

export default function ContactPage() {
  return (
    <div className="container">
      <section>
        <h1>Contact Us</h1>
        <p>General communication channel for non-media inquiries.</p>
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
