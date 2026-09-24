import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token'; // SecureStore doesn't like special characters like @ in some cases, so 'auth_token' is better

export const tokenStorage = {
  async saveToken(token) {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (e) {
      console.error('Error saving token');
    }
  },

  async getToken() {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (e) {
      console.error('Error reading token');
      return null;
    }
  },

  async removeToken() {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (e) {
      console.error('Error removing token');
    }
  }
};
