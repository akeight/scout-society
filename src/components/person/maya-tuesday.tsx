import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Button, PressableScale } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Motion, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Moment, MomentOption } from '@/lib/types';

type MayaTuesdayProps = {
  moments: Moment[];
  onComplete: () => void;
};

export function MayaTuesday({ moments, onComplete }: MayaTuesdayProps) {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<MomentOption | null>(null);

  const moment = moments[index];
  if (!moment) return null;

  const isLast = index + 1 >= moments.length;

  const handleContinue = () => {
    if (isLast) {
      onComplete();
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.divider }]}>
      <ThemedText type="eyebrow" themeColor="accentInk">
        {moment.time} &middot; Moment {String(index + 1).padStart(2, '0')} /{' '}
        {String(moments.length).padStart(2, '0')}
      </ThemedText>

      <ThemedText type="title" style={styles.situation}>
        {moment.situation}
      </ThemedText>

      <Divider style={styles.divider} />

      {selected ? (
        <Animated.View entering={FadeInDown.duration(Motion.base)} style={styles.reflection}>
          <ThemedText type="eyebrow" themeColor="textSecondary">
            You chose &mdash; {selected.label}
          </ThemedText>
          <ThemedText type="bodyLarge">{selected.reflection}</ThemedText>
          <Button
            label={isLast ? "That's Maya's Tuesday" : 'Continue'}
            onPress={handleContinue}
          />
        </Animated.View>
      ) : (
        <Animated.View entering={FadeIn.duration(Motion.base)} style={styles.options}>
          <ThemedText type="body" themeColor="textSecondary">
            {moment.question}
          </ThemedText>
          {moment.options.map((option) => (
            <PressableScale
              key={option.id}
              scaleTo={0.985}
              onPress={() => setSelected(option)}>
              <View style={[styles.option, { borderColor: theme.divider }]}>
                <ThemedText type="body">{option.label}</ThemedText>
              </View>
            </PressableScale>
          ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  situation: {
    marginTop: Spacing.one,
  },
  divider: {
    marginVertical: Spacing.one,
  },
  options: {
    gap: Spacing.three,
  },
  option: {
    borderWidth: 1,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  reflection: {
    gap: Spacing.three,
  },
});
