import { View, ActivityIndicator, Text } from "react-native";

export default function Loader({ text = "Loading..." }) {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
      <Text className="mt-3 text-gray-500">{text}</Text>
    </View>
  );
}
