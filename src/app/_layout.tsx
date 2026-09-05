import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AnimatedSplash } from '@/components/animated-splash';
import { Colors } from '@/constants/theme';
import { AppStateProvider } from '@/lib/app-state';

export default function RootLayout() {
  const background = Colors.light.background;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: background }}>
      <AppStateProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: background },
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="calibration" />
          <Stack.Screen name="discover" />
          <Stack.Screen name="shortlist" />
          <Stack.Screen name="person/[id]" />
          <Stack.Screen name="pathways" />
        </Stack>
        <AnimatedSplash />
      </AppStateProvider>
    </GestureHandlerRootView>
  );
}
