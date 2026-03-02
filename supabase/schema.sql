create extension if not exists "pgcrypto";

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  reg_no text not null,
  name text not null,
  father_name text not null,
  class_name text not null,
  phone text,
  address text,
  date_of_birth text,
  student_cnic text,
  created_at timestamptz not null default now()
);

create table if not exists public.teachers (
  id uuid primary key default gen_random_uuid(),
  teacher_id text not null,
  name text not null,
  father_name text not null,
  mobile text,
  cnic text,
  address text,
  salary text,
  created_at timestamptz not null default now()
);

create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  class_name text not null,
  title text,
  image_url text,
  image_path text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.students enable row level security;
alter table public.teachers enable row level security;
alter table public.results enable row level security;

create policy "students_read" on public.students
  for select using (true);
create policy "students_write" on public.students
  for insert with check (auth.role() = 'authenticated');
create policy "students_update" on public.students
  for update using (auth.role() = 'authenticated');
create policy "students_delete" on public.students
  for delete using (auth.role() = 'authenticated');

create policy "teachers_read" on public.teachers
  for select using (true);
create policy "teachers_write" on public.teachers
  for insert with check (auth.role() = 'authenticated');
create policy "teachers_update" on public.teachers
  for update using (auth.role() = 'authenticated');
create policy "teachers_delete" on public.teachers
  for delete using (auth.role() = 'authenticated');

create policy "results_read" on public.results
  for select using (published = true or auth.role() = 'authenticated');
create policy "results_write" on public.results
  for insert with check (auth.role() = 'authenticated');
create policy "results_update" on public.results
  for update using (auth.role() = 'authenticated');
create policy "results_delete" on public.results
  for delete using (auth.role() = 'authenticated');
