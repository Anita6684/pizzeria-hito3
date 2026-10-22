import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice.js';

const CardPizza = ({
  id,
  name,
  price,
  ingredients,
  img,
  onAddToCart
}) => {
  return (
    <article className="card pizza-card h-100 border-0 shadow-sm overflow-hidden">
      <div className="pizza-image-wrapper">
        <img
          src={img}
          className="card-img-top pizza-image"
          alt={`Pizza ${name}`}
        />
      </div>

      <div className="card-body p-4 d-flex flex-column">
        <h3 className="card-title text-center fw-bold mb-3">
          {name}
        </h3>

        <div className="ingredients-box mb-4">
          <p className="small text-uppercase text-secondary fw-semibold mb-2">
            Ingredientes
          </p>

          <ul className="list-unstyled mb-0">
            {ingredients.map((ingredient) => (
              <li key={ingredient} className="ingredient-item">
                <i className="bi bi-check2-circle me-2"></i>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <div className="price text-center mb-3">
            ${formatPrice(price)}
          </div>

          <div className="d-flex gap-2">
            <Link
              className="btn btn-outline-dark flex-fill"
              to={`/pizza/${id}`}
            >
              Ver más
            </Link>

            <button
              className="btn btn-dark flex-fill"
              onClick={onAddToCart}
              type="button"
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardPizza;




