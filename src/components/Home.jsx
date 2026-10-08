import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import CardPizza from './CardPizza.jsx';
import Pizza from './Pizza.jsx';
import napolitana from '../assets/imgs/napolitana.png';

const Home = ({ addToCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then((response) => response.json())
      .then((data) => setPizzas(data))
      .catch((error) =>
        console.error('Error al obtener las pizzas:', error)
      );
  }, []);

  if (selectedPizza) {
    return (
      <main>
        <Header />

        <Pizza
          pizza={{
            ...selectedPizza,
            img: napolitana
          }}
          onAddToCart={() =>
            addToCart({
              ...selectedPizza,
              img: napolitana
            })
          }
        />

        <div className="container pb-5 text-center">
          <button
            className="btn btn-outline-dark"
            onClick={() => setSelectedPizza(null)}
          >
            Volver al menú
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header />

      <section className="py-5 pizza-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-label">NUESTRO MENÚ</span>

            <h2 className="fw-bold mt-2">
              Elige tu pizza favorita
            </h2>

            <p className="text-secondary">
              Recetas clásicas preparadas con ingredientes seleccionados.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {pizzas.map((pizza) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={pizza.id}
              >
                <CardPizza
                  name={pizza.name}
                  price={pizza.price}
                  ingredients={pizza.ingredients}
                  img={napolitana}
                  onViewMore={() => setSelectedPizza(pizza)}
                  onAddToCart={() =>
                    addToCart({
                      ...pizza,
                      img: napolitana
                    })
                  }
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





