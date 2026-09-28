import React from 'react';
import Header from './Header.jsx';
import CardPizza from './CardPizza.jsx';
import { pizzas } from '../utils/pizza.js';

const Home = () => {
  return (
    <main>
      <Header />

      <section className="py-5 pizza-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-label">NUESTRO MENÚ</span>
            <h2 className="fw-bold mt-2">Elige tu pizza favorita</h2>
            <p className="text-secondary">
              Recetas clásicas preparadas con ingredientes seleccionados.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {pizzas.map((pizza) => (
              <div className="col-12 col-md-6 col-lg-4" key={pizza.id}>
                <CardPizza
                  name={pizza.name}
                  price={pizza.price}
                  ingredients={pizza.ingredients}
                  img={pizza.img}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;


