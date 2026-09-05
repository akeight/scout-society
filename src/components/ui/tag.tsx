import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TagProps = {
  label: string;
  /** Emphasized tag uses the accent hairline. */
  emphasis?: boolean;
};

export function Tag({ label, emphasis }: TagProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.tag,
        {
          borderColor: emphasis ? theme.accent : theme.divider,
          backgroundColor: emphasis ? theme.accent : 'transparent',
        },
      ]}>
      <ThemedText
        type="caption"
        themeColor={emphasis ? 'text' : 'textSecondary'}
        style={styles.label}>
        {label}
      </ThemedText>
    </View>
  );
}

export function TagRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  tag: {
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 1,
  },
  label: {
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});
