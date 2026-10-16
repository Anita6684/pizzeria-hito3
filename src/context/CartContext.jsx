import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar una pizza o aumentar su cantidad
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existingPizza = prevCart.find(
        (item) => item.id === pizza.id
      );

      if (existingPizza) {
        return prevCart.map((item) =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...pizza, quantity: 1 }];
    });
  };

  // Disminuir una unidad y eliminarla si llega a cero
  const removeFromCart = (pizzaId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === pizzaId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Eliminar completamente una pizza del carrito
  const deleteFromCart = (pizzaId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== pizzaId)
    );
  };

  // Calcular el total de la compra
  const total = cart.reduce(
    (sum, pizza) => sum + pizza.price * pizza.quantity,
    0
  );

  const cartCount = cart.reduce(
    (sum, pizza) => sum + pizza.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        deleteFromCart,
        total,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);