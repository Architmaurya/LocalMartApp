export const ordersReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.payload || [];

    case "ADD_ORDER":
      return [action.payload, ...state];

    case "CLEAR_ORDERS":
      return [];

    default:
      return state;
  }
};
