import { View } from "react-native";

export default function SkeletonBox({
  width = "100%",
  height = 20,
  radius = 8,
}) {
  return (
    <View
      className="bg-gray-200"
      style={{
        width,
        height,
        borderRadius: radius,
      }}
    />
  );
}
