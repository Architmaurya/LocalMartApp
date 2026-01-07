import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "PRODUCTS_CACHE";

export const saveProducts = async (data) =>
  AsyncStorage.setItem(KEY, JSON.stringify(data));

export const loadProducts = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
};
