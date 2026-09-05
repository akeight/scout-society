import type { Scenario } from '@/lib/types';

/**
 * Six concrete work situations. Preference calibration, not a personality
 * quiz. Each maps to the underlying work signals it expresses.
 */
export const scenarios: Scenario[] = [
  {
    id: 'messy-problem',
    prompt: "You're handed a messy problem nobody knows how to solve. That sounds exciting.",
    signals: ['ambiguity', 'analysis'],
  },
  {
    id: 'six-hours-build',
    prompt: 'You have six uninterrupted hours to build something. Sounds amazing.',
    signals: ['building', 'deep-work', 'hands-on'],
  },
  {
    id: 'new-people',
    prompt: "Most of your day is spent talking to people you've never met before.",
    signals: ['people', 'service', 'collaboration'],
  },
  {
    id: 'one-number',
    prompt: "You spend three hours figuring out why one number doesn't make sense.",
    signals: ['analysis', 'research', 'deep-work'],
  },
  {
    id: 'see-it-made',
    prompt: 'At the end of the day, you can physically see what you helped create.',
    signals: ['hands-on', 'building', 'creative'],
  },
  {
    id: 'go-to-person',
    prompt:
      "You're the person everyone comes to when something goes wrong and the answer isn't obvious.",
    signals: ['ambiguity', 'people', 'technical'],
  },
];
