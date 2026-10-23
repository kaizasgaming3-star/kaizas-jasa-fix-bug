-- Jalankan dalam Supabase SQL Editor. Jangan jadikan jadual ini public-readable.
create table if not exists public.bookings (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  contact text not null default '',
  service text not null,
  problem text not null check (char_length(problem) between 8 and 1200),
  budget text not null default '',
  status text not null default 'Baharu' check (status in ('Baharu','Dalam proses','Selesai','Ditolak'))
);
alter table public.bookings enable row level security;
-- Tiada polisi anon. Hanya API Vercel menggunakan service role key di server.
