// src/pages/AboutPage.jsx
import React from 'react';
import PageTemplate from '../compnent/PageTemplate';
import '../../css/AboutPage.css';

const AboutPage = () => {
  return (
    <PageTemplate title="About Us">
      <div className="about-container">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>Mangalashtak was founded in 2020 with a simple mission: to help people find meaningful, lasting relationships based on compatibility, shared values, and mutual respect. What started as a small passion project has grown into one of the most trusted matrimonial platforms today.</p>
          
          <p>Our team consists of relationship experts, data scientists, and technologists who are passionate about bringing people together in meaningful relationships.</p>
        </section>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>We believe that finding a life partner should be a thoughtful, intentional journey. Our mission is to create a safe, respectful platform where individuals can connect with potential partners who share their values and vision for the future.</p>
        </section>
        
        <section className="about-section">
          <h2>Our Approach</h2>
          <p>Unlike casual dating apps, Mangalashtak is designed specifically for those seeking marriage and long-term commitment. Our matching algorithm considers compatibility across multiple dimensions:</p>
          
          <div className="approach-grid">
            <div className="approach-item">
              <div className="approach-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Values & Beliefs</h3>
              <p>We match people based on shared core values and beliefs that form the foundation of lasting relationships.</p>
            </div>
            
            <div className="approach-item">
              <div className="approach-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>Life Goals</h3>
              <p>Matching on important life goals helps ensure couples are moving in the same direction.</p>
            </div>
            
            <div className="approach-item">
              <div className="approach-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Family Compatibility</h3>
              <p>We consider family backgrounds and expectations to help create harmony in marriages.</p>
            </div>
            
            <div className="approach-item">
              <div className="approach-icon">
                <i className="fas fa-laugh"></i>
              </div>
              <h3>Personality Match</h3>
              <p>Our algorithm matches complementary personality traits for better relationship dynamics.</p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2>Our Team</h2>
          <p>Mangalashtak is powered by a diverse team of professionals dedicated to helping you find your perfect match. Our team includes relationship counselors, data scientists, and customer support specialists working together to provide you with the best matrimonial service.</p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo placeholder-image"></div>
              <h3>Arjun Sharma</h3>
              <p>Founder & CEO</p>
            </div>
            
            <div className="team-member">
              <div className="member-photo placeholder-image"></div>
              <h3>Priya Patel</h3>
              <p>Head of Matching Algorithm</p>
            </div>
            
            <div className="team-member">
              <div className="member-photo placeholder-image"></div>
              <h3>Raj Mehta</h3>
              <p>Chief Relationship Officer</p>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default AboutPage;