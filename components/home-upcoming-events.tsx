import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { getUpcomingCalendarPreview } from "@/lib/calendar";

export function HomeUpcomingEvents() {
  const events = getUpcomingCalendarPreview(3);

  return (
    <section className="home-section home-section--surface" aria-labelledby="home-events-heading">
      <div className="container home-events-inner">
        <header className="home-section-head">
          <div className="home-section-head-text">
            <h2 id="home-events-heading" className="home-section-title">
              Upcoming Events
            </h2>
            <p className="home-section-lede">
              Meetings and happenings on the calendar. Dates and details may be updated as plans are confirmed.
            </p>
          </div>
          <Link href="/calendar" className="home-section-all-link home-section-all-link--dark">
            Full calendar
          </Link>
        </header>

        {events.length === 0 ? (
          <p className="home-events-empty">No upcoming events are listed right now.</p>
        ) : (
          <div className="home-events-stack">
            {events.map((e) => (
              <EventCard
                key={`${e.date}-${e.title}`}
                event={e}
                fallbackDetailsHref="/calendar"
                fallbackDetailsLabel="View on calendar"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
