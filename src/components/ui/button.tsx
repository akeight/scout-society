import { Pressable, type PressableProps, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Motion, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: ButtonVariant;
  disabled?: boolean;
};

export function Button({
  label,
  variant = 'primary',
  disabled,
  onPress,
  style,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const surface =
    variant === 'primary'
      ? { backgroundColor: theme.text }
      : variant === 'secondary'
        ? { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.text }
        : { backgroundColor: 'transparent' };

  const labelColor =
    variant === 'primary' ? 'background' : 'text';

  return (
    <Animated.View style={[animatedStyle, styles.wrap]}>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => {
          scale.value = withTiming(0.98, { duration: Motion.fast });
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: Motion.base });
        }}
        style={[
          styles.base,
          surface,
          variant === 'ghost' && styles.ghost,
          disabled && styles.disabled,
          style as object,
        ]}
        {...rest}>
        <ThemedText type="body" themeColor={labelColor} style={styles.label}>
          {label}
        </ThemedText>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'stretch',
  },
  base: {
    minHeight: 54,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghost: {
    minHeight: 44,
  },
  label: {
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.4,
  },
});

/** A generic press-scale wrapper for cards and custom touchables. */
export function PressableScale({
  children,
  onPress,
  style,
  scaleTo = 0.98,
  ...rest
}: PressableProps & { scaleTo?: number; children: React.ReactNode }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withTiming(scaleTo, { duration: Motion.fast });
        }}
        onPressOut={() => {
          scale.value = withTiming(1, { duration: Motion.base });
        }}
        style={style}
        {...rest}>
        <View>{children}</View>
      </Pressable>
    </Animated.View>
  );
}
