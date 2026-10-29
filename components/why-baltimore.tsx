import Link from 'next/link'
import { EVENT, involveLink } from '@/lib/data'

export function WhyBaltimore() {
  return (
    <div className="why-simple">
      <section className="ed-cream-section">
        <div className="ed-container">
          <p className="ed-eyebrow">Why Baltimore · April 26 to 30, 2027</p>
          <h2 className="ed-manifesto-title">
            Baltimore is the next major tech hub in the US. Do not get left behind.
          </h2>
          <p className="ed-manifesto-sub">
            Other cities run tech week in the daytime. Most people do not have the time, or the PTO, to take off five
            days. This week is at night so the community can actually show up. The whole point is to create
            opportunities for people in Baltimore.
          </p>
          <div className="ed-manifesto-cta">
            <Link href={EVENT.weekPath} className="ed-pill-btn">
              Explore the Week
            </Link>
            <Link href={EVENT.ticketsPath} className="ed-pill-btn ed-pill-btn-outline">
              Get Tickets
            </Link>
          </div>
        </div>
      </section>

      <section className="ed-dark-showcase" aria-labelledby="why-night-heading">
        <div className="ed-container">
          <p className="ed-eyebrow" style={{ color: 'var(--gold)' }}>
            Why nights
          </p>
          <h2 id="why-night-heading" className="ed-section-title">
            Come after work. Stay if you want. Go home the same night.
          </h2>
          <p className="why-simple-lead">
            Doors open at 5:30. Five nights across the city. You do not need to clear your calendar
            for a full conference week. Come for one evening. Come back the next if it was worth it. That is how more
            of Baltimore gets in the room.
          </p>
        </div>
      </section>

      <section className="ed-cream-section why-simple-story">
        <div className="ed-container">
          <p className="ed-eyebrow">Unlike any other city</p>
          <h2 className="ed-manifesto-title">
            Do not be the person who discovered Baltimore <span className="ed-highlight">last</span>.
          </h2>
          <p className="ed-manifesto-sub">
            Baltimore has culture. It has community. It has some of the best restaurants in the city. Parking is not
            crazy expensive. It feels like a home away from home.
          </p>
          <p className="ed-manifesto-sub">
            Rooted Rotisserie, The Urban Oyster, The Food Market, NOLA Seafood and Spirits. The best spots too: The
            Lewis Museum, The Peale Museum, Neon Paint Place, Equitea, R. House, and the list goes on. There is no
            place like Baltimore.
          </p>
        </div>
      </section>

      <section className="ed-dark-showcase" aria-labelledby="why-hub-heading">
        <div className="ed-container">
          <p className="ed-eyebrow" style={{ color: 'var(--gold)' }}>
            Already being recognized
          </p>
          <h2 id="why-hub-heading" className="ed-section-title">
            In 2023, the Baltimore region was selected as one of 31 inaugural federal Tech Hubs.
          </h2>
          <p className="why-simple-lead">
            The focus is applying artificial intelligence and biotechnology to predictive healthcare. The opportunity is
            already here. Baltimore Tech Week is an independent week. That designation is not an endorsement of us. It
            is proof the region is not starting from zero.
          </p>
          <p className="why-simple-source">
            <a
              href="https://www.eda.gov/news/press-release/2023/10/23/Baltimore-Tech-Hub"
              target="_blank"
              rel="noopener noreferrer"
            >
              U.S. Economic Development Administration, October 2023
            </a>
          </p>
        </div>
      </section>

      <section className="ed-cream-section why-simple-story">
        <div className="ed-container">
          <p className="ed-eyebrow">A city of builders</p>
          <h2 className="ed-manifesto-title">
            Before the innovation district, there were neighborhoods full of people making things.
          </h2>
          <p className="ed-manifesto-sub">
            Baltimore has always been a city of builders. People making things, solving problems, and starting
            businesses. That history runs through the port, shipbuilding, and manufacturing, and through the workers
            and entrepreneurs who made those industries possible.
          </p>
          <p className="ed-manifesto-sub">
            That spirit is still the starting point. This week is one more room for it.
          </p>
          <h2 className="ed-manifesto-title why-simple-close">
            This is only the <span className="ed-highlight">beginning</span>.
          </h2>
          <div className="ed-manifesto-cta">
            <Link href={involveLink('speak').href} className="ed-pill-btn">
              Give a Talk
            </Link>
            <Link href={involveLink('partner').href} className="ed-pill-btn ed-pill-btn-outline">
              Partner
            </Link>
            <Link href={involveLink('sponsor').href} className="ed-pill-btn ed-pill-btn-outline">
              Sponsor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
