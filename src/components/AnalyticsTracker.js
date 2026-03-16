import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { getSupabase, isConfigured } from '../lib/supabase';

// Registra: page_slug, timestamp, scroll_depth, time_on_page
// Sin cookies, sin tracking externo, sin Google Analytics
// Los datos se agregan en Supabase para mostrar en /estadisticas

let entryTime = null;
let maxScroll = 0;
let currentSlug = null;

function getScrollDepth() {
  if (typeof window === 'undefined') return 0;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return 100;
  return Math.min(100, Math.round((scrollTop / docHeight) * 100));
}

function trackScroll() {
  const depth = getScrollDepth();
  if (depth > maxScroll) maxScroll = depth;
}

async function sendPageView(slug, timeOnPage, scrollDepth) {
  const supabase = getSupabase();
  if (!supabase) return;

  try {
    await supabase.from('page_views').insert({
      page_slug: slug,
      time_on_page: Math.min(timeOnPage, 1800), // cap 30 min
      scroll_depth: scrollDepth,
      referrer: document.referrer || null,
      screen_width: window.innerWidth,
    });
  } catch {
    // Silenciar errores — analytics no deben romper nada
  }
}

export default function AnalyticsTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || !isConfigured()) return;

    const baseUrl = '/venezuela-sa/';
    const slug = pathname.replace(baseUrl, '').replace(/\/$/, '') || 'home';

    // Si cambia de pagina, enviar analytics de la anterior
    if (currentSlug && currentSlug !== slug && entryTime) {
      const timeOnPage = Math.round((Date.now() - entryTime) / 1000);
      sendPageView(currentSlug, timeOnPage, maxScroll);
    }

    // Reset para nueva pagina
    currentSlug = slug;
    entryTime = Date.now();
    maxScroll = 0;

    window.addEventListener('scroll', trackScroll, { passive: true });

    // Al cerrar/navegar fuera, enviar ultimo pageview
    function handleBeforeUnload() {
      if (!currentSlug || !entryTime) return;
      const timeOnPage = Math.round((Date.now() - entryTime) / 1000);
      // sendBeacon para no bloquear el cierre
      const supabase = getSupabase();
      if (!supabase) return;
      const payload = JSON.stringify({
        page_slug: currentSlug,
        time_on_page: Math.min(timeOnPage, 1800),
        scroll_depth: maxScroll,
        referrer: document.referrer || null,
        screen_width: window.innerWidth,
      });
      navigator.sendBeacon(
        `${supabase.supabaseUrl}/rest/v1/page_views`,
        new Blob([payload], { type: 'application/json' }),
      );
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  return null; // No renderiza nada
}
