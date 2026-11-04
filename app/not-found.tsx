import Link from "next/link";

export default function NotFound() {
  return (
    <main className="plain-page" id="main" style={{ minHeight: "70vh", paddingTop: "7rem" }}>
      <section className="band-paper" style={{ minHeight: "70vh" }}>
        <div className="week-wrap">
          <p className="week-kicker">404</p>
          <h1 className="week-title">That page is gone.</h1>
          <p className="week-lede">The week has a new shape. Start from the homepage, the schedule, or tickets.</p>
          <div className="week-actions">
            <Link className="week-btn" href="/">
              Home
            </Link>
            <Link className="week-btn week-btn-ghost" href="/schedule">
              Schedule
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
