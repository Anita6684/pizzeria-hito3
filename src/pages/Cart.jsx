import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useUser } from "../context/UserContext.jsx";
import { formatPrice } from "../utils/formatPrice.js";

const Cart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    deleteFromCart,
    total,
  } = useCart();

  const { token } = useUser();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Enviar carrito al backend
  const handleCheckout = async () => {
    setMessage("");
    setError("");

    if (!token) {
      setError("Debes iniciar sesión para pagar.");
      return;
    }

    if (cart.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/checkouts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cart: cart,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "No se pudo realizar la compra."
        );
      }

      setMessage("¡Compra realizada exitosamente! 🍕");
    } catch (error) {
      setError(error.message || "Error al procesar la compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="py-5">
      <div className="container">
        <h2 className="fw-bold mb-4">
          🛒 Carrito de compras
        </h2>

        {cart.length === 0 ? (
          <p className="text-secondary">
            Tu carrito está vacío.
          </p>
        ) : (
          <>
            <div className="row g-4">
              {cart.map((pizza) => (
                <div className="col-12" key={pizza.id}>
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="row align-items-center g-3">
                        <div className="col-3 col-md-2">
                          <img
                            src={pizza.img}
                            alt={`Pizza ${pizza.name}`}
                            className="img-fluid rounded"
                          />
                        </div>

                        <div className="col-5 col-md-4">
                          <h5 className="fw-bold mb-1">
                            {pizza.name}
                          </h5>

                          <p className="mb-0 text-secondary">
                            ${formatPrice(pizza.price)}
                          </p>

                          <p className="mb-0 text-success fw-bold">
                            Subtotal: $
                            {formatPrice(
                              pizza.price * pizza.quantity
                            )}
                          </p>
                        </div>

                        <div className="col-4 col-md-6">
                          <div className="d-flex align-items-center justify-content-end gap-2 flex-wrap">
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => {
                                setMessage("");
                                removeFromCart(pizza.id);
                              }}
                            >
                              −
                            </button>

                            <span className="fw-bold">
                              {pizza.quantity}
                            </span>

                            <button
                              className="btn btn-outline-success"
                              onClick={() => {
                                setMessage("");
                                addToCart(pizza);
                              }}
                            >
                              +
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                setMessage("");
                                deleteFromCart(pizza.id);
                              }}
                            >
                              Eliminar
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

                <button
                  className="btn btn-dark mt-2"
                  onClick={handleCheckout}
                  disabled={!token || loading}
                >
                  {loading ? "Procesando compra..." : "Pagar"}
                </button>

                {!token && (
                  <p className="text-danger mt-2 mb-0">
                    Debes iniciar sesión para pagar.
                  </p>
                )}

                {message && (
                  <p className="text-success fw-bold mt-3 mb-0">
                    {message}
                  </p>
                )}

                {error && (
                  <p className="text-danger mt-3 mb-0">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Cart;



