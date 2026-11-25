
import { useState } from 'react';
import { Mail } from 'lucide-react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage('Please enter your email address.');
      return;
    }

    setMessage('Thank you for your interest! Newsletter signup is ready to connect.');
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">

        {/* Newsletter Content */}
        <div className="newsletter-content">
          <h2>Stay Inspired</h2>

          <p>
            Subscribe to our newsletter for travel ideas, new
            destinations, and exploration guides.
          </p>
        </div>

        {/* Newsletter Form */}
        <div className="newsletter-form-wrapper">
          <form
            className="newsletter-form"
            onSubmit={handleSubmit}
          >
            <div className="newsletter-input-group">
              <Mail className="newsletter-mail-icon" />

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage('');
                }}
                required
                aria-label="Email address"
              />
            </div>

            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>

          {message && (
            <p className="newsletter-message" role="status">
              {message}
            </p>
          )}
        </div>

      </div>
    </section>
  );
};

export default Newsletter;
