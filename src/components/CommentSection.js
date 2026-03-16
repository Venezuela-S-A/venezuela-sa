import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getSupabase, isConfigured } from '../lib/supabase';

export default function CommentSection({ pageSlug }) {
  const { user, profile, signIn, signUp, signOut } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    fetchComments();
  }, [pageSlug]);

  async function fetchComments() {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from('comments')
      .select('id, content, created_at, user_id, profiles(display_name)')
      .eq('page_slug', pageSlug)
      .order('created_at', { ascending: true });
    setComments(data || []);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    const supabase = getSupabase();
    if (!supabase) return;
    setSubmitting(true);
    const { error } = await supabase.from('comments').insert({
      page_slug: pageSlug,
      user_id: user.id,
      content: newComment.trim(),
    });
    if (!error) {
      setNewComment('');
      await fetchComments();
    }
    setSubmitting(false);
  }

  async function handleDelete(commentId) {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from('comments').delete().eq('id', commentId);
    await fetchComments();
  }

  async function handleAuth(e) {
    e.preventDefault();
    setAuthError('');
    let result;
    if (authMode === 'login') {
      result = await signIn(authForm.email, authForm.password);
    } else {
      result = await signUp(
        authForm.email,
        authForm.password,
        authForm.name,
      );
    }
    if (result.error) {
      setAuthError(result.error.message);
    } else {
      setAuthMode(null);
      setAuthForm({ email: '', password: '', name: '' });
    }
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('es', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (!isConfigured()) {
    return (
      <div className="vsa-comments">
        <h3 className="vsa-comments__title">Comentarios</h3>
        <p className="vsa-comments__empty">
          Sistema de comentarios disponible proximamente.
        </p>
      </div>
    );
  }

  return (
    <div className="vsa-comments">
      <h3 className="vsa-comments__title">
        Comentarios {!loading && `(${comments.length})`}
      </h3>

      {loading ? (
        <p className="vsa-comments__loading">Cargando comentarios...</p>
      ) : comments.length === 0 ? (
        <p className="vsa-comments__empty">
          Se el primero en comentar esta seccion.
        </p>
      ) : (
        <ul className="vsa-comments__list">
          {comments.map((c) => (
            <li key={c.id} className="vsa-comments__item">
              <div className="vsa-comments__meta">
                <strong className="vsa-comments__author">
                  {c.profiles?.display_name || 'Anonimo'}
                </strong>
                <time className="vsa-comments__date">
                  {formatDate(c.created_at)}
                </time>
                {user && c.user_id === user.id && (
                  <button
                    className="vsa-comments__delete"
                    onClick={() => handleDelete(c.id)}
                    title="Eliminar comentario"
                    type="button"
                  >
                    &times;
                  </button>
                )}
              </div>
              <p className="vsa-comments__text">{c.content}</p>
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <form className="vsa-comments__form" onSubmit={handleSubmit}>
          <div className="vsa-comments__user-bar">
            <span>
              Comentando como{' '}
              <strong>{profile?.display_name || user.email}</strong>
            </span>
            <button
              type="button"
              className="vsa-comments__link-btn"
              onClick={signOut}
            >
              Cerrar sesion
            </button>
          </div>
          <textarea
            className="vsa-comments__textarea"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe tu comentario, pregunta o sugerencia..."
            rows={3}
          />
          <button
            type="submit"
            className="vsa-comments__submit"
            disabled={!newComment.trim() || submitting}
          >
            {submitting ? 'Enviando...' : 'Comentar'}
          </button>
        </form>
      ) : authMode ? (
        <form className="vsa-comments__auth" onSubmit={handleAuth}>
          <h4 className="vsa-comments__auth-title">
            {authMode === 'login' ? 'Iniciar sesion' : 'Crear cuenta'}
          </h4>
          {authMode === 'signup' && (
            <input
              className="vsa-comments__input"
              type="text"
              placeholder="Tu nombre"
              value={authForm.name}
              onChange={(e) =>
                setAuthForm({ ...authForm, name: e.target.value })
              }
              required
            />
          )}
          <input
            className="vsa-comments__input"
            type="email"
            placeholder="Email"
            value={authForm.email}
            onChange={(e) =>
              setAuthForm({ ...authForm, email: e.target.value })
            }
            required
          />
          <input
            className="vsa-comments__input"
            type="password"
            placeholder="Contrasena (min. 6 caracteres)"
            value={authForm.password}
            onChange={(e) =>
              setAuthForm({ ...authForm, password: e.target.value })
            }
            required
            minLength={6}
          />
          {authError && (
            <p className="vsa-comments__error">{authError}</p>
          )}
          <div className="vsa-comments__auth-actions">
            <button type="submit" className="vsa-comments__submit">
              {authMode === 'login' ? 'Entrar' : 'Registrarse'}
            </button>
            <button
              type="button"
              className="vsa-comments__link-btn"
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'signup' : 'login');
                setAuthError('');
              }}
            >
              {authMode === 'login'
                ? 'No tienes cuenta? Registrate'
                : 'Ya tienes cuenta? Inicia sesion'}
            </button>
            <button
              type="button"
              className="vsa-comments__link-btn"
              onClick={() => {
                setAuthMode(null);
                setAuthError('');
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="vsa-comments__cta">
          <button
            className="vsa-comments__submit"
            onClick={() => setAuthMode('login')}
            type="button"
          >
            Inicia sesion para comentar
          </button>
          <button
            className="vsa-comments__link-btn"
            onClick={() => setAuthMode('signup')}
            type="button"
          >
            o crea una cuenta
          </button>
        </div>
      )}
    </div>
  );
}
