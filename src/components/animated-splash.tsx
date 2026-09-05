import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';

import { SplashArt } from '@/components/splash-art';

SplashScreen.preventAutoHideAsync().catch(() => {});

const HOLD_MS = 650;
const FADE_MS = 850;

/**
 * Full-bleed splash overlay. Holds the collage briefly, then fades out to
 * reveal the Intro screen (which shows the same image at low opacity),
 * producing a single continuous crossfade.
 */
export function AnimatedSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
    const timer = setTimeout(() => setVisible(false), HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="none"
      exiting={FadeOut.duration(FADE_MS)}
      style={[StyleSheet.absoluteFill, styles.overlay]}>
      <SplashArt opacity={1} withBackground />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    zIndex: 10,
    elevation: 10,
  },
});
