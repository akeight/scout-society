/**
 * Scout Society design tokens.
 *
 * Locked, light-only editorial palette. Three canonical source colors
 * (background / ink / accent) plus warm neutrals derived from the same family.
 * Owned by the Lead; consumed everywhere. Do not introduce new hues.
 */

import { Platform } from 'react-native';

const palette = {
  background: '#EEEFE9', // warm off-white paper
  surface: '#E7E7E0', // cards / raised surfaces, a hair off background
  surfaceSunken: '#E2E2DA',
  text: '#262626', // near-black ink (never pure #000)
  textSecondary: '#6B6960', // warm grey
  textMuted: '#9A988E',
  accent: '#D1BD91', // muted tan / gold, used sparingly
  accentInk: '#8A754A', // darker accent for text on light surfaces
  divider: 'rgba(38, 38, 38, 0.10)',
  overlay: 'rgba(38, 38, 38, 0.55)',
} as const;

// Light-only demo: dark mirrors light so nothing can leak a dark theme.
export const Colors = {
  light: {
    ...palette,
    // legacy keys kept for compatibility with base themed primitives
    backgroundElement: palette.surface,
    backgroundSelected: palette.surfaceSunken,
  },
  dark: {
    ...palette,
    backgroundElement: palette.surface,
    backgroundSelected: palette.surfaceSunken,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif', // New York — editorial headline face, zero load cost
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
})!;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 48,
  seven: 64,
  eight: 96,
} as const;

export const Radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

/** Motion timing (ms). Restrained, Metalab-inspired. Reanimated only. */
export const Motion = {
  fast: 180,
  base: 260,
  slow: 380,
  stagger: 70,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 640;
export const ScreenPadding = Spacing.four;
