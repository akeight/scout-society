import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { SplashArt } from "@/components/splash-art";
import { Colors } from "@/constants/theme";

const appIcon = require("@/assets/images/app-icon.png");

SplashScreen.preventAutoHideAsync().catch(() => {});

// Sequence: open on the app icon with the collage barely visible, ease the
// collage up to full while the icon fades away, hold, then dissolve into the
// Intro (which shows the same collage at low opacity).
const START_OPACITY = 0.12;
const FADE_IN_MS = 1000;
const HOLD_MS = 1200;
const FADE_OUT_MS = 1800;
const EASE = Easing.inOut(Easing.ease);

export function AnimatedSplash() {
  const [visible, setVisible] = useState(true);
  const collage = useSharedValue(START_OPACITY);
  const icon = useSharedValue(1);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
    collage.value = withTiming(1, { duration: FADE_IN_MS, easing: EASE });
    icon.value = withTiming(0, { duration: FADE_IN_MS, easing: EASE });
    const timer = setTimeout(() => setVisible(false), FADE_IN_MS + HOLD_MS);
    return () => clearTimeout(timer);
  }, [collage, icon]);

  const collageStyle = useAnimatedStyle(() => ({ opacity: collage.value }));
  const iconStyle = useAnimatedStyle(() => ({ opacity: icon.value }));

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="none"
      exiting={FadeOut.duration(FADE_OUT_MS).easing(EASE)}
      style={[StyleSheet.absoluteFill, styles.overlay]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, collageStyle]}>
        <SplashArt opacity={1} />
      </Animated.View>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.center, iconStyle]}
      >
        <Image source={appIcon} style={styles.icon} contentFit="contain" />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    zIndex: 10,
    elevation: 10,
    backgroundColor: Colors.light.background,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 108,
    height: 108,
    borderRadius: 24,
  },
});
