import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice.js';

const Navbar = () => {
  const total = 25000;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2 text-white text-decoration-none"
          to="/"
        >
          <span className="brand-pizza">🍕</span>
          Mamma Mia!
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Abrir navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <Link
              className="btn btn-outline-light btn-sm nav-btn"
              to="/"
            >
              🍕 Home
            </Link>

            <Link
              className="btn btn-outline-light btn-sm nav-btn"
              to="/login"
            >
              🔐 Login
            </Link>

            <Link
              className="btn btn-outline-light btn-sm nav-btn"
              to="/register"
            >
              🔐 Register
            </Link>

            <Link
              className="btn btn-outline-light btn-sm nav-btn"
              to="/profile"
            >
              👤 Profile
            </Link>

            <Link
              className="btn btn-warning btn-sm fw-semibold nav-btn total-btn"
              to="/cart"
            >
              🛒 Total: ${formatPrice(total)}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;