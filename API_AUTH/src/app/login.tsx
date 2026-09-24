import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '../services/authService';
import { saveToken } from '../storage/tokenStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Logo } from '../components/Logo';

export default function LoginScreen() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    // 1. Clear any earlier error and set loading to true.
    setError('');
    setLoading(true);

    try {
      // 2. Call loginUser with the values from the form.
      const data = await loginUser(username, password);
      
      // 3. Securely save data.accessToken.
      await saveToken(data.accessToken || data.token);
      
      // 4. Request the protected profile or set the returned user data.
      setProfile(data);
      
      router.replace('/');
    } catch (err: any) {
      // 5. Catch errors and show a user-friendly message.
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      // 6. Set loading to false in a finally block.
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Logo scale={0.5} />
        <Text style={styles.taskHeading}>Secure Profile</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your Password"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#888" />
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading || !username || !password}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>LOGIN</Text>
          )}
        </TouchableOpacity>

        <View style={styles.bottomPrompt}>
          <Text style={styles.promptText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.replace('/signup')}>
            <Text style={styles.promptLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 24,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: -80,
  },
  taskHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#444',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  bottomPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  promptText: {
    color: '#888',
    fontSize: 14,
  },
  promptLink: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  }
});
