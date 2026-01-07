import { createContext, useEffect, useReducer } from "react";
import { ordersReducer } from "./orders.reducer";
import { loadOrders, saveOrders } from "../../storage/orders.storage";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, dispatch] = useReducer(ordersReducer, []);

  useEffect(() => {
    loadOrders().then(data => data && dispatch({ type: "INIT", payload: data }));
  }, []);

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  return (
    <OrdersContext.Provider value={{ orders, dispatch }}>
      {children}
    </OrdersContext.Provider>
  );
};
