import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getCurrentUser } from '../services/authService';
import { getToken, deleteToken } from '../storage/tokenStorage';

export default function ProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState('');

  // Task 4: Session restore requirement
  useEffect(() => {
    const restoreSession = async () => {
      try {
        setLoading(true);
        // Read the token from SecureStore inside useEffect
        const token = await getToken();
        
        if (token) {
          // If a token exists, call getCurrentUser()
          const userProfile = await getCurrentUser();
          // Show the authenticated profile when the request succeeds
          setProfile(userProfile);
        } else {
          router.replace('/login');
        }
      } catch (err) {
        // Delete the token and return to login if the stored token is rejected
        await deleteToken();
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };
    
    restoreSession();
  }, []);

  // Task 6: Implement logout (with confirmation)
  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Log Out", 
          style: "destructive",
          onPress: async () => {
            // 1. Call deleteToken()
            await deleteToken();
            // 2. Set profile to null
            setProfile(null);
            // 3. Clear any error message
            setError('');
            // 4. Return the interface to the login form
            router.replace('/login');
          }
        }
      ]
    );
  };

  // Show a loading indicator while the session check is running
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  if (!profile) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Secure Profile</Text>
        <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
          <Feather name="log-out" size={24} color="#ff4444" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        {/* User image or ID */}
        {profile.image ? (
          <Image source={{ uri: profile.image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{profile.id}</Text>
          </View>
        )}
        
        <View style={styles.infoContainer}>
          {/* First and last name */}
          <Text style={styles.name}>{profile.firstName} {profile.lastName}</Text>
          {/* Username */}
          <Text style={styles.username}>@{profile.username}</Text>
          {/* Email address */}
          <Text style={styles.email}>{profile.email}</Text>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#fff',
  },
  iconButton: {
    padding: 8,
  },
  profileCard: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#333',
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  username: {
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#bbb',
  },
});
