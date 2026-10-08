import React, { useEffect, useState } from 'react';
import napolitana from '../assets/imgs/napolitana.png';

const Pizza = () => {
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas/p001')
      .then((response) => response.json())
      .then((data) => setPizza(data))
      .catch((error) =>
        console.error('Error al obtener la pizza:', error)
      );
  }, []);

  if (!pizza) {
    return (
      <div className="container py-5 text-center">
        <p>Cargando pizza...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">

            <img
              src={napolitana}
              className="card-img-top"
              alt={pizza.name}
            />

            <div className="card-body">
              <h2 className="card-title">
                {pizza.name}
              </h2>

              <p className="card-text">
                <strong>Descripción:</strong>
              </p>

              <p className="card-text">
                {pizza.description}
              </p>

              <p className="card-text">
                <strong>Ingredientes:</strong>
              </p>

              <ul>
                {pizza.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient}
                  </li>
                ))}
              </ul>

              <h3 className="text-danger">
                ${pizza.price.toLocaleString('es-CL')}
              </h3>

              <button className="btn btn-dark">
                Añadir al carrito
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;



