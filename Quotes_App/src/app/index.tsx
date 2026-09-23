import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';

interface QuoteData {
  quote: string;
  author: string;
}

export default function HomeScreen() {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using dummyjson API as it's reliable and free
      const response = await fetch('https://dummyjson.com/quotes/random');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuoteData({
        quote: data.quote,
        author: data.author,
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerText}>QUOTE OF THE DAY</Text>
        
        <View style={styles.contentContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : quoteData ? (
            <>
              <Text style={styles.quoteText}>"{quoteData.quote}"</Text>
              <Text style={styles.authorText}>— {quoteData.author}</Text>
            </>
          ) : (
            <Text style={styles.emptyText}>No quote found.</Text>
          )}
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={fetchQuote}
          disabled={loading}
        >
          <Text style={styles.buttonText}>NEW QUOTE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1E1E1E',
    width: '85%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
    minHeight: 350,
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  quoteText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 32,
  },
  authorText: {
    color: '#CCCCCC',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  emptyText: {
    color: '#95A5A6',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
