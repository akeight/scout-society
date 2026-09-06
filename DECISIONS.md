### [DECISIONS.md](http://DECISIONS.md)

# Product & Engineering Decisions

Scout Society was built as a 150-minute interview exercise.

The prompt:

> Build something useful for an 18-year-old college freshman, two months before classes begin, who is deciding what major to pick.

The evaluator emphasized design/taste first, product strategy second, and functionality third.

This document captures the major decisions and tradeoffs made during the build.

---

## 1. Reframing the problem

### Initial question

Which major should an undecided student choose?

### Reframed problem

An 18-year-old may not have enough real exposure to working life to know what they are choosing toward.

Reading descriptions of majors such as Computer Science or Finance does not necessarily tell a student whether they would enjoy the actual work those paths can lead to.

### Product response

Instead of beginning with majors, Scout Society begins with work.

The flow is:

**Work preferences → people → lived experience → majors**

This intentionally reverses the usual major-selection flow.

---

## 2. Why not build a personality quiz?

Traditional career and major tools often ask questions like:

- Are you analytical?
- Are you creative?
- Do you enjoy working with people?

That requires users to self-report abstract preferences, sometimes about work they have never experienced.

Scout Society instead presents concrete situations.

Example:

> You have six uninterrupted hours to build something. Sounds amazing.

The student reacts to the situation itself rather than choosing a personality label.

### Hypothesis

Concrete work situations may produce more useful preference signals than abstract self-description.

---

## 3. Why recommend people instead of careers?

The initial recommendation is intentionally framed as:

> Three lives worth trying on.

rather than:

> You matched with Product Engineering.

The goal is not to put the student into another algorithmic category.

People provide richer context:

- what they studied
- what surprised them
- what their work actually feels like
- what a real day looks like

The recommendation is a starting point, not an answer.

That is why the Discover experience also includes people outside the top three recommendations.

---

## 4. Why Maya gets the deepest experience

Maya, a Product Engineer, includes the full interactive “Tuesday” vertical slice.

The other professionals have lighter editorial profiles and day snapshots.

### Tradeoff

Building six complete interactive day-in-the-life experiences would have reduced the quality of the prototype and exceeded the time constraint.

One deep experience demonstrates the full product vision.

The remaining profiles demonstrate the breadth of the system.

This was an intentional depth-over-breadth decision.

---

## 5. Why majors come after the work experience

Scout Society does not immediately recommend a major.

After the student experiences a working life and says:

> I’m into this

the product shows educational pathways connected to that kind of work.

For example, work similar to Maya’s may connect to:

- Computer Science
- Software Engineering
- Human-Computer Interaction

### Product principle

A career does not map to exactly one major.

The pathway screen intentionally presents multiple academic routes.

---

## 6. Why the product includes a Shortlist

The first version of the flow ended after major exploration.

That created a complete demo, but not a strong repeat-use loop.

The Shortlist adds:

**Discover → Experience → React → Save → Return**

Students can retain:

- working lives they found interesting
- majors they want to research further

This makes Scout Society feel less like a one-time quiz and more like a decision-making tool the student could return to over time.

---

## 7. Why there are only two navigation destinations

The persistent navigation contains:

- Discover
- Shortlist

I intentionally avoided adding:

- Home
- Profile
- Settings
- Saved
- Dashboard

Those destinations were not necessary to solve the core problem.

A two-item navigation keeps the product visually restrained and avoids turning the experience into a generic app shell.

---

## 8. Why custom bottom navigation was used

The existing Expo Router application already used a simple Stack-based route structure.

Adding native tabs would have required restructuring working navigation during a timed exercise.

A small custom bottom navigation was lower risk and preserved existing route behavior.

### Tradeoff

This is not necessarily the architecture I would choose for a mature production app.

For this prototype, it minimized implementation risk while preserving the desired product structure.

---

## 9. Why state is local

The prototype uses local React state for:

- calibration reactions
- match results
- liked professionals
- saved majors

No database or authentication was added.

### Reason

Persistence infrastructure would not materially improve the evaluator’s understanding of the product vision.

The prototype is designed to demonstrate the interaction model and product hypothesis, not production account management.

---

## 10. Why AI was not required for the core experience

The matching architecture was designed so that recommendations can be generated deterministically from work signals.

Each scenario and professional maps to signals such as:

- building
- ambiguity
- people
- analysis
- hands-on
- deep work
- creativity

This keeps the prototype reliable.

### Planned AI seam

A future AI matcher could interpret the same reactions and return:

- a short reflection
- relevant signals
- ranked people
- explanations

The UI would consume the same `MatchResult` shape.

### Product boundary

AI should not tell an 18-year-old:

> You should major in Computer Science.

A model would instead help interpret nuanced reactions and surface working lives worth exploring.

That keeps AI assistive rather than authoritative.

---

## 11. Why the visual system is editorial

The evaluator explicitly prioritized design and taste.

The interface therefore avoids:

- generic education dashboards
- AI gradients
- excessive cards
- glassmorphism
- gamification
- dense navigation
- corporate career-site styling

The brand uses:

- warm off-white
- muted sand
- near-black
- editorial photography
- serif display typography
- generous negative space
- restrained motion

The goal is to make career exploration feel more like discovering a magazine or curated society of people than completing a school form.

---

## 12. What was deliberately not built

To protect the core experience, I intentionally excluded:

- authentication
- profiles
- database persistence
- messaging
- social networking
- career search backend
- notifications
- progress tracking
- analytics
- settings
- six full interactive career simulations
- a full AI career coach
- recommendation confidence scores

These could all be future product directions, but they were not necessary to demonstrate the hypothesis.

---

## 13. What I would validate next

If Scout Society moved beyond a prototype, I would test:

### Does exposure change decisions?

Do students change which majors they are considering after experiencing real working-life scenarios?

### Which signals matter?

Which reactions best predict whether a student later says:

> I’m into this.

### Does exploration beat recommendation?

Do students learn more when encouraged to explore outside their initial matches?

### What professional content is most useful?

Do students value:

- day-in-the-life stories
- actual work decisions
- salary
- major history
- career pivots
- direct questions to professionals

### Does the Shortlist improve decision confidence?

Does returning to saved working lives and majors help students make a more confident academic choice?

---

## 14. Longer-term product direction

A mature version of Scout Society could include:

- more professional stories
- real student/alumni contributors
- office-hour-style Q&A
- major comparison
- school-specific degree mapping
- evolving recommendations based on deeper exposure
- AI-assisted synthesis of user signals

But the core product should remain:

> Help students understand the life behind the major before asking them to choose it.
