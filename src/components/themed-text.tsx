import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextType =
  | 'display' // large editorial serif headline
  | 'headline' // section serif headline
  | 'title' // smaller serif title
  | 'quote' // serif, for spoken quotes
  | 'bodyLarge'
  | 'body'
  | 'eyebrow' // small, uppercase, tracked-out label
  | 'caption';

export type ThemedTextProps = TextProps & {
  type?: ThemedTextType;
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'body', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  const defaultColor: ThemeColor =
    type === 'eyebrow' || type === 'caption' ? 'textSecondary' : 'text';

  return (
    <Text
      style={[{ color: theme[themeColor ?? defaultColor] }, styles[type], style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  display: {
    fontFamily: Fonts.serif,
    fontSize: 44,
    lineHeight: 48,
    fontWeight: '500',
    letterSpacing: -1,
  },
  headline: {
    fontFamily: Fonts.serif,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '500',
    letterSpacing: -0.5,
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  quote: {
    fontFamily: Fonts.serif,
    fontSize: 22,
    lineHeight: 31,
    fontWeight: '400',
  },
  bodyLarge: {
    fontFamily: Fonts.sans,
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '400',
  },
  body: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  eyebrow: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
});
