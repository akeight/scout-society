import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import {
  CharacteristicList,
  DaySnapshot,
  Section,
} from '@/components/person/characteristic-list';
import { LikeGate } from '@/components/person/like-gate';
import { MayaTuesday } from '@/components/person/maya-tuesday';
import { PersonHeader } from '@/components/person/person-header';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Screen } from '@/components/ui/screen';
import { Motion, Spacing } from '@/constants/theme';
import { mayaTuesday } from '@/data/maya-tuesday';
import { getPerson, HERO_PERSON_ID } from '@/data/people';

type TuesdayState = 'idle' | 'running' | 'done';

export default function PersonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const person = getPerson(id);
  const [tuesday, setTuesday] = useState<TuesdayState>('idle');

  if (!person) {
    return <Redirect href="/discover" />;
  }

  const isHero = person.id === HERO_PERSON_ID;

  return (
    <Screen scroll contentStyle={styles.content}>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.back()}
        hitSlop={12}
        style={styles.back}>
        <ThemedText type="body" themeColor="textSecondary">
          &larr; Back
        </ThemedText>
      </Pressable>

      <PersonHeader person={person} />

      <Section eyebrow="What the work feels like">
        <ThemedText type="bodyLarge" themeColor="textSecondary">
          {person.summary}
        </ThemedText>
      </Section>

      <CharacteristicList characteristics={person.characteristics} />

      <DaySnapshot items={person.daySnapshot} />

      <Divider />

      {isHero ? (
        tuesday === 'idle' ? (
          <View style={styles.deeper}>
            <ThemedText type="headline">See what my Tuesday looks like.</ThemedText>
            <ThemedText type="body" themeColor="textSecondary">
              Three moments from a normal workday. See what pulls you in.
            </ThemedText>
            <Button label="Step into Maya's Tuesday" onPress={() => setTuesday('running')} />
          </View>
        ) : tuesday === 'running' ? (
          <Animated.View entering={FadeIn.duration(Motion.base)}>
            <MayaTuesday moments={mayaTuesday} onComplete={() => setTuesday('done')} />
          </Animated.View>
        ) : (
          <LikeGate person={person} />
        )
      ) : (
        <LikeGate person={person} />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.five,
    paddingTop: Spacing.two,
  },
  back: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.one,
  },
  deeper: {
    gap: Spacing.four,
  },
});
