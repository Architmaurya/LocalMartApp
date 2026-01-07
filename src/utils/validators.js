/**
 * Validate name
 */
export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }
  return null;
};

/**
 * Validate phone number (India-friendly)
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return "Enter a valid 10-digit phone number";
  }
  return null;
};

/**
 * Validate address
 */
export const validateAddress = (address) => {
  if (!address || address.trim().length < 5) {
    return "Address must be at least 5 characters";
  }
  return null;
};
