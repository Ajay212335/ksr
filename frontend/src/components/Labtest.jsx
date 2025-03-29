import React from 'react';
import { Link } from 'react-router-dom';
function Labtest() {
  return (
    <div><header className="header">
                    <div className="logo">HealthPortal</div>
                    <nav className="menu">
                      <Link to="/patient-dashboard/:uniqueId" className="menu-btn">Profile</Link>
                      <Link to="/labtest" className="menu-btn">Lab Test</Link>
                      <Link to="/health" className="menu-btn">Health Records</Link>
                      <Link to="/doctor" className="menu-btn">Chat Bot</Link>
                    </nav>
                  </header>
                  <h2>Labtest</h2>
                  </div>
  )
}

export default Labtest;