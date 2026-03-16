-- ============================================================
-- Venezuela S.A. — v3: Analytics privacy-first
--
-- Ejecutar en: Supabase Dashboard > SQL Editor > New Query
-- Prerequisito: migration.sql ya ejecutado
--
-- NO usa cookies. NO trackea usuarios individuales.
-- Solo registra: pagina, tiempo, scroll, ancho pantalla.
-- ============================================================

-- 1. Tabla de page views (anonima)
create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  page_slug text not null,
  time_on_page integer default 0,
  scroll_depth integer default 0,
  referrer text,
  screen_width integer,
  created_at timestamptz default now()
);

-- 2. Indices para consultas rapidas
create index if not exists idx_page_views_slug on public.page_views(page_slug);
create index if not exists idx_page_views_created on public.page_views(created_at);

-- 3. RLS: cualquiera puede insertar (anonimo), solo admins leen
alter table public.page_views enable row level security;

-- Insertar: cualquiera (incluyendo usuarios anonimos via anon key)
create policy "Cualquiera puede registrar page view"
  on public.page_views for insert
  with check (true);

-- Leer: todos (para que el dashboard publico funcione)
create policy "Page views visibles para todos"
  on public.page_views for select
  using (true);

-- 4. Vista materializada para stats rapidas (refresh periodico)
create or replace view public.page_stats as
select
  page_slug,
  count(*) as views,
  round(avg(time_on_page)) as avg_time_seconds,
  round(avg(scroll_depth)) as avg_scroll_pct,
  max(created_at) as last_viewed
from public.page_views
where created_at > now() - interval '30 days'
group by page_slug
order by views desc;
