import React, { useState, useMemo, useCallback } from "react";
import Layout from "@theme/Layout";
import {
  PERSPECTIVES,
  OVERALL_SCORE,
  TOTAL_PERSPECTIVES,
  SPECTRUM_LABELS,
  SPECTRUM_COLORS,
  SECTION_LABELS,
  SCORE_HISTORY,
  TYPE_LABELS,
  getSpectrumAverages,
  getTopPerspectives,
  getBottomPerspectives,
  getSectionSummaries,
} from "../data/evaluations";

// ============================================================
// COLORS
// ============================================================
const C = {
  blue: "#1565C0",
  blueDark: "#0D47A1",
  blueLight: "#42A5F5",
  gold: "#F9A825",
  goldLight: "#FBC02D",
  green: "#00897B",
  greenLight: "#4DB6AC",
  red: "#C62828",
  redLight: "#EF5350",
  text: "#212121",
  textLight: "#616161",
  bg: "#FFFFFF",
  bgSurface: "#F5F5F5",
  border: "#E0E0E0",
};

// ============================================================
// TABS
// ============================================================
const TABS = [
  { id: "global", label: "Score Global" },
  { id: "perspectivas", label: "Todas las Perspectivas" },
  { id: "secciones", label: "Por Seccion" },
  { id: "matriz", label: "Matriz" },
];

// ============================================================
// UTILITY
// ============================================================
function scoreColor(score) {
  if (score === null || score === undefined)
    return "var(--ifm-font-color-secondary)";
  if (score >= 8) return "var(--vsa-success)";
  if (score >= 7) return "var(--ifm-color-primary)";
  if (score >= 6) return "var(--vsa-accent)";
  return "var(--vsa-danger)";
}

function heatColor(score) {
  if (score === null || score === undefined) return "#9E9E9E";
  if (score >= 8) return "#00897B";
  if (score >= 7) return "#1565C0";
  if (score >= 6) return "#F9A825";
  return "#C62828";
}

// ============================================================
// SHARED COMPONENTS
// ============================================================
function ScoreBar({ score, max = 10 }) {
  if (score === null)
    return (
      <span
        style={{ color: "var(--ifm-font-color-secondary)", fontSize: "0.8rem" }}
      >
        Pendiente
      </span>
    );
  const pct = (score / max) * 100;
  return (
    <div className="vsa-eval__bar">
      <div
        className="vsa-eval__bar-fill"
        style={{ width: `${pct}%`, background: scoreColor(score) }}
      />
      <span className="vsa-eval__bar-label">{score}</span>
    </div>
  );
}

function SpectrumBadge({ spectrum, small }) {
  const color = SPECTRUM_COLORS[spectrum] || "#607D8B";
  const label = SPECTRUM_LABELS[spectrum] || spectrum;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
        fontSize: small ? "0.7rem" : "0.75rem",
        padding: small ? "0.1rem 0.4rem" : "0.15rem 0.5rem",
        borderRadius: "12px",
        background: `${color}18`,
        color: color,
        fontWeight: 600,
        border: `1px solid ${color}40`,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  );
}

function TypeBadge({ type }) {
  const colors = {
    ideological: "#5C6BC0",
    investor: "#F9A825",
    executive: "#00897B",
    strategic: "#607D8B",
    "person-reference": "#8D6E63",
  };
  const color = colors[type] || "#607D8B";
  return (
    <span
      style={{
        fontSize: "0.65rem",
        padding: "0.1rem 0.35rem",
        borderRadius: "4px",
        background: `${color}15`,
        color: color,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.03em",
      }}
    >
      {TYPE_LABELS[type] || type}
    </span>
  );
}

function SectionTags({ sections, small }) {
  if (!sections || sections.length === 0) return null;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.25rem",
        marginTop: small ? "0.2rem" : "0.4rem",
      }}
    >
      {sections.map((s) => (
        <span
          key={s}
          style={{
            fontSize: "0.65rem",
            padding: "0.1rem 0.35rem",
            borderRadius: "4px",
            background: "var(--ifm-background-surface-color)",
            color: "var(--ifm-font-color-secondary)",
            border: "1px solid var(--vsa-table-border)",
          }}
        >
          {SECTION_LABELS[s] || s}
        </span>
      ))}
    </div>
  );
}

function ScoreBadge({ score, large }) {
  if (score === null || score === undefined) {
    return (
      <span
        style={{
          display: "inline-block",
          padding: large ? "0.3rem 0.6rem" : "0.15rem 0.4rem",
          borderRadius: "6px",
          background: "var(--ifm-background-surface-color)",
          color: "var(--ifm-font-color-secondary)",
          fontWeight: 700,
          fontSize: large ? "1.1rem" : "0.85rem",
          border: "1px solid var(--vsa-table-border)",
        }}
      >
        Pendiente
      </span>
    );
  }
  return (
    <span
      style={{
        display: "inline-block",
        padding: large ? "0.3rem 0.6rem" : "0.15rem 0.4rem",
        borderRadius: "6px",
        background: `${scoreColor(score)}15`,
        color: scoreColor(score),
        fontWeight: 700,
        fontSize: large ? "1.1rem" : "0.85rem",
        border: `1px solid ${scoreColor(score)}40`,
      }}
    >
      {score}/10
    </span>
  );
}

// ============================================================
// MODAL
// ============================================================
function Modal({ perspective, onClose }) {
  if (!perspective) return null;

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "var(--ifm-background-color)",
          borderRadius: "12px",
          maxWidth: 560,
          width: "100%",
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1rem",
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 0.3rem", fontSize: "1.3rem" }}>
              {perspective.name}
            </h2>
            <p
              style={{
                margin: "0 0 0.5rem",
                color: "var(--ifm-font-color-secondary)",
                fontSize: "0.9rem",
              }}
            >
              {perspective.tag}
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <SpectrumBadge spectrum={perspective.spectrum} />
              <TypeBadge type={perspective.type} />
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "var(--ifm-font-color-secondary)",
              padding: "0.25rem",
              lineHeight: 1,
            }}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 120 }}>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--ifm-font-color-secondary)",
                marginBottom: "0.25rem",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Score
            </div>
            <ScoreBadge score={perspective.score} large />
          </div>
        </div>

        {perspective.topValuation && (
          <div
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              background: "rgba(0,137,123,0.06)",
              border: "1px solid rgba(0,137,123,0.2)",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "var(--vsa-success)",
                marginBottom: "0.25rem",
              }}
            >
              Lo mejor
            </div>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>
              {perspective.topValuation}
            </p>
          </div>
        )}

        {perspective.mainCritique && (
          <div
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              background: "rgba(198,40,40,0.06)",
              border: "1px solid rgba(198,40,40,0.2)",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "var(--vsa-danger)",
                marginBottom: "0.25rem",
              }}
            >
              Critica principal
            </div>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>
              {perspective.mainCritique}
            </p>
          </div>
        )}

        {perspective.sections && perspective.sections.length > 0 && (
          <div style={{ marginBottom: "0.75rem" }}>
            <div
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "var(--ifm-font-color-secondary)",
                marginBottom: "0.4rem",
              }}
            >
              Secciones que evalua
            </div>
            <SectionTags sections={perspective.sections} />
          </div>
        )}

        {perspective.skillFile && (
          <div
            style={{
              marginTop: "1rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid var(--vsa-table-border)",
            }}
          >
            <a
              href={`https://github.com/Venezuela-S-A/venezuela-sa/blob/main/skills/${perspective.skillFile}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.85rem", fontWeight: 600 }}
            >
              Ver skill completo en GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// TAB 1: SCORE GLOBAL
// ============================================================
function OverallGauge() {
  const angle = (OVERALL_SCORE / 10) * 180;
  return (
    <div className="vsa-eval__gauge">
      <svg viewBox="0 0 200 110" width="220" height="120">
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="var(--vsa-table-border)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="var(--vsa-success)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${(angle / 180) * 283} 283`}
        />
        <text
          x="100"
          y="85"
          textAnchor="middle"
          fontSize="36"
          fontWeight="800"
          fill="var(--ifm-heading-color)"
        >
          {OVERALL_SCORE}
        </text>
        <text
          x="100"
          y="105"
          textAnchor="middle"
          fontSize="12"
          fill="var(--ifm-font-color-secondary)"
        >
          /10 — {TOTAL_PERSPECTIVES} perspectivas
        </text>
      </svg>
    </div>
  );
}

function ScoreHistoryChart() {
  const width = 500;
  const height = 160;
  const padL = 40;
  const padR = 20;
  const padT = 20;
  const padB = 35;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const minScore = 5.5;
  const maxScore = 8.5;
  const range = maxScore - minScore;

  const points = SCORE_HISTORY.map((h, i) => {
    const x = padL + (i / (SCORE_HISTORY.length - 1)) * chartW;
    const y = padT + chartH - ((h.score - minScore) / range) * chartH;
    return { x, y, ...h };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h3 className="vsa-eval__subtitle">Evolucion del score</h3>
      <div style={{ overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          style={{ maxWidth: width, display: "block", margin: "0 auto" }}
        >
          {/* Grid lines */}
          {[6, 7, 8].map((v) => {
            const y = padT + chartH - ((v - minScore) / range) * chartH;
            return (
              <g key={v}>
                <line
                  x1={padL}
                  y1={y}
                  x2={width - padR}
                  y2={y}
                  stroke="var(--vsa-table-border)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <text
                  x={padL - 6}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--ifm-font-color-secondary)"
                >
                  {v}
                </text>
              </g>
            );
          })}

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="var(--ifm-color-primary)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Points + labels */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="var(--ifm-color-primary)"
                stroke="var(--ifm-background-color)"
                strokeWidth="2"
              />
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="var(--ifm-heading-color)"
              >
                {p.score}
              </text>
              <text
                x={p.x}
                y={height - 5}
                textAnchor="middle"
                fontSize="9"
                fill="var(--ifm-font-color-secondary)"
              >
                {p.label}
              </text>
              <text
                x={p.x}
                y={height - 16}
                textAnchor="middle"
                fontSize="8"
                fill="var(--ifm-font-color-secondary)"
              >
                {p.perspectives}p
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function SpectrumChart() {
  const avgs = getSpectrumAverages();
  return (
    <div className="vsa-eval__spectrum">
      <h3 className="vsa-eval__subtitle">Score por espectro</h3>
      <div className="vsa-eval__spectrum-bars">
        {avgs.map((s) => (
          <div key={s.spectrum} className="vsa-eval__spectrum-row">
            <span className="vsa-eval__spectrum-label">
              <span
                className="vsa-eval__dot"
                style={{ background: SPECTRUM_COLORS[s.spectrum] }}
              />
              {s.label} ({s.count})
            </span>
            <ScoreBar score={s.avg} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TopBottom() {
  const top = getTopPerspectives(5);
  const bottom = getBottomPerspectives(5);
  return (
    <div className="vsa-eval__topbottom">
      <div>
        <h3 className="vsa-eval__subtitle">Top 5</h3>
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
        <h3 className="vsa-eval__subtitle">Bottom 5</h3>
        <ol className="vsa-stats__list">
          {bottom.map((p, i) => (
            <li key={p.id} className="vsa-stats__item">
              <span className="vsa-stats__rank">{i + 1}</span>
              <span className="vsa-stats__page-name">{p.name}</span>
              <span
                className="vsa-stats__badge"
                style={{
                  background: "rgba(198,40,40,0.08)",
                  color: "var(--vsa-danger)",
                }}
              >
                {p.score}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function TabGlobal() {
  return (
    <div>
      <OverallGauge />
      <ScoreHistoryChart />
      <TopBottom />
      <SpectrumChart />
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "var(--ifm-background-surface-color)",
          borderRadius: "8px",
          border: "1px solid var(--vsa-table-border)",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem" }}>
          Techo documental alcanzado (8.0 con analistas, 7.6 con founders/VCs)
        </h4>
        <p
          style={{
            margin: 0,
            fontSize: "0.9rem",
            color: "var(--ifm-font-color-secondary)",
          }}
        >
          Analistas dan 8.0. Founders/VCs dan 6.9. Diferencia: los builders
          exigen producto, equipo y traccion — no documentos. Para subir: MVP
          del FCV, equipo nombrado, Ministerio Digital 15K+ ingenieros.
        </p>
      </div>
    </div>
  );
}

// ============================================================
// TAB 2: TODAS LAS PERSPECTIVAS
// ============================================================
function PerspectiveCard({ perspective, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(perspective)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
        padding: "0.9rem",
        borderRadius: "10px",
        border: "1px solid var(--vsa-table-border)",
        background: "var(--ifm-background-color)",
        boxShadow: "var(--vsa-card-shadow)",
        cursor: "pointer",
        textAlign: "left",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        width: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--vsa-card-shadow-hover)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--vsa-card-shadow)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "var(--ifm-heading-color)",
            }}
          >
            {perspective.name}
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--ifm-font-color-secondary)",
              marginTop: "0.1rem",
            }}
          >
            {perspective.tag}
          </div>
        </div>
        <ScoreBadge score={perspective.score} />
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.4rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <SpectrumBadge spectrum={perspective.spectrum} small />
        <TypeBadge type={perspective.type} />
      </div>
      <SectionTags sections={perspective.sections} small />
    </button>
  );
}

function TabPerspectivas({ onSelectPerspective }) {
  const [search, setSearch] = useState("");
  const [filterSpectrum, setFilterSpectrum] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterScore, setFilterScore] = useState("all");

  const filtered = useMemo(() => {
    return PERSPECTIVES.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q) ||
          (p.topValuation && p.topValuation.toLowerCase().includes(q)) ||
          (p.mainCritique && p.mainCritique.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filterSpectrum !== "all" && p.spectrum !== filterSpectrum)
        return false;
      if (filterType !== "all" && p.type !== filterType) return false;
      if (filterScore !== "all") {
        if (filterScore === "pending" && p.score !== null) return false;
        if (filterScore === "8+" && (p.score === null || p.score < 8))
          return false;
        if (
          filterScore === "7-8" &&
          (p.score === null || p.score < 7 || p.score >= 8)
        )
          return false;
        if (
          filterScore === "6-7" &&
          (p.score === null || p.score < 6 || p.score >= 7)
        )
          return false;
        if (filterScore === "<6" && (p.score === null || p.score >= 6))
          return false;
      }
      return true;
    }).sort((a, b) => {
      if (a.score === null && b.score === null) return 0;
      if (a.score === null) return 1;
      if (b.score === null) return -1;
      return b.score - a.score;
    });
  }, [search, filterSpectrum, filterType, filterScore]);

  const selectStyle = {
    padding: "0.4rem 0.6rem",
    borderRadius: "6px",
    border: "1px solid var(--vsa-table-border)",
    background: "var(--ifm-background-color)",
    color: "var(--ifm-font-color-base)",
    fontSize: "0.85rem",
    minWidth: 0,
  };

  return (
    <div>
      {/* Search */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Buscar por nombre, tag, critica..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "0.6rem 0.8rem",
            borderRadius: "8px",
            border: "1px solid var(--vsa-table-border)",
            background: "var(--ifm-background-color)",
            color: "var(--ifm-font-color-base)",
            fontSize: "0.9rem",
          }}
        />
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <select
          value={filterSpectrum}
          onChange={(e) => setFilterSpectrum(e.target.value)}
          style={selectStyle}
        >
          <option value="all">Todo espectro</option>
          {Object.entries(SPECTRUM_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={selectStyle}
        >
          <option value="all">Todo tipo</option>
          {Object.entries(TYPE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <select
          value={filterScore}
          onChange={(e) => setFilterScore(e.target.value)}
          style={selectStyle}
        >
          <option value="all">Todo score</option>
          <option value="8+">8+ (alto)</option>
          <option value="7-8">7-8 (bueno)</option>
          <option value="6-7">6-7 (medio)</option>
          <option value="<6">{"<6 (bajo)"}</option>
          <option value="pending">Pendiente</option>
        </select>
        <span
          style={{
            fontSize: "0.8rem",
            color: "var(--ifm-font-color-secondary)",
            alignSelf: "center",
          }}
        >
          {filtered.length} de {PERSPECTIVES.length}
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {filtered.map((p) => (
          <PerspectiveCard
            key={p.id}
            perspective={p}
            onClick={onSelectPerspective}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            color: "var(--ifm-font-color-secondary)",
            fontSize: "0.9rem",
          }}
        >
          No se encontraron perspectivas con esos filtros.
        </div>
      )}
    </div>
  );
}

// ============================================================
// TAB 3: POR SECCION
// ============================================================
function TabSecciones({ onSelectPerspective }) {
  const summaries = useMemo(() => getSectionSummaries(), []);
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--ifm-font-color-secondary)",
          marginBottom: "1rem",
        }}
      >
        Cada seccion del plan es evaluada por las perspectivas relevantes a su
        dominio. Click en una seccion para ver los evaluadores.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {summaries.map((s) => (
          <div
            key={s.section}
            style={{
              borderRadius: "8px",
              border: "1px solid var(--vsa-table-border)",
              background: "var(--ifm-background-color)",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() =>
                setExpanded(expanded === s.section ? null : s.section)
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "0.75rem 1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--ifm-font-color-base)",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  flex: 1,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  {s.label}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--ifm-font-color-secondary)",
                  }}
                >
                  {s.scoredCount} evaluadas / {s.totalCount} total
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                {s.avg !== null && <ScoreBadge score={s.avg} />}
                <span
                  style={{
                    fontSize: "1.1rem",
                    color: "var(--ifm-font-color-secondary)",
                    transition: "transform 0.2s",
                    transform:
                      expanded === s.section ? "rotate(90deg)" : "none",
                  }}
                >
                  ▶
                </span>
              </div>
            </button>

            {expanded === s.section && (
              <div
                style={{
                  padding: "0 1rem 0.75rem",
                  borderTop: "1px solid var(--vsa-table-border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                    marginTop: "0.75rem",
                  }}
                >
                  {s.perspectives
                    .sort((a, b) => {
                      if (a.score === null && b.score === null) return 0;
                      if (a.score === null) return 1;
                      if (b.score === null) return -1;
                      return b.score - a.score;
                    })
                    .map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => onSelectPerspective(p)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.4rem 0.6rem",
                          borderRadius: "6px",
                          border: "1px solid var(--vsa-table-border)",
                          background: "var(--ifm-background-surface-color)",
                          cursor: "pointer",
                          color: "var(--ifm-font-color-base)",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <span
                            style={{ fontWeight: 600, fontSize: "0.85rem" }}
                          >
                            {p.name}
                          </span>
                          <SpectrumBadge spectrum={p.spectrum} small />
                        </div>
                        <ScoreBadge score={p.score} />
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// TAB 4: MATRIZ (HEATMAP)
// ============================================================
function TabMatriz({ onSelectPerspective }) {
  // Get all sections that have at least one evaluator
  const allSections = useMemo(() => {
    const set = new Set();
    PERSPECTIVES.forEach((p) => {
      if (p.sections) p.sections.forEach((s) => set.add(s));
    });
    return Array.from(set).sort();
  }, []);

  // Only show scored perspectives in the matrix (non-null scores)
  const scoredPerspectives = useMemo(
    () => PERSPECTIVES.filter((p) => p.score !== null),
    [],
  );

  const cellSize = 36;

  return (
    <div>
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--ifm-font-color-secondary)",
          marginBottom: "0.5rem",
        }}
      >
        Mapa de calor: filas = perspectivas, columnas = secciones. Verde = 8+,
        azul = 7-8, amarillo = 6-7, rojo = {"<"}6, gris = no evalua.
      </p>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        {[
          { color: "#00897B", label: "8+" },
          { color: "#1565C0", label: "7-8" },
          { color: "#F9A825", label: "6-7" },
          { color: "#C62828", label: "<6" },
          { color: "#9E9E9E", label: "No evalua" },
        ].map((item) => (
          <span
            key={item.label}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.75rem",
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: item.color,
                display: "inline-block",
              }}
            />
            {item.label}
          </span>
        ))}
      </div>
      <div style={{ overflowX: "auto", paddingBottom: "1rem" }}>
        <table
          style={{
            borderCollapse: "separate",
            borderSpacing: "2px",
            fontSize: "0.7rem",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  position: "sticky",
                  left: 0,
                  background: "var(--ifm-background-color)",
                  zIndex: 2,
                  padding: "0.3rem 0.5rem",
                  textAlign: "left",
                  minWidth: 130,
                }}
              >
                Perspectiva
              </th>
              {allSections.map((sec) => (
                <th
                  key={sec}
                  style={{
                    padding: "0.3rem 0.2rem",
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: "0.6rem",
                    minWidth: cellSize,
                    maxWidth: cellSize + 10,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    writingMode: "vertical-lr",
                    height: 80,
                  }}
                >
                  {SECTION_LABELS[sec] || sec}
                </th>
              ))}
              <th
                style={{
                  padding: "0.3rem 0.5rem",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                }}
              >
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {scoredPerspectives
              .sort((a, b) => b.score - a.score)
              .map((p) => (
                <tr key={p.id}>
                  <td
                    style={{
                      position: "sticky",
                      left: 0,
                      background: "var(--ifm-background-color)",
                      zIndex: 1,
                      padding: "0.3rem 0.5rem",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => onSelectPerspective(p)}
                    title={p.tag}
                  >
                    {p.name}
                  </td>
                  {allSections.map((sec) => {
                    const evaluates = p.sections && p.sections.includes(sec);
                    return (
                      <td
                        key={sec}
                        style={{
                          width: cellSize,
                          height: cellSize,
                          textAlign: "center",
                          verticalAlign: "middle",
                          borderRadius: 4,
                          background: evaluates
                            ? heatColor(p.score)
                            : "#E0E0E020",
                          color: evaluates ? "#fff" : "transparent",
                          fontWeight: 700,
                          fontSize: "0.7rem",
                        }}
                      >
                        {evaluates ? p.score : ""}
                      </td>
                    );
                  })}
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      color: scoreColor(p.score),
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    {p.score}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--ifm-font-color-secondary)",
          marginTop: "0.5rem",
        }}
      >
        17 perfiles de referencia (pendientes de evaluacion) no se muestran en
        la matriz. Click en el nombre de una perspectiva para ver su detalle.
      </p>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function EvaluacionPage() {
  const [activeTab, setActiveTab] = useState("global");
  const [selectedPerspective, setSelectedPerspective] = useState(null);

  const handleSelectPerspective = useCallback((p) => {
    setSelectedPerspective(p);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPerspective(null);
  }, []);

  return (
    <Layout
      title={`Evaluacion del plan — ${TOTAL_PERSPECTIVES} perspectivas`}
      description="Score del plan Venezuela S.A. evaluado por 45 perspectivas ideologicas, tecnicas, estrategicas y perfiles de referencia."
    >
      <main style={{ maxWidth: 960, margin: "2rem auto", padding: "0 1rem" }}>
        <h1 style={{ marginBottom: "0.3rem" }}>
          Evaluacion: {TOTAL_PERSPECTIVES} perspectivas
        </h1>
        <p
          style={{
            color: "var(--ifm-font-color-secondary)",
            fontSize: "0.95rem",
            marginBottom: "1.5rem",
          }}
        >
          El plan se evalua continuamente desde {TOTAL_PERSPECTIVES}{" "}
          perspectivas que cubren todo el espectro ideologico: desde Milei
          (libertario) hasta Piketty (izquierda), pasando por inversores,
          ejecutores, estrategas y perfiles de referencia reales del mundo
          financiero y geopolitico. El score no puede bajar de 7.4 — toda mejora
          se re-evalua.
        </p>

        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            gap: "0",
            borderBottom: "2px solid var(--vsa-table-border)",
            marginBottom: "1.5rem",
            overflowX: "auto",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "0.6rem 1rem",
                background: "none",
                border: "none",
                borderBottom:
                  activeTab === tab.id
                    ? "2px solid var(--ifm-color-primary)"
                    : "2px solid transparent",
                marginBottom: "-2px",
                color:
                  activeTab === tab.id
                    ? "var(--ifm-color-primary)"
                    : "var(--ifm-font-color-secondary)",
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: "0.9rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "color 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "global" && <TabGlobal />}
        {activeTab === "perspectivas" && (
          <TabPerspectivas onSelectPerspective={handleSelectPerspective} />
        )}
        {activeTab === "secciones" && (
          <TabSecciones onSelectPerspective={handleSelectPerspective} />
        )}
        {activeTab === "matriz" && (
          <TabMatriz onSelectPerspective={handleSelectPerspective} />
        )}

        {/* Modal */}
        {selectedPerspective && (
          <Modal perspective={selectedPerspective} onClose={handleCloseModal} />
        )}
      </main>
    </Layout>
  );
}
