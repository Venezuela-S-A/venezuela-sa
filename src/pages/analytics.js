import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@theme/Layout';
import { getSupabase, isConfigured } from '../lib/supabase';

function slugToTitle(slug) {
  if (!slug || slug === 'home') return 'Inicio';
  const parts = slug.split('/');
  const last = parts[parts.length - 1];
  return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatTime(seconds) {
  if (!seconds || seconds < 1) return '< 1s';
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function AnalyticsContent() {
  const [stats, setStats] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('views');

  const fetchStats = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('page_stats')
      .select('*')
      .order('views', { ascending: false })
      .limit(50);

    if (data) {
      setStats(data);
      setTotalViews(data.reduce((sum, d) => sum + (d.views || 0), 0));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (!isConfigured()) {
    return <p>Analytics disponible cuando Supabase este configurado.</p>;
  }

  const sorted = [...stats].sort((a, b) => {
    if (sort === 'views') return (b.views || 0) - (a.views || 0);
    if (sort === 'time') return (b.avg_time_seconds || 0) - (a.avg_time_seconds || 0);
    if (sort === 'scroll') return (b.avg_scroll_pct || 0) - (a.avg_scroll_pct || 0);
    return 0;
  });

  return (
    <>
      <div className="vsa-analytics__summary">
        <div className="vsa-analytics__card">
          <span className="vsa-analytics__card-value">{totalViews.toLocaleString()}</span>
          <span className="vsa-analytics__card-label">Vistas (30 dias)</span>
        </div>
        <div className="vsa-analytics__card">
          <span className="vsa-analytics__card-value">{stats.length}</span>
          <span className="vsa-analytics__card-label">Paginas leidas</span>
        </div>
        <div className="vsa-analytics__card">
          <span className="vsa-analytics__card-value">
            {stats.length > 0
              ? formatTime(Math.round(stats.reduce((s, d) => s + (d.avg_time_seconds || 0), 0) / stats.length))
              : '—'}
          </span>
          <span className="vsa-analytics__card-label">Tiempo promedio</span>
        </div>
        <div className="vsa-analytics__card">
          <span className="vsa-analytics__card-value">
            {stats.length > 0
              ? Math.round(stats.reduce((s, d) => s + (d.avg_scroll_pct || 0), 0) / stats.length) + '%'
              : '—'}
          </span>
          <span className="vsa-analytics__card-label">Scroll promedio</span>
        </div>
      </div>

      <div className="vsa-stats__tabs" style={{ margin: '1.5rem 0 1rem' }}>
        {[
          { id: 'views', label: 'Mas leidas' },
          { id: 'time', label: 'Mas tiempo' },
          { id: 'scroll', label: 'Mas scroll' },
        ].map((t) => (
          <button
            key={t.id}
            className={`vsa-stats__tab ${sort === t.id ? 'vsa-stats__tab--active' : ''}`}
            onClick={() => setSort(t.id)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>Cargando...</p>
      ) : sorted.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>
          Aun no hay datos. Las visitas se registran automaticamente.
        </p>
      ) : (
        <div className="vsa-eval__table-wrap">
          <table className="vsa-eval__table">
            <thead>
              <tr>
                <th>#</th>
                <th>Pagina</th>
                <th>Vistas</th>
                <th>Tiempo prom.</th>
                <th>Scroll prom.</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((s, i) => (
                <tr key={s.page_slug}>
                  <td>{i + 1}</td>
                  <td>
                    <a href={`/venezuela-sa/${s.page_slug === 'home' ? '' : s.page_slug}`}>
                      {slugToTitle(s.page_slug)}
                    </a>
                  </td>
                  <td><strong>{s.views}</strong></td>
                  <td>{formatTime(s.avg_time_seconds)}</td>
                  <td>
                    <div className="vsa-eval__bar" style={{ minWidth: 80 }}>
                      <div
                        className="vsa-eval__bar-fill"
                        style={{
                          width: `${s.avg_scroll_pct || 0}%`,
                          background: (s.avg_scroll_pct || 0) > 75 ? 'var(--vsa-success)' : 'var(--ifm-color-primary)',
                        }}
                      />
                      <span className="vsa-eval__bar-label">{s.avg_scroll_pct || 0}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--ifm-background-surface-color)', borderRadius: '8px', border: '1px solid var(--vsa-table-border)', fontSize: '0.85rem', color: 'var(--ifm-font-color-secondary)' }}>
        <strong>Privacy-first:</strong> Zero cookies, zero tracking individual,
        zero Google Analytics. Solo se registra: pagina visitada, tiempo,
        profundidad de scroll, y ancho de pantalla. Datos anonimos, ultimos 30 dias.
      </div>
    </>
  );
}

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Layout
      title="Analytics"
      description="Metricas de lectura del plan Venezuela S.A. Privacy-first, sin cookies."
    >
      <main style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
        <h1>Analytics de lectura</h1>
        <p style={{ color: 'var(--ifm-font-color-secondary)', fontSize: '0.95rem' }}>
          Que secciones se leen mas, cuanto tiempo se dedica a cada una, y
          hasta donde llegan los lectores. Sin cookies ni tracking individual.
        </p>
        {mounted ? <AnalyticsContent /> : null}
      </main>
    </Layout>
  );
}
