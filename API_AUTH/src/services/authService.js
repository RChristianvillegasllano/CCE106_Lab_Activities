import { tokenStorage } from '../storage/tokenStorage';

export const authService = {
    async login(username, password) {
        try {
            const response = await fetch('http://192.168.1.15:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                await tokenStorage.saveToken(data.accessToken || data.token);
                return { success: true, token: data.accessToken || data.token };
            } else {
                throw new Error(data.message || 'Invalid credentials');
            }
        } catch (error) {
            throw error;
        }
    },

    async signup(username, email, password) {
        try {
            const response = await fetch('http://192.168.1.15:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token) {
                    await tokenStorage.saveToken(data.token);
                }
                return { success: true, token: data.token };
            } else {
                throw new Error(data.message || 'Signup failed');
            }
        } catch (error) {
            throw error;
        }
    },

    async logout() {
        return new Promise((resolve) => {
            setTimeout(async () => {
                await tokenStorage.removeToken();
                resolve({ success: true });
            }, 500);
        });
    },

    async fetchProtectedData(endpoint) {
        const token = await tokenStorage.getToken();
        
        if (!token) {
            throw new Error('No access token available');
        }

        const response = await fetch(`http://192.168.1.15:3000/api/${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.json();
    },

    async checkAuth() {
        const token = await tokenStorage.getToken();
        return !!token;
    }
};
