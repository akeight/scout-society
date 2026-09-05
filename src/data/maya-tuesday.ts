import type { Moment } from '@/lib/types';

/**
 * Maya's Tuesday — three moments. Situation, choice, short reflection, continue.
 * Choices don't branch to different endings; the point is to let the student
 * feel the texture of the work and react to it.
 */
export const mayaTuesday: Moment[] = [
  {
    id: 'signup-drop',
    time: '9:14 AM',
    situation:
      'Yesterday Maya\u2019s team changed signup. This morning completion is down 38%.',
    question: 'What would pull you in first?',
    options: [
      {
        id: 'talk-users',
        label: 'Talk to users',
        reflection:
          'You went toward people first. A lot of product engineering is refusing to guess — you watch someone hit the wall before you touch the code.',
      },
      {
        id: 'look-data',
        label: 'Look at the data',
        reflection:
          'You went toward the data. A surprising amount of product engineering is figuring out what is actually broken before deciding what to build.',
      },
      {
        id: 'open-code',
        label: 'Open the code',
        reflection:
          'You went straight for the code. Sometimes that\u2019s right — but the instinct most senior engineers build is to confirm the problem before fixing the wrong thing.',
      },
    ],
  },
  {
    id: 'root-cause',
    time: '11:40 AM',
    situation:
      'It\u2019s a new validation rule silently rejecting valid phone numbers. You could hotfix it in a minute.',
    question: 'What do you do before you ship the fix?',
    options: [
      {
        id: 'add-test',
        label: 'Write a test that catches it',
        reflection:
          'You slowed down to make the fix stick. Good engineering is less about being fast once and more about not breaking the same thing twice.',
      },
      {
        id: 'ship-now',
        label: 'Ship it and watch closely',
        reflection:
          'You optimized for speed and kept your eyes open. Real teams make this trade constantly — the judgment is knowing when it\u2019s safe.',
      },
      {
        id: 'ask-why',
        label: 'Ask why the rule was added',
        reflection:
          'You looked for the intent behind the code. Often the bug is a reasonable idea applied a little too broadly — context beats cleverness.',
      },
    ],
  },
  {
    id: 'ship-call',
    time: '4:20 PM',
    situation:
      'Completion is recovering. Design wants to redesign the whole flow; your PM wants to move on.',
    question: 'Where do you land?',
    options: [
      {
        id: 'small-follow',
        label: 'Small follow-up, then move on',
        reflection:
          'You made a call and kept the team moving. Most of the job is deciding what is good enough for now and what genuinely can\u2019t wait.',
      },
      {
        id: 'push-redesign',
        label: 'Back the redesign',
        reflection:
          'You argued for the bigger fix. Part of the role is knowing when a patch is hiding a problem worth solving properly.',
      },
      {
        id: 'get-evidence',
        label: 'Get a little more evidence first',
        reflection:
          'You reached for evidence before committing. Product engineers spend a lot of energy turning strong opinions into testable questions.',
      },
    ],
  },
];
