import { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";
import ProductListSkeleton from "../components/ProductListSkeleton";
import { ITEMS_PER_PAGE } from "../utils/constants";

export default function HomeScreen({ navigation }) {
  const { products, loading } = useProducts();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);

  // reset pagination when filters change
  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory]);

  // categories
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return ["All", ...new Set(cats)];
  }, [products]);

  // filtering
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "All" ||
        p.category.toLowerCase() ===
          selectedCategory.toLowerCase();

      return matchSearch && matchCategory;
    });
  }, [products, search, selectedCategory]);

  // pagination
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredProducts, page]);

  const hasMore =
    paginatedProducts.length < filteredProducts.length;

  // ✅ GLOBAL SKELETON
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100">
        <ProductListSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* HEADER */}
      <View className="px-4 py-3 bg-white border-b border-gray-200">
        <Text className="text-xl font-bold">LocalMart</Text>
        <Text className="text-gray-500 text-sm">
          Shop local, shop smart
        </Text>
      </View>

      {/* SEARCH */}
      <View className="p-4 bg-white">
        <TextInput
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
          className="border border-gray-300 rounded-xl px-4 py-3"
        />
      </View>

      {/* CATEGORY FILTER */}
      <View className="px-4 py-2 bg-white">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(c) => c}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              className={`px-4 py-2 mr-2 rounded-full border ${
                selectedCategory === item
                  ? "bg-black border-black"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text
                className={
                  selectedCategory === item
                    ? "text-white font-semibold"
                    : "text-gray-700"
                }
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* PRODUCTS */}
      {paginatedProducts.length === 0 ? (
        <EmptyState message="No products found" />
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 16 }}
          data={paginatedProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate("ProductDetails", {
                  product: item,
                })
              }
            />
          )}
          onEndReached={() => {
            if (hasMore) setPage((p) => p + 1);
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            hasMore ? (
              <Text className="text-center text-gray-500 py-4">
                Loading more...
              </Text>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}
