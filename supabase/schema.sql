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

-- ---------- AI decks from notes (make-deck server function) ----------
-- How many AI decks each student made each day (to keep the AI bill small).
create table if not exists public.deck_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null default (now() at time zone 'Asia/Singapore')::date,
  count int not null default 0,
  primary key (user_id, day)
);
alter table public.deck_usage enable row level security;
drop policy if exists "deck usage: read own" on public.deck_usage;
create policy "deck usage: read own" on public.deck_usage for select to authenticated using ((select auth.uid()) = user_id);

-- Only the make-deck server function (service role) may call these; students cannot.
create or replace function public.use_deck_credit(uid uuid, per_user int default 5, per_app int default 150)
returns int language plpgsql security definer set search_path = '' as $$
declare today date := (now() at time zone 'Asia/Singapore')::date; mine int; total int;
begin
  if uid is null then raise exception 'not_signed_in'; end if;
  select coalesce(sum(count), 0) into total from public.deck_usage where day = today;
  if total >= per_app then raise exception 'app_daily_limit'; end if;
  insert into public.deck_usage (user_id, day, count) values (uid, today, 1)
    on conflict (user_id, day) do update set count = public.deck_usage.count + 1 returning count into mine;
  if mine > per_user then
    update public.deck_usage set count = count - 1 where user_id = uid and day = today;
    raise exception 'daily_limit';
  end if;
  return per_user - mine;
end; $$;

create or replace function public.refund_deck_credit(uid uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  update public.deck_usage set count = greatest(count - 1, 0)
  where user_id = uid and day = (now() at time zone 'Asia/Singapore')::date;
end; $$;

revoke all on function public.use_deck_credit(uuid, int, int) from public, anon, authenticated;
revoke all on function public.refund_deck_credit(uuid) from public, anon, authenticated;
grant execute on function public.use_deck_credit(uuid, int, int) to service_role;
grant execute on function public.refund_deck_credit(uuid) to service_role;
