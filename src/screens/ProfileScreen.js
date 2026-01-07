import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { APP_NAME } from "../utils/constants";
import { useCart } from "../hooks/useCart";
import { useContext } from "react";
import { OrdersContext } from "../context/orders/orders.context";

export default function ProfileScreen() {
  const { dispatch } = useCart();
  const { dispatch: orderDispatch } = useContext(OrdersContext);

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    Toast.show({
      type: "success",
      text1: "Cart cleared",
      position: "top",
    });
  };

  const handleClearOrders = () => {
    orderDispatch({ type: "CLEAR_ORDERS" });
    Toast.show({
      type: "success",
      text1: "Order history cleared",
      position: "top",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* HEADER */}
      <View className="px-4 py-3 bg-white border-b border-gray-200">
        <Text className="text-xl font-bold">Profile</Text>
      </View>

      {/* USER CARD */}
      <View className="bg-white m-4 p-4 rounded-2xl shadow-sm">
        <Text className="text-lg font-semibold mb-1">
          Guest User
        </Text>
        <Text className="text-gray-500">
          guest@localmart.app
        </Text>
      </View>

      {/* ACTIONS */}
      <View className="bg-white mx-4 rounded-2xl shadow-sm">
        <TouchableOpacity
          onPress={handleClearCart}
          className="px-4 py-4 border-b border-gray-200"
        >
          <Text className="text-red-600 font-semibold">
            Clear Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleClearOrders}
          className="px-4 py-4"
        >
          <Text className="text-red-600 font-semibold">
            Clear Order History
          </Text>
        </TouchableOpacity>
      </View>

      {/* APP INFO */}
      {/* <View className="mt-auto p-4 items-center">
        <Text className="text-gray-400 text-sm">
          {APP_NAME} © {new Date().getFullYear()}
        </Text>
        <Text className="text-gray-400 text-xs mt-1">
          Built with React Native & Expo
        </Text>
      </View> */}
    </SafeAreaView>
  );
}
