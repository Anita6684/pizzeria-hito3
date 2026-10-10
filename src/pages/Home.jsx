import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import CardPizza from '../components/CardPizza.jsx';
import napolitana from '../assets/imgs/napolitana.png';

const Home = ({ addToCart }) => {
  const [pizzas, setPizzas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las pizzas');
        }
        return response.json();
      })
      .then((data) => {
        setPizzas(data);
      })
      .catch((error) => {
        console.error('Error al obtener las pizzas:', error);
      });
  }, []);

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
                  onViewMore={() => navigate('/pizza/p001')}
                  onAddToCart={() => {
                    if (addToCart) {
                      addToCart({
                        ...pizza,
                        img: napolitana
                      });
                    }
                  }}
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





