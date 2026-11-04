import Link from "next/link";
import { exploringVenues } from "@/lib/site";

export function PartnerBoard() {
  return (
    <div>
      <ul className="room-list">
        {exploringVenues.map((venue) => (
          <li key={venue.id} id={venue.id}>
            <h2>{venue.name}</h2>
            <p>{venue.focus}</p>
            <p>{venue.address}</p>
          </li>
        ))}
      </ul>
      <div className="week-actions">
        <Link className="week-btn" href="/host">
          Host a night
        </Link>
      </div>
    </div>
  );
}
