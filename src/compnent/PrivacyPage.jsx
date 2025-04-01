// src/pages/PrivacyPage.jsx
import React from 'react';
import PageTemplate from '../compnent/PageTemplate';
// import './PolicyPage.css'; // We'll use this for both Privacy and Terms pages

const PrivacyPage = () => {
  return (
    <PageTemplate title="Privacy Policy">
      <div className="policy-container">
        <div className="last-updated">Last Updated: March 30, 2025</div>
        
        <section className="policy-section">
          <h2>Introduction</h2>
          <p>At Mangalashtak, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our matrimonial services.</p>
          <p>Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>
        </section>
        
        <section className="policy-section">
          <h2>Information We Collect</h2>
          <p>We collect information about you in various ways when you use our service. This information includes:</p>
          
          <h3>Personal Data</h3>
          <p>When you register for Mangalashtak, we ask for information that helps us build your profile and provide matching services:</p>
          <ul>
            <li>Name, age, and gender</li>
            <li>Contact information (email address, phone number)</li>
            <li>Location details</li>
            <li>Profile photos</li>
            <li>Personal preferences and interests</li>
            <li>Educational and professional information</li>
            <li>Family details and background</li>
          </ul>
          
          <h3>Usage Data</h3>
          <p>We automatically collect certain information when you visit, use or navigate our website:</p>
          <ul>
            <li>Device and browser information</li>
            <li>IP address</li>
            <li>Pages you view</li>
            <li>Time spent on pages</li>
            <li>Access times and dates</li>
          </ul>
        </section>
        
        <section className="policy-section">
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including to:</p>
          <ul>
            <li>Create and manage your account</li>
            <li>Provide matrimonial matching services</li>
            <li>Process transactions</li>
            <li>Communicate with you about our services</li>
            <li>Improve our website and services</li>
            <li>Protect against fraudulent or unauthorized activity</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>
        
        <section className="policy-section">
          <h2>Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
          
          <h3>By Your Choice</h3>
          <p>When you create a profile, certain information is visible to other users according to your privacy settings.</p>
          
          <h3>Third-Party Service Providers</h3>
          <p>We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, and customer service.</p>
          
          <h3>Legal Requirements</h3>
          <p>We may disclose your information where required to do so by law or if we believe such action is necessary to:</p>
          <ul>
            <li>Comply with a legal obligation</li>
            <li>Protect and defend our rights or property</li>
            <li>Prevent or investigate possible wrongdoing</li>
            <li>Protect the personal safety of users or the public</li>
          </ul>
        </section>
        
        <section className="policy-section">
          <h2>Security of Your Information</h2>
          <p>We use administrative, technical, and physical security measures to protect your personal information. While we have taken reasonable steps to secure the information you provide to us, please be aware that no security measures are perfect or impenetrable, and we cannot guarantee the security of your personal information.</p>
        </section>
        
        <section className="policy-section">
          <h2>Your Privacy Rights</h2>
          <p>You have certain rights regarding your personal information:</p>
          <ul>
            <li><strong>Access:</strong> You can request copies of your personal information.</li>
            <li><strong>Rectification:</strong> You can request that we correct inaccurate information.</li>
            <li><strong>Erasure:</strong> You can request that we delete your personal information.</li>
            <li><strong>Restriction:</strong> You can request that we restrict the processing of your information.</li>
            <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, machine-readable format.</li>
          </ul>
        </section>
        
        <section className="policy-section">
          <h2>Changes to This Policy</h2>
          <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date.</p>
        </section>
        
        <section className="policy-section">
          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <p>privacy@mangalashtak.com</p>
        </section>
      </div>
    </PageTemplate>
  );
};

export default PrivacyPage;