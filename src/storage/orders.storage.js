import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "ORDERS";

export const saveOrders = async (orders) =>
  AsyncStorage.setItem(KEY, JSON.stringify(orders));

export const loadOrders = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};
