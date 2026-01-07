import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

function ProductCard({
  product,
  onPress,
  variant = "compact", // compact | full
  qty,
  onIncrease,
  onDecrease,
  onAddToCart,
}) {
  return (
    <TouchableOpacity
      disabled={variant === "full"}
      onPress={onPress}
      className="bg-white rounded-xl border border-gray-200 m-2 flex-1 overflow-hidden"
      activeOpacity={0.85}
    >
      {/* IMAGE */}
      <View className="bg-gray-100 items-center justify-center h-44">
        <Image
          source={{ uri: product.image }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      {/* CONTENT */}
      <View className="p-3">
        {/* TITLE */}
        <Text
          className="font-semibold text-sm text-gray-900"
          numberOfLines={2}
        >
          {product.title}
        </Text>

        {/* CATEGORY */}
        <Text className="text-gray-500 text-xs mt-1">
          {product.category}
        </Text>

        {/* PRICE + RATING */}
        <View className="flex-row items-center justify-between mt-2">
          <Text className="font-bold text-base text-black">
            ₹ {product.price}
          </Text>

          {product.rating && (
            <View className="flex-row items-center bg-green-600 px-2 py-0.5 rounded">
              <Text className="text-white text-xs font-semibold">
                ⭐ {product.rating.rate}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* ===== FULL DETAILS ONLY ===== */}
      {variant === "full" && (
        <View className="p-4 border-t border-gray-200">
          {/* Description */}
          <Text className="text-gray-600 mt-1">
            {product.description}
          </Text>

          {/* Quantity Selector */}
          <View className="flex-row items-center mt-4">
            <TouchableOpacity
              className="px-4 py-2 bg-gray-200 rounded"
              onPress={onDecrease}
            >
              <Text className="text-lg">−</Text>
            </TouchableOpacity>

            <Text className="mx-4 text-lg font-semibold">{qty}</Text>

            <TouchableOpacity
              className="px-4 py-2 bg-gray-200 rounded"
              onPress={onIncrease}
            >
              <Text className="text-lg">+</Text>
            </TouchableOpacity>
          </View>

          {/* Add to Cart */}
          <TouchableOpacity
            className="bg-black py-4 mt-6 rounded-xl"
            onPress={onAddToCart}
          >
            <Text className="text-white text-center font-semibold">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default React.memo(ProductCard);
