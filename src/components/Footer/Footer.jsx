import terraquest_logo from '../../assets/Footer/terraquest-logo.png'
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="about">
      <div className="footer-container">

        <div className="footer-grid">

          {/* Brand Column */}
          <div className="footer-brand-column">
            <a href="#home" className="footer-brand">
              <img
                src={terraquest_logo}
                alt="TerraQuest Explorer Logo"
              />

              <span>
                <b>TerraQuest</b>
                <small>EXPLORER</small>
              </span>
            </a>

            <p>
              A travel discovery platform to explore
              extraordinary places, unique experiences,
              and the wonders of our world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>

            <a href="#home">Home</a>
            <a href="#popular">Explore</a>
            <a href="#experiences">Experiences</a>
            <a href="#about">About</a>
          </div>

          {/* Explore Links */}
          <div className="footer-links">
            <h4>Explore</h4>

            <a href="#experiences">Mountains</a>
            <a href="#experiences">Beaches</a>
            <a href="#experiences">Wildlife</a>
            <a href="#experiences">Northern Lights</a>
          </div>

          {/* Contact Column */}
          <div className="footer-contact">
            <h4>Get in Touch</h4>

            <p>
              TerraQuest Explorer
              <br />
              Design reference prototype
            </p>

            <div className="footer-socials">
              <a href="#about" aria-label="Social link 1">◉</a>
              <a href="#about" aria-label="Social link 2">◎</a>
              <a href="#about" aria-label="Social link 3">◈</a>
              <a href="#about" aria-label="Social link 4">◌</a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">

          <span>
            © 2026 TerraQuest Explorer. Design study prototype.
          </span>

          <div className="footer-bottom-links">
            <a href="#about">Privacy Policy</a>
            <span>|</span>
            <a href="#about">Terms of Use</a>
            <span>|</span>
            <a href="#about">Contact</a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;

