import { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { SWIPE_THRESHOLD, SwipeCard } from '@/components/calibration/swipe-card';
import { Button } from '@/components/ui/button';
import { Motion, Spacing } from '@/constants/theme';
import { useAppState } from '@/lib/app-state';
import { playSfx } from '@/lib/sfx';
import type { Reaction, Scenario } from '@/lib/types';

const { width } = Dimensions.get('window');
const OFF_SCREEN = width * 1.4;

type SwipeDeckProps = {
  scenarios: Scenario[];
  onComplete: (reactions: Reaction[]) => void;
};

export function SwipeDeck({ scenarios, onComplete }: SwipeDeckProps) {
  const { setReaction } = useAppState();
  const [index, setIndex] = useState(0);
  const translateX = useSharedValue(0);
  const collected = useRef<Reaction[]>([]);

  const playSwipe = useCallback(() => playSfx('swipe'), []);

  const current = scenarios[index];
  const next = scenarios[index + 1];

  const advance = useCallback(
    (value: 'into' | 'not') => {
      const scenario = scenarios[index];
      if (scenario) {
        const reaction: Reaction = { scenarioId: scenario.id, value };
        collected.current = [
          ...collected.current.filter((r) => r.scenarioId !== scenario.id),
          reaction,
        ];
        setReaction(reaction);
      }
      translateX.value = 0;
      if (index + 1 >= scenarios.length) {
        onComplete(collected.current);
      } else {
        setIndex(index + 1);
      }
    },
    [index, scenarios, onComplete, setReaction, translateX],
  );

  const fling = useCallback(
    (direction: 1 | -1) => {
      const value: 'into' | 'not' = direction === 1 ? 'into' : 'not';
      playSwipe();
      translateX.value = withTiming(
        direction * OFF_SCREEN,
        { duration: Motion.base },
        (finished) => {
          if (finished) runOnJS(advance)(value);
        },
      );
    },
    [advance, playSwipe, translateX],
  );

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((event) => {
          translateX.value = event.translationX;
        })
        .onEnd((event) => {
          const swipedRight =
            translateX.value > SWIPE_THRESHOLD || event.velocityX > 800;
          const swipedLeft =
            translateX.value < -SWIPE_THRESHOLD || event.velocityX < -800;

          if (swipedRight) {
            runOnJS(playSwipe)();
            translateX.value = withTiming(
              OFF_SCREEN,
              { duration: Motion.base },
              (finished) => {
                if (finished) runOnJS(advance)('into');
              },
            );
          } else if (swipedLeft) {
            runOnJS(playSwipe)();
            translateX.value = withTiming(
              -OFF_SCREEN,
              { duration: Motion.base },
              (finished) => {
                if (finished) runOnJS(advance)('not');
              },
            );
          } else {
            translateX.value = withSpring(0, { damping: 18, stiffness: 180 });
          }
        }),
    [advance, playSwipe, translateX],
  );

  if (!current) return null;

  return (
    <View style={styles.wrap}>
      <View style={styles.deck}>
        {next ? (
          <View style={[styles.layer, styles.behind]} pointerEvents="none">
            <SwipeCard
              scenario={next}
              index={index + 1}
              total={scenarios.length}
              translateX={translateX}
            />
          </View>
        ) : null}

        <GestureDetector gesture={pan}>
          <Animated.View style={styles.layer}>
            <SwipeCard
              interactive
              scenario={current}
              index={index}
              total={scenarios.length}
              translateX={translateX}
            />
          </Animated.View>
        </GestureDetector>
      </View>

      <View style={styles.actions}>
        <View style={styles.action}>
          <Button label="Not for me" variant="secondary" onPress={() => fling(-1)} />
        </View>
        <View style={styles.action}>
          <Button label="I'm into this" variant="primary" onPress={() => fling(1)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    gap: Spacing.four,
  },
  deck: {
    flex: 1,
    position: 'relative',
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  behind: {
    transform: [{ scale: 0.95 }, { translateY: 16 }],
    opacity: 0.55,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  action: {
    flex: 1,
  },
});
