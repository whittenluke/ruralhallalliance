import { FormSubmitButton, NetlifyForm } from "@/components/netlify-form";
import { getMembershipPageContent } from "@/lib/content-pages";

export default function MembershipPage() {
  const page = getMembershipPageContent();
  return (
    <div className="container">
      <section>
        <h1 className="page-title">{page.title}</h1>
        {page.summary ? <p className="page-lede">{page.summary}</p> : null}
        <NetlifyForm name="membership" formName="membership">
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
            <select name="relationship_to_community" defaultValue="Resident">
              <option value="Resident">Resident</option>
              <option value="Business Owner">Business Owner</option>
              <option value="Other">Other</option>
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
          <FormSubmitButton />
        </NetlifyForm>
      </section>
    </div>
  );
}
