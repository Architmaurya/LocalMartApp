import { View, Text, TouchableOpacity } from "react-native";
import QuantitySelector from "./QuantitySelector";

export default function CartItem({
  item,
  onUpdateQty,
  onRemove,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="bg-white rounded-xl border border-gray-200 p-4 mb-4"
    >
      <View className="flex-row justify-between items-start">
        <Text className="font-semibold flex-1 pr-2" numberOfLines={2}>
          {item.title}
        </Text>

        <TouchableOpacity onPress={onRemove}>
          <Text className="text-red-500 text-sm">Remove</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-gray-500 mt-1">
        ₹ {Number(item.price).toFixed(2)}
      </Text>

      <View className="flex-row justify-between items-center mt-4">
        <QuantitySelector
          qty={item.qty}
          onChange={(qty) => onUpdateQty(qty)}
        />

        <Text className="font-bold text-lg">
          ₹ {(Number(item.price) * item.qty).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
