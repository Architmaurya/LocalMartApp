import { View } from "react-native";
import SkeletonBox from "./SkeletonBox";

export default function ProductCardSkeleton() {
  return (
    <View className="bg-white p-4 mb-3 rounded-xl border border-gray-200">
      <View className="flex-row">
        <SkeletonBox width={80} height={80} radius={8} />

        <View className="flex-1 ml-3">
          <SkeletonBox height={16} />
          <SkeletonBox height={14} width="60%" />
          <SkeletonBox height={18} width="40%" />
        </View>
      </View>
    </View>
  );
}
