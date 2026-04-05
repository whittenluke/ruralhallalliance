import { EventCard } from "@/components/event-card";
import { getCalendarEntries, splitCalendarEntries } from "@/lib/calendar";

export default function CalendarPage() {
  const entries = getCalendarEntries();
  const { upcoming, past } = splitCalendarEntries(entries);

  return (
    <div className="container calendar-page">
      <header className="calendar-page-header">
        <h1>Calendar</h1>
        <p className="calendar-page-lede">
          Meetings and local events. Upcoming items are listed first, followed by past events.
        </p>
      </header>

      {upcoming.length === 0 && past.length === 0 ? (
        <p className="calendar-page-empty">No events are published yet.</p>
      ) : (
        <div className="calendar-stacks">
          {upcoming.length > 0 ? (
            <section className="calendar-stack" aria-labelledby="calendar-upcoming-heading">
              <h2 id="calendar-upcoming-heading" className="calendar-stack-heading">
                Upcoming
              </h2>
              <div className="event-card-stack">
                {upcoming.map((e) => (
                  <EventCard key={`${e.date}-${e.title}-${e.time ?? ""}`} event={e} />
                ))}
              </div>
            </section>
          ) : null}

          {past.length > 0 ? (
            <section className="calendar-stack" aria-labelledby="calendar-past-heading">
              <h2 id="calendar-past-heading" className="calendar-stack-heading">
                Past
              </h2>
              <div className="event-card-stack">
                {past.map((e) => (
                  <EventCard key={`${e.date}-${e.title}-${e.time ?? ""}`} event={e} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}
