import { router } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TabKey = 'discover' | 'shortlist';

type TabItem = {
  key: TabKey;
  label: string;
  href: '/discover' | '/shortlist';
  icon: SymbolViewProps['name'];
  iconActive: SymbolViewProps['name'];
};

const TABS: TabItem[] = [
  {
    key: 'discover',
    label: 'Discover',
    href: '/discover',
    icon: 'safari',
    iconActive: 'safari.fill',
  },
  {
    key: 'shortlist',
    label: 'Shortlist',
    href: '/shortlist',
    icon: 'bookmark',
    iconActive: 'bookmark.fill',
  },
];

export function BottomNav({ active }: { active: TabKey }) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        const color = isActive ? theme.accentInk : theme.textSecondary;

        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
            hitSlop={8}
            style={styles.item}
            onPress={() => {
              if (isActive) return;
              router.replace(tab.href);
            }}>
            <SymbolView
              name={isActive ? tab.iconActive : tab.icon}
              size={22}
              tintColor={color}
              weight={isActive ? 'medium' : 'regular'}
            />
            <ThemedText type="eyebrow" style={[styles.label, { color }]}>
              {tab.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one + 2,
    paddingVertical: Spacing.one,
  },
  label: {
    letterSpacing: 1.2,
  },
});
