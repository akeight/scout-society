import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { PressableScale } from '@/components/ui/button';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Person } from '@/lib/types';

function openPerson(id: string) {
  router.push({ pathname: '/person/[id]', params: { id } });
}

type FeatureCardProps = {
  person: Person;
  rank: number;
  reason: string;
};

export function PersonFeatureCard({ person, rank, reason }: FeatureCardProps) {
  const theme = useTheme();

  return (
    <PressableScale scaleTo={0.99} onPress={() => openPerson(person.id)}>
      <View style={[styles.feature, { backgroundColor: theme.surface, borderColor: theme.divider }]}>
        <Image
          source={person.image}
          style={styles.featureImage}
          contentFit="cover"
          transition={220}
        />
        <View style={styles.featureMeta}>
          <ThemedText type="eyebrow" themeColor="accentInk">
            {String(rank).padStart(2, '0')} &middot; {person.role}
          </ThemedText>
          <ThemedText type="title">{person.name}</ThemedText>
          <ThemedText type="caption" themeColor="textSecondary">
            Studied {person.studied}
          </ThemedText>

          <View style={[styles.reason, { borderTopColor: theme.divider }]}>
            <ThemedText type="body" themeColor="textSecondary">
              {reason}
            </ThemedText>
          </View>
        </View>
      </View>
    </PressableScale>
  );
}

export function PersonRow({ person }: { person: Person }) {
  return (
    <PressableScale scaleTo={0.99} onPress={() => openPerson(person.id)}>
      <View style={styles.row}>
        <Image source={person.image} style={styles.thumb} contentFit="cover" transition={200} />
        <View style={styles.rowMeta}>
          <ThemedText type="title" style={styles.rowName}>
            {person.name}
          </ThemedText>
          <ThemedText type="caption" themeColor="textSecondary">
            {person.role} &middot; {person.studied}
          </ThemedText>
        </View>
        <ThemedText type="title" themeColor="textMuted">
          &rarr;
        </ThemedText>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  feature: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  featureImage: {
    width: '100%',
    aspectRatio: 4 / 5,
    backgroundColor: '#E2E2DA',
  },
  featureMeta: {
    padding: Spacing.four,
    gap: Spacing.one + 2,
  },
  reason: {
    marginTop: Spacing.three,
    paddingTop: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  thumb: {
    width: 60,
    height: 76,
    borderRadius: Radius.md,
    backgroundColor: '#E2E2DA',
  },
  rowMeta: {
    flex: 1,
    gap: 2,
  },
  rowName: {
    fontSize: 19,
    lineHeight: 24,
  },
});
