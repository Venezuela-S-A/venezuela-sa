-- ============================================================
-- Venezuela S.A. — v2: Sugerencias y votos
--
-- Ejecutar en: Supabase Dashboard > SQL Editor > New Query
-- Prerequisito: migration.sql ya ejecutado
-- ============================================================

-- 1. Tabla de sugerencias
create table if not exists public.suggestions (
  id uuid default gen_random_uuid() primary key,
  page_slug text not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null check (char_length(title) between 1 and 120),
  content text not null check (char_length(content) between 1 and 1000),
  status text default 'open' check (status in ('open', 'accepted', 'rejected')),
  admin_note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Tabla de votos por sugerencia
create table if not exists public.suggestion_votes (
  id uuid default gen_random_uuid() primary key,
  suggestion_id uuid references public.suggestions(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  vote_type text not null check (vote_type in ('up', 'down')),
  created_at timestamptz default now(),
  unique(suggestion_id, user_id)
);

-- ============================================================
-- INDICES
-- ============================================================

create index if not exists idx_suggestions_page_slug on public.suggestions(page_slug);
create index if not exists idx_suggestions_status on public.suggestions(status);
create index if not exists idx_suggestion_votes_suggestion on public.suggestion_votes(suggestion_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.suggestions enable row level security;
alter table public.suggestion_votes enable row level security;

-- Leer: todos
create policy "Sugerencias visibles para todos"
  on public.suggestions for select using (true);

create policy "Votos visibles para todos"
  on public.suggestion_votes for select using (true);

-- Crear: autenticados
create policy "Usuarios crean sugerencias"
  on public.suggestions for insert with check (auth.uid() = user_id);

create policy "Usuarios crean votos"
  on public.suggestion_votes for insert with check (auth.uid() = user_id);

-- Editar/borrar: lo propio
create policy "Usuarios editan sus sugerencias"
  on public.suggestions for update using (auth.uid() = user_id);

create policy "Usuarios borran sus sugerencias"
  on public.suggestions for delete using (auth.uid() = user_id);

create policy "Usuarios borran sus votos"
  on public.suggestion_votes for delete using (auth.uid() = user_id);

create policy "Usuarios actualizan sus votos"
  on public.suggestion_votes for update using (auth.uid() = user_id);
