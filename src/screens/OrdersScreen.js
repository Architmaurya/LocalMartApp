import { FlatList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";

import OrderCard from "../components/OrderCard";
import EmptyState from "../components/EmptyState";
import { OrdersContext } from "../context/orders/orders.context";

export default function OrdersScreen({ navigation }) {
  const { orders } = useContext(OrdersContext);

  if (!orders.length) {
    return (
      <SafeAreaView className="flex-1">
        <EmptyState message="No orders yet" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-4 py-3 bg-white border-b border-gray-200">
        <Text className="text-xl font-bold">My Orders</Text>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={orders}
        keyExtractor={(o) => o.id.toString()}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() =>
              navigation.navigate("OrderDetails", {
                order: item,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}
