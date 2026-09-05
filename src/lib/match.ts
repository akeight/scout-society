import { people } from '@/data/people';
import { scenarios } from '@/data/scenarios';
import type { MatchResult, Reaction, Signal } from '@/lib/types';

/** Human-readable phrasing for each signal, used to build copy. */
const SIGNAL_PHRASES: Record<Signal, string> = {
  building: 'building things',
  ambiguity: 'open-ended problems',
  people: 'working with people',
  analysis: 'digging into the details',
  'deep-work': 'focused, uninterrupted work',
  'hands-on': 'hands-on, tangible work',
  creative: 'creative work',
  structured: 'structure and order',
  technical: 'technical problems',
  service: 'helping people directly',
  research: 'patient investigation',
  collaboration: 'working with a team',
};

const NEUTRAL_REFLECTION =
  "You're still narrowing things down — and knowing what doesn't fit is useful signal too.";
const NEUTRAL_REASON = 'A different kind of working life worth a look.';

const scenarioById = new Map(scenarios.map((scenario) => [scenario.id, scenario]));

function joinPhrases(phrases: string[]): string {
  if (phrases.length === 0) return '';
  if (phrases.length === 1) return phrases[0];
  if (phrases.length === 2) return `${phrases[0]} and ${phrases[1]}`;
  return `${phrases.slice(0, -1).join(', ')}, and ${phrases[phrases.length - 1]}`;
}

/**
 * Deterministic matcher.
 *   into = +1, not = -0.5 per scenario signal.
 * Surfaced signals are positive-only. Guaranteed non-empty copy in every case.
 */
export function matchDeterministic(reactions: Reaction[]): MatchResult {
  // 1. Build the user's signal vector.
  const signalScores = new Map<Signal, number>();
  for (const reaction of reactions) {
    const scenario = scenarioById.get(reaction.scenarioId);
    if (!scenario) continue;
    const weight = reaction.value === 'into' ? 1 : -0.5;
    for (const signal of scenario.signals) {
      signalScores.set(signal, (signalScores.get(signal) ?? 0) + weight);
    }
  }

  // 2. Score every person, preserving array order for deterministic ties.
  const scored = people.map((person, index) => {
    const score = person.signals.reduce((sum, signal) => sum + (signalScores.get(signal) ?? 0), 0);
    return { person, score, index };
  });

  // 3. Rank desc, tie-break by original order.
  scored.sort((a, b) => (b.score !== a.score ? b.score - a.score : a.index - b.index));

  // 4. Positive-only top signals.
  const positiveSignals = [...signalScores.entries()]
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([signal]) => signal);

  const positiveSet = new Set(positiveSignals);

  // 5 + 6. Reflection and per-person reasons, with edge-case guards.
  const reflection =
    positiveSignals.length === 0
      ? NEUTRAL_REFLECTION
      : `You seem drawn to ${joinPhrases(positiveSignals.map((s) => SIGNAL_PHRASES[s]))}.`;

  const matches = scored.slice(0, 3).map(({ person }) => {
    const overlap = person.signals.filter((signal) => positiveSet.has(signal));
    const reason =
      overlap.length === 0
        ? NEUTRAL_REASON
        : `You kept leaning toward ${joinPhrases(overlap.map((s) => SIGNAL_PHRASES[s]))}.`;
    return { id: person.id, reason };
  });

  return {
    reflection,
    signals: positiveSignals,
    matches,
  };
}

// ---------------------------------------------------------------------------
// AI seam. Same MatchResult shape as the deterministic path. Disabled by
// default; the app is fully usable without it and falls back on any failure.
// ---------------------------------------------------------------------------

const AI_ENABLED = false;

function isValidMatchResult(value: unknown): value is MatchResult {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<MatchResult>;
  return (
    typeof candidate.reflection === 'string' &&
    Array.isArray(candidate.signals) &&
    Array.isArray(candidate.matches) &&
    candidate.matches.every(
      (m) => m && typeof m.id === 'string' && typeof m.reason === 'string',
    )
  );
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('AI match timed out')), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

// Placeholder for a real model call. Intentionally unconfigured.
async function callAI(_reactions: Reaction[]): Promise<MatchResult> {
  throw new Error('AI matcher is not configured');
}

/**
 * The single entry point the UI awaits. Always resolves to a MatchResult,
 * never throws, and falls back to deterministic matching immediately if AI
 * is disabled, times out, throws, or returns an invalid shape.
 */
export async function getMatches(reactions: Reaction[]): Promise<MatchResult> {
  const fallback = matchDeterministic(reactions);
  if (!AI_ENABLED) return fallback;
  try {
    const ai = await withTimeout(callAI(reactions), 2500);
    return isValidMatchResult(ai) ? ai : fallback;
  } catch {
    return fallback;
  }
}
