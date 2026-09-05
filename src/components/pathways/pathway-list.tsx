import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/lib/app-state';
import type { Major } from '@/lib/types';

function MajorCard({ major }: { major: Major }) {
  const theme = useTheme();
  const { saveMajor, isMajorSaved } = useAppState();
  const saved = isMajorSaved(major.id);

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.divider }]}>
      <ThemedText type="title">{major.name}</ThemedText>
      <ThemedText type="caption" themeColor="textSecondary" style={styles.pillars}>
        {major.pillars.join('   \u00b7   ')}
      </ThemedText>
      <ThemedText type="body" themeColor="textSecondary" style={styles.reason}>
        {major.reason}
      </ThemedText>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: saved, selected: saved }}
        disabled={saved}
        hitSlop={8}
        onPress={() => saveMajor(major.id)}
        style={[styles.save, { borderTopColor: theme.divider }]}>
        <ThemedText type="eyebrow" themeColor={saved ? 'textMuted' : 'accentInk'}>
          {saved ? 'Saved \u2713' : '+ Shortlist'}
        </ThemedText>
      </Pressable>
    </View>
  );
}

type PathwayListProps = {
  majors: Major[];
  /** The kind of working life these paths converge toward. */
  destinationLabel: string;
};

/**
 * An editorial, timeline-style list. A subtle left rail connects the majors
 * down into a single destination node — the shared idea being "many paths,
 * one kind of work." Deliberately not a node graph.
 */
export function PathwayList({ majors, destinationLabel }: PathwayListProps) {
  const theme = useTheme();

  return (
    <View>
      {majors.map((major) => (
        <View key={major.id} style={styles.row}>
          <View style={styles.rail}>
            <View style={[styles.node, { borderColor: theme.accent }]} />
            <View style={[styles.line, { backgroundColor: theme.divider }]} />
          </View>
          <View style={styles.cardWrap}>
            <MajorCard major={major} />
          </View>
        </View>
      ))}

      <View style={styles.row}>
        <View style={styles.rail}>
          <View style={[styles.node, styles.nodeFilled, { backgroundColor: theme.accent, borderColor: theme.accent }]} />
        </View>
        <View style={styles.destination}>
          <ThemedText type="eyebrow" themeColor="textSecondary">
            Converges toward
          </ThemedText>
          <ThemedText type="title">{destinationLabel}</ThemedText>
        </View>
      </View>
    </View>
  );
}

const RAIL_WIDTH = 28;
const NODE = 12;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rail: {
    width: RAIL_WIDTH,
    alignItems: 'center',
  },
  node: {
    width: NODE,
    height: NODE,
    borderRadius: NODE / 2,
    borderWidth: 2,
    marginTop: Spacing.three,
    backgroundColor: 'transparent',
  },
  nodeFilled: {
    marginTop: Spacing.three,
  },
  line: {
    width: 1.5,
    flex: 1,
    marginVertical: Spacing.one,
  },
  cardWrap: {
    flex: 1,
    paddingBottom: Spacing.four,
  },
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  pillars: {
    letterSpacing: 0.3,
  },
  reason: {
    marginTop: Spacing.one,
  },
  save: {
    marginTop: Spacing.three,
    paddingTop: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
    alignSelf: 'flex-start',
  },
  destination: {
    flex: 1,
    paddingTop: Spacing.two,
    gap: Spacing.one,
  },
});
