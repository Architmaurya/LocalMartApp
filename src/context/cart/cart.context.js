import { createContext, useEffect, useReducer } from "react";
import { cartReducer } from "./cart.reducer";
import { loadCart, saveCart } from "../../storage/cart.storage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    loadCart().then(dispatchCart => {
      if (dispatchCart) {
        dispatch({ type: "INIT", payload: dispatchCart });
      }
    });
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
