import type { ImageSourcePropType } from 'react-native';

/** Work signals a scenario or person can express. */
export type Signal =
  | 'building'
  | 'ambiguity'
  | 'people'
  | 'analysis'
  | 'deep-work'
  | 'hands-on'
  | 'creative'
  | 'structured'
  | 'technical'
  | 'service'
  | 'research'
  | 'collaboration';

/** A single calibration situation the user reacts to. */
export type Scenario = {
  id: string;
  prompt: string;
  signals: Signal[];
};

/** The user's reaction to a scenario. */
export type Reaction = {
  scenarioId: string;
  value: 'into' | 'not';
};

/** A working professional the user can explore. */
export type Person = {
  id: string;
  name: string;
  role: string;
  studied: string;
  quote: string;
  /** What the work actually feels like. */
  summary: string;
  characteristics: string[];
  signals: Signal[];
  relatedMajorIds: string[];
  /** A few concrete, time-stamped beats from a typical afternoon. */
  daySnapshot: DayMoment[];
  image: ImageSourcePropType;
};

/** One time-stamped beat from a person's typical afternoon. */
export type DayMoment = {
  time: string;
  note: string;
};

/** One interactive moment in Maya's Tuesday. */
export type Moment = {
  id: string;
  time: string;
  situation: string;
  question: string;
  options: MomentOption[];
};

export type MomentOption = {
  id: string;
  label: string;
  reflection: string;
};

/** A field of study a person's work can connect back to. */
export type Major = {
  id: string;
  name: string;
  pillars: string[];
  reason: string;
};

/**
 * The shared contract returned by BOTH the deterministic matcher and the
 * AI matcher. The UI only ever depends on this shape.
 */
export type MatchResult = {
  reflection: string;
  signals: Signal[];
  matches: {
    id: string;
    reason: string;
  }[];
};
