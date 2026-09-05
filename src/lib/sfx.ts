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

function getPlayer(name: Sfx): AudioPlayer | undefined {
  try {
    return players[name] ?? (players[name] = createAudioPlayer(SOURCES[name]));
  } catch {
    // Audio is a non-critical enhancement; never block interaction on it.
    return undefined;
  }
}

/**
 * Warm every player once at app start. Loading is async, so the first
 * `playSfx` for a given sound can otherwise no-op — especially on a button
 * that immediately navigates away (e.g. "Not for me"). Call once on mount.
 */
export function preloadSfx() {
  ensureAudioMode();
  (Object.keys(SOURCES) as Sfx[]).forEach(getPlayer);
}

/**
 * Fire-and-forget UI sound effect. Players are created once at module scope so
 * playback survives the triggering component unmounting — e.g. navigating away
 * immediately after a button press.
 */
export function playSfx(name: Sfx) {
  ensureAudioMode();
  const player = getPlayer(name);
  if (!player) return;
  try {
    player.seekTo(0);
    player.play();
  } catch {
    // Audio is a non-critical enhancement; never block interaction on it.
  }
}
