import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { SplashArt } from '@/components/splash-art';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { Motion, Spacing } from '@/constants/theme';
import { playSfx } from '@/lib/sfx';

export default function IntroScreen() {
  return (
    <Screen
      contentStyle={styles.content}
      backdrop={<SplashArt opacity={0.14} />}
      footer={
        <Animated.View entering={FadeInDown.duration(Motion.slow).delay(Motion.stagger * 5)}>
          <Button
            label="Start exploring"
            onPress={() => {
              playSfx('click');
              router.push('/calibration');
            }}
          />
        </Animated.View>
      }>
      <Animated.View entering={FadeIn.duration(Motion.slow)}>
        <ThemedText type="eyebrow" themeColor="accentInk">
          Scout Society
        </ThemedText>
      </Animated.View>

      <View style={styles.headline}>
        <Animated.View entering={FadeInDown.duration(Motion.slow).delay(Motion.stagger)}>
          <ThemedText type="display">Don&rsquo;t pick a major yet.</ThemedText>
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(Motion.slow).delay(Motion.stagger * 2)}>
          <ThemedText type="display" themeColor="textSecondary">
            Try on the work first.
          </ThemedText>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInDown.duration(Motion.slow).delay(Motion.stagger * 3)}>
        <ThemedText type="bodyLarge" themeColor="textSecondary" style={styles.supporting}>
          React to a few real working situations. We&rsquo;ll introduce you to people whose days
          might be worth exploring.
        </ThemedText>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-end',
    paddingBottom: Spacing.five,
    gap: Spacing.four,
  },
  headline: {
    gap: Spacing.one,
  },
  supporting: {
    maxWidth: 420,
  },
});
