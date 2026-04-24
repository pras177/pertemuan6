import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.image}>{product.image}</Text>

      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>

      <Text style={styles.category}>{product.category}</Text>

      <View style={styles.row}>
        <Text style={styles.price}>
          Rp {product.price.toLocaleString('id-ID')}
        </Text>
        <Text style={styles.rating}>{product.rating} ⭐</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 16,
    padding: 12,
    elevation: 3,
  },

  image: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },

  category: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  price: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },

  rating: {
    color: '#FFB800',
  },
});