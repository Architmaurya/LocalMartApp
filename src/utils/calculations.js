export const TAX_PERCENT = 5;

/**
 * Calculate subtotal from cart items
 */
export const calculateSubtotal = (items = []) => {
  return items.reduce((sum, item) => {
    return sum + Number(item.price) * Number(item.qty);
  }, 0);
};

/**
 * Calculate tax (5%)
 */
export const calculateTax = (subtotal) => {
  return (Number(subtotal) * TAX_PERCENT) / 100;
};

/**
 * Calculate grand total
 */
export const calculateTotal = (subtotal) => {
  return Number(subtotal) + calculateTax(subtotal);
};
