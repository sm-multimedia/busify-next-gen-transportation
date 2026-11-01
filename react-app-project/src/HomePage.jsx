import { useState } from "react";
import "./HomePage.css";
import Menu from "./Menu";

const HomePage = () => {
  // Booking search widget state
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    date: "",
    passengers: "1",
    tripType: "round-trip",
  });
  const [searchFeedback, setSearchFeedback] = useState("");

  // Contact / Quote form state
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "bus-rental",
    message: "",
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Active category filter for services
  const [activeCategory, setActiveCategory] = useState("all");

  const servicesData = [
    {
      id: "bus-rentals",
      category: "charter",
      tag: "Most Popular",
      tagColor: "badge-blue",
      title: "Bus & Coach Rentals",
      description:
        "Full-scale 56-seat luxury motorcoaches equipped with plush reclining seating, panoramic windows, high-speed Wi-Fi, and spacious undercarriage luggage bays.",
      price: "From $110 / hr",
      features: [
        "High-Speed Wi-Fi & Outlets",
        "Onboard Clean Restroom",
        "Panoramic Tinted Windows",
        "Licensed Professional Chauffeur",
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 6v6" />
          <path d="M16 6v6" />
          <path d="M2 12h20" />
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a2 2 0 0 0-.22-.91L20.24 9.4A2 2 0 0 0 18.45 8H5.55a2 2 0 0 0-1.79 1.4L2.22 12.44a2 2 0 0 0-.22.91V17a1 1 0 0 0 1 1h2" />
          <circle cx="7" cy="18" r="2" />
          <path d="M9 18h6" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      ),
    },
    {
      id: "corporate-shuttles",
      category: "corporate",
      tag: "Business Tier",
      tagColor: "badge-purple",
      title: "Corporate & Campus Shuttles",
      description:
        "Turnkey daily employee commute programs, campus loops, and executive conference transfers featuring live GPS tracking and scheduled precision departures.",
      price: "Custom Monthly Rates",
      features: [
        "Live GPS Fleet Tracking",
        "Custom Commute Route Planning",
        "Dedicated Account Coordinator",
        "Eco-Friendly Hybrid Fleet",
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      id: "intercity-charter",
      category: "charter",
      tag: "Direct Routes",
      tagColor: "badge-emerald",
      title: "Charter & Tour Services",
      description:
        "Private customized group charters for weddings, school excursions, sports tournaments, and sightseeing tours with tailored pickup schedules.",
      price: "From $95 / hr",
      features: [
        "Flexible Stops & Itineraries",
        "State-of-the-Art Sound & PA",
        "Ample Equipment Storage",
        "24/7 Road Dispatch Support",
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
    },
    {
      id: "airport-transfers",
      category: "transfers",
      tag: "24/7 Dispatch",
      tagColor: "badge-amber",
      title: "Airport & Hotel Transfers",
      description:
        "Punctual, stress-free airport connections for flight crews, corporate teams, and travel groups with live flight radar tracking and luggage assistance.",
      price: "Flat Rate Quotes",
      features: [
        "Real-Time Flight Monitoring",
        "Terminal Curbside Pickup",
        "Generous Luggage Capacity",
        "Zero Hidden Waiting Fees",
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.2c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
        </svg>
      ),
    },
    {
      id: "vip-sprinters",
      category: "luxury",
      tag: "VIP Luxury",
      tagColor: "badge-rose",
      title: "Executive Luxury Sprinters",
      description:
        "High-end Mercedes-Benz Sprinter vans featuring handcrafted leather captain chairs, conference workspaces, privacy shades, and media entertainment.",
      price: "From $135 / hr",
      features: [
        "Executive Captain Seating",
        "Apple TV & HDMI Displays",
        "Chilled Beverage Bar",
        "Ultra-Quiet Cabin Acoustic",
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      id: "event-transit",
      category: "transfers",
      tag: "Large Scale",
      tagColor: "badge-cyan",
      title: "Special Events & Festivals",
      description:
        "High-capacity transportation logistics for music festivals, sporting arenas, conferences, and conventions with on-ground traffic coordinators.",
      price: "Custom Event Packages",
      features: [
        "Crowd Flow Optimization",
        "Multi-Vehicle Coordinated Staging",
        "Onsite Route Supervisors",
        "Priority Access Gate Pass",
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
  ];

  const filteredServices =
    activeCategory === "all"
      ? servicesData
      : servicesData.filter((item) => item.category === activeCategory);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchParams.origin || !searchParams.destination) {
      setSearchFeedback("Please enter both departure and destination cities.");
      return;
    }
    setSearchFeedback(
      `✓ Searching best routes from "${searchParams.origin}" to "${searchParams.destination}" for ${searchParams.passengers} passenger(s)...`
    );
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.email) {
      return;
    }
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setQuoteForm({
        name: "",
        email: "",
        phone: "",
        serviceType: "bus-rental",
        message: "",
      });
    }, 4500);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSuccess(false), 4000);
  };

  return (
    <div className="home-page" id="top">
      <Menu />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg-gradient"></div>
        <div className="hero-container">
          <div className="hero-content-column animate-fade-in-up">
            <div className="hero-badge">
              <span className="badge-pulse-dot"></span>
              <span>Next-Gen Premium Transportation</span>
            </div>

            <h1 className="hero-title">
              Smarter, Safer &amp; Seamless{" "}
              <span className="gradient-text">Bus Travel</span> for Everyone
            </h1>

            <p className="hero-subtitle">
              From chartered luxury coaches and daily corporate employee shuttles to
              intercity express transit, Busify delivers punctuality, modern amenities,
              and 24/7 peace of mind.
            </p>

            {/* Quick Trip Booking Search Bar */}
            <div className="hero-search-card" id="booking">
              <div className="search-header-tabs">
                <button
                  type="button"
                  className={`tab-btn ${
                    searchParams.tripType === "round-trip" ? "active" : ""
                  }`}
                  onClick={() =>
                    setSearchParams({ ...searchParams, tripType: "round-trip" })
                  }
                >
                  Round Trip
                </button>
                <button
                  type="button"
                  className={`tab-btn ${
                    searchParams.tripType === "one-way" ? "active" : ""
                  }`}
                  onClick={() =>
                    setSearchParams({ ...searchParams, tripType: "one-way" })
                  }
                >
                  One Way
                </button>
                <button
                  type="button"
                  className={`tab-btn ${
                    searchParams.tripType === "custom-charter" ? "active" : ""
                  }`}
                  onClick={() =>
                    setSearchParams({ ...searchParams, tripType: "custom-charter" })
                  }
                >
                  Full Charter
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="search-form-grid">
                <div className="search-field">
                  <label htmlFor="origin-input">Departure</label>
                  <div className="input-with-icon">
                    <svg
                      className="input-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <input
                      id="origin-input"
                      type="text"
                      placeholder="e.g. New York, NY"
                      value={searchParams.origin}
                      onChange={(e) =>
                        setSearchParams({ ...searchParams, origin: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="search-field">
                  <label htmlFor="destination-input">Destination</label>
                  <div className="input-with-icon">
                    <svg
                      className="input-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <input
                      id="destination-input"
                      type="text"
                      placeholder="e.g. Boston, MA"
                      value={searchParams.destination}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          destination: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="search-field">
                  <label htmlFor="date-input">Travel Date</label>
                  <div className="input-with-icon">
                    <svg
                      className="input-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <input
                      id="date-input"
                      type="date"
                      value={searchParams.date}
                      onChange={(e) =>
                        setSearchParams({ ...searchParams, date: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="search-field">
                  <label htmlFor="passengers-input">Passengers</label>
                  <div className="input-with-icon">
                    <svg
                      className="input-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <select
                      id="passengers-input"
                      value={searchParams.passengers}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          passengers: e.target.value,
                        })
                      }
                    >
                      <option value="1">1 Passenger</option>
                      <option value="2-5">2 - 5 Group</option>
                      <option value="6-15">6 - 15 Van / Mini</option>
                      <option value="16-35">16 - 35 Midicoach</option>
                      <option value="36-56+">36 - 56+ Full Bus</option>
                    </select>
                  </div>
                </div>

                <div className="search-submit-col">
                  <button type="submit" className="btn-search-primary">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      width="18"
                      height="18"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span>Search Buses</span>
                  </button>
                </div>
              </form>

              {searchFeedback && (
                <div className="search-feedback-banner">{searchFeedback}</div>
              )}
            </div>

            {/* Trust points */}
            <div className="hero-trust-bar">
              <div className="trust-item">
                <span className="trust-icon">⭐</span>
                <span>
                  <strong>4.9/5</strong> (15k+ Reviews)
                </span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span className="trust-icon">🛡️</span>
                <span>
                  <strong>100%</strong> Insured &amp; Verified
                </span>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <span className="trust-icon">⚡</span>
                <span>Instant Confirmation</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Column with Image & Floating Cards */}
          <div className="hero-image-column animate-fade-in-up delay-1">
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
                alt="Busify luxury coach bus travel"
                className="hero-main-img"
                loading="eager"
              />
              <div className="hero-img-overlay"></div>

              {/* Floating Badge 1 - Top Left */}
              <div className="floating-badge badge-top-left float-animation">
                <div className="badge-icon-box bg-emerald">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    width="18"
                    height="18"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div className="badge-label">On-Time Performance</div>
                  <div className="badge-value">99.8% Reliability</div>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Right */}
              <div className="floating-badge badge-bottom-right float-animation-slow">
                <div className="badge-icon-box bg-blue">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    width="18"
                    height="18"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <div className="badge-label">Best Price Match</div>
                  <div className="badge-value">Zero Hidden Surcharges</div>
                </div>
              </div>

              {/* Live Status Pill */}
              <div className="floating-status-pill">
                <span className="live-dot"></span>
                <span>Active Fleet: 1,200+ Buses on Road</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS COUNTER STRIP */}
      <section className="stats-strip">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">500k+</div>
            <div className="stat-label">Happy Passengers Moved</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1,200+</div>
            <div className="stat-label">Modern Certified Coaches</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">48</div>
            <div className="stat-label">States &amp; Territories Covered</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Real-Time Support &amp; Dispatch</div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="services-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">OUR SERVICES</div>
            <h2 className="section-title">
              Professional Transportation Solutions Crafted for Every Journey
            </h2>
            <p className="section-subtitle">
              Whether you are organizing a multi-day corporate summit, school field trip,
              airport connection, or luxury weekend retreat, our diversified fleet has you
              covered.
            </p>

            {/* Filter Tabs */}
            <div className="service-filters">
              <button
                className={`filter-pill ${activeCategory === "all" ? "active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                All Services
              </button>
              <button
                className={`filter-pill ${
                  activeCategory === "charter" ? "active" : ""
                }`}
                onClick={() => setActiveCategory("charter")}
              >
                Charter &amp; Rentals
              </button>
              <button
                className={`filter-pill ${
                  activeCategory === "corporate" ? "active" : ""
                }`}
                onClick={() => setActiveCategory("corporate")}
              >
                Corporate Shuttles
              </button>
              <button
                className={`filter-pill ${
                  activeCategory === "transfers" ? "active" : ""
                }`}
                onClick={() => setActiveCategory("transfers")}
              >
                Transfers &amp; Events
              </button>
              <button
                className={`filter-pill ${
                  activeCategory === "luxury" ? "active" : ""
                }`}
                onClick={() => setActiveCategory("luxury")}
              >
                VIP Executive
              </button>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="services-grid">
            {filteredServices.map((service, idx) => (
              <div
                key={service.id}
                className="service-card"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="card-top-row">
                  <div className="service-icon-box">{service.icon}</div>
                  <span className={`service-tag-badge ${service.tagColor}`}>
                    {service.tag}
                  </span>
                </div>

                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>

                <div className="service-features-list">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="service-feature-item">
                      <svg
                        className="check-icon"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="service-card-footer">
                  <div className="service-price">{service.price}</div>
                  <a href="#contact" className="service-btn-action">
                    <span>Book Now</span>
                    <svg
                      className="arrow-icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width="16"
                      height="16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT US / WHY CHOOSE US SECTION */}
      <section id="about" className="about-section">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-image-side">
              <div className="about-image-stack">
                <img
                  src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Busify electric transit bus"
                  className="about-primary-img"
                  loading="lazy"
                />
                <div className="about-experience-card">
                  <div className="exp-number">12+</div>
                  <div className="exp-text">
                    Years of Premier Transit Excellence
                  </div>
                </div>
              </div>
            </div>

            <div className="about-content-side">
              <div className="section-tag">ABOUT BUSIFY</div>
              <h2 className="section-title">
                Redefining Group Mobility Through Safety, Technology &amp; Comfort
              </h2>
              <p className="about-description">
                Founded with a mission to eliminate the complexity of group travel,
                Busify has grown into a leading technology-powered transport provider.
                We bridge the gap between premium motorcoach operators and organizations
                seeking transparent, dependable, and seamless mobility.
              </p>

              <div className="about-pillars">
                <div className="pillar-item">
                  <div className="pillar-icon bg-blue-subtle">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="pillar-title">Uncompromising Safety Standards</h4>
                    <p className="pillar-desc">
                      Every vehicle undergoes routine 100-point mechanical audits, driven
                      by certified chauffeurs with clean safety track records.
                    </p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon bg-emerald-subtle">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m4.93 4.93 4.24 4.24" />
                      <path d="m14.83 9.17 4.24-4.24" />
                      <path d="m14.83 14.83 4.24 4.24" />
                      <path d="m9.17 14.83-4.24 4.24" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="pillar-title">Real-Time Fleet Telematics</h4>
                    <p className="pillar-desc">
                      GPS tracking, automated arrival alerts, and dedicated dispatchers
                      monitor your trip from pickup to destination.
                    </p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-icon bg-amber-subtle">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="pillar-title">Transparent, All-Inclusive Quotes</h4>
                    <p className="pillar-desc">
                      No surprise fuel fees or hidden driver gratuity surcharges. What you
                      see in your quote is your finalized rate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / FLEET FEATURES STRIP */}
      <section id="fleet" className="features-section">
        <div className="section-container">
          <div className="features-banner">
            <div className="features-banner-content">
              <span className="banner-badge">ONBOARD EXPERIENCE</span>
              <h3 className="banner-title">
                First-Class Amenities for Every Mile of the Journey
              </h3>
              <p className="banner-text">
                Every Busify coach is fitted with modern amenities designed to keep your
                passengers connected, refreshed, and productive.
              </p>
              <div className="amenities-grid">
                <div className="amenity-chip">⚡ High-Speed Wi-Fi</div>
                <div className="amenity-chip">🔌 USB &amp; 110V Outlets</div>
                <div className="amenity-chip">💺 Reclining Leather Seats</div>
                <div className="amenity-chip">❄️ Dual-Zone Climate Control</div>
                <div className="amenity-chip">📺 Flat-Screen HD Monitors</div>
                <div className="amenity-chip">🧳 Underfloor Luggage Hold</div>
              </div>
            </div>
            <div className="features-banner-cta">
              <a href="#contact" className="btn-banner-cta">
                Reserve Your Fleet Today
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT & QUOTE SECTION */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">CONTACT US</div>
            <h2 className="section-title">Ready to Plan Your Next Journey?</h2>
            <p className="section-subtitle">
              Get an accurate, no-obligation quote in minutes, or talk to our group transit
              consultants available 24 hours a day.
            </p>
          </div>

          <div className="contact-grid">
            {/* Contact Info Column */}
            <div className="contact-info-col">
              <h3 className="contact-card-heading">Let's Discuss Your Route</h3>
              <p className="contact-card-sub">
                Our operations team provides instant route optimization, passenger capacity
                advising, and transparent contracts.
              </p>

              <div className="contact-details-list">
                <div className="contact-detail-card">
                  <div className="contact-icon-box">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="detail-label">Phone &amp; 24/7 Dispatch</div>
                    <a href="tel:+18005552874" className="detail-value">
                      +1 (800) 555-BUSIFY (2874)
                    </a>
                  </div>
                </div>

                <div className="contact-detail-card">
                  <div className="contact-icon-box">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <div className="detail-label">General &amp; Charter Inquiries</div>
                    <a href="mailto:info@busify.com" className="detail-value">
                      info@busify.com
                    </a>
                  </div>
                </div>

                <div className="contact-detail-card">
                  <div className="contact-icon-box">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="detail-label">Headquarters</div>
                    <span className="detail-value text-normal">
                      450 Transit Parkway, Suite 800, New York, NY 10001
                    </span>
                  </div>
                </div>

                <div className="contact-detail-card">
                  <div className="contact-icon-box">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="detail-label">Dispatch Hours</div>
                    <span className="detail-value text-normal">
                      24 Hours / 7 Days a Week, 365 Days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Request Form */}
            <div className="contact-form-col">
              <div className="form-card">
                <h3 className="form-card-title">Request a Free Quote</h3>
                <p className="form-card-desc">
                  Tell us about your trip and we will deliver a tailored proposal within 30
                  minutes.
                </p>

                {quoteSubmitted ? (
                  <div className="quote-success-banner animate-fade-in-up">
                    <div className="success-icon-circle">✓</div>
                    <h4>Thank You, {quoteForm.name || "Valued Client"}!</h4>
                    <p>
                      Your trip request has been received. Our logistics coordinator is
                      calculating your best route and will contact you via{" "}
                      <strong>{quoteForm.email}</strong> shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuoteSubmit} className="quote-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="quote-name">Your Full Name *</label>
                        <input
                          id="quote-name"
                          type="text"
                          placeholder="e.g. Sarah Jenkins"
                          value={quoteForm.name}
                          onChange={(e) =>
                            setQuoteForm({ ...quoteForm, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="quote-email">Work / Personal Email *</label>
                        <input
                          id="quote-email"
                          type="email"
                          placeholder="sarah@example.com"
                          value={quoteForm.email}
                          onChange={(e) =>
                            setQuoteForm({ ...quoteForm, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="quote-phone">Phone Number</label>
                        <input
                          id="quote-phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={quoteForm.phone}
                          onChange={(e) =>
                            setQuoteForm({ ...quoteForm, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="quote-service">Service Interested In</label>
                        <select
                          id="quote-service"
                          value={quoteForm.serviceType}
                          onChange={(e) =>
                            setQuoteForm({
                              ...quoteForm,
                              serviceType: e.target.value,
                            })
                          }
                        >
                          <option value="bus-rental">Bus &amp; Coach Rental (56 Seats)</option>
                          <option value="corporate-shuttle">Corporate &amp; Campus Shuttle</option>
                          <option value="intercity-charter">Charter &amp; Tour Services</option>
                          <option value="airport-transfer">Airport &amp; Hotel Transfer</option>
                          <option value="vip-sprinter">Executive Luxury Sprinter</option>
                          <option value="other">Other Custom Transit</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="quote-message">
                        Trip Details (Dates, Cities, Est. Passengers)
                      </label>
                      <textarea
                        id="quote-message"
                        rows="3"
                        placeholder="Provide details such as pickup location, destination, approximate dates, and special requests..."
                        value={quoteForm.message}
                        onChange={(e) =>
                          setQuoteForm({ ...quoteForm, message: e.target.value })
                        }
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-submit-quote">
                      <span>Submit Quote Request</span>
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width="18"
                        height="18"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPROVED PROFESSIONAL FOOTER */}
      <footer className="footer-section">
        <div className="footer-top-wave"></div>
        <div className="footer-container">
          <div className="footer-main-grid">
            {/* Brand Column */}
            <div className="footer-brand-col">
              <a href="#top" className="footer-brand">
                <div className="logo-icon-wrapper">
                  <svg
                    className="logo-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M8 6v6" />
                    <path d="M16 6v6" />
                    <path d="M2 12h20" />
                    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a2 2 0 0 0-.22-.91L20.24 9.4A2 2 0 0 0 18.45 8H5.55a2 2 0 0 0-1.79 1.4L2.22 12.44a2 2 0 0 0-.22.91V17a1 1 0 0 0 1 1h2" />
                    <circle cx="7" cy="18" r="2" />
                    <path d="M9 18h6" />
                    <circle cx="17" cy="18" r="2" />
                  </svg>
                </div>
                <span className="brand-text">
                  Bus<span className="brand-accent">ify</span>
                </span>
              </a>
              <p className="footer-tagline">
                The modern standard in bus rentals, corporate shuttles, and group charter
                transit. Providing reliable, connected, and safe journeys across North
                America.
              </p>
              <div className="footer-social-links">
                <a
                  href="#social"
                  className="social-btn"
                  aria-label="X (Twitter)"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#social"
                  className="social-btn"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                </a>
                <a
                  href="#social"
                  className="social-btn"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                  </svg>
                </a>
                <a
                  href="#social"
                  className="social-btn"
                  aria-label="Instagram"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="18"
                    height="18"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="footer-links-col">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links-list">
                <li><a href="#about">About Busify</a></li>
                <li><a href="#services">Our Services</a></li>
                <li><a href="#fleet">Why Choose Us</a></li>
                <li><a href="#booking">Search Availability</a></li>
                <li><a href="#contact">Get a Quote</a></li>
                <li><a href="#top">Customer Reviews</a></li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="footer-links-col">
              <h4 className="footer-heading">Transit Fleet</h4>
              <ul className="footer-links-list">
                <li><a href="#services">56-Seat Motorcoaches</a></li>
                <li><a href="#services">Corporate Daily Shuttles</a></li>
                <li><a href="#services">Airport &amp; Port Transfers</a></li>
                <li><a href="#services">School &amp; University Trips</a></li>
                <li><a href="#services">Executive Sprinter Vans</a></li>
                <li><a href="#services">Weddings &amp; Large Events</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="footer-newsletter-col">
              <h4 className="footer-heading">Stay in the Loop</h4>
              <p className="newsletter-desc">
                Subscribe for exclusive route promotions, group travel discounts, and fleet
                updates.
              </p>

              {newsletterSuccess ? (
                <div className="newsletter-success">
                  ✓ You have been subscribed! Check your inbox soon.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn-newsletter">
                    Subscribe
                  </button>
                </form>
              )}

              <div className="security-note">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="14"
                  height="14"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>We respect your privacy. No spam ever.</span>
              </div>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom-bar">
            <p className="copyright-text">
              &copy; 2026 Busify Inc. All rights reserved. Built with precision for safe
              travel.
            </p>
            <div className="footer-legal-links">
              <a href="#privacy">Privacy Policy</a>
              <span className="dot-divider">•</span>
              <a href="#terms">Terms of Service</a>
              <span className="dot-divider">•</span>
              <a href="#safety">Safety &amp; Compliance</a>
              <span className="dot-divider">•</span>
              <a href="#cookies">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
