import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { authService } from '../services/authService';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2 - 24;

const MOCK_PRODUCTS = [
  { id: '1', name: 'Vintage Leather Jacket', price: '$120', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80', brand: 'Unknown' },
  { id: '2', name: 'Washed Denim Jeans', price: '$45', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80', brand: 'Levi\'s' },
  { id: '3', name: 'Oversized Graphic Tee', price: '$25', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80', brand: 'Band Merch' },
  { id: '4', name: 'Chunky Sneakers', price: '$80', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80', brand: 'Nike' },
  { id: '5', name: 'Corduroy Overshirt', price: '$35', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80', brand: 'Polo' },
  { id: '6', name: 'Silver Chain Necklace', price: '$40', image: 'https://images.unsplash.com/photo-1599643478524-fb524b067a90?w=500&q=80', brand: 'Handmade' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const isAuth = await authService.checkAuth();
    if (!isAuth) {
      router.replace('/login');
    } else {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    router.replace('/login');
  };

  const renderItem = ({ item }: { item: typeof MOCK_PRODUCTS[0] }) => (
    <TouchableOpacity style={styles.productCard} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.brandText}>{item.brand}</Text>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BLACK SHADE</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="search" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <Feather name="log-out" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categories}>
        <Text style={[styles.category, styles.activeCategory]}>ALL</Text>
        <Text style={styles.category}>MENS</Text>
        <Text style={styles.category}>WOMENS</Text>
        <Text style={styles.category}>ACCESSORIES</Text>
      </View>

      <FlatList
        data={MOCK_PRODUCTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 24,
  },
  category: {
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
  },
  activeCategory: {
    color: '#fff',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  productCard: {
    width: COLUMN_WIDTH,
  },
  productImage: {
    width: '100%',
    height: COLUMN_WIDTH * 1.3,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    marginBottom: 12,
  },
  productInfo: {
    gap: 4,
  },
  brandText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  productName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  productPrice: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  }
});
