import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/HomePage.css'; // We'll create this file next

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: "Priya & Rahul",
      content: "We found each other on HeartMatch and got married last year. The matching algorithm really works!",
      image: "https://res.cloudinary.com/dbqjo8ncc/image/upload/v1743345465/xkvpwwbgsgekhsfsb49n.png"
    },
    {
      id: 2,
      name: "Ananya & Vikram",
      content: "After trying several matrimonial sites, HeartMatch connected us within weeks. We're so grateful!",
      image: "https://res.cloudinary.com/dbqjo8ncc/image/upload/v1743345534/ghmj6ja0ppyugndpdmrt.png"
    },
    {
      id: 3,
      name: "Sarah & Omar",
      content: "The detailed preferences helped us find our perfect match. Thank you HeartMatch!",
      image: "https://res.cloudinary.com/dbqjo8ncc/image/upload/v1743345598/awfdbzblaurtu2gb2of2.png"
    }
  ];

  // Auto slide for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Match</h1>
          <p>Join thousands who found their life partner on Mangalashtak</p>
          
          <div className="hero-buttons">
            {!isLoggedIn ? (
              <>
                <Link to="/register" className="btn-primary">Register Now</Link>
                <Link to="/login" className="btn-secondary">Log In</Link>
              </>
            ) : (
              <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
            )}
          </div>
        </div>
        <div className="hero-image">
          <img src="https://res.cloudinary.com/dbqjo8ncc/image/upload/v1743345214/h00agsmtfunmywocbvhy.png" 
               alt="Happy couple" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How Mangalashtak Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h3>Create Profile</h3>
            <p>Sign up and create your detailed profile with photos and preferences</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-search"></i>
            </div>
            <h3>Find Matches</h3>
            <p>Our algorithm finds compatible matches based on your preferences</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>Connect</h3>
            <p>Chat with potential matches and get to know each other</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h3>Find Love</h3>
            <p>Meet in person and begin your journey together</p>
          </div>
        </div>
      </section>

      {/* Success Stories/Testimonials */}
      <section className="testimonials">
        <h2>Success Stories</h2>
        <div className="testimonial-slider">
          <div className="testimonial-slide" style={{transform: `translateX(-${currentSlide * 100}%)`}}>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className={`testimonial-card ${index === currentSlide ? 'active' : ''}`}>
                <div className="testimonial-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="testimonial-content">
                  <p>"{testimonial.content}"</p>
                  <h4>{testimonial.name}</h4>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Mangalashtak?</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-lock"></i>
            </div>
            <h3>Privacy First</h3>
            <p>Your data is secure and we respect your privacy</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Verified Profiles</h3>
            <p>All profiles are manually verified for authenticity</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-sliders-h"></i>
            </div>
            <h3>Advanced Matching</h3>
            <p>Our algorithm considers preferences, compatibility and values</p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-headset"></i>
            </div>
            <h3>24/7 Support</h3>
            <p>Our customer support team is always available to help</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Find Your Perfect Match?</h2>
          <p>Join thousands of couples who found love on Mangalashtak</p>
          <Link to="/register" className="btn-primary">Start Your Journey</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>Mangalashtak</h2>
            <p>Finding love, one match at a time</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/careers">Careers</Link>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
            <div className="link-group">
              <h4>Resources</h4>
              <Link to="/blog">Blog</Link>
              <Link to="/success-stories">Success Stories</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          </div>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Mangalashtak. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;