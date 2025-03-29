import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <div className="logo">Health<span className="highlight">Portal</span></div>
        <nav className="menu">
          <Link to="/register" className="menu-btn">Doctor Register</Link>
          <Link to="/patient" className="menu-btn">Patient Register</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span className="highlight">HealthPortal</span></h1>
          <p>Welcome to our AI Healthcare Portal! Whether you're worrying with injuries or diseases, our portal provides efficient support to help you manage your health. From diagnosing symptoms to recommending treatments , we’ve got you covered. Our AI portal ensures personalized care and reliable information. With us, you can access expert advice anytime, anywhere—no worries, we are always here to help you stay healthy.</p>
          <p>Your one-stop solution for managing health and lab reports efficiently.</p>
          <div className="hero-buttons">
            <button className="main-btn">Explore Health Reports</button>
            <button className="main-btn secondary-btn">View Lab Reports</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://blog.ipleaders.in/wp-content/uploads/2020/01/Health-Insurance.jpg"
            alt="Health Portal Illustration"
            className="main-image"
          />
        </div>
      </section>

      {/* New Background Section */}
      <section className="background-section"></section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 HealthPortal. All rights reserved.</p>
          <p>
            This website uses cookies to ensure you get the best experience.
            <button className="cookie-btn">Accept</button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;