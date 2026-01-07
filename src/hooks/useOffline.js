import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export const useOffline = () => {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const unsub = NetInfo.addEventListener(state => {
      setOffline(!state.isConnected);
    });
    return () => unsub();
  }, []);

  return offline;
};
