import {
  ADD_TO_CART,
  UPDATE_QTY,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "./cart.actions";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const exist = state.find(
        (i) => i.id === action.payload.id
      );

      if (exist) {
        return state.map((i) =>
          i.id === action.payload.id
            ? {
                ...i,
                qty: i.qty + (action.payload.qty || 1),
              }
            : i
        );
      }

      return [
        ...state,
        {
          ...action.payload,
          price: Number(action.payload.price), // 🔥 FIX
          qty: action.payload.qty || 1,
        },
      ];
    }

    case UPDATE_QTY:
      return state.map((i) =>
        i.id === action.payload.id
          ? { ...i, qty: action.payload.qty }
          : i
      );

    case REMOVE_FROM_CART:
      return state.filter((i) => i.id !== action.payload);

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
};
