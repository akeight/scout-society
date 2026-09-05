import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Tag, TagRow } from '@/components/ui/tag';
import { Spacing } from '@/constants/theme';
import type { DayMoment } from '@/lib/types';

type SectionProps = {
  eyebrow: string;
  children: React.ReactNode;
};

export function Section({ eyebrow, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <ThemedText type="eyebrow" themeColor="textSecondary">
        {eyebrow}
      </ThemedText>
      {children}
    </View>
  );
}

export function CharacteristicList({ characteristics }: { characteristics: string[] }) {
  return (
    <Section eyebrow="What the work involves">
      <TagRow>
        {characteristics.map((item) => (
          <Tag key={item} label={item} />
        ))}
      </TagRow>
    </Section>
  );
}

export function DaySnapshot({ items }: { items: DayMoment[] }) {
  return (
    <Section eyebrow="A typical afternoon">
      <View style={styles.list}>
        {items.map((item, i) => (
          <View key={i} style={styles.item}>
            <ThemedText type="body" themeColor="accentInk" style={styles.marker}>
              {item.time}
            </ThemedText>
            <ThemedText type="body" themeColor="textSecondary" style={styles.itemText}>
              {item.note}
            </ThemedText>
          </View>
        ))}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.three,
  },
  list: {
    gap: Spacing.three,
  },
  item: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  marker: {
    fontWeight: '600',
    minWidth: 64,
  },
  itemText: {
    flex: 1,
  },
});
