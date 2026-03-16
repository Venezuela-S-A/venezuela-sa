import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import { getSupabase, isConfigured } from '../lib/supabase';
import { searchFAQ } from '../data/faq';

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    'Hola! Soy el asistente de Venezuela S.A. Puedes preguntarme sobre cualquier seccion del plan. Funciono online (IA completa) y offline (respuestas frecuentes + IA local).',
};

export default function AIChatWidget() {
  const { pathname } = useLocation();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('online'); // online | faq | webllm | loading-model
  const [modelProgress, setModelProgress] = useState(null);
  const [webllmAvailable, setWebllmAvailable] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    // Detectar WebGPU
    if (typeof navigator !== 'undefined' && 'gpu' in navigator) {
      setWebllmAvailable(true);
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Detectar online/offline
  useEffect(() => {
    function updateMode() {
      if (navigator.onLine) {
        setMode('online');
      } else {
        setMode('faq');
      }
    }
    window.addEventListener('online', updateMode);
    window.addEventListener('offline', updateMode);
    updateMode();
    return () => {
      window.removeEventListener('online', updateMode);
      window.removeEventListener('offline', updateMode);
    };
  }, []);

  if (!mounted || !isConfigured()) return null;

  const baseUrl = '/venezuela-sa/';
  const pageSlug =
    pathname.replace(baseUrl, '').replace(/\/$/, '') || 'home';

  // --- Estrategia: Online → FAQ → WebLLM ---

  async function tryOnline(question) {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase no configurado');

    const history = messages
      .filter((m) => m !== WELCOME_MESSAGE)
      .map(({ role, content }) => ({ role, content }));

    const { data, error: fnError } = await supabase.functions.invoke(
      'ai-chat',
      { body: { question, pageSlug, history } },
    );

    if (fnError) throw fnError;
    if (data?.error) throw new Error(data.error);
    return { answer: data.answer, source: 'groq' };
  }

  function tryFAQ(question) {
    const match = searchFAQ(question);
    if (match) {
      return {
        answer: match.a + '\n\n_(Respuesta offline desde FAQ)_',
        source: 'faq',
      };
    }
    return null;
  }

  async function tryWebLLM(question) {
    const offlineAI = await import('../lib/offlineAI');
    if (!offlineAI.isModelLoaded()) {
      throw new Error('WEBLLM_NOT_LOADED');
    }
    const answer = await offlineAI.chat(question, pageSlug);
    return { answer: answer + '\n\n_(Respuesta offline via IA local)_', source: 'webllm' };
  }

  async function handleSend(e) {
    e?.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    setInput('');
    setError('');
    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    setLoading(true);

    try {
      let result = null;

      // 1. Online: Groq
      if (navigator.onLine) {
        try {
          result = await tryOnline(question);
        } catch {
          // Online fallo, intentar FAQ
        }
      }

      // 2. FAQ cache
      if (!result) {
        result = tryFAQ(question);
      }

      // 3. WebLLM
      if (!result) {
        try {
          result = await tryWebLLM(question);
        } catch (err) {
          if (err.message === 'WEBLLM_NOT_LOADED' && webllmAvailable) {
            // Ofrecer descargar modelo
            setMessages((prev) => [
              ...prev,
              {
                role: 'assistant',
                content:
                  'No encontre esa pregunta en las FAQ y no hay conexion. Puedo descargar un modelo de IA a tu navegador (~700MB, una sola vez) para responder offline. Quieres?',
              },
            ]);
            setMode('offer-webllm');
            setLoading(false);
            return;
          }
        }
      }

      // 4. Nada funciono
      if (!result) {
        result = {
          answer: navigator.onLine
            ? 'No pude procesar tu pregunta. Intenta de nuevo o reformulala.'
            : 'Sin conexion y no encontre esa pregunta en las FAQ. Intenta con: petroleo, educacion, fondo soberano, corrupcion, ZEETs, diaspora, mineria, salud, deuda, data centers.',
          source: 'none',
        };
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: result.answer },
      ]);
    } catch (err) {
      setError(err.message || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  }

  async function handleLoadWebLLM() {
    setMode('loading-model');
    setLoading(true);
    try {
      const offlineAI = await import('../lib/offlineAI');
      await offlineAI.loadModel((progress) => {
        setModelProgress(progress);
      });
      setMode('webllm');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Modelo IA cargado! Ya puedes preguntar lo que quieras sin conexion.',
        },
      ]);
    } catch (err) {
      setError('No se pudo cargar el modelo: ' + err.message);
      setMode('faq');
    } finally {
      setLoading(false);
      setModelProgress(null);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const modeLabel =
    mode === 'online'
      ? 'Online'
      : mode === 'webllm'
        ? 'IA Local'
        : 'Offline';

  const modeColor =
    mode === 'online' ? '#00897B' : mode === 'webllm' ? '#F9A825' : '#C62828';

  return (
    <>
      {!isOpen && (
        <button
          className="vsa-chat-fab"
          onClick={() => setIsOpen(true)}
          title="Pregunta sobre el plan"
          type="button"
          aria-label="Abrir chat"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="vsa-chat">
          <div className="vsa-chat__header">
            <span className="vsa-chat__header-title">
              Pregunta sobre el plan
            </span>
            <div className="vsa-chat__header-right">
              <span
                className="vsa-chat__mode"
                style={{ background: modeColor }}
              >
                {modeLabel}
              </span>
              <button
                className="vsa-chat__close"
                onClick={() => setIsOpen(false)}
                type="button"
                aria-label="Cerrar chat"
              >
                &times;
              </button>
            </div>
          </div>

          <div className="vsa-chat__messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`vsa-chat__bubble vsa-chat__bubble--${msg.role}`}
              >
                {msg.content}
              </div>
            ))}

            {mode === 'offer-webllm' && !loading && (
              <div className="vsa-chat__webllm-offer">
                <button
                  className="vsa-comments__submit"
                  onClick={handleLoadWebLLM}
                  type="button"
                >
                  Descargar IA offline (~700MB)
                </button>
                <button
                  className="vsa-comments__link-btn"
                  onClick={() => setMode('faq')}
                  type="button"
                >
                  No, seguir con FAQ
                </button>
              </div>
            )}

            {mode === 'loading-model' && modelProgress && (
              <div className="vsa-chat__progress">
                <div className="vsa-chat__progress-bar">
                  <div
                    className="vsa-chat__progress-fill"
                    style={{
                      width: `${(modelProgress.progress || 0) * 100}%`,
                    }}
                  />
                </div>
                <span className="vsa-chat__progress-text">
                  {modelProgress.text || 'Descargando modelo...'}
                </span>
              </div>
            )}

            {loading && mode !== 'loading-model' && (
              <div className="vsa-chat__bubble vsa-chat__bubble--assistant vsa-chat__typing">
                <span />
                <span />
                <span />
              </div>
            )}

            {error && <div className="vsa-chat__error">{error}</div>}
            <div ref={messagesEndRef} />
          </div>

          <form className="vsa-chat__input-area" onSubmit={handleSend}>
            <input
              ref={inputRef}
              className="vsa-chat__input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              disabled={loading}
            />
            <button
              className="vsa-chat__send"
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Enviar"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>

          <div className="vsa-chat__footer">
            {mode === 'online'
              ? 'Groq + Llama 3.3 70B'
              : mode === 'webllm'
                ? 'WebLLM + Llama 3.2 1B (local)'
                : 'FAQ offline'}{' '}
            &middot; Gratis
          </div>
        </div>
      )}
    </>
  );
}
