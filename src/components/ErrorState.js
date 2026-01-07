import { View, Text, TouchableOpacity } from "react-native";

export default function ErrorState({ message, onRetry }) {
  return (
    <View className="flex-1 justify-center items-center px-6">
      <Text className="text-red-500 text-center mb-4">
        {message || "Something went wrong"}
      </Text>

      {onRetry && (
        <TouchableOpacity
          className="bg-black px-6 py-3 rounded"
          onPress={onRetry}
        >
          <Text className="text-white">Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
