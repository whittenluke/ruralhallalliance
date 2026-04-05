export default function ContactPage() {
  return (
    <div className="container">
    <section>
      <h1>Contact Us</h1>
      <p>General communication channel for non-media inquiries.</p>
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
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
        <button type="submit">Submit</button>
      </form>
    </section>
    </div>
  );
}
