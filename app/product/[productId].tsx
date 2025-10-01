import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import { API } from "../../constants/api";

interface Product {
  _id: string;
  prodName: string;
  prodDesc?: string;
  prodPrice: number;
  prodQty: number;
  image: string;
}

export default function ProductDetailScreen() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        API.products.byId(String(productId))
      );
      setProduct(res.data.product);
    } catch (err) {
      console.error("Failed to fetch product:", err);
      Alert.alert("Error", "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user?.accessToken) {
      Alert.alert("Login Required", "Please log in to add items to cart.");
      router.push('/auth/LoginScreen');
      return;
    }

    try {
      const res = await axios.post(
        API.cart.add,
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      if (res.data.success) {
        Alert.alert("Success", "Product added to cart!");
      } else {
        Alert.alert("Error", "Failed to add product to cart.");
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
      Alert.alert("Error", "Could not add to cart");
    }
  };

  if (loading)
    return <ActivityIndicator size="large" color="#FF6B35" style={{ marginTop: 20 }} />;

  if (!product)
    return <Text style={{ textAlign: "center", marginTop: 20 }}>Product not found</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{product.prodName}</Text>
      <Text style={styles.price}>${product.prodPrice.toFixed(2)}</Text>
      <Text style={styles.desc}>{product.prodDesc || "No description available"}</Text>
      <Text style={styles.qty}>Available: {product.prodQty}</Text>

      <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
        <Text style={styles.cartText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#FF6B35",
  },
  desc: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  qty: {
    fontSize: 12,
    color: "#555",
    marginBottom: 16,
  },
  cartBtn: {
    backgroundColor: "#FF6B35",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  cartText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
