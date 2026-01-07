import { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import ProductCard from "../components/ProductCard";
import { useCart } from "../hooks/useCart";

export default function ProductDetailsScreen({ route, navigation }) {
  // ✅ SAFE FALLBACK
  const product = route.params?.product || route.params?.item;

  if (!product) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Product not found</Text>
      </SafeAreaView>
    );
  }

  const { fromCart } = route.params || {};
  const { dispatch } = useCart();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        qty,
      },
    });

    Toast.show({
      type: "success",
      text1: "Added to Cart 🛒",
      text2: `${product.title} (Qty: ${qty})`,
      position: "top",
    });

    // ✅ Navigate to Cart tab (nested navigator)
    setTimeout(() => {
      navigation.navigate("Tabs", {
        screen: "Cart",
      });
    }, 400);
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <ProductCard
        product={product}
        variant="full"
        qty={qty}
        onIncrease={() => setQty((q) => q + 1)}
        onDecrease={() => setQty((q) => (q > 1 ? q - 1 : 1))}
        onAddToCart={handleAddToCart}
        fromCart={fromCart}
      />
    </SafeAreaView>
  );
}
