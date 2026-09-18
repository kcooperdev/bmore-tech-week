-- Paste this into the Supabase SQL editor once.
-- Tables are server-only. The Next.js service role writes them.
-- Public pages never talk to Supabase directly.

create extension if not exists pgcrypto;

create table if not exists venues (
  id uuid primary key default gen_random_uuid(),
  year text not null default '2027',
  name text not null,
  neighborhood text not null,
  address text not null,
  capacity integer not null,
  available_dates text[] not null default '{}',
  venue_type text not null,
  cost_type text not null,
  cost_amount numeric,
  amenities text[] not null default '{}',
  contact_name text not null,
  contact_email text not null,
  status text not null default 'pending' check (status in ('pending', 'reviewed')),
  created_at timestamptz not null default now()
);

create table if not exists speakers (
  id uuid primary key default gen_random_uuid(),
  year text not null default '2027',
  name text not null,
  email text not null,
  talk_title text not null,
  talk_description text not null,
  topic text not null,
  format text not null,
  preferred_neighborhood text not null,
  preferred_date text not null,
  linkedin_url text not null default '',
  website_url text not null default '',
  portfolio_url text not null default '',
  status text not null default 'pending' check (status in ('pending', 'reviewed')),
  created_at timestamptz not null default now()
);

create table if not exists volunteers (
  id uuid primary key default gen_random_uuid(),
  year text not null default '2027',
  name text not null,
  email text not null,
  phone text not null default '',
  roles text[] not null default '{}',
  available_dates text[] not null default '{}',
  preferred_neighborhood text not null,
  notes text not null default '',
  status text not null default 'pending' check (status in ('pending', 'reviewed')),
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  year text not null default '2027',
  slug text not null unique,
  name text not null,
  description text not null,
  venue_id uuid not null references venues (id),
  speaker_id uuid not null references speakers (id),
  date text not null,
  time text not null,
  neighborhood text not null,
  topic text not null,
  format text not null,
  status text not null default 'draft' check (status in ('draft', 'approved', 'published')),
  match_score integer not null default 0,
  match_reasons text[] not null default '{}',
  created_at timestamptz not null default now(),
  published_at timestamptz
);

create table if not exists ticket_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists venues_created_at_idx on venues (created_at desc);
create index if not exists speakers_created_at_idx on speakers (created_at desc);
create index if not exists volunteers_created_at_idx on volunteers (created_at desc);
create index if not exists events_status_idx on events (status);
create index if not exists events_slug_idx on events (slug);

alter table venues enable row level security;
alter table speakers enable row level security;
alter table volunteers enable row level security;
alter table events enable row level security;
alter table ticket_signups enable row level security;
