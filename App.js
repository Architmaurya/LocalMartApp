import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

import RootStack from "./src/navigation/RootStack";
import { CartProvider } from "./src/context/cart/cart.context";
import { OrdersProvider } from "./src/context/orders/orders.context";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <CartProvider>
          <OrdersProvider>
            <StatusBar style="dark" />
            <RootStack />

            {/* ✅ TOAST MUST BE HERE */}
            <Toast />
          </OrdersProvider>
        </CartProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
