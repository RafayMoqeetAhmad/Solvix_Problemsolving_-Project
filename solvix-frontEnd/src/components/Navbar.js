import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🔧 Solvix
        </Link>
        
        <ul className="navbar-menu">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/submit-problem">Submit Problem</Link></li>
          <li><Link to="/my-problems">My Problems</Link></li>
          <li><Link to="/tutorials">Tutorials</Link></li>
          {user && user.role === 'admin' && (
            <li><Link to="/admin">Admin Panel</Link></li>
          )}
        </ul>

        <div className="navbar-user">
          <span className="navbar-user-name">
            {user ? `Welcome, ${user.name}` : 'Guest'}
          </span>
          <button className="navbar-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
