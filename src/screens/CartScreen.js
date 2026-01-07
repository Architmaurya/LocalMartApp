import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CartItem from "../components/CartItem";
import EmptyState from "../components/EmptyState";
import { useCart } from "../hooks/useCart";

import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "../utils/calculations";

export default function CartScreen({ navigation }) {
  const { cart, dispatch } = useCart();

  if (!cart.length) {
    return (
      <SafeAreaView className="flex-1">
        <EmptyState message="Your cart is empty" />
      </SafeAreaView>
    );
  }

  const subtotal = calculateSubtotal(cart);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <FlatList
          data={cart}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
<CartItem
  item={item}
  onUpdateQty={(qty) =>
    dispatch({
      type: "UPDATE_QTY",
      payload: { id: item.id, qty },
    })
  }
  onRemove={() =>
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item.id,
    })
  }
  onPress={() =>
    navigation.navigate("ProductDetails", {
      product: item,   // ✅ matches ProductDetails
      fromCart: true,
    })
  }
/>


          )}
        />

        {/* Price Summary */}
        <View className="border-t border-gray-200 pt-4">
          <Text className="text-gray-600">
            Subtotal: ₹ {subtotal.toFixed(2)}
          </Text>
          <Text className="text-gray-600">
            Tax (5%): ₹ {tax.toFixed(2)}
          </Text>
          <Text className="font-bold text-lg mt-1">
            Total: ₹ {total.toFixed(2)}
          </Text>

          <TouchableOpacity
            className="bg-black py-3 mt-4 rounded-xl"
            onPress={() => navigation.navigate("Checkout")}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
