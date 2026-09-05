import { Fragment, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import { PersonFeatureCard, PersonRow } from '@/components/discover/person-card';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { ThemedText } from '@/components/themed-text';
import { Divider } from '@/components/ui/divider';
import { Screen } from '@/components/ui/screen';
import { Motion, Spacing } from '@/constants/theme';
import { getPerson, people } from '@/data/people';
import { useAppState } from '@/lib/app-state';
import { matchDeterministic } from '@/lib/match';
import type { Person } from '@/lib/types';

type TopCard = { person: Person; reason: string; rank: number };

export default function DiscoverScreen() {
  const { matchResult, reactions } = useAppState();

  const result = useMemo(
    () => matchResult ?? matchDeterministic(reactions),
    [matchResult, reactions],
  );

  const topCards = useMemo<TopCard[]>(() => {
    return result.matches
      .map((match, i) => {
        const person = getPerson(match.id);
        return person ? { person, reason: match.reason, rank: i + 1 } : null;
      })
      .filter((card): card is TopCard => card !== null);
  }, [result]);

  const explorePeople = useMemo(() => {
    const topIds = new Set(topCards.map((card) => card.person.id));
    return people.filter((person) => !topIds.has(person.id));
  }, [topCards]);

  return (
    <Screen scroll contentStyle={styles.content} footer={<BottomNav active="discover" />}>
      <Animated.View entering={FadeIn.duration(Motion.slow)} style={styles.header}>
        <ThemedText type="eyebrow" themeColor="accentInk">
          Discover
        </ThemedText>
        <ThemedText type="display">Three lives worth trying on.</ThemedText>
        <ThemedText type="body" themeColor="textSecondary" style={styles.reflection}>
          {result.reflection}
        </ThemedText>
      </Animated.View>

      <View style={styles.stack}>
        {topCards.map((card, i) => (
          <Animated.View
            key={card.person.id}
            entering={FadeInDown.duration(Motion.slow).delay(Motion.stagger * (i + 1))}>
            <PersonFeatureCard person={card.person} rank={card.rank} reason={card.reason} />
          </Animated.View>
        ))}
      </View>

      <View style={styles.exploreHeader}>
        <ThemedText type="eyebrow" themeColor="textSecondary">
          Explore
        </ThemedText>
        <ThemedText type="body" themeColor="textSecondary">
          There&rsquo;s more out there.
        </ThemedText>
      </View>

      <View>
        {explorePeople.map((person, i) => (
          <Fragment key={person.id}>
            {i > 0 ? <Divider /> : null}
            <PersonRow person={person} />
          </Fragment>
        ))}
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
  reflection: {
    marginTop: Spacing.one,
  },
  stack: {
    gap: Spacing.four,
  },
  exploreHeader: {
    gap: Spacing.one,
  },
});
