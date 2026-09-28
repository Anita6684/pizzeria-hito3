import React, { useState } from 'react';
import { pizzaCart } from '../utils/pizza.js';
import { formatPrice } from '../utils/formatPrice.js';

const Cart = () => {
  const [cart, setCart] = useState(pizzaCart);

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((pizza) =>
        pizza.id === id
          ? { ...pizza, quantity: pizza.quantity + 1 }
          : pizza
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((pizza) =>
          pizza.id === id
            ? { ...pizza, quantity: pizza.quantity - 1 }
            : pizza
        )
        .filter((pizza) => pizza.quantity > 0)
    );
  };

  const total = cart.reduce(
    (acc, pizza) => acc + pizza.price * pizza.quantity,
    0
  );

  return (
    <main className="py-5">
      <div className="container">
        <h2 className="fw-bold mb-4">🛒 Carrito de compras</h2>

        {cart.length === 0 ? (
          <p className="text-secondary">Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="row g-4">
              {cart.map((pizza) => (
                <div className="col-12" key={pizza.id}>
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="row align-items-center">

                        <div className="col-3 col-md-2">
                          <img
                            src={pizza.img}
                            alt={`Pizza ${pizza.name}`}
                            className="img-fluid rounded"
                          />
                        </div>

                        <div className="col-5 col-md-5">
                          <h5 className="fw-bold mb-1">{pizza.name}</h5>
                          <p className="mb-0 text-secondary">
                            ${formatPrice(pizza.price)}
                          </p>
                        </div>

                        <div className="col-4 col-md-5">
                          <div className="d-flex align-items-center justify-content-end gap-2">
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => decreaseQuantity(pizza.id)}
                            >
                              −
                            </button>

                            <span className="fw-bold px-2">
                              {pizza.quantity}
                            </span>

                            <button
                              className="btn btn-outline-success"
                              onClick={() => increaseQuantity(pizza.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body text-end">
                <h4 className="fw-bold">
                  Total: ${formatPrice(total)}
                </h4>

                <button className="btn btn-dark mt-2">
                  Pagar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Cart;
