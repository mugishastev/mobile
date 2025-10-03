import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

interface Product {
  _id: string;
  prodName: string;
  prodPrice: number;
  image: string;
}

export default function ShoppingScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://backend-h09f.onrender.com/api/products/all");
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.map((product) => (
        <TouchableOpacity
          key={product._id}
          style={styles.card}
          onPress={() => router.push(`/product/${product._id}`)} // 🚀 Navigate
        >
          <Image source={{ uri: product.image }} style={styles.image} />
          <Text style={styles.name}>{product.prodName}</Text>
          <Text style={styles.price}>${product.prodPrice.toFixed(2)}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  price: { fontSize: 14, color: "#FF6B35" },
});
