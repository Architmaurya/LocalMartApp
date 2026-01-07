import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products.api";
import { loadProducts, saveProducts } from "../storage/products.storage";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const cached = await loadProducts();
        if (cached?.length) {
          setProducts(cached);
        }

        const fresh = await fetchProducts();
        setProducts(fresh);
        saveProducts(fresh);
      } catch (e) {
        console.log("Offline: using cached products");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { products, loading };
};
