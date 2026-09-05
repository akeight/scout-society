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
      { time: '1:00 PM', note: 'Skim how real users actually used yesterday\u2019s change before deciding what\u2019s next.' },
      { time: '2:15 PM', note: 'A short, focused conversation with design about which problem is even worth solving.' },
      { time: '3:30 PM', note: 'A long, quiet stretch turning a fuzzy idea into something that actually runs.' },
    ],
    image: require('@/assets/images/experts/maya-chen.png'),
  },
  {
    id: 'noah',
    name: 'Noah Carter',
    role: 'Mechanical Engineer',
    studied: 'Mechanical Engineering',
    quote: 'The best part is watching something go from a sketch to something you can actually hold.',
    summary:
      'A mix of deep technical problem-solving, design decisions, testing, and working with physical constraints. Some days are mostly CAD and analysis; others are spent with prototypes, technicians, or a failed test that changes the whole plan.',
    characteristics: ['building', 'technical', 'hands-on', 'analysis'],
    signals: ['building', 'hands-on', 'technical', 'structured', 'analysis'],
    relatedMajorIds: ['mechanical-engineering', 'physics', 'manufacturing-engineering', 'industrial-engineering'],
    daySnapshot: [
      { time: '1:10 PM', note: 'Review a prototype that failed a stress test.' },
      { time: '2:00 PM', note: 'Adjust the design in CAD and work through tradeoffs between weight, cost, and durability.' },
      { time: '3:30 PM', note: 'Meet with manufacturing to figure out whether the updated part can actually be produced.' },
    ],
    image: require('@/assets/images/experts/noah-carter.png'),
  },
  {
    id: 'marcus',
    name: 'Marcus Reed',
    role: 'Financial Analyst',
    studied: 'Economics & Finance',
    quote: 'If a number looks wrong, I want to know what story is hiding underneath it.',
    summary:
      'Structured, analytical, and detail-heavy. You spend time working with data, models, forecasts, and business questions, then explain what the numbers actually mean to other people.',
    characteristics: ['analysis', 'numbers', 'deep work', 'structured problem-solving'],
    signals: ['analysis', 'research', 'deep-work', 'structured'],
    relatedMajorIds: ['finance', 'economics', 'accounting', 'business-analytics'],
    daySnapshot: [
      { time: '1:00 PM', note: 'Notice that one part of the forecast is behaving differently than expected.' },
      { time: '2:15 PM', note: 'Trace the change back through the model and underlying data.' },
      { time: '3:45 PM', note: 'Explain the impact to a manager in plain language and recommend what to watch next.' },
    ],
    image: require('@/assets/images/experts/marcus-reed.png'),
  },
  {
    id: 'jordan',
    name: 'Jordan Lee',
    role: 'Physical Therapist',
    studied: 'Kinesiology & Exercise Science',
    quote:
      "You don't just treat an injury. You figure out what's keeping someone from getting their life back.",
    summary:
      'Highly people-centered and hands-on. You spend the day listening, observing movement, adapting treatment plans, encouraging people, and tracking progress over time.',
    characteristics: ['people', 'hands-on', 'service', 'visible progress'],
    signals: ['people', 'service', 'hands-on', 'collaboration'],
    relatedMajorIds: ['kinesiology', 'exercise-science', 'biology', 'health-sciences'],
    daySnapshot: [
      { time: '1:00 PM', note: 'Work with a runner recovering from a knee injury.' },
      { time: '2:15 PM', note: 'Adjust exercises after noticing a movement pattern that is slowing recovery.' },
      { time: '3:30 PM', note: 'Help a patient hit a milestone they could not reach two weeks ago.' },
    ],
    image: require('@/assets/images/experts/jordan-lee.png'),
  },
  {
    id: 'elena',
    name: 'Elena Morales',
    role: 'Investigative Journalist',
    studied: 'Journalism',
    quote: "The story usually starts with one thing that doesn't quite add up.",
    summary:
      'Curious, research-heavy, people-oriented, and often ambiguous. You spend time finding sources, reading documents, verifying details, interviewing people, and figuring out what is actually true.',
    characteristics: ['research', 'writing', 'curiosity', 'ambiguity'],
    signals: ['research', 'ambiguity', 'people', 'creative'],
    relatedMajorIds: ['journalism', 'communications', 'political-science', 'english'],
    daySnapshot: [
      { time: '12:45 PM', note: 'Find a detail in a public document that contradicts what someone said earlier.' },
      { time: '2:00 PM', note: 'Call a source you have never met and try to earn enough trust for an honest conversation.' },
      { time: '4:00 PM', note: 'Rewrite the opening after learning something that changes the whole story.' },
    ],
    image: require('@/assets/images/experts/elena-morales.png'),
  },
  {
    id: 'avery',
    name: 'Avery Brooks',
    role: 'Brand Strategist',
    studied: 'Marketing & Communications',
    quote:
      'Good strategy is figuring out what people should feel before deciding what anything should look like.',
    summary:
      'Creative but structured. You research people and culture, synthesize messy information, shape a point of view, and help teams decide how a product or company should communicate.',
    characteristics: ['creative', 'people', 'strategy', 'communication'],
    signals: ['creative', 'people', 'collaboration', 'structured'],
    relatedMajorIds: ['marketing', 'communications', 'psychology', 'advertising'],
    daySnapshot: [
      { time: '1:15 PM', note: 'Review customer interviews and highlight patterns in how people describe the product.' },
      { time: '2:30 PM', note: 'Turn those patterns into a clear positioning idea.' },
      { time: '4:00 PM', note: 'Work with designers and writers to make sure the final concept still matches the strategy.' },
    ],
    image: require('@/assets/images/experts/avery-brooks.png'),
  },
];

export function getPerson(id: string | undefined): Person | undefined {
  if (!id) return undefined;
  return people.find((person) => person.id === id);
}

export const HERO_PERSON_ID = 'maya';
