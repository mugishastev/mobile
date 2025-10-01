import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { AdminGuard } from '../../components/AdminGuard';
import { BASE_URL } from '../../constants/api';
import { AuthContext } from '../../context/AuthContext';

interface Category { _id: string; name: string; }

export default function AdminCategories() {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/categories`);
      setCategories(res.data.categories || []);
    } catch (err) { console.error('Fetch categories failed:', err); }
  };

  const addCategory = async () => {
    if (!name) {
      Alert.alert('Validation', 'Category name is required');
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/categories`, { name }, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setName('');
      fetchCategories();
    } catch (err: any) {
      console.error('Create category failed:', err);
      Alert.alert('Error', err.response?.data?.message || 'Failed to create category');
    } finally { setLoading(false); }
  };

  return (
    <AdminGuard>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Categories</Text>

        <View style={styles.formRow}>
          <TextInput style={styles.input} placeholder="Category name" value={name} onChangeText={setName} />
          <TouchableOpacity style={styles.btn} onPress={addCategory} disabled={loading}>
            <Text style={styles.btnText}>{loading ? 'Saving...' : 'Add Category'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </AdminGuard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  formRow: { gap: 8, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 },
  btn: { backgroundColor: '#FF6B4A', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
  card: { backgroundColor: '#f7f7f7', padding: 12, borderRadius: 10, marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
});