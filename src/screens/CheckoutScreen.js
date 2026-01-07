import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { useCart } from "../hooks/useCart";
import { OrdersContext } from "../context/orders/orders.context";

import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "../utils/calculations";

import {
  validateName,
  validatePhone,
  validateAddress,
} from "../utils/validators";

export default function CheckoutScreen({ navigation }) {
  const { cart, dispatch } = useCart();
  const { dispatch: orderDispatch } = useContext(OrdersContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  // ❗ Prevent checkout with empty cart
  if (!cart.length) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">
          Your cart is empty
        </Text>
      </SafeAreaView>
    );
  }

  const subtotal = calculateSubtotal(cart);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal);

  const handlePlaceOrder = () => {
    // 1️⃣ Validate
    const newErrors = {
      name: validateName(name),
      phone: validatePhone(phone),
      address: validateAddress(address),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      Toast.show({
        type: "error",
        text1: "Invalid details",
        text2: "Please fix the highlighted fields",
        position: "top",
      });
      return;
    }

    // 2️⃣ Create order
    const order = {
      id: Date.now(),
      items: cart,
      customer: { name, phone, address },
      subtotal,
      tax,
      total,
      createdAt: new Date().toISOString(),
    };

    try {
      // 3️⃣ SAVE ORDER (SUCCESS POINT)
      orderDispatch({
        type: "ADD_ORDER",
        payload: order,
      });

      // 4️⃣ CLEAR CART ONLY AFTER SUCCESS
      dispatch({ type: "CLEAR_CART" });

      // 5️⃣ SUCCESS TOAST
      Toast.show({
        type: "success",
        text1: "Order placed 🎉",
        text2: "Your order has been placed successfully",
        position: "top",
      });

  
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Order failed",
        text2: "Something went wrong. Please try again.",
        position: "top",
      });
    }
    navigation.navigate("Tabs", {
  screen: "Orders"
});

  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        {/* HEADER */}
        <View className="px-4 py-3 bg-white border-b border-gray-200">
          <Text className="text-xl font-bold">Checkout</Text>
          <Text className="text-gray-500 text-sm">
            Enter delivery details
          </Text>
        </View>

        {/* CONTENT */}
        <View className="p-4 space-y-4">
          {/* DELIVERY INFO */}
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <Text className="font-semibold text-lg mb-3">
              Delivery Information
            </Text>

            <Text className="text-gray-600 mb-1">Full Name</Text>
            <TextInput
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              className="border border-gray-300 rounded-xl px-4 py-3"
            />
            {errors.name && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.name}
              </Text>
            )}

            <Text className="text-gray-600 mt-3 mb-1">
              Phone Number
            </Text>
            <TextInput
              placeholder="9876543210"
              keyboardType="number-pad"
              value={phone}
              onChangeText={setPhone}
              className="border border-gray-300 rounded-xl px-4 py-3"
            />
            {errors.phone && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.phone}
              </Text>
            )}

            <Text className="text-gray-600 mt-3 mb-1">
              Delivery Address
            </Text>
            <TextInput
              placeholder="House no, Street, City"
              value={address}
              onChangeText={setAddress}
              multiline
              className="border border-gray-300 rounded-xl px-4 py-3 h-24"
            />
            {errors.address && (
              <Text className="text-red-500 text-sm mt-1">
                {errors.address}
              </Text>
            )}
          </View>

          {/* SUMMARY */}
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <Text className="font-semibold text-lg mb-3">
              Order Summary
            </Text>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Subtotal</Text>
              <Text>₹ {subtotal.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Tax (5%)</Text>
              <Text>₹ {tax.toFixed(2)}</Text>
            </View>

            <View className="border-t border-gray-200 my-2" />

            <View className="flex-row justify-between">
              <Text className="font-bold text-lg">Total</Text>
              <Text className="font-bold text-lg">
                ₹ {total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* CTA */}
        <View className="p-4 bg-white border-t border-gray-200">
          <TouchableOpacity
            onPress={handlePlaceOrder}
            className="bg-black py-4 rounded-2xl"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
