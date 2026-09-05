import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { PathwayList } from '@/components/pathways/pathway-list';
import { ThemedText } from '@/components/themed-text';
import { Section } from '@/components/person/characteristic-list';
import { Tag, TagRow } from '@/components/ui/tag';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { Motion, Spacing } from '@/constants/theme';
import { playSfx } from '@/lib/sfx';
import { getMajor } from '@/data/majors';
import { getPerson } from '@/data/people';
import type { Major } from '@/lib/types';

export default function PathwaysScreen() {
  const { personId } = useLocalSearchParams<{ personId: string }>();
  const person = getPerson(personId);

  const majors = useMemo(
    () =>
      person
        ? person.relatedMajorIds.map(getMajor).filter((m): m is Major => m != null)
        : [],
    [person],
  );

  if (!person) {
    return <Redirect href="/discover" />;
  }

  const firstName = person.name.split(' ')[0];

  return (
    <Screen
      scroll
      contentStyle={styles.content}
      footer={
        <Button
          label="Continue scouting"
          onPress={() => {
            playSfx('click');
            router.dismissTo('/discover');
          }}
        />
      }>
      <Animated.View entering={FadeIn.duration(Motion.slow)} style={styles.header}>
        <ThemedText type="eyebrow" themeColor="accentInk">
          Pathways
        </ThemedText>
        <ThemedText type="display">You liked {firstName}&rsquo;s world.</ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.intro}>
          {firstName} studied {person.studied}. That&rsquo;s one path &mdash; not the only one.
        </ThemedText>
      </Animated.View>

      <Section eyebrow="What pulled you in">
        <TagRow>
          {person.characteristics.slice(0, 4).map((item) => (
            <Tag key={item} label={item} emphasis />
          ))}
        </TagRow>
      </Section>

      <Animated.View entering={FadeInDown.duration(Motion.slow).delay(Motion.stagger)}>
        <PathwayList majors={majors} destinationLabel={`Work like ${firstName}\u2019s`} />
      </Animated.View>

      <View style={styles.closing}>
        <ThemedText type="headline">A major isn&rsquo;t a destination.</ThemedText>
        <ThemedText type="headline" themeColor="textSecondary">
          It&rsquo;s one path toward work you might want.
        </ThemedText>
      </View>
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
  intro: {
    marginTop: Spacing.one,
  },
  closing: {
    gap: Spacing.one,
    paddingBottom: Spacing.four,
  },
});
