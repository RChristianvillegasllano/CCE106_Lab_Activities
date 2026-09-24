import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const COLLECTIONS = [
  { id: 'c1', title: '00s ARCHIVE', image: 'https://images.unsplash.com/photo-1512413913076-79ac4e5695af?w=800&q=80' },
  { id: 'c2', title: 'LEATHER GOODS', image: 'https://images.unsplash.com/photo-1559582798-678dfc71ccd8?w=800&q=80' },
  { id: 'c3', title: 'JAPANESE DENIM', image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80' }
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DISCOVER</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.featured}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=1200&q=80' }} 
            style={styles.featuredImage} 
          />
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredSubtitle}>NEW ARRIVALS</Text>
            <Text style={styles.featuredTitle}>THE WINTER EDIT</Text>
            <TouchableOpacity style={styles.shopButton}>
              <Text style={styles.shopButtonText}>SHOP NOW</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>CURATED COLLECTIONS</Text>

        {COLLECTIONS.map(collection => (
          <TouchableOpacity key={collection.id} style={styles.collectionCard} activeOpacity={0.9}>
            <Image source={{ uri: collection.image }} style={styles.collectionImage} />
            <View style={styles.collectionOverlay}>
              <Text style={styles.collectionTitle}>{collection.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  iconButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  featured: {
    width: width,
    height: width * 1.2,
    position: 'relative',
    marginBottom: 40,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'flex-start',
  },
  featuredSubtitle: {
    color: '#ccc',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '600',
    marginBottom: 8,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  shopButtonText: {
    color: '#000',
    fontWeight: '700',
    letterSpacing: 1,
    fontSize: 14,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  collectionCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
  },
  collectionImage: {
    width: '100%',
    height: '100%',
  },
  collectionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 4,
  }
});
