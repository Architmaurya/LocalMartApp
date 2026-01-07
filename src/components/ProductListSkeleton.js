import { FlatList } from "react-native";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { ITEMS_PER_PAGE } from "../utils/constants";

export default function ProductListSkeleton() {
  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={Array.from({ length: ITEMS_PER_PAGE })}
      keyExtractor={(_, i) => i.toString()}
      renderItem={() => <ProductCardSkeleton />}
    />
  );
}
