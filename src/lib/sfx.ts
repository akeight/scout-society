import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';

type Sfx = 'swipe' | 'like' | 'click';

const SOURCES: Record<Sfx, number> = {
  swipe: require('@/assets/audio/swipe.wav'),
  like: require('@/assets/audio/like.wav'),
  click: require('@/assets/audio/click.wav'),
};

const players: Partial<Record<Sfx, AudioPlayer>> = {};
let audioConfigured = false;

function ensureAudioMode() {
  if (audioConfigured) return;
  audioConfigured = true;
  // Let UI sounds play even when the device ringer is on silent.
  setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
}

/**
 * Fire-and-forget UI sound effect. Players are created once at module scope so
 * playback survives the triggering component unmounting — e.g. navigating away
 * immediately after a button press.
 */
export function playSfx(name: Sfx) {
  ensureAudioMode();
  try {
    const player = players[name] ?? (players[name] = createAudioPlayer(SOURCES[name]));
    player.seekTo(0);
    player.play();
  } catch {
    // Audio is a non-critical enhancement; never block interaction on it.
  }
}
