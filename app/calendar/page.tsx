import { getCalendarEntries } from "@/lib/calendar";

export default function CalendarPage() {
  const entries = getCalendarEntries();
  return (
    <section>
      <h1>Calendar</h1>
      <p>Relevant meetings and local events.</p>
      <ul>
        {entries.map((e) => (
          <li key={`${e.date}-${e.title}`}>
            <h3>{e.title}</h3>
            <p>
              {e.date}
              {e.time ? ` • ${e.time}` : ""} {e.location ? ` • ${e.location}` : ""}
            </p>
            {e.summary ? <p>{e.summary}</p> : null}
            {e.external_link ? (
              <p>
                <a href={e.external_link}>More info</a>
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
