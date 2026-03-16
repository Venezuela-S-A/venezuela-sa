import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@theme/Layout';
import { getSupabase, isConfigured } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

function slugToTitle(slug) {
  if (!slug || slug === 'home') return 'Inicio';
  const parts = slug.split('/');
  const last = parts[parts.length - 1];
  return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function slugToUrl(slug) {
  if (!slug || slug === 'home') return '/venezuela-sa/';
  return `/venezuela-sa/${slug}`;
}

function SugerenciasContent() {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState([]);
  const [filter, setFilter] = useState('open');
  const [loading, setLoading] = useState(true);
  const [userVotes, setUserVotes] = useState({});

  const fetchAll = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);

    let query = supabase
      .from('suggestions')
      .select(
        'id, page_slug, title, content, status, created_at, user_id, profiles(display_name), suggestion_votes(user_id, vote_type)',
      )
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;

    if (data) {
      const processed = data.map((s) => {
        const votes = s.suggestion_votes || [];
        const up = votes.filter((v) => v.vote_type === 'up').length;
        const down = votes.filter((v) => v.vote_type === 'down').length;
        return { ...s, up, down, score: up - down };
      });
      processed.sort((a, b) => b.score - a.score);
      setSuggestions(processed);

      if (user) {
        const voteMap = {};
        data.forEach((s) => {
          const myVote = (s.suggestion_votes || []).find(
            (v) => v.user_id === user.id,
          );
          if (myVote) voteMap[s.id] = myVote.vote_type;
        });
        setUserVotes(voteMap);
      }
    }
    setLoading(false);
  }, [filter, user]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function handleVote(suggestionId, voteType) {
    const supabase = getSupabase();
    if (!supabase || !user) return;

    const currentVote = userVotes[suggestionId];
    if (currentVote === voteType) {
      await supabase
        .from('suggestion_votes')
        .delete()
        .eq('suggestion_id', suggestionId)
        .eq('user_id', user.id);
    } else if (currentVote) {
      await supabase
        .from('suggestion_votes')
        .update({ vote_type: voteType })
        .eq('suggestion_id', suggestionId)
        .eq('user_id', user.id);
    } else {
      await supabase.from('suggestion_votes').insert({
        suggestion_id: suggestionId,
        user_id: user.id,
        vote_type: voteType,
      });
    }
    await fetchAll();
  }

  if (!isConfigured()) {
    return <p>Sistema de sugerencias disponible proximamente.</p>;
  }

  const FILTERS = [
    { id: 'open', label: 'Abiertas' },
    { id: 'accepted', label: 'Aceptadas' },
    { id: 'rejected', label: 'Rechazadas' },
    { id: 'all', label: 'Todas' },
  ];

  return (
    <>
      <div className="vsa-stats__tabs" style={{ marginBottom: '1.5rem' }}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`vsa-stats__tab ${filter === f.id ? 'vsa-stats__tab--active' : ''}`}
            onClick={() => setFilter(f.id)}
            type="button"
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>Cargando...</p>
      ) : suggestions.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>
          No hay sugerencias {filter !== 'all' ? `con estado "${filter}"` : ''}.
          Ve a cualquier seccion del plan y haz clic en "Sugerir un cambio".
        </p>
      ) : (
        <ul className="vsa-suggestions__list">
          {suggestions.map((s) => (
            <li key={s.id} className="vsa-suggestions__item">
              <div className="vsa-suggestions__votes">
                <button
                  className={`vsa-suggestions__vote-btn ${userVotes[s.id] === 'up' ? 'vsa-suggestions__vote-btn--active' : ''}`}
                  onClick={() => handleVote(s.id, 'up')}
                  disabled={!user}
                  type="button"
                >
                  &#9650;
                </button>
                <span className="vsa-suggestions__score">{s.score}</span>
                <button
                  className={`vsa-suggestions__vote-btn ${userVotes[s.id] === 'down' ? 'vsa-suggestions__vote-btn--active-down' : ''}`}
                  onClick={() => handleVote(s.id, 'down')}
                  disabled={!user}
                  type="button"
                >
                  &#9660;
                </button>
              </div>
              <div className="vsa-suggestions__content">
                <div className="vsa-suggestions__header">
                  <strong>{s.title}</strong>
                  {s.status !== 'open' && (
                    <span
                      className={`vsa-suggestions__status vsa-suggestions__status--${s.status}`}
                    >
                      {s.status === 'accepted' ? 'Aceptada' : 'Rechazada'}
                    </span>
                  )}
                </div>
                <p className="vsa-suggestions__text">{s.content}</p>
                <div className="vsa-comments__meta">
                  <span>{s.profiles?.display_name || 'Anonimo'}</span>
                  <time>
                    {new Date(s.created_at).toLocaleDateString('es', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </time>
                  <a
                    href={slugToUrl(s.page_slug)}
                    className="vsa-suggestions__page-link"
                  >
                    {slugToTitle(s.page_slug)}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function SugerenciasPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Layout
      title="Sugerencias"
      description="Sugiere cambios y mejoras al plan Venezuela S.A. La comunidad vota y los mejores se integran."
    >
      <main style={{ maxWidth: 720, margin: '2rem auto', padding: '0 1rem' }}>
        <h1>Sugerencias de la comunidad</h1>
        <p style={{ color: 'var(--ifm-font-color-secondary)', fontSize: '0.95rem' }}>
          Propone cambios al plan. La comunidad vota. Las mejores sugerencias
          se integran. Cada seccion tiene un boton "Sugerir un cambio" al
          final.
        </p>
        {mounted ? <SugerenciasContent /> : null}
      </main>
    </Layout>
  );
}
