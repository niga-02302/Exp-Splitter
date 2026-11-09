-- TripSplit: one-time setup for universal trip details
-- Run this in Supabase SQL Editor after the existing TripSplit schema is installed.

create table if not exists public.trip_details (
  trip_id uuid primary key references public.trips(id) on delete cascade,
  vehicle_name text,
  start_location text,
  destination text,
  start_date date,
  end_date date,
  notes text,
  updated_at timestamptz not null default now()
);

alter table public.trip_details enable row level security;

grant select, insert, update on public.trip_details to authenticated;

drop policy if exists "Trip members can view trip details" on public.trip_details;
create policy "Trip members can view trip details"
on public.trip_details for select to authenticated
using (exists (select 1 from public.trip_members tm where tm.trip_id = trip_details.trip_id and tm.user_id = auth.uid()));

drop policy if exists "Trip members can add trip details" on public.trip_details;
create policy "Trip members can add trip details"
on public.trip_details for insert to authenticated
with check (exists (select 1 from public.trip_members tm where tm.trip_id = trip_details.trip_id and tm.user_id = auth.uid()));

drop policy if exists "Trip members can update trip details" on public.trip_details;
create policy "Trip members can update trip details"
on public.trip_details for update to authenticated
using (exists (select 1 from public.trip_members tm where tm.trip_id = trip_details.trip_id and tm.user_id = auth.uid()))
with check (exists (select 1 from public.trip_members tm where tm.trip_id = trip_details.trip_id and tm.user_id = auth.uid()));
