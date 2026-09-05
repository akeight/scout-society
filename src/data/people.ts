import type { Person } from '@/lib/types';

/**
 * Six working lives with meaningfully different days. All six use the same
 * reusable model. Maya is the one fully interactive vertical slice; the
 * others are complete enough to explore without a dead end.
 */
export const people: Person[] = [
  {
    id: 'maya',
    name: 'Maya Chen',
    role: 'Product Engineer',
    studied: 'Computer Science',
    quote: "I thought I'd spend all day coding. I definitely don't.",
    summary:
      'Half of the job is figuring out what is actually worth building. The code is the easy part once the problem is clear — the hard part is deciding what the problem even is.',
    characteristics: ['building', 'users', 'debugging', 'ambiguity', 'product decisions', 'collaboration'],
    signals: ['building', 'ambiguity', 'technical', 'collaboration', 'deep-work'],
    relatedMajorIds: ['cs', 'swe', 'hci'],
    daySnapshot: [
      'Mornings start by reading what real users did overnight, not by writing code.',
      'A lot of the day is short, focused conversations about what to build next.',
      'The best hours are long, quiet stretches turning a fuzzy idea into something that works.',
    ],
    image: require('@/assets/images/experts/maya-chen.png'),
  },
  {
    id: 'noah',
    name: 'Noah Carter',
    role: 'Mechanical Engineer',
    studied: 'Mechanical Engineering',
    quote: 'The satisfying part is holding the thing you drew last month.',
    summary:
      'The work moves between the screen and the shop floor. You design something precise, then watch reality push back — and you iterate until the physical part actually behaves.',
    characteristics: ['building', 'precision', 'prototyping', 'testing', 'materials', 'problem-solving'],
    signals: ['building', 'hands-on', 'technical', 'structured', 'analysis'],
    relatedMajorIds: ['mechanical-engineering', 'industrial-design', 'robotics'],
    daySnapshot: [
      'CAD in the morning: tightening tolerances on a part that has to fit exactly.',
      'Down to the lab to test whether last week\u2019s prototype survives real load.',
      'Notes and redlines for the next revision — most of engineering is iteration.',
    ],
    image: require('@/assets/images/experts/noah-carter.png'),
  },
  {
    id: 'marcus',
    name: 'Marcus Reed',
    role: 'Financial Analyst',
    studied: 'Economics & Finance',
    quote: 'I get paid to be suspicious of numbers that look fine.',
    summary:
      'The job is quiet, focused investigation. You build a picture of a business from its numbers, then keep pulling threads until the story the data tells actually holds together.',
    characteristics: ['analysis', 'modeling', 'research', 'patterns', 'focus', 'judgment'],
    signals: ['analysis', 'research', 'deep-work', 'structured'],
    relatedMajorIds: ['economics', 'finance', 'statistics'],
    daySnapshot: [
      'Rebuild a model when one assumption turns out to be wrong.',
      'Long, uninterrupted stretches chasing why two numbers disagree.',
      'Translate a messy spreadsheet into a single clear recommendation.',
    ],
    image: require('@/assets/images/experts/marcus-reed.png'),
  },
  {
    id: 'jordan',
    name: 'Jordan Lee',
    role: 'Physical Therapist',
    studied: 'Kinesiology',
    quote: 'Every hour is a different person and a different body.',
    summary:
      'The work is hands-on and deeply human. You read how a body moves, build a plan with the person in front of you, and get to watch them recover something they thought they had lost.',
    characteristics: ['people', 'hands-on', 'coaching', 'anatomy', 'empathy', 'progress'],
    signals: ['people', 'service', 'hands-on', 'collaboration'],
    relatedMajorIds: ['kinesiology', 'exercise-science', 'biology'],
    daySnapshot: [
      'Back-to-back sessions, each with someone you are getting to know.',
      'A lot of the skill is watching movement and adjusting on the spot.',
      'The reward is visible: someone walking better than they did last week.',
    ],
    image: require('@/assets/images/experts/jordan-lee.png'),
  },
  {
    id: 'elena',
    name: 'Elena Morales',
    role: 'Investigative Journalist',
    studied: 'Journalism',
    quote: "Most of the job is talking to people who'd rather not talk.",
    summary:
      'You live inside open questions for weeks. It is part research, part relationships, part writing — piecing together something true from documents, sources, and a lot of dead ends.',
    characteristics: ['research', 'interviews', 'writing', 'ambiguity', 'persistence', 'curiosity'],
    signals: ['research', 'ambiguity', 'people', 'creative'],
    relatedMajorIds: ['journalism', 'political-science', 'english'],
    daySnapshot: [
      'Chase a lead that may or may not go anywhere.',
      'Long interviews where the real story is in what is not said.',
      'Draft, cut, and rewrite until the sentence is exactly true.',
    ],
    image: require('@/assets/images/experts/elena-morales.png'),
  },
  {
    id: 'avery',
    name: 'Avery Brooks',
    role: 'Brand Strategist',
    studied: 'Marketing & Communications',
    quote: "I'm figuring out what a company is actually trying to say.",
    summary:
      'The work is creative but structured. You spend time understanding people, then shape a clear point of view a whole team can build around — and defend why it matters.',
    characteristics: ['creative', 'positioning', 'people', 'storytelling', 'strategy', 'collaboration'],
    signals: ['creative', 'people', 'collaboration', 'structured'],
    relatedMajorIds: ['marketing', 'communications', 'psychology'],
    daySnapshot: [
      'Interviews and research to understand who you are really talking to.',
      'Workshops where a room of opinions has to become one clear direction.',
      'Turning a strategy into words and design the rest of the team can run with.',
    ],
    image: require('@/assets/images/experts/avery-brooks.png'),
  },
];

export function getPerson(id: string | undefined): Person | undefined {
  if (!id) return undefined;
  return people.find((person) => person.id === id);
}

export const HERO_PERSON_ID = 'maya';
