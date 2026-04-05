export default function MediaPage() {
  return (
    <section>
      <h1>Media Inquiries</h1>
      <p>Direct, professional contact path for reporters.</p>
      <form
        name="media-inquiries"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="media-inquiries" />
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
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
