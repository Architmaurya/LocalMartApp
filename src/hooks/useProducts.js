import { useEffect, useState, useCallback } from "react";
import { fetchProducts } from "../api/products.api";
import { saveProducts } from "../storage/products.storage";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const fresh = await fetchProducts();
      setProducts(fresh);
      saveProducts(fresh); // cache write-only
    } catch (e) {
      setProducts([]); // offline → no products
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    products,
    loading,
    refetch: fetchData, // 🔥 exposed for pull-to-refresh
  };
};
