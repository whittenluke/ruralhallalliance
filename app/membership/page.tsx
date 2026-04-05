export default function MembershipPage() {
  return (
    <section>
      <h1>Membership</h1>
      <p>Structured intake path for people interested in joining or participating.</p>
      <form
        name="membership"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="membership" />
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
          Phone
          <input type="tel" name="phone_number" />
        </label>
        <label>
          Relationship to Community
          <select name="relationship_to_community">
            <option>Resident</option>
            <option>Business Owner</option>
            <option>Supporter</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          Organization or Business
          <input type="text" name="organization_or_business_name" />
        </label>
        <label>
          Neighborhood or Area
          <input type="text" name="neighborhood_or_area" />
        </label>
        <label>
          Message
          <textarea name="message" rows={5} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
