import { View, Text, Image, TouchableOpacity } from "react-native";

export default function ProductCard({
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
      className={`bg-white p-4 rounded-lg border border-gray-200 ${
        variant === "compact" ? "mb-3" : ""
      }`}
    >
      {/* Image */}
      <Image
        source={{ uri: product.image }}
        className={variant === "compact" ? "w-20 h-20" : "w-full h-64"}
        resizeMode="contain"
      />

      {/* Title */}
      <Text className="font-semibold text-base mt-2" numberOfLines={2}>
        {product.title}
      </Text>

      {/* Category */}
      <Text className="text-gray-500 text-xs mt-1">
        {product.category}
      </Text>

      {/* Price */}
      <Text className="font-bold text-lg mt-1">
        ₹ {product.price}
      </Text>

      {/* ===== FULL DETAILS ONLY ===== */}
      {variant === "full" && (
        <>
          {/* Description */}
          <Text className="text-gray-600 mt-3">
            {product.description}
          </Text>

          {/* Rating */}
          <View className="flex-row items-center mt-3">
            <Text className="text-yellow-500 font-semibold">
              ⭐ {product.rating?.rate}
            </Text>
            <Text className="text-gray-400 ml-2">
              ({product.rating?.count})
            </Text>
          </View>

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
            className="bg-black py-4 mt-6 rounded"
            onPress={onAddToCart}
          >
            <Text className="text-white text-center font-semibold">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </>
      )}
    </TouchableOpacity>
  );
}
