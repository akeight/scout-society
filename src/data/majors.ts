import type { Major } from '@/lib/types';

/**
 * Fields of study that connect back to the working lives in this app.
 * A career is never one required major — each person surfaces a few paths.
 */
export const majors: Major[] = [
  {
    id: 'cs',
    name: 'Computer Science',
    pillars: ['Programming', 'Algorithms', 'Systems', 'Math'],
    reason: 'A strong technical foundation with flexibility across software and computing.',
  },
  {
    id: 'swe',
    name: 'Software Engineering',
    pillars: ['Software development', 'Architecture', 'Testing', 'Team development'],
    reason: 'More directly centered on designing and building software systems.',
  },
  {
    id: 'hci',
    name: 'Human-Computer Interaction',
    pillars: ['Design', 'Psychology', 'Research', 'Technology'],
    reason: 'Technology through the lens of people, product, and interaction.',
  },
  {
    id: 'mechanical-engineering',
    name: 'Mechanical Engineering',
    pillars: ['Mechanics', 'Materials', 'Design', 'Manufacturing'],
    reason: 'Turning physical ideas into things that move, hold, and last.',
  },
  {
    id: 'industrial-design',
    name: 'Industrial Design',
    pillars: ['Form', 'Prototyping', 'Ergonomics', 'Materials'],
    reason: 'Where engineering meets the feel and craft of a finished object.',
  },
  {
    id: 'robotics',
    name: 'Robotics',
    pillars: ['Controls', 'Sensors', 'Software', 'Hardware'],
    reason: 'Systems that sense the world and act on it, across hardware and code.',
  },
  {
    id: 'economics',
    name: 'Economics',
    pillars: ['Markets', 'Modeling', 'Incentives', 'Data'],
    reason: 'A rigorous way to reason about decisions, value, and behavior at scale.',
  },
  {
    id: 'finance',
    name: 'Finance',
    pillars: ['Valuation', 'Markets', 'Risk', 'Accounting'],
    reason: 'Directly centered on how money, risk, and value move through the world.',
  },
  {
    id: 'statistics',
    name: 'Statistics & Data Science',
    pillars: ['Probability', 'Modeling', 'Programming', 'Inference'],
    reason: 'The craft of finding the real signal inside noisy numbers.',
  },
  {
    id: 'kinesiology',
    name: 'Kinesiology',
    pillars: ['Anatomy', 'Movement', 'Physiology', 'Rehabilitation'],
    reason: 'How the body moves, breaks down, and rebuilds its strength.',
  },
  {
    id: 'exercise-science',
    name: 'Exercise Science',
    pillars: ['Physiology', 'Biomechanics', 'Assessment', 'Coaching'],
    reason: 'A more applied path toward hands-on work with real bodies.',
  },
  {
    id: 'biology',
    name: 'Biology',
    pillars: ['Anatomy', 'Physiology', 'Chemistry', 'Research'],
    reason: 'The science underneath clinical and health-focused careers.',
  },
  {
    id: 'journalism',
    name: 'Journalism',
    pillars: ['Reporting', 'Writing', 'Ethics', 'Media'],
    reason: 'The discipline of finding what is true and telling it clearly.',
  },
  {
    id: 'political-science',
    name: 'Political Science',
    pillars: ['Institutions', 'Policy', 'Research', 'Power'],
    reason: 'Understanding the systems that investigative work so often probes.',
  },
  {
    id: 'english',
    name: 'English & Writing',
    pillars: ['Narrative', 'Argument', 'Analysis', 'Craft'],
    reason: 'Building the voice and structure that carry a story.',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    pillars: ['Positioning', 'Audience', 'Campaigns', 'Analytics'],
    reason: 'Directly centered on how brands find and move an audience.',
  },
  {
    id: 'communications',
    name: 'Communications',
    pillars: ['Messaging', 'Media', 'Audience', 'Storytelling'],
    reason: 'The broader craft of making ideas land with real people.',
  },
  {
    id: 'psychology',
    name: 'Psychology',
    pillars: ['Behavior', 'Research', 'Perception', 'Motivation'],
    reason: 'Why people notice, trust, and choose the things they do.',
  },
];

export function getMajor(id: string): Major | undefined {
  return majors.find((major) => major.id === id);
}
