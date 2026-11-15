-- Atomi Science Quiz: database setup for Supabase.
-- Run this once in Supabase → SQL Editor → New query → Run.
-- Also turn on Authentication → Sign In / Providers → "Allow anonymous sign-ins",
-- because each student gets an account automatically the first time they open the app.

-- Each student's own progress (XP, topics, decks, Atomi's looks…). Only they can read or write it.
create table if not exists public.user_state (
  id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.user_state enable row level security;

drop policy if exists "own state: read" on public.user_state;
create policy "own state: read" on public.user_state for select to authenticated using ((select auth.uid()) = id);
drop policy if exists "own state: insert" on public.user_state;
create policy "own state: insert" on public.user_state for insert to authenticated with check ((select auth.uid()) = id);
drop policy if exists "own state: update" on public.user_state;
create policy "own state: update" on public.user_state for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
drop policy if exists "own state: delete" on public.user_state;
create policy "own state: delete" on public.user_state for delete to authenticated using ((select auth.uid()) = id);

-- Public player cards for the leaderboard and friend codes (nickname, XP, Atomi's look, friend code).
-- Every signed-in student can read them; each student can only write their own.
create table if not exists public.players (
  id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.players enable row level security;

drop policy if exists "players: read" on public.players;
create policy "players: read" on public.players for select to authenticated using (true);
drop policy if exists "players: insert own" on public.players;
create policy "players: insert own" on public.players for insert to authenticated with check ((select auth.uid()) = id);
drop policy if exists "players: update own" on public.players;
create policy "players: update own" on public.players for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
drop policy if exists "players: delete own" on public.players;
create policy "players: delete own" on public.players for delete to authenticated using ((select auth.uid()) = id);

-- Keep player cards small, so nobody can stuff the leaderboard with huge data.
alter table public.players drop constraint if exists players_data_size;
alter table public.players add constraint players_data_size check (pg_column_size(data) < 4000);
alter table public.user_state drop constraint if exists user_state_data_size;
alter table public.user_state add constraint user_state_data_size check (pg_column_size(data) < 1000000);

-- Find friends by their 6-character friend code quickly.
create index if not exists players_friend_code on public.players ((data->>'friendCode'));

-- Live leaderboard updates.
do $$ begin
  alter publication supabase_realtime add table public.players;
exception when duplicate_object then null; end $$;
