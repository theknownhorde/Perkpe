import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const AppNavbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem('name');
    if (userName) setUser(userName);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="navbar-grid-container">
      {/* Left Section: Logo and Title */}
      <div className="navbar-logo-title">
        <Link to="/" className="navbar-brand-custom">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="navbar-logo"
          />
          <span>Loyalty Points Exchange</span>
        </Link>
      </div>

      {/* Right Section: Links */}
      <div className="navbar-links">
        <Nav className="navbar-nav">
          <Nav.Link as={Link} to="/" className="nav-link-custom">
            Dashboard
          </Nav.Link>
          {user ? (
            <NavDropdown
              title={user}
              id="nav-dropdown"
              className="nav-dropdown-custom"
            >
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="nav-link-custom">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup" className="nav-link-custom">
                Signup
              </Nav.Link>
            </>
          )}
        </Nav>
      </div>
    </div>
  );
};

export default AppNavbar;
