import { Fragment, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { PersonRow } from '@/components/discover/person-card';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { Section } from '@/components/person/characteristic-list';
import { ThemedText } from '@/components/themed-text';
import { Divider } from '@/components/ui/divider';
import { Screen } from '@/components/ui/screen';
import { Motion, Spacing } from '@/constants/theme';
import { getMajor } from '@/data/majors';
import { getPerson } from '@/data/people';
import { useAppState } from '@/lib/app-state';
import type { Major, Person } from '@/lib/types';

export default function ShortlistScreen() {
  const { likedPersonIds, savedMajorIds } = useAppState();

  const likedPeople = useMemo<Person[]>(
    () => likedPersonIds.map(getPerson).filter((p): p is Person => p != null),
    [likedPersonIds],
  );

  const savedMajors = useMemo<Major[]>(
    () => savedMajorIds.map(getMajor).filter((m): m is Major => m != null),
    [savedMajorIds],
  );

  return (
    <Screen scroll contentStyle={styles.content} footer={<BottomNav active="shortlist" />}>
      <Animated.View entering={FadeIn.duration(Motion.slow)} style={styles.header}>
        <ThemedText type="eyebrow" themeColor="accentInk">
          Shortlist
        </ThemedText>
        <ThemedText type="display">Things worth exploring.</ThemedText>
      </Animated.View>

      <Section eyebrow="Work I liked">
        {likedPeople.length > 0 ? (
          <View>
            {likedPeople.map((person, i) => (
              <Fragment key={person.id}>
                {i > 0 ? <Divider /> : null}
                <PersonRow person={person} />
              </Fragment>
            ))}
          </View>
        ) : (
          <ThemedText type="body" themeColor="textSecondary">
            Nothing saved yet. Keep scouting.
          </ThemedText>
        )}
      </Section>

      <Section eyebrow="Majors I'm exploring">
        {savedMajors.length > 0 ? (
          <View>
            {savedMajors.map((major, i) => (
              <Fragment key={major.id}>
                {i > 0 ? <Divider /> : null}
                <Animated.View
                  entering={FadeInDown.duration(Motion.base).delay(Motion.stagger * i)}
                  style={styles.majorRow}>
                  <ThemedText type="title">{major.name}</ThemedText>
                  <ThemedText type="caption" themeColor="textSecondary">
                    Saved pathway
                  </ThemedText>
                </Animated.View>
              </Fragment>
            ))}
          </View>
        ) : (
          <ThemedText type="body" themeColor="textSecondary">
            Save a pathway when something feels worth a closer look.
          </ThemedText>
        )}
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.five,
    paddingTop: Spacing.four,
  },
  header: {
    gap: Spacing.two,
  },
  majorRow: {
    gap: 2,
    paddingVertical: Spacing.two,
  },
});
