import type { CalendarEntry } from "@/lib/calendar";
import { formatCalendarDate } from "@/lib/calendar";

type Props = {
  event: CalendarEntry;
};

export function EventCard({ event: e }: Props) {
  const timeLocationParts: string[] = [];
  if (e.time) timeLocationParts.push(e.time);
  if (e.location) timeLocationParts.push(e.location);
  const hasTimeLocation = timeLocationParts.length > 0;
  const address = e.address?.trim();
  const hasWhere = hasTimeLocation || Boolean(address);

  return (
    <article className="event-card">
      <h3 className="event-card-title">{e.title}</h3>
      <p className="event-card-date">{formatCalendarDate(e.date)}</p>
      {hasWhere ? (
        <div className="event-card-where">
          {hasTimeLocation ? (
            <p className="event-card-meta">{timeLocationParts.join(" · ")}</p>
          ) : null}
          {address ? <p className="event-card-address">{address}</p> : null}
        </div>
      ) : null}
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
