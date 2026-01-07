import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "CART";

export const saveCart = async (cart) =>
  AsyncStorage.setItem(KEY, JSON.stringify(cart));

export const loadCart = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};
