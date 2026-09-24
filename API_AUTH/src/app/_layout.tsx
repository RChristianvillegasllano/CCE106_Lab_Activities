import { DarkTheme, DefaultTheme, ThemeProvider, Slot, useSegments, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { authService } from '@/services/authService';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, [segments]);

  const checkAuth = async () => {
    const isAuth = await authService.checkAuth();
    setIsAuthenticated(isAuth);
    
    const inAuthGroup = ['login', 'signup', 'landing'].includes(segments[0]);
    
    if (!isAuth && !inAuthGroup) {
      router.replace('/landing');
    } else if (isAuth && inAuthGroup) {
      router.replace('/');
    }
  };

  const isAuthPage = ['login', 'signup', 'landing'].includes(segments[0]);

  return (
    <ThemeProvider value={DarkTheme}>
      <AnimatedSplashOverlay />
      <Slot />
    </ThemeProvider>
  );
}
