import React, { useEffect, useState, useCallback } from 'react';
import { getSupabase, isConfigured } from '../lib/supabase';

const TABS = [
  { id: 'liked', label: 'Mas votadas', emoji: '\uD83D\uDC4D' },
  { id: 'commented', label: 'Mas comentadas', emoji: '\uD83D\uDCAC' },
  { id: 'discussed', label: 'Mas debatidas', emoji: '\uD83E\uDD14' },
];

function slugToTitle(slug) {
  if (!slug || slug === 'home') return 'Inicio';
  const parts = slug.split('/');
  const last = parts[parts.length - 1];
  return last
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function slugToUrl(slug) {
  if (!slug || slug === 'home') return '/venezuela-sa/';
  return `/venezuela-sa/${slug}`;
}

export default function StatsPanel() {
  const [activeTab, setActiveTab] = useState('liked');
  const [data, setData] = useState({ liked: [], commented: [], discussed: [] });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }

    const [reactionsRes, commentsRes, questionsRes] = await Promise.all([
      supabase
        .from('reactions')
        .select('page_slug, reaction_type'),
      supabase
        .from('comments')
        .select('page_slug'),
      supabase
        .from('reactions')
        .select('page_slug')
        .in('reaction_type', ['question', 'dislike']),
    ]);

    const liked = aggregateBySlug(
      (reactionsRes.data || []).filter((r) => r.reaction_type === 'like'),
    );
    const commented = aggregateBySlug(commentsRes.data || []);
    const discussed = aggregateBySlug(questionsRes.data || []);

    setData({ liked, commented, discussed });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  function aggregateBySlug(items) {
    const map = {};
    items.forEach(({ page_slug }) => {
      map[page_slug] = (map[page_slug] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([slug, count]) => ({ slug, count }));
  }

  if (!isConfigured()) return null;

  const currentList = data[activeTab] || [];

  return (
    <div className="vsa-stats">
      <h3 className="vsa-stats__title">Estadisticas de participacion</h3>

      <div className="vsa-stats__tabs">
        {TABS.map(({ id, label, emoji }) => (
          <button
            key={id}
            className={`vsa-stats__tab ${activeTab === id ? 'vsa-stats__tab--active' : ''}`}
            onClick={() => setActiveTab(id)}
            type="button"
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="vsa-stats__empty">Cargando...</p>
      ) : currentList.length === 0 ? (
        <p className="vsa-stats__empty">
          Aun no hay datos. Se el primero en participar.
        </p>
      ) : (
        <ol className="vsa-stats__list">
          {currentList.map((item, i) => (
            <li key={item.slug} className="vsa-stats__item">
              <span className="vsa-stats__rank">{i + 1}</span>
              <span className="vsa-stats__page-name">
                <a href={slugToUrl(item.slug)}>{slugToTitle(item.slug)}</a>
              </span>
              <span className="vsa-stats__badge">{item.count}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
