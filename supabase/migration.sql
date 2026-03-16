-- ============================================================
-- Venezuela S.A. — Base de datos para comentarios y reacciones
--
-- Ejecutar en: Supabase Dashboard > SQL Editor > New Query
-- Prerequisito: Proyecto Supabase creado (plan Free)
-- ============================================================

-- 1. Tabla de perfiles (se sincroniza con auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- 2. Tabla de comentarios
create table if not exists public.comments (
  id uuid default gen_random_uuid() primary key,
  page_slug text not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null check (char_length(content) between 1 and 2000),
  parent_id uuid references public.comments(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Tabla de reacciones (para Fase 2)
create table if not exists public.reactions (
  id uuid default gen_random_uuid() primary key,
  page_slug text not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  reaction_type text not null check (reaction_type in ('like', 'dislike', 'idea', 'question')),
  created_at timestamptz default now(),
  unique(page_slug, user_id, reaction_type)
);

-- ============================================================
-- INDICES
-- ============================================================

create index if not exists idx_comments_page_slug on public.comments(page_slug);
create index if not exists idx_comments_created_at on public.comments(created_at);
create index if not exists idx_comments_parent_id on public.comments(parent_id);
create index if not exists idx_reactions_page_slug on public.reactions(page_slug);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

alter table public.profiles enable row level security;
alter table public.comments enable row level security;
alter table public.reactions enable row level security;

-- Cualquiera puede leer
create policy "Perfiles visibles para todos"
  on public.profiles for select using (true);

create policy "Comentarios visibles para todos"
  on public.comments for select using (true);

create policy "Reacciones visibles para todos"
  on public.reactions for select using (true);

-- Usuarios autenticados pueden insertar lo suyo
create policy "Usuarios crean su perfil"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Usuarios crean comentarios"
  on public.comments for insert with check (auth.uid() = user_id);

create policy "Usuarios crean reacciones"
  on public.reactions for insert with check (auth.uid() = user_id);

-- Usuarios pueden editar/borrar lo suyo
create policy "Usuarios editan su perfil"
  on public.profiles for update using (auth.uid() = id);

create policy "Usuarios editan sus comentarios"
  on public.comments for update using (auth.uid() = user_id);

create policy "Usuarios borran sus comentarios"
  on public.comments for delete using (auth.uid() = user_id);

create policy "Usuarios borran sus reacciones"
  on public.reactions for delete using (auth.uid() = user_id);

-- ============================================================
-- TRIGGER: Auto-crear perfil cuando un usuario se registra
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Eliminar trigger si existe (para re-ejecucion segura)
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
