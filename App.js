import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { products } from './data/Products';
import ProductCard from './components/ProductCard';

/* ================= HOME SCREEN ================= */
const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('rating-high');
  const [listMode, setListMode] = useState('flat');

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ['Semua', ...Array.from(cats)];
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      const matchSearch = !searchText || p.name.toLowerCase().includes(searchText.toLowerCase());
      const matchCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
      return matchSearch && matchCategory;
    });

    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else filtered.sort((a, b) => b.rating - a.rating);

    return filtered;
  }, [searchText, selectedCategory, sortBy]);

  const sections = useMemo(() => {
    const grouped = {};
    filteredProducts.forEach((p) => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    });
    return Object.keys(grouped).map((cat) => ({
      title: cat,
      data: grouped[cat],
    }));
  }, [filteredProducts]);

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('Detail', { product: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🛍️ ShopList</Text>

      <TextInput
        style={styles.search}
        placeholder="Cari produk..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {listMode === 'section' ? (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={({ section }) => (
            <Text style={styles.section}>{section.title}</Text>
          )}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={listMode === 'grid' ? 2 : 1}
        />
      )}
    </SafeAreaView>
  );
};

/* ================= DETAIL SCREEN ================= */
const DetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text>Harga: Rp {product.price}</Text>
      <Text>Rating: ⭐ {product.rating}</Text>
    </View>
  );
};

/* ================= NAVIGATOR ================= */
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold' },

  search: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },

  name: { fontSize: 18, fontWeight: 'bold' },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
});