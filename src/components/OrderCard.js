import { View, Text, Image, TouchableOpacity } from "react-native";

export default function OrderCard({ order, onPress }) {
  const firstItem = order.items[0];
  const extraCount = order.items.length - 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl border border-gray-200 p-4 mb-4"
    >
      <View className="flex-row">
        <Image
          source={{ uri: firstItem.image }}
          className="w-16 h-16 rounded-lg bg-gray-100"
          resizeMode="contain"
        />

        <View className="flex-1 ml-4">
          <Text className="font-semibold text-base" numberOfLines={1}>
            {firstItem.title}
          </Text>

          {extraCount > 0 && (
            <Text className="text-gray-500 text-sm mt-1">
              + {extraCount} more item{extraCount > 1 ? "s" : ""}
            </Text>
          )}

          <View className="flex-row justify-between items-center mt-2">
            <Text className="font-bold text-lg">
              ₹ {order.total.toFixed(2)}
            </Text>

            <Text className="text-xs text-gray-400">
              {new Date(order.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
