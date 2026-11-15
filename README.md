# Atomi Science Quiz

![Atomi](atomi-hero.png)

**Study more, grow brighter.** Atomi is a science learning app for Year 3 and Year 4 students in Singapore IP schools. Students learn Physics, Chemistry, Biology and Practical Science through short lessons and quizzes, with Atomi, a small atom creature, as their study buddy.

## Features

- **71 topics** across Physics, Chemistry, Biology and Practical Science, for Year 3 and Year 4.
- **Lessons for every topic**: explanation cards, key formulas, a step-by-step worked example and a common mistake to avoid, then a short check. Pass the check (70%) to mark a topic as learned.
- **313 quiz questions** with explanations: quick quizzes, subject quizzes, topic practice and review of past mistakes (spaced repetition at 1, 3 and 7 days).
- **Atomi the mascot** grows through 5 stages with XP (Spark, Atom, Molecule, Scientist, Supernova) and reacts to the student's study streak.
- **Customise Atomi** with 6 colour themes and 20 accessories (hats, headbands, scarves, capes, glasses), unlocked with XP and badges.
- **Choose any topic** to learn, in any order: search and filter all 71 topics by subject and year.
- **Quick quiz builder**: pick a subject, one or more topics and 5, 10 or 15 questions.
- **Notes to flashcards and quizzes**: paste notes, upload a text file or photos, and Claude makes flashcards and multiple-choice questions (needs claude.ai).
- **Science mini games**: Formula Match (terms and formulas), Atom Builder (protons, neutrons, electrons), Speed Blitz (60 seconds) and live Quiz Battle with friends using a room code (needs claude.ai).
- **Badges, streaks and a weekly leaderboard** for friends.

## Files

| Path | What |
| --- | --- |
| `index.html` | The whole app (HTML, CSS and JavaScript) |
| `questions.js` | The topic list and question bank |
| `lessons.js` | Lessons for every topic |
| `extra.js` | Topic explorer, quiz builder, notes to flashcards, science games and Quiz Battle |
| `atomi-hero.png` | Mascot art used on the start screen |
| `brand/` | The Atomi brand kit: brand book, mascot guide, design tokens and UI components |

## Running it

Open `index.html` in a browser, or host the folder with any static host (for example GitHub Pages).

When the app runs as a Claude artifact on claude.ai, it uses the artifact's database for sign-in, saved progress and the shared leaderboard. It also uses Claude to turn notes into flashcards, and live rooms for Quiz Battle. Anywhere else it saves progress in the browser's local storage, and the leaderboard, notes-to-flashcards and Quiz Battle are turned off.

## Brand

The brand kit lives in [`brand/`](brand/README.md). It uses the **Pastel cosmic** look: a dusky lavender night sky, pastel purple and butter-star yellow, with Lexend and Nunito fonts. See [`brand/Mascot.md`](brand/Mascot.md) for Atomi's growth stages, moods and customisation.

## Content note

Lessons and questions were written to follow published Year 3 and 4 IP outlines (Raffles Girls' School and ACS (Independent)). Please have a teacher or strong student check them against your school's syllabus.

## Supabase (for the website version)

Outside claude.ai, Atomi saves to the Supabase project `atomi` (`rjazdwtatjrumblqmopg`) through `supabase.js`:
students get an account automatically (anonymous sign-in), and their progress, the leaderboard, friend codes
and live battles (Supabase Realtime) all work. The database setup is in `supabase/schema.sql`; Row Level
Security means each student can only change their own data. On claude.ai the app keeps using Claude's
built-in storage and `supabase.js` does nothing.
