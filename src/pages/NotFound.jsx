import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-1 fw-bold">404</h1>
      <h2>¡Ups! Página no encontrada</h2>
      <p className="text-muted">
        Parece que la pizza que buscas no está en nuestro menú.
      </p>

      <Link to="/" className="btn btn-danger mt-3">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;