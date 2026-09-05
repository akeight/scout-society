import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Divider } from '@/components/ui/divider';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Scenario } from '@/lib/types';

export const SWIPE_THRESHOLD = 120;

type SwipeCardProps = {
  scenario: Scenario;
  index: number;
  total: number;
  translateX: SharedValue<number>;
  interactive?: boolean;
};

export function SwipeCard({ scenario, index, total, translateX, interactive }: SwipeCardProps) {
  const theme = useTheme();

  const cardStyle = useAnimatedStyle(() => {
    if (!interactive) return {};
    const rotate = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD * 2, 0, SWIPE_THRESHOLD * 2],
      [-6, 0, 6],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{ translateX: translateX.value }, { rotate: `${rotate}deg` }],
    };
  });

  const intoStyle = useAnimatedStyle(() => ({
    opacity: interactive
      ? interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP)
      : 0,
  }));

  const notStyle = useAnimatedStyle(() => ({
    opacity: interactive
      ? interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP)
      : 0,
  }));

  return (
    <Animated.View
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.divider },
        cardStyle,
      ]}>
      <View style={styles.header}>
        <ThemedText type="eyebrow" themeColor="textSecondary">
          Situation {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </ThemedText>
        <Divider style={styles.divider} />
      </View>

      <View style={styles.body}>
        <ThemedText type="headline">{scenario.prompt}</ThemedText>
      </View>

      <Animated.View
        style={[styles.stamp, styles.stampLeft, { borderColor: theme.accent }, intoStyle]}>
        <ThemedText type="eyebrow" themeColor="accentInk">
          I&rsquo;m into this
        </ThemedText>
      </Animated.View>
      <Animated.View
        style={[styles.stamp, styles.stampRight, { borderColor: theme.textMuted }, notStyle]}>
        <ThemedText type="eyebrow" themeColor="textSecondary">
          Not for me
        </ThemedText>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing.five,
    justifyContent: 'space-between',
  },
  header: {
    gap: Spacing.three,
  },
  divider: {
    marginTop: Spacing.three,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  stamp: {
    position: 'absolute',
    top: Spacing.five,
    borderWidth: 1.5,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  stampLeft: {
    left: Spacing.five,
    transform: [{ rotate: '-8deg' }],
  },
  stampRight: {
    right: Spacing.five,
    transform: [{ rotate: '8deg' }],
  },
});
