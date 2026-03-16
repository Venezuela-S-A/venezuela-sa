import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getSupabase, isConfigured } from '../lib/supabase';

const REACTIONS = [
  { type: 'like', emoji: '\uD83D\uDC4D', label: 'Me gusta' },
  { type: 'dislike', emoji: '\uD83D\uDC4E', label: 'No me convence' },
  { type: 'idea', emoji: '\uD83D\uDCA1', label: 'Tengo una idea' },
  { type: 'question', emoji: '\uD83E\uDD14', label: 'Tengo una duda' },
];

export default function ReactionBar({ pageSlug }) {
  const { user } = useAuth();
  const [counts, setCounts] = useState({});
  const [userReactions, setUserReactions] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const fetchReactions = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data: allReactions } = await supabase
      .from('reactions')
      .select('reaction_type, user_id')
      .eq('page_slug', pageSlug);

    if (allReactions) {
      const newCounts = {};
      const newUserReactions = new Set();
      allReactions.forEach((r) => {
        newCounts[r.reaction_type] = (newCounts[r.reaction_type] || 0) + 1;
        if (user && r.user_id === user.id) {
          newUserReactions.add(r.reaction_type);
        }
      });
      setCounts(newCounts);
      setUserReactions(newUserReactions);
    }
    setLoading(false);
  }, [pageSlug, user]);

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  async function handleReaction(type) {
    const supabase = getSupabase();
    if (!supabase || !user) return;

    if (userReactions.has(type)) {
      await supabase
        .from('reactions')
        .delete()
        .eq('page_slug', pageSlug)
        .eq('user_id', user.id)
        .eq('reaction_type', type);
    } else {
      await supabase.from('reactions').insert({
        page_slug: pageSlug,
        user_id: user.id,
        reaction_type: type,
      });
    }
    await fetchReactions();
  }

  if (!isConfigured()) return null;

  return (
    <div className="vsa-reactions">
      <span className="vsa-reactions__label">
        {loading ? '' : 'Esta seccion te parece:'}
      </span>
      <div className="vsa-reactions__buttons">
        {REACTIONS.map(({ type, emoji, label }) => {
          const isActive = userReactions.has(type);
          const count = counts[type] || 0;
          return (
            <button
              key={type}
              className={`vsa-reactions__btn ${isActive ? 'vsa-reactions__btn--active' : ''}`}
              onClick={() => handleReaction(type)}
              title={user ? label : 'Inicia sesion para reaccionar'}
              disabled={!user}
              type="button"
            >
              <span className="vsa-reactions__emoji">{emoji}</span>
              {count > 0 && (
                <span className="vsa-reactions__count">{count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
