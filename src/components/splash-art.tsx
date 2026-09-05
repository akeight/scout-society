import { Image } from 'expo-image';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Colors } from '@/constants/theme';

const source = require('@/assets/images/splash.png');

type SplashArtProps = {
  /** Opacity of the collage image over the paper background. */
  opacity?: number;
  /** Render the solid paper backdrop beneath the image. */
  withBackground?: boolean;
  style?: ViewStyle;
};

/**
 * The Scout Society splash collage, full-bleed. Reused by the animated splash
 * overlay (opacity 1) and as the faint Intro background (low opacity) so the
 * transition reads as one continuous crossfade of the same image.
 */
export function SplashArt({ opacity = 1, withBackground, style }: SplashArtProps) {
  return (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        withBackground && { backgroundColor: Colors.light.background },
        style,
      ]}>
      <Image
        source={source}
        style={[StyleSheet.absoluteFill, { opacity }]}
        contentFit="cover"
        contentPosition="top"
      />
    </View>
  );
}
