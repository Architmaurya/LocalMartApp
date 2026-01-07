import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetailsScreen({ route }) {
  const { order } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* HEADER */}
      <View className="px-4 py-3 bg-white border-b border-gray-200">
        <Text className="text-xl font-bold">
          Order #{order.id}
        </Text>
        <Text className="text-gray-500 text-sm">
          {new Date(order.createdAt).toLocaleString()}
        </Text>
      </View>

      {/* CUSTOMER INFO */}
      <View className="bg-white m-4 p-4 rounded-xl">
        <Text className="font-semibold text-lg mb-2">
          Delivery Details
        </Text>

        <Text>Name: {order.customer.name}</Text>
        <Text>Phone: {order.customer.phone}</Text>
        <Text>Address: {order.customer.address}</Text>
      </View>

      {/* PRODUCTS */}
      <View className="bg-white mx-4 p-4 rounded-xl flex-1">
        <Text className="font-semibold text-lg mb-3">
          Ordered Items
        </Text>

        <FlatList
          data={order.items}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
            <View className="flex-row mb-4">
              <Image
                source={{ uri: item.image }}
                className="w-14 h-14 rounded bg-gray-100"
                resizeMode="contain"
              />

              <View className="flex-1 ml-3">
                <Text numberOfLines={2} className="font-medium">
                  {item.title}
                </Text>
                <Text className="text-gray-500 text-sm">
                  Qty: {item.qty}
                </Text>
                <Text className="font-semibold">
                  ₹ {(item.price * item.qty).toFixed(2)}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* PRICE SUMMARY */}
      <View className="bg-white p-4 border-t border-gray-200">
        <View className="flex-row justify-between">
          <Text>Subtotal</Text>
          <Text>₹ {order.subtotal.toFixed(2)}</Text>
        </View>

        <View className="flex-row justify-between mt-1">
          <Text>Tax</Text>
          <Text>₹ {order.tax.toFixed(2)}</Text>
        </View>

        <View className="flex-row justify-between mt-2">
          <Text className="font-bold text-lg">Total</Text>
          <Text className="font-bold text-lg">
            ₹ {order.total.toFixed(2)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
