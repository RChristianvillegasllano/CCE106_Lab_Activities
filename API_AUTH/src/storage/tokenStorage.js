import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'access_token';

export async function saveToken(token) {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (e) {
    throw new Error('Failed to save token to secure storage');
  }
}

export async function getToken() {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (e) {
    return null;
  }
}

export async function deleteToken() {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (e) {
    throw new Error('Failed to delete token from secure storage');
  }
}
