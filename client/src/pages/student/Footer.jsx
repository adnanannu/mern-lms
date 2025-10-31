
import '/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Footer Logo Section */}
        <div className="footer-logo">
          <h2 style={{color:"orange"}}>tuttorz</h2>
          <p>Your tagline or a short description goes here.</p>
        </div>

        {/* Footer Navigation Section */}
        <nav className="footer-nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        {/* Footer Social Media Section */}
        <div className="footer-socials">
          <h3>Follow Us</h3>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>

        {/* Footer Contact Section */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: contact@yourcompany.com</p>
          <p>Phone: +1 (234) 567-8901</p>
          <p>Address: 123 Your Street, City, Country</p>
        </div>

        {/* Footer Newsletter Section */}
        <div className="footer-newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button" style={{background:"black"}}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
        <p>
          <a href="#privacy-policy">Privacy Policy</a> | <a href="#terms-of-service">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
