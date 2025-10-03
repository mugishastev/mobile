import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { AdminGuard } from '../../components/AdminGuard';
import { API } from '../../constants/api';
import { AuthContext } from '../../context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { NotificationBanner } from '../../components/NotificationBanner';
import { LinearGradient } from 'expo-linear-gradient';

// Product interfaces
interface Product {
  _id: string;
  prodName: string;
  prodDesc?: string;
  prodPrice: number;
  prodQty: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductFormInputs {
  prodName: string;
  prodDesc?: string;
  prodPrice: number | '';
  prodQty: number | '';
  image?: ImagePicker.ImagePickerAsset | null;
}

export default function AdminProducts() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductFormInputs>({ prodName: '', prodDesc: '', prodPrice: '', prodQty: '', image: null });
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState<{visible: boolean; type: 'success'|'error'|'info'; message: string}>({ visible: false, type: 'info', message: '' });

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ProductFormInputs>({ prodName: '', prodDesc: '', prodPrice: '', prodQty: '', image: null });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API.products.all);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error('Fetch products failed:', err);
      setBanner({ visible: true, type: 'error', message: 'Failed to load products' });
    }
  };

  const pickImage = async (onPicked: (asset: ImagePicker.ImagePickerAsset) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      onPicked(result.assets[0]);
    }
  };

  const buildFormData = async (data: ProductFormInputs) => {
    const fd = new FormData();
    fd.append('prodName', String(data.prodName));
    if (data.prodDesc) fd.append('prodDesc', String(data.prodDesc));
    fd.append('prodPrice', String(data.prodPrice));
    fd.append('prodQty', String(data.prodQty));
    if (data.image) {
      const uri = data.image.uri;
      const name = data.image.fileName || uri.split('/').pop() || 'image.jpg';
      const type = data.image.mimeType || 'image/jpeg';
      // @ts-ignore RN FormData file
      fd.append('image', { uri, name, type });
    }
    return fd;
  };

  const createProduct = async () => {
    if (!form.prodName || !form.prodPrice || !form.prodQty || !form.image) {
      setBanner({ visible: true, type: 'error', message: 'Name, price, quantity and image are required' });
      return;
    }
    try {
      setLoading(true);
      const fd = await buildFormData(form);
      await axios.post(API.products.create, fd, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setBanner({ visible: true, type: 'success', message: 'Product created' });
      setForm({ prodName: '', prodDesc: '', prodPrice: '', prodQty: '', image: null });
      fetchProducts();
    } catch (err: any) {
      console.error('Create product failed:', err);
      setBanner({ visible: true, type: 'error', message: err.response?.data?.message || 'Failed to create product' });
    } finally { setLoading(false); }
  };

  const startEdit = (p: Product) => {
    setEditingId(p._id);
    setEditForm({ prodName: p.prodName, prodDesc: p.prodDesc || '', prodPrice: p.prodPrice, prodQty: p.prodQty, image: null });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ prodName: '', prodDesc: '', prodPrice: '', prodQty: '', image: null });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      setLoading(true);
      const fd = await buildFormData(editForm);
      await axios.put(API.products.update(editingId), fd, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setBanner({ visible: true, type: 'success', message: 'Product updated' });
      cancelEdit();
      fetchProducts();
    } catch (err: any) {
      console.error('Update product failed:', err);
      setBanner({ visible: true, type: 'error', message: err.response?.data?.message || 'Failed to update product' });
    } finally { setLoading(false); }
  };

  const deleteProduct = async (id: string) => {
    Alert.alert('Delete', 'Are you sure you want to delete this product?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        try {
          await axios.delete(API.products.delete(id), {
            headers: { Authorization: `Bearer ${user?.accessToken}` },
          });
          setBanner({ visible: true, type: 'success', message: 'Product deleted' });
          fetchProducts();
        } catch (err: any) {
          console.error('Delete product failed:', err);
          setBanner({ visible: true, type: 'error', message: err.response?.data?.message || 'Failed to delete product' });
        }
      }}
    ]);
  };

  const renderItem = ({ item }: { item: Product }) => {
    const isEditing = editingId === item._id;
    return (
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.thumb} />
          ) : (
            <View style={styles.thumbPlaceholder}><Ionicons name="cube-outline" size={28} color="#999" /></View>
          )}
          <View style={{ marginLeft: 10, flex: 1 }}>
            {isEditing ? (
              <>
                <TextInput style={styles.input} placeholder="Name" value={String(editForm.prodName)} onChangeText={(t)=>setEditForm(s=>({...s, prodName:t}))} />
                <TextInput style={styles.input} placeholder="Description" value={String(editForm.prodDesc||'')} onChangeText={(t)=>setEditForm(s=>({...s, prodDesc:t}))} />
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TextInput style={[styles.input, {flex:1}]} placeholder="Price" keyboardType="numeric" value={String(editForm.prodPrice||'')} onChangeText={(t)=>setEditForm(s=>({...s, prodPrice: t as any}))} />
                  <TextInput style={[styles.input, {flex:1}]} placeholder="Qty" keyboardType="numeric" value={String(editForm.prodQty||'')} onChangeText={(t)=>setEditForm(s=>({...s, prodQty: t as any}))} />
                </View>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 6 }}>
                  <TouchableOpacity style={styles.btnLight} onPress={()=>pickImage((asset)=>setEditForm(s=>({...s, image: asset})))}>
                    <Ionicons name="image-outline" size={16} color="#333" />
                    <Text style={{ marginLeft: 6 }}>Pick Image</Text>
                  </TouchableOpacity>
                  {editForm.image ? <Text numberOfLines={1} style={{ color:'#666', flex:1 }}>{editForm.image.fileName || editForm.image.uri.split('/').pop()}</Text> : null}
                </View>
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                  <TouchableOpacity style={[styles.btn, {flex:1}]} onPress={saveEdit} disabled={loading}>
                    <Text style={styles.btnText}>{loading ? 'Saving…' : 'Save'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btnDanger, {flex:1}]} onPress={cancelEdit}>
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.cardTitle}>{item.prodName}</Text>
                <Text style={styles.cardMeta}>${item.prodPrice.toFixed(2)} • Qty: {item.prodQty}</Text>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
                  <TouchableOpacity style={styles.btn} onPress={()=>startEdit(item)}>
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnDanger} onPress={()=>deleteProduct(item._id)}>
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <AdminGuard>
      <SafeAreaView style={styles.container}>
        <NotificationBanner
          visible={banner.visible}
          type={banner.type}
          message={banner.message}
          onClose={() => setBanner({ ...banner, visible: false })}
        />
        
        {/* Header */}
        <LinearGradient colors={['#FFD700', '#FFA500']} style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Product Management</Text>
            <Text style={styles.subtitle}>{products.length} products</Text>
          </View>
        </LinearGradient>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Create product form */}
          <LinearGradient colors={['#FFFDE7', '#FFF9C4']} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="add-circle-outline" size={20} color="#FFD700" />
              <Text style={styles.sectionTitle}>Add New Product</Text>
            </View>
          <TextInput style={styles.input} placeholder="Name" value={form.prodName} onChangeText={(t)=>setForm(s=>({...s, prodName:t}))} />
          <TextInput style={styles.input} placeholder="Description" value={form.prodDesc} onChangeText={(t)=>setForm(s=>({...s, prodDesc:t}))} />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TextInput style={[styles.input, {flex:1}]} placeholder="Price" keyboardType="numeric" value={String(form.prodPrice)} onChangeText={(t)=>setForm(s=>({...s, prodPrice: t as any}))} />
            <TextInput style={[styles.input, {flex:1}]} placeholder="Qty" keyboardType="numeric" value={String(form.prodQty)} onChangeText={(t)=>setForm(s=>({...s, prodQty: t as any}))} />
          </View>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <TouchableOpacity style={styles.btnLight} onPress={()=>pickImage((asset)=>setForm(s=>({...s, image: asset})))}>
              <Ionicons name="image-outline" size={16} color="#333" />
              <Text style={{ marginLeft: 6 }}>Pick Image</Text>
            </TouchableOpacity>
            {form.image ? <Text numberOfLines={1} style={{ color:'#666', flex:1 }}>{form.image.fileName || form.image.uri.split('/').pop()}</Text> : null}
          </View>
            <TouchableOpacity style={styles.btn} onPress={createProduct} disabled={loading}>
              <LinearGradient colors={['#FFD700', '#FFC107']} style={styles.btnGradient}>
                <Ionicons name="add" size={16} color="#333" />
                <Text style={styles.btnText}>{loading ? 'Saving…' : 'Add Product'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>

          {/* Product list */}
          <View style={styles.listSection}>
            <View style={styles.listHeader}>
              <Ionicons name="cube-outline" size={20} color="#FFD700" />
              <Text style={styles.listTitle}>Product List</Text>
            </View>
            <FlatList
              data={products}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </AdminGuard>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  header: {
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    gap: 4,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    opacity: 0.7,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  section: { 
    marginHorizontal: 20,
    padding: 20, 
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  input: { 
    borderWidth: 2, 
    borderColor: '#FFE082', 
    borderRadius: 12, 
    padding: 14, 
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  btn: { 
    borderRadius: 12, 
    overflow: 'hidden',
    marginTop: 8,
  },
  btnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  btnDanger: { 
    backgroundColor: '#e74c3c', 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  btnLight: { 
    backgroundColor: 'rgba(255, 215, 0, 0.2)', 
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    borderRadius: 10, 
    flexDirection: 'row', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  btnText: { 
    color: '#333', 
    fontWeight: 'bold',
    fontSize: 16,
  },
  listSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    gap: 12,
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 16,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardMeta: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 8,
  },
  thumb: { 
    width: 60, 
    height: 60, 
    borderRadius: 12, 
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#FFE082',
  },
  thumbPlaceholder: { 
    width: 60, 
    height: 60, 
    borderRadius: 12, 
    backgroundColor: '#f0f0f0', 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFE082',
  },
});
