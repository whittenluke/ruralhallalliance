import { HomeGetInvolved } from "@/components/home-get-involved";
import { HomeLatestUpdates } from "@/components/home-latest-updates";
import { HomeUpcomingEvents } from "@/components/home-upcoming-events";
import { getHomePageContent } from "@/lib/home-page";

export default function HomePage() {
  const home = getHomePageContent();
  const hasHeroImage = Boolean(home.hero_image);

  return (
    <>
      <section
        className={`home-hero${hasHeroImage ? " home-hero--image" : ""}`}
        style={
          hasHeroImage
            ? { backgroundImage: `url(${home.hero_image})` }
            : undefined
        }
      >
        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="container home-hero-inner">
          <div className="home-hero-copy">
            <h1 className="home-hero-title">{home.hero_title}</h1>
            {home.hero_summary ? (
              <p className="home-hero-summary">{home.hero_summary}</p>
            ) : null}
            <div className="home-hero-actions">
              <a className="btn btn-primary btn-lg" href={home.hero_primary_cta_link}>
                {home.hero_primary_cta_label}
              </a>
              <a
                className="btn btn-secondary btn-lg home-hero-btn-secondary"
                href={home.hero_secondary_cta_link}
              >
                {home.hero_secondary_cta_label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {(home.intro_heading || home.intro_body) && (
        <section
          className="section-block home-intro"
          aria-labelledby={home.intro_heading ? "home-intro-heading" : undefined}
        >
          <div className="home-intro-inner">
            <div className="home-intro-copy">
              {home.intro_heading ? (
                <h2 id="home-intro-heading" className="home-intro-title">
                  {home.intro_heading}
                </h2>
              ) : null}
              {home.intro_body ? <p className="home-intro-text">{home.intro_body}</p> : null}
            </div>
            <img
              className="home-intro-seal"
              src="/rural-hall-seal.webp"
              alt="Town of Rural Hall seal"
              width={220}
              height={220}
            />
          </div>
        </section>
      )}

      <HomeLatestUpdates />
      <HomeUpcomingEvents />
      <HomeGetInvolved />
    </>
  );
}
