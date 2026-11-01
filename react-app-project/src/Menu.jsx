import { useState } from "react";
import "./Menu.css";

const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#top" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="logo-icon-wrapper">
            <svg
              className="logo-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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

        {/* Desktop Navigation Links */}
        <nav className={`navbar-nav ${isMobileMenuOpen ? "is-open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#about" className="nav-link" onClick={closeMobileMenu}>
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a href="#services" className="nav-link" onClick={closeMobileMenu}>
                Our Services
              </a>
            </li>
            <li className="nav-item">
              <a href="#fleet" className="nav-link" onClick={closeMobileMenu}>
                Why Choose Us
              </a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link" onClick={closeMobileMenu}>
                Contact Us
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <a
              href="#booking"
              className="btn-nav-primary"
              onClick={closeMobileMenu}
            >
              <span>Get Instant Quote</span>
              <svg
                className="btn-arrow"
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
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className={`hamburger-btn ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Menu;
