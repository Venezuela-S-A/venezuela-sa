import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import {
  PERSPECTIVES,
  OVERALL_SCORE,
  TOTAL_PERSPECTIVES,
  SPECTRUM_LABELS,
  getSpectrumAverages,
  getTopPerspectives,
  getBottomPerspectives,
} from '../data/evaluations';

const SPECTRUM_COLORS = {
  derecha: '#C62828',
  'centro-derecha': '#E57373',
  centro: '#0D47A1',
  'centro-izquierda': '#7986CB',
  izquierda: '#9C27B0',
  inversor: '#F9A825',
  ejecutor: '#00897B',
  estrategico: '#607D8B',
};

function ScoreBar({ score, max = 10 }) {
  const pct = (score / max) * 100;
  const color =
    score >= 8 ? 'var(--vsa-success)' : score >= 7 ? 'var(--ifm-color-primary)' : score >= 6 ? 'var(--vsa-accent)' : 'var(--vsa-danger)';
  return (
    <div className="vsa-eval__bar">
      <div className="vsa-eval__bar-fill" style={{ width: `${pct}%`, background: color }} />
      <span className="vsa-eval__bar-label">{score}</span>
    </div>
  );
}

function OverallGauge() {
  const angle = (OVERALL_SCORE / 10) * 180;
  return (
    <div className="vsa-eval__gauge">
      <svg viewBox="0 0 200 110" width="220" height="120">
        <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="var(--vsa-table-border)" strokeWidth="12" strokeLinecap="round" />
        <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="var(--vsa-success)" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(angle / 180) * 283} 283`} />
        <text x="100" y="85" textAnchor="middle" fontSize="36" fontWeight="800" fill="var(--ifm-heading-color)">{OVERALL_SCORE}</text>
        <text x="100" y="105" textAnchor="middle" fontSize="12" fill="var(--ifm-font-color-secondary)">/10 — {TOTAL_PERSPECTIVES} perspectivas</text>
      </svg>
    </div>
  );
}

function SpectrumChart() {
  const avgs = getSpectrumAverages();
  return (
    <div className="vsa-eval__spectrum">
      <h3 className="vsa-eval__subtitle">Score por espectro ideologico</h3>
      <div className="vsa-eval__spectrum-bars">
        {avgs.map((s) => (
          <div key={s.spectrum} className="vsa-eval__spectrum-row">
            <span className="vsa-eval__spectrum-label">
              <span className="vsa-eval__dot" style={{ background: SPECTRUM_COLORS[s.spectrum] }} />
              {s.label} ({s.count})
            </span>
            <ScoreBar score={s.avg} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PerspectiveTable({ filter }) {
  const filtered = filter === 'all'
    ? PERSPECTIVES
    : PERSPECTIVES.filter((p) => p.spectrum === filter);

  const sorted = [...filtered].sort((a, b) => b.score - a.score);

  return (
    <div className="vsa-eval__table-wrap">
      <table className="vsa-eval__table">
        <thead>
          <tr>
            <th>Perspectiva</th>
            <th>Espectro</th>
            <th>Score</th>
            <th>Lo mejor</th>
            <th>Critica principal</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr key={p.id}>
              <td>
                <strong>{p.name}</strong>
                <br />
                <small style={{ color: 'var(--ifm-font-color-secondary)' }}>{p.tag}</small>
              </td>
              <td>
                <span className="vsa-eval__dot" style={{ background: SPECTRUM_COLORS[p.spectrum] }} />
                {SPECTRUM_LABELS[p.spectrum]}
              </td>
              <td>
                <span className={`vsa-eval__score ${p.score >= 8 ? 'vsa-eval__score--high' : p.score < 6.5 ? 'vsa-eval__score--low' : ''}`}>
                  {p.score}
                </span>
              </td>
              <td><small>{p.topValuation}</small></td>
              <td><small>{p.mainCritique}</small></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TopBottom() {
  const top = getTopPerspectives(5);
  const bottom = getBottomPerspectives(5);

  return (
    <div className="vsa-eval__topbottom">
      <div>
        <h3 className="vsa-eval__subtitle">Top 5 (mas alto)</h3>
        <ol className="vsa-stats__list">
          {top.map((p, i) => (
            <li key={p.id} className="vsa-stats__item">
              <span className="vsa-stats__rank">{i + 1}</span>
              <span className="vsa-stats__page-name">{p.name}</span>
              <span className="vsa-stats__badge">{p.score}</span>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <h3 className="vsa-eval__subtitle">Bottom 5 (mas bajo)</h3>
        <ol className="vsa-stats__list">
          {bottom.map((p, i) => (
            <li key={p.id} className="vsa-stats__item">
              <span className="vsa-stats__rank">{i + 1}</span>
              <span className="vsa-stats__page-name">{p.name}</span>
              <span className="vsa-stats__badge" style={{ background: 'rgba(198,40,40,0.08)', color: 'var(--vsa-danger)' }}>{p.score}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function EvaluacionPage() {
  const [filter, setFilter] = useState('all');
  const spectrumKeys = ['all', ...Object.keys(SPECTRUM_LABELS)];

  return (
    <Layout
      title="Evaluacion del plan — 28 perspectivas"
      description="Score del plan Venezuela S.A. evaluado por 28 perspectivas ideologicas, tecnicas y estrategicas."
    >
      <main style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
        <h1>Evaluacion: 28 perspectivas</h1>
        <p style={{ color: 'var(--ifm-font-color-secondary)', fontSize: '0.95rem' }}>
          El plan se evalua continuamente desde 28 perspectivas que cubren todo
          el espectro ideologico: desde Milei (libertario) hasta Piketty
          (izquierda), pasando por inversores, ejecutores y estrategas.
          El score no puede bajar de 7.4 — toda mejora se re-evalua.
        </p>

        <OverallGauge />

        <TopBottom />

        <SpectrumChart />

        <h3 className="vsa-eval__subtitle" style={{ marginTop: '2rem' }}>
          Todas las perspectivas
        </h3>

        <div className="vsa-stats__tabs" style={{ marginBottom: '1rem' }}>
          {spectrumKeys.map((key) => (
            <button
              key={key}
              className={`vsa-stats__tab ${filter === key ? 'vsa-stats__tab--active' : ''}`}
              onClick={() => setFilter(key)}
              type="button"
            >
              {key === 'all' ? 'Todas' : SPECTRUM_LABELS[key]}
            </button>
          ))}
        </div>

        <PerspectiveTable filter={filter} />

        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--ifm-background-surface-color)', borderRadius: '8px', border: '1px solid var(--vsa-table-border)' }}>
          <h4 style={{ margin: '0 0 0.5rem' }}>Techo documental alcanzado (7.7/10)</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ifm-font-color-secondary)' }}>
            Para llegar a 8.0+ se necesita: equipo nombrado publicamente,
            MVP de la plataforma funcionando, y datos de campo reales.
            El documento por si solo no puede subir mas.
          </p>
        </div>
      </main>
    </Layout>
  );
}
