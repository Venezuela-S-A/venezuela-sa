import { createClient } from '@supabase/supabase-js';

// ────────────────────────────────────────────────────────────
// CONFIGURACION SUPABASE (gratis)
//
// 1. Crea un proyecto en https://supabase.com
// 2. Ve a Settings > API
// 3. Copia Project URL y anon (public) key aqui
// 4. Ejecuta supabase/migration.sql en el SQL Editor
// 5. En Authentication > Providers, habilita Email
//
// La anon key es PUBLICA por diseno — la seguridad esta en
// las politicas RLS (Row Level Security) de la base de datos.
// ────────────────────────────────────────────────────────────

const SUPABASE_URL = 'https://TU_PROYECTO.supabase.co';
const SUPABASE_ANON_KEY = 'TU_ANON_KEY';

const CONFIGURED = !SUPABASE_URL.includes('TU_PROYECTO');

let _supabase = null;

export function getSupabase() {
  if (!CONFIGURED || typeof window === 'undefined') return null;
  if (!_supabase) {
    _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return _supabase;
}

export function isConfigured() {
  return CONFIGURED;
}
