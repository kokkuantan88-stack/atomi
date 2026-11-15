# Atomi Science Quiz

![Atomi](atomi-hero.png)

**Study more, grow brighter.** Atomi is a science learning app for Year 3 and Year 4 students in Singapore IP schools. Students learn Physics, Chemistry, Biology and Practical Science through short lessons and quizzes, with Atomi, a small atom creature, as their study buddy.

## Features

- **71 topics** across Physics, Chemistry, Biology and Practical Science, for Year 3 and Year 4.
- **Lessons for every topic**: explanation cards, key formulas, a step-by-step worked example and a common mistake to avoid, then a short check. Pass the check (70%) to mark a topic as learned.
- **313 quiz questions** with explanations: quick quizzes, subject quizzes, topic practice and review of past mistakes (spaced repetition at 1, 3 and 7 days).
- **Atomi the mascot** grows through 5 stages with XP (Spark, Atom, Molecule, Scientist, Supernova) and reacts to the student's study streak.
- **Customise Atomi** with 6 colour themes and 20 accessories (hats, headbands, scarves, capes, glasses), unlocked with XP and badges.
- **Badges, streaks and a weekly leaderboard** for friends.

## Files

| Path | What |
| --- | --- |
| `index.html` | The whole app (HTML, CSS and JavaScript) |
| `questions.js` | The topic list and question bank |
| `lessons.js` | Lessons for every topic |
| `atomi-hero.png` | Mascot art used on the start screen |
| `brand/` | The Atomi brand kit: brand book, mascot guide, design tokens and UI components |

## Running it

Open `index.html` in a browser, or host the folder with any static host (for example GitHub Pages).

When the app runs as a Claude artifact on claude.ai, it uses the artifact's database for sign-in, saved progress and the shared leaderboard. Anywhere else it saves progress in the browser's local storage, and the leaderboard is turned off.

## Brand

The brand kit lives in [`brand/`](brand/README.md). It uses the **Cosmic lab** look: deep space navy, glowing purple and star yellow, with Lexend and Nunito fonts. See [`brand/Mascot.md`](brand/Mascot.md) for Atomi's growth stages, moods and customisation.

## Content note

Lessons and questions were written to follow published Year 3 and 4 IP outlines (Raffles Girls' School and ACS (Independent)). Please have a teacher or strong student check them against your school's syllabus.
