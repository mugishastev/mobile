import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { API } from "../../constants/api";
import { NotificationBanner } from "../../components/NotificationBanner";

interface Product { _id: string; prodName: string; prodPrice: number; image: string; }
interface CartItem { productId: Product; quantity: number; }

export default function CartScreen() {
  const { user, navigateToLogin } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState<{visible: boolean; type: 'success'|'error'|'info'; message: string}>({ visible: false, type: 'info', message: '' });

  useEffect(() => {
    if (!user) {
      navigateToLogin();
    } else {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API.cart.my, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setCartItems(res.data.cart?.items || []);

      const relatedRes = await axios.get(API.products.all);
      setRelated(relatedRes.data.products.slice(0, 4));
    } catch (err: any) {
      console.error("Fetch cart failed:", err);
      Alert.alert("Error", err.response?.data?.message || "Failed to load cart");
      if (err.response?.status === 401) navigateToLogin();
    } finally { setLoading(false); }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const res = await axios.put(
        API.cart.update,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );
      setCartItems(res.data.cart.items);
    } catch (err: any) {
      console.error("Update failed:", err);
      Alert.alert("Error", err.response?.data?.message || "Could not update quantity");
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const res = await axios.delete(API.cart.remove(productId), {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setCartItems(res.data.cart.items);
    } catch (err: any) {
      console.error("Remove failed:", err);
      Alert.alert("Error", err.response?.data?.message || "Could not remove item");
    }
  };

  const proceedToPayment = async () => {
    try {
      const res = await axios.post(
        API.orders.create,
        {},
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );
      setBanner({ visible: true, type: 'success', message: 'Order placed successfully.' });
      await fetchCart();
    } catch (err: any) {
      console.error("Order failed:", err);
      Alert.alert("Error", err.response?.data?.message || "Could not place order");
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.productId.prodPrice * item.quantity, 0);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <NotificationBanner
        visible={banner.visible}
        type={banner.type}
        message={banner.message}
        onClose={() => setBanner({ ...banner, visible: false })}
      />
      {loading ? <ActivityIndicator size="large" color="#FF6B35" /> : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.productId._id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.productId.image }} style={styles.image} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.title}>{item.productId.prodName}</Text>
                  <Text style={styles.price}>${item.productId.prodPrice.toFixed(2)} x {item.quantity}</Text>
                  <View style={styles.actions}>
                    <TouchableOpacity onPress={() => updateQuantity(item.productId._id, item.quantity + 1)}>
                      <Ionicons name="add-circle" size={24} color="#FF6B35" />
                    </TouchableOpacity>
                    <Text style={{ marginHorizontal: 8 }}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => item.quantity > 1 ? updateQuantity(item.productId._id, item.quantity - 1) : removeItem(item.productId._id)}>
                      <Ionicons name="remove-circle" size={24} color="#FF6B35" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeItem(item.productId._id)}>
                      <Ionicons name="trash" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.empty}>Your cart is empty</Text>}
          />

          {cartItems.length > 0 && (
            <View style={styles.footer}>
              <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
              <TouchableOpacity style={styles.payBtn} onPress={proceedToPayment}>
                <Text style={styles.payText}>Proceed to Payment</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.relatedHeader}>You may also like</Text>
          <FlatList
            data={related}
            horizontal
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.relatedCard}>
                <Image source={{ uri: item.image }} style={styles.relatedImage} />
                <Text style={styles.relatedTitle}>{item.prodName}</Text>
                <Text style={styles.relatedPrice}>${item.prodPrice.toFixed(2)}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 10 }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  cartItem: { flexDirection: "row", alignItems: "center", padding: 10, marginBottom: 10, backgroundColor: "#f9f9f9", borderRadius: 8 },
  image: { width: 60, height: 60, borderRadius: 6 },
  title: { fontSize: 14, fontWeight: "600" },
  price: { fontSize: 12, color: "#555", marginVertical: 4 },
  actions: { flexDirection: "row", alignItems: "center" },
  empty: { textAlign: "center", marginTop: 40, fontSize: 16, color: "#999" },
  footer: { padding: 10, backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#eee" },
  total: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  payBtn: { backgroundColor: "#FF6B35", padding: 12, borderRadius: 6, alignItems: "center" },
  payText: { color: "#fff", fontWeight: "600" },
  relatedHeader: { fontSize: 16, fontWeight: "700", marginTop: 20 },
  relatedCard: { width: 120, marginRight: 12, backgroundColor: "#f2f2f2", borderRadius: 8, padding: 6 },
  relatedImage: { width: "100%", height: 80, borderRadius: 6 },
  relatedTitle: { fontSize: 12, marginTop: 6, fontWeight: "500" },
  relatedPrice: { fontSize: 12, color: "#FF6B35", marginTop: 2 },
});
