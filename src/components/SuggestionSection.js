import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getSupabase, isConfigured } from '../lib/supabase';

export default function SuggestionSection({ pageSlug }) {
  const { user, profile } = useAuth();
  const [suggestions, setSuggestions] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userVotes, setUserVotes] = useState({});

  const fetchSuggestions = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('suggestions')
      .select(
        'id, title, content, status, created_at, user_id, profiles(display_name), suggestion_votes(user_id, vote_type)',
      )
      .eq('page_slug', pageSlug)
      .order('created_at', { ascending: false });

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
  }, [pageSlug, user]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || !user) return;
    const supabase = getSupabase();
    if (!supabase) return;
    setSubmitting(true);
    await supabase.from('suggestions').insert({
      page_slug: pageSlug,
      user_id: user.id,
      title: form.title.trim(),
      content: form.content.trim(),
    });
    setForm({ title: '', content: '' });
    setShowForm(false);
    await fetchSuggestions();
    setSubmitting(false);
  }

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
    await fetchSuggestions();
  }

  if (!isConfigured()) return null;

  const openCount = suggestions.filter((s) => s.status === 'open').length;

  return (
    <div className="vsa-suggestions">
      <button
        className="vsa-suggestions__toggle"
        onClick={() => setExpanded(!expanded)}
        type="button"
      >
        <span className="vsa-suggestions__toggle-icon">
          {expanded ? '\u25BC' : '\u25B6'}
        </span>
        Sugerencias{' '}
        {!loading && openCount > 0 && (
          <span className="vsa-suggestions__count">{openCount}</span>
        )}
      </button>

      {expanded && (
        <div className="vsa-suggestions__body">
          {loading ? (
            <p className="vsa-comments__loading">Cargando...</p>
          ) : suggestions.length === 0 ? (
            <p className="vsa-comments__empty">
              No hay sugerencias para esta seccion.
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
                      title="A favor"
                    >
                      &#9650;
                    </button>
                    <span className="vsa-suggestions__score">{s.score}</span>
                    <button
                      className={`vsa-suggestions__vote-btn ${userVotes[s.id] === 'down' ? 'vsa-suggestions__vote-btn--active-down' : ''}`}
                      onClick={() => handleVote(s.id, 'down')}
                      disabled={!user}
                      type="button"
                      title="En contra"
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
                        })}
                      </time>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {user ? (
            showForm ? (
              <form
                className="vsa-suggestions__form"
                onSubmit={handleSubmit}
              >
                <input
                  className="vsa-comments__input"
                  type="text"
                  placeholder="Titulo de la sugerencia"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  required
                  maxLength={120}
                />
                <textarea
                  className="vsa-comments__textarea"
                  placeholder="Describe que cambiarias o agregarias en esta seccion..."
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  rows={3}
                  required
                  maxLength={1000}
                />
                <div className="vsa-comments__auth-actions">
                  <button
                    type="submit"
                    className="vsa-comments__submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Enviando...' : 'Enviar sugerencia'}
                  </button>
                  <button
                    type="button"
                    className="vsa-comments__link-btn"
                    onClick={() => setShowForm(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <button
                className="vsa-comments__submit"
                onClick={() => setShowForm(true)}
                type="button"
                style={{ marginTop: '0.75rem' }}
              >
                Sugerir un cambio
              </button>
            )
          ) : (
            <p
              className="vsa-comments__empty"
              style={{ marginTop: '0.75rem' }}
            >
              Inicia sesion para sugerir cambios.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
