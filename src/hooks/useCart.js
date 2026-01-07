import { useContext } from "react";
import { CartContext } from "../context/cart/cart.context";

export const useCart = () => useContext(CartContext);
