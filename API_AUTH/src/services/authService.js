import { getToken, deleteToken } from '../storage/tokenStorage';
import { router } from 'expo-router';

const BASE_URL = 'https://dummyjson.com';

export async function authenticatedFetch(url, options = {}) {
  const token = await getToken();
  
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    await deleteToken();
    router.replace('/login');
    throw new Error('401_UNAUTHORIZED');
  }

  return response;
}
export async function loginUser(username, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username,
            password,
            expiresInMins: 30,
        }),
    });

    // TODO 1 If response.ok is false, throw a clear Error.
    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            errorData = { message: 'Login failed' };
        }
        throw new Error(errorData.message || 'Login failed');
    }

    // TODO 2 Convert the response body to JSON.
    const data = await response.json();

    // TODO 3 Return the resulting user and token data.
    return data;
}

export async function getCurrentUser() {
    const response = await authenticatedFetch(`${BASE_URL}/auth/me`, {
        method: 'GET',
    });

    // TODO 2 Throw an Error when the response is not successful.
    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            errorData = { message: 'Failed to fetch user profile' };
        }
        throw new Error(errorData.message || 'Failed to fetch user profile');
    }

    // TODO 3 Return the parsed JSON profile.
    return await response.json();
}

export async function signup(username, email, password) {
    const response = await fetch(`${BASE_URL}/users/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
    }

    // DummyJSON /users/add doesn't return a token, so we mock it to prevent crashes
    return { ...data, token: 'mock-signup-token' };
}
