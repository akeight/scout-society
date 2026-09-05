import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import type { Person } from '@/lib/types';

export function PersonHeader({ person }: { person: Person }) {
  return (
    <View style={styles.wrap}>
      <Image source={person.image} style={styles.image} contentFit="cover" transition={220} />

      <View style={styles.meta}>
        <ThemedText type="eyebrow" themeColor="accentInk">
          {person.role}
        </ThemedText>
        <ThemedText type="display" style={styles.name}>
          {person.name}
        </ThemedText>
        <ThemedText type="caption" themeColor="textSecondary">
          Studied {person.studied}
        </ThemedText>
      </View>

      <ThemedText type="quote" style={styles.quote}>
        &ldquo;{person.quote}&rdquo;
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.four,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 5,
    borderRadius: Radius.xl,
    backgroundColor: '#E2E2DA',
  },
  meta: {
    gap: Spacing.one,
  },
  name: {
    fontSize: 40,
    lineHeight: 44,
  },
  quote: {
    paddingRight: Spacing.four,
  },
});
