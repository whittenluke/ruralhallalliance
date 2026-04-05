import type { CalendarEntry } from "@/lib/calendar";
import { formatCalendarDate } from "@/lib/calendar";

type Props = {
  event: CalendarEntry;
};

export function EventCard({ event: e }: Props) {
  const dateLine = formatCalendarDate(e.date);
  const time = e.time?.trim();
  const datetimeLine = time ? `${dateLine} | ${time}` : dateLine;
  const location = e.location?.trim();
  const address = e.address?.trim();

  return (
    <article className="event-card">
      <h3 className="event-card-title">{e.title}</h3>
      <div className="event-card-details">
        <p className="event-card-datetime">{datetimeLine}</p>
        {location ? <p className="event-card-location">{location}</p> : null}
        {address ? <p className="event-card-address">{address}</p> : null}
      </div>
      {e.summary ? <p className="event-card-summary">{e.summary}</p> : null}
      {e.external_link?.trim() ? (
        <p className="event-card-more">
          <a href={e.external_link.trim()} className="event-card-link">
            More details
          </a>
        </p>
      ) : null}
    </article>
  );
}
