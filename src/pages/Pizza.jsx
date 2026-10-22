import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import napolitana from '../assets/imgs/napolitana.png';

const Pizza = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [pizza, setPizza] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setPizza(null);
    setError(false);

    fetch(`http://localhost:5000/api/pizzas/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la pizza');
        }

        return response.json();
      })
      .then((data) => {
        setPizza(data);
      })
      .catch((error) => {
        console.error('Error al obtener la pizza:', error);
        setError(true);
      });
  }, [id]);

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h2>No se pudo cargar la pizza</h2>

        <p>
          Comprueba que el servidor de la API esté funcionando
          y que la pizza exista.
        </p>

        <Link to="/" className="btn btn-dark">
          Volver al menú
        </Link>
      </div>
    );
  }

  if (!pizza) {
    return (
      <div className="container py-5 text-center">
        <p>Cargando pizza...</p>
      </div>
    );
  }

  return (
    <main className="container py-5">
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
                {pizza.desc}
              </p>

              <p className="card-text">
                <strong>Ingredientes:</strong>
              </p>

              <ul>
                {Array.isArray(pizza.ingredients) &&
                  pizza.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient}
                    </li>
                  ))}
              </ul>

              <h3 className="text-danger">
                ${Number(pizza.price).toLocaleString('es-CL')}
              </h3>

              <div className="d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-dark"
                  onClick={() => addToCart(pizza)}
                >
                  🛒 Añadir al carrito
                </button>

                <Link
                  to="/"
                  className="btn btn-outline-dark"
                >
                  Volver al menú
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pizza;



