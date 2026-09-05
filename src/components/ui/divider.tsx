import { StyleSheet, View, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export function Divider({ style }: { style?: ViewStyle }) {
  const theme = useTheme();
  return <View style={[styles.line, { backgroundColor: theme.divider }, style]} />;
}

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
});
