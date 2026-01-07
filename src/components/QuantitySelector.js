import { View, Text, TouchableOpacity } from "react-native";

export default function QuantitySelector({ qty, onChange }) {
  return (
    <View className="flex-row items-center border border-gray-300 rounded-lg overflow-hidden">
      <TouchableOpacity
        className="px-3 py-1"
        onPress={() => qty > 1 && onChange(qty - 1)}
      >
        <Text className="text-lg">−</Text>
      </TouchableOpacity>

      <Text className="px-4 font-semibold">
        {qty}
      </Text>

      <TouchableOpacity
        className="px-3 py-1"
        onPress={() => onChange(qty + 1)}
      >
        <Text className="text-lg">+</Text>
      </TouchableOpacity>
    </View>
  );
}
