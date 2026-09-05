import { router } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { SwipeDeck } from '@/components/calibration/swipe-deck';
import { ThemedText } from '@/components/themed-text';
import { Screen } from '@/components/ui/screen';
import { Motion, Spacing } from '@/constants/theme';
import { scenarios } from '@/data/scenarios';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/lib/app-state';
import { getMatches } from '@/lib/match';
import type { Reaction } from '@/lib/types';

export default function CalibrationScreen() {
  const theme = useTheme();
  const { reactions, setMatchResult } = useAppState();

  const onComplete = useCallback(
    async (finalReactions: Reaction[]) => {
      const result = await getMatches(finalReactions);
      setMatchResult(result);
      router.replace('/discover');
    },
    [setMatchResult],
  );

  const decided = Math.min(reactions.length, scenarios.length);

  return (
    <Screen contentStyle={styles.content}>
      <Animated.View entering={FadeIn.duration(Motion.slow)} style={styles.header}>
        <ThemedText type="eyebrow" themeColor="accentInk">
          Calibration
        </ThemedText>
        <ThemedText type="title">A few real situations.</ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          Swipe or tap. Go with your gut &mdash; there are no wrong answers.
        </ThemedText>

        <View style={styles.progress}>
          {scenarios.map((scenario, i) => (
            <View
              key={scenario.id}
              style={[
                styles.dot,
                {
                  backgroundColor: i < decided ? theme.accent : 'transparent',
                  borderColor: i < decided ? theme.accent : theme.divider,
                },
              ]}
            />
          ))}
        </View>
      </Animated.View>

      <SwipeDeck scenarios={scenarios} onComplete={onComplete} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.four,
  },
  header: {
    gap: Spacing.two,
  },
  progress: {
    flexDirection: 'row',
    gap: Spacing.one + 2,
    marginTop: Spacing.two,
  },
  dot: {
    width: 22,
    height: 4,
    borderRadius: 2,
    borderWidth: 1,
  },
});
