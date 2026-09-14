import React from 'react';
import { formatPrice } from '../utils/formatPrice.js';

const Navbar = ({ setPage }) => {
  const total = 25000;
  const token = false;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">

        <button
          className="navbar-brand fw-bold d-flex align-items-center gap-2 btn btn-link text-white text-decoration-none"
          onClick={() => setPage('home')}
        >
          <span className="brand-pizza">🍕</span>
          Mamma Mia!
        </button>

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

            <button
              className="btn btn-outline-light btn-sm nav-btn"
              onClick={() => setPage('home')}
            >
              🍕 Home
            </button>

            {token ? (
              <>
                <button className="btn btn-outline-light btn-sm nav-btn">
                  🔓 Profile
                </button>

                <button className="btn btn-outline-light btn-sm nav-btn">
                  🔒 Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-light btn-sm nav-btn"
                  onClick={() => setPage('login')}
                >
                  🔐 Login
                </button>

                <button
                  className="btn btn-outline-light btn-sm nav-btn"
                  onClick={() => setPage('register')}
                >
                  🔐 Register
                </button>
              </>
            )}

            <button className="btn btn-warning btn-sm fw-semibold nav-btn total-btn">
              🛒 Total: ${formatPrice(total)}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;