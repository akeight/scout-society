import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MaxContentWidth, ScreenPadding, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ScreenProps = {
  children: ReactNode;
  /** Wrap content in a ScrollView. */
  scroll?: boolean;
  /** Pinned footer (e.g. primary CTA), sits above the bottom safe inset. */
  footer?: ReactNode;
  /** Extra style applied to the content container. */
  contentStyle?: ViewStyle;
  /** Remove default horizontal padding (for edge-to-edge media). */
  edgeToEdge?: boolean;
};

export function Screen({ children, scroll, footer, contentStyle, edgeToEdge }: ScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const padding: ViewStyle = {
    paddingTop: insets.top,
    paddingHorizontal: edgeToEdge ? 0 : ScreenPadding,
  };

  const inner = (
    <View style={[styles.inner, contentStyle]}>{children}</View>
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.scrollContent, padding]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {inner}
        </ScrollView>
      ) : (
        <View style={[styles.flex, padding]}>{inner}</View>
      )}

      {footer ? (
        <View
          style={[
            styles.footer,
            {
              paddingBottom: insets.bottom + Spacing.three,
              backgroundColor: theme.background,
              borderTopColor: theme.divider,
            },
          ]}>
          <View style={styles.footerInner}>{footer}</View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing.seven,
  },
  inner: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: ScreenPadding,
    paddingTop: Spacing.three,
  },
  footerInner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
});
