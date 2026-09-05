import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Motion, Spacing } from '@/constants/theme';
import { useAppState } from '@/lib/app-state';
import { playSfx } from '@/lib/sfx';
import type { Person } from '@/lib/types';

export function LikeGate({ person }: { person: Person }) {
  const { setPersonLiked } = useAppState();
  const firstName = person.name.split(' ')[0];

  return (
    <Animated.View entering={FadeInDown.duration(Motion.slow)} style={styles.wrap}>
      <ThemedText type="headline">
        Could you see yourself doing work like {firstName}&rsquo;s?
      </ThemedText>

      <View style={styles.actions}>
        <View style={styles.action}>
          <Button
            label="Not for me"
            variant="secondary"
            onPress={() => {
              playSfx('click');
              setPersonLiked(person.id, false);
              router.dismissTo('/discover');
            }}
          />
        </View>
        <View style={styles.action}>
          <Button
            label="I'm into this"
            variant="primary"
            onPress={() => {
              playSfx('like');
              setPersonLiked(person.id, true);
              router.replace({ pathname: '/pathways', params: { personId: person.id } });
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.four,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  action: {
    flex: 1,
  },
});
