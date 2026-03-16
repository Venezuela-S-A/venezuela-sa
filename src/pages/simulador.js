import React, { useState, useMemo, useCallback } from "react";
import Layout from "@theme/Layout";

// ============================================================
// COLORS (from custom.css palette)
// ============================================================
const C = {
  blue: "#1565C0", // Más claro que #0D47A1 para mejor legibilidad
  blueDark: "#0D47A1",
  blueLight: "#42A5F5",
  gold: "#F9A825",
  goldLight: "#FBC02D",
  goldDark: "#C17900", // Para texto sobre fondo claro (contraste WCAG AA)
  green: "#00897B",
  greenLight: "#4DB6AC",
  greenDark: "#00695C", // Para texto sobre fondo claro
  red: "#C62828",
  redLight: "#EF5350",
  text: "#212121", // Más oscuro para mejor legibilidad
  textLight: "#616161", // Más oscuro que #5D6D7E
  bg: "#FFFFFF",
  bgSurface: "#F5F5F5",
  border: "#E0E0E0",
  darkBg: "#1B2631",
  darkSurface: "#243447",
};

// ============================================================
// UTILITY: format numbers
// ============================================================
function fmt(n, decimals = 0) {
  if (n >= 1e12) return (n / 1e12).toFixed(1) + "T";
  if (n >= 1e9) return (n / 1e9).toFixed(decimals) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(decimals) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(decimals) + "K";
  return n.toFixed(decimals);
}

function fmtUSD(n, decimals = 0) {
  return "USD " + fmt(n, decimals);
}

function fmtNum(n) {
  return n.toLocaleString("es-VE", { maximumFractionDigits: 0 });
}

// ============================================================
// SHARED COMPONENTS
// ============================================================

function SliderInput({
  label,
  min,
  max,
  step,
  value,
  onChange,
  suffix = "",
  prefix = "",
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
          fontSize: 14,
        }}
      >
        <span style={{ fontWeight: 600, color: C.text }}>{label}</span>
        <span style={{ fontWeight: 700, color: C.blue }}>
          {prefix}
          {typeof value === "number" ? value.toLocaleString("es-VE") : value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: C.blue }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: C.textLight,
        }}
      >
        <span>
          {prefix}
          {min}
          {suffix}
        </span>
        <span>
          {prefix}
          {max}
          {suffix}
        </span>
      </div>
    </div>
  );
}

function BigNumber({ label, value, sub, color = C.blue }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px 16px",
        background: C.bgSurface,
        borderRadius: 8,
        border: `1px solid ${C.border}`,
        minWidth: 140,
        flex: 1,
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: C.textLight,
          marginBottom: 4,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1.2 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: C.textLight, marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function BarChart({
  data,
  maxValue,
  color = C.blue,
  height = 24,
  showValues = true,
}) {
  const max = maxValue || Math.max(...data.map((d) => d.value), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {data.map((d, i) => (
        <div key={i}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              marginBottom: 2,
              color: C.text,
            }}
          >
            <span style={{ fontWeight: 600 }}>{d.label}</span>
            {showValues && (
              <span style={{ fontWeight: 700 }}>
                {d.display || fmtUSD(d.value)}
              </span>
            )}
          </div>
          <div
            style={{
              background: C.border,
              borderRadius: 4,
              height,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${Math.max((d.value / max) * 100, 1)}%`,
                height: "100%",
                background: d.color || color,
                borderRadius: 4,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SimpleTable({ headers, rows, compact = false }) {
  const cellPad = compact ? "6px 10px" : "10px 14px";
  return (
    <div
      style={{
        overflowX: "auto",
        borderRadius: 8,
        border: `1px solid ${C.border}`,
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: compact ? 13 : 14,
        }}
      >
        <thead>
          <tr style={{ background: C.blue }}>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  padding: cellPad,
                  color: "#fff",
                  fontWeight: 600,
                  textAlign: i === 0 ? "left" : "right",
                  fontSize: compact ? 11 : 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  borderBottom: `2px solid ${C.gold}`,
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{ background: ri % 2 === 0 ? "#fff" : C.bgSurface }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: cellPad,
                    textAlign: ci === 0 ? "left" : "right",
                    borderBottom: `1px solid ${C.border}`,
                    fontWeight: ci === 0 ? 600 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: 20,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(27,38,49,0.08)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3
      style={{
        fontSize: 18,
        fontWeight: 700,
        color: C.blue,
        marginTop: 24,
        marginBottom: 12,
        borderBottom: `2px solid ${C.gold}`,
        paddingBottom: 6,
      }}
    >
      {children}
    </h3>
  );
}

// ============================================================
// TAB 1: MODELO FINANCIERO
// ============================================================

function TabFinanciero() {
  const [precio, setPrecio] = useState(60);
  const [prodFinal, setProdFinal] = useState(3.0);
  const [retornoFondo, setRetornoFondo] = useState(5.5);
  const [transicion, setTransicion] = useState(2); // 1=rapida, 2=media, 3=lenta
  const [tasaImp, setTasaImp] = useState(18);

  const transLabels = { 1: "Rapida", 2: "Media", 3: "Lenta" };
  const pctAlFondoByYear = useCallback(
    (year) => {
      if (transicion === 1) return Math.min(90, 50 + year * 4);
      if (transicion === 2) return Math.min(80, 30 + year * 3.5);
      return Math.min(70, 15 + year * 3);
    },
    [transicion],
  );

  const data = useMemo(() => {
    const years = [1, 3, 5, 7, 10, 15];
    const costPerBarrel = 37.5;
    let fundAccum = 0;

    return years.map((yr) => {
      const prod = 0.9 + (prodFinal - 0.9) * (yr / 15); // linear ramp
      const oilRevGross = prod * 1e6 * 365 * precio;
      const oilRevNet = prod * 1e6 * 365 * Math.max(0, precio - costPerBarrel);
      const gdpEstimate = 83e9 + (yr / 15) * (precio > 70 ? 470e9 : 270e9);
      const taxRev = gdpEstimate * (tasaImp / 100);
      const pctFondo = pctAlFondoByYear(yr) / 100;
      const fundContrib = oilRevNet * pctFondo;

      // compound from previous accumulation
      const yearsGap = yr === 1 ? 1 : yr - years[years.indexOf(yr) - 1];
      fundAccum =
        fundAccum * Math.pow(1 + retornoFondo / 100, yearsGap) +
        fundContrib * yearsGap;

      return {
        year: yr,
        prod: prod.toFixed(2),
        oilRev: oilRevNet,
        taxRev,
        fundContrib,
        fundAccum,
        gdp: gdpEstimate,
      };
    });
  }, [precio, prodFinal, retornoFondo, transicion, tasaImp, pctAlFondoByYear]);

  const finalFund = data[data.length - 1]?.fundAccum || 0;

  return (
    <div>
      <p style={{ color: C.textLight, fontSize: 14, marginBottom: 20 }}>
        Modela el flujo de caja de Venezuela S.A. a 15 anos. Ajusta los
        supuestos y observa como cambian los resultados. Base: USD 60/barril, 3M
        bpd en 15 anos (Rystad Energy).
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 1fr) 2fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        <Card>
          <h4 style={{ margin: "0 0 16px", color: C.blue, fontWeight: 700 }}>
            Supuestos
          </h4>
          <SliderInput
            label="Precio petroleo"
            min={40}
            max={120}
            step={5}
            value={precio}
            onChange={setPrecio}
            prefix="USD "
            suffix="/bbl"
          />
          <SliderInput
            label="Produccion ano 15"
            min={1.5}
            max={3.5}
            step={0.1}
            value={prodFinal}
            onChange={setProdFinal}
            suffix="M bpd"
          />
          <SliderInput
            label="Retorno del fondo"
            min={3}
            max={8}
            step={0.5}
            value={retornoFondo}
            onChange={setRetornoFondo}
            suffix="%"
          />
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4,
                fontSize: 14,
              }}
            >
              <span style={{ fontWeight: 600, color: C.text }}>
                Transicion al fondo
              </span>
              <span style={{ fontWeight: 700, color: C.blue }}>
                {transLabels[transicion]}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={1}
              value={transicion}
              onChange={(e) => setTransicion(Number(e.target.value))}
              style={{ width: "100%", accentColor: C.blue }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: C.textLight,
              }}
            >
              <span>Rapida</span>
              <span>Media</span>
              <span>Lenta</span>
            </div>
          </div>
          <SliderInput
            label="Tasa impositiva efectiva"
            min={10}
            max={25}
            step={1}
            value={tasaImp}
            onChange={setTasaImp}
            suffix="%"
          />
        </Card>

        <div>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            <BigNumber
              label="Fondo Ano 15"
              value={fmtUSD(finalFund)}
              color={C.green}
            />
            <BigNumber
              label="PIB Ano 15"
              value={fmtUSD(data[data.length - 1]?.gdp || 0)}
              color={C.blue}
            />
            <BigNumber
              label="Ingreso petrolero Ano 15"
              value={fmtUSD(data[data.length - 1]?.oilRev || 0)}
              color={C.gold}
            />
          </div>

          <SimpleTable
            headers={[
              "Ano",
              "Produccion",
              "Ingreso petrolero",
              "Ingreso fiscal",
              "Al fondo",
              "Fondo acum.",
              "PIB est.",
            ]}
            rows={data.map((d) => [
              `Ano ${d.year}`,
              `${d.prod}M bpd`,
              fmtUSD(d.oilRev),
              fmtUSD(d.taxRev),
              fmtUSD(d.fundContrib),
              fmtUSD(d.fundAccum),
              fmtUSD(d.gdp),
            ])}
          />

          <SectionTitle>Crecimiento del Fondo</SectionTitle>
          <BarChart
            data={data.map((d) => ({
              label: `Ano ${d.year}`,
              value: d.fundAccum,
              color: d.year <= 5 ? C.red : d.year <= 10 ? C.blue : C.green,
            }))}
            color={C.green}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TAB 2: MONTE CARLO
// ============================================================

const CONDITIONS = [
  { name: "Transicion politica pacifica", prob: 0.7 },
  { name: "Brent >= USD 70-80/bbl", prob: 0.75 },
  { name: "Ramp-up a 3M bpd (Rystad)", prob: 0.55 },
  { name: "Seguridad juridica (rule of law)", prob: 0.5 },
  { name: "Formalizacion minera", prob: 0.25 },
  { name: "Guri rehabilitado", prob: 0.5 },
  { name: "Acuerdos de gas (Dragon+LNG)", prob: 0.65 },
  { name: "Demanda global data centers", prob: 0.75 },
  { name: "Reforma fiscal (15% flat + 12% IVA)", prob: 0.35 },
  { name: "Estado reducido a 5 funciones", prob: 0.3 },
];

const SCENARIOS = [
  {
    name: "Minimo viable",
    minC: 0,
    maxC: 2,
    gdpLow: 100,
    gdpHigh: 150,
    color: C.red,
  },
  {
    name: "Dificil",
    minC: 3,
    maxC: 4,
    gdpLow: 150,
    gdpHigh: 200,
    color: "#E57373",
  },
  {
    name: "Plan Base",
    minC: 5,
    maxC: 6,
    gdpLow: 250,
    gdpHigh: 350,
    color: C.blue,
  },
  {
    name: "Muy favorable",
    minC: 7,
    maxC: 8,
    gdpLow: 350,
    gdpHigh: 450,
    color: C.green,
  },
  {
    name: "El Sueno",
    minC: 9,
    maxC: 10,
    gdpLow: 450,
    gdpHigh: 550,
    color: C.gold,
  },
];

function getScenario(condsMet) {
  for (const s of SCENARIOS) {
    if (condsMet >= s.minC && condsMet <= s.maxC) return s;
  }
  return SCENARIOS[0];
}

function TabMonteCarlo() {
  const [numSims, setNumSims] = useState(5000);
  const [results, setResults] = useState(null);
  const [running, setRunning] = useState(false);

  const runSimulation = useCallback(() => {
    setRunning(true);
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      const scenarioCounts = {};
      SCENARIOS.forEach((s) => {
        scenarioCounts[s.name] = 0;
      });
      let totalGDP = 0;
      const conditionMetCount = new Array(10).fill(0);
      const gdpBuckets = {};

      for (let i = 0; i < numSims; i++) {
        let met = 0;
        CONDITIONS.forEach((c, idx) => {
          if (Math.random() < c.prob) {
            met++;
            conditionMetCount[idx]++;
          }
        });
        const scenario = getScenario(met);
        scenarioCounts[scenario.name]++;
        const gdp =
          scenario.gdpLow +
          Math.random() * (scenario.gdpHigh - scenario.gdpLow);
        totalGDP += gdp;

        const bucket = Math.floor(gdp / 50) * 50;
        gdpBuckets[bucket] = (gdpBuckets[bucket] || 0) + 1;
      }

      setResults({
        scenarioCounts,
        expectedGDP: totalGDP / numSims,
        conditionMetCount,
        gdpBuckets,
        numSims,
      });
      setRunning(false);
    }, 50);
  }, [numSims]);

  return (
    <div>
      <p style={{ color: C.textLight, fontSize: 14, marginBottom: 20 }}>
        Simulacion probabilistica: 10 condiciones de "El Sueno", cada una con su
        probabilidad real. Corre miles de simulaciones para ver la distribucion
        de resultados.
      </p>

      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          {[1000, 5000, 10000].map((n) => (
            <button
              key={n}
              onClick={() => setNumSims(n)}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: `2px solid ${numSims === n ? C.blue : C.border}`,
                background: numSims === n ? C.blue : "#fff",
                color: numSims === n ? "#fff" : C.text,
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 14,
                transition: "all 0.2s",
              }}
            >
              {fmtNum(n)}
            </button>
          ))}
        </div>
        <button
          onClick={runSimulation}
          disabled={running}
          style={{
            padding: "10px 28px",
            borderRadius: 8,
            border: "none",
            background: running ? C.textLight : C.blue,
            color: "#fff",
            fontWeight: 700,
            cursor: running ? "default" : "pointer",
            fontSize: 16,
            boxShadow: "0 4px 12px rgba(13,71,161,0.25)",
            transition: "all 0.2s",
          }}
        >
          {running ? "Simulando..." : "Simular"}
        </button>
      </div>

      {/* Conditions table */}
      <Card style={{ marginBottom: 24 }}>
        <h4 style={{ margin: "0 0 12px", color: C.blue, fontWeight: 700 }}>
          10 Condiciones del Sueno
        </h4>
        <SimpleTable
          compact
          headers={[
            "#",
            "Condicion",
            "Probabilidad",
            results ? "Se cumplio" : "",
          ]}
          rows={CONDITIONS.map((c, i) => [
            `${i + 1}`,
            c.name,
            `${(c.prob * 100).toFixed(0)}%`,
            results
              ? `${((results.conditionMetCount[i] / results.numSims) * 100).toFixed(1)}%`
              : "",
          ])}
        />
      </Card>

      {results && (
        <div>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <BigNumber
              label="PIB esperado (Ano 15)"
              value={`USD ${results.expectedGDP.toFixed(0)}B`}
              color={C.blue}
            />
            <BigNumber
              label="Prob. Plan Base o mejor"
              value={`${(((results.scenarioCounts["Plan Base"] + results.scenarioCounts["Muy favorable"] + results.scenarioCounts["El Sueno"]) / results.numSims) * 100).toFixed(1)}%`}
              color={C.green}
            />
            <BigNumber
              label="Prob. El Sueno"
              value={`${((results.scenarioCounts["El Sueno"] / results.numSims) * 100).toFixed(1)}%`}
              color={C.gold}
            />
          </div>

          <SectionTitle>Distribucion por Escenario</SectionTitle>
          <BarChart
            data={SCENARIOS.map((s) => ({
              label: s.name,
              value: results.scenarioCounts[s.name],
              display: `${((results.scenarioCounts[s.name] / results.numSims) * 100).toFixed(1)}% (${fmtNum(results.scenarioCounts[s.name])})`,
              color: s.color,
            }))}
            maxValue={results.numSims}
          />

          <SectionTitle>Histograma PIB (USD miles de M)</SectionTitle>
          {(() => {
            const buckets = Object.entries(results.gdpBuckets).sort(
              (a, b) => Number(a[0]) - Number(b[0]),
            );
            const maxBucket = Math.max(...buckets.map((b) => b[1]));
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 2,
                  height: 160,
                  padding: "0 0 24px",
                }}
              >
                {buckets.map(([bucket, count]) => {
                  const scenario = getScenario(0); // just for color
                  let barColor = C.red;
                  const b = Number(bucket);
                  if (b >= 450) barColor = C.gold;
                  else if (b >= 350) barColor = C.green;
                  else if (b >= 250) barColor = C.blue;
                  else if (b >= 150) barColor = "#E57373";

                  return (
                    <div
                      key={bucket}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: `${(count / maxBucket) * 140}px`,
                          background: barColor,
                          borderRadius: "3px 3px 0 0",
                          minHeight: 2,
                          transition: "height 0.3s",
                        }}
                      />
                      <div
                        style={{
                          fontSize: 9,
                          color: C.textLight,
                          marginTop: 4,
                          transform: "rotate(-45deg)",
                          transformOrigin: "top left",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {bucket}B
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

// ============================================================
// TAB 3: SIMULADOR CIUDADANO (FCV)
// ============================================================

function TabCiudadano() {
  const [edad, setEdad] = useState(25);
  const [salario, setSalario] = useState(500);
  const [crecSalarial, setCrecSalarial] = useState(3);

  const fcvData = useMemo(() => {
    // Subcuentas: Retiro 8%, Salud 7%, Vivienda 4%, Educacion 2%, Cesantia 2% = 23%
    const rates = {
      retiro: 0.08,
      salud: 0.07,
      vivienda: 0.04,
      educacion: 0.02,
      cesantia: 0.02,
    };
    const totalRate = 0.23;
    const vsaContrib = 150; // USD/month for child (up to 18), as placeholder VSA contributes from fund
    const retirementAge = 65;
    const yearsToRetire = Math.max(0, retirementAge - edad);
    const annualReturn = 0.055;

    let accum = {
      retiro: 0,
      salud: 0,
      vivienda: 0,
      educacion: 0,
      cesantia: 0,
      total: 0,
    };
    const milestones = [];
    const milestoneAges = [30, 40, 50, 60, 65];

    for (let y = 0; y < yearsToRetire; y++) {
      const currentAge = edad + y;
      const currentSalary = salario * Math.pow(1 + crecSalarial / 100, y) * 12; // annual

      // Apply returns to existing balances
      Object.keys(rates).forEach((k) => {
        accum[k] *= 1 + annualReturn;
        accum[k] += currentSalary * rates[k];
      });
      accum.total = Object.keys(rates).reduce((sum, k) => sum + accum[k], 0);

      if (milestoneAges.includes(currentAge + 1)) {
        milestones.push({
          age: currentAge + 1,
          ...accum,
          total: Object.keys(rates).reduce((sum, k) => sum + accum[k], 0),
        });
      }
    }

    const totalAccum = accum.total;
    const monthlyPension = (accum.retiro * annualReturn) / 12; // sustainable withdrawal

    // Minimum wage comparison: USD 200/month
    let minWageAccum = 0;
    for (let y = 0; y < yearsToRetire; y++) {
      minWageAccum *= 1 + annualReturn;
      minWageAccum += 200 * 12 * totalRate;
    }

    return {
      accum,
      totalAccum,
      monthlyPension,
      milestones,
      yearsToRetire,
      minWageAccum,
    };
  }, [edad, salario, crecSalarial]);

  return (
    <div>
      <p style={{ color: C.textLight, fontSize: 14, marginBottom: 20 }}>
        Calcula tu Fondo Ciudadano Venezuela (FCV) personal. Modelo tipo
        Singapur CPF: 5 subcuentas (Retiro 8% + Salud 7% + Vivienda 4% +
        Educacion 2% + Cesantia 2% = 23% del salario). Retorno anual compuesto:
        5,5%.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 1fr) 2fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        <Card>
          <h4 style={{ margin: "0 0 16px", color: C.blue, fontWeight: 700 }}>
            Tu Perfil
          </h4>
          <SliderInput
            label="Edad actual"
            min={18}
            max={60}
            step={1}
            value={edad}
            onChange={setEdad}
            suffix=" anos"
          />
          <SliderInput
            label="Salario mensual"
            min={200}
            max={5000}
            step={50}
            value={salario}
            onChange={setSalario}
            prefix="USD "
          />
          <SliderInput
            label="Crecimiento salarial anual"
            min={0}
            max={10}
            step={0.5}
            value={crecSalarial}
            onChange={setCrecSalarial}
            suffix="%"
          />

          <div
            style={{
              background: C.bgSurface,
              borderRadius: 8,
              padding: 12,
              marginTop: 16,
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: C.textLight,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              SUBCUENTAS FCV
            </div>
            {[
              { name: "Retiro", pct: "8%", color: C.blue },
              { name: "Salud", pct: "7%", color: C.green },
              { name: "Vivienda", pct: "4%", color: C.gold },
              { name: "Educacion", pct: "2%", color: "#7B1FA2" },
              { name: "Cesantia", pct: "2%", color: C.red },
            ].map((s) => (
              <div
                key={s.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  padding: "3px 0",
                }}
              >
                <span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: s.color,
                      marginRight: 6,
                      verticalAlign: "middle",
                    }}
                  />
                  {s.name}
                </span>
                <span style={{ fontWeight: 700, color: s.color }}>{s.pct}</span>
              </div>
            ))}
            <div
              style={{
                borderTop: `1px solid ${C.border}`,
                marginTop: 6,
                paddingTop: 6,
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <span>Total contribucion</span>
              <span>23%</span>
            </div>
          </div>
        </Card>

        <div>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            <BigNumber
              label="FCV total a los 65"
              value={fmtUSD(fcvData.totalAccum)}
              color={C.green}
              sub={`${fcvData.yearsToRetire} anos contribuyendo`}
            />
            <BigNumber
              label="Pension mensual estimada"
              value={fmtUSD(fcvData.monthlyPension) + "/mes"}
              color={C.blue}
              sub="Retiro sostenible (5,5% anual)"
            />
          </div>

          <Card
            style={{
              marginBottom: 20,
              background: `linear-gradient(135deg, ${C.bgSurface}, #fff)`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <div
                  style={{ fontSize: 12, color: C.textLight, fontWeight: 600 }}
                >
                  CON SALARIO MINIMO (USD 200/mes)
                </div>
                <div
                  style={{ fontSize: 22, fontWeight: 800, color: C.textLight }}
                >
                  {fmtUSD(fcvData.minWageAccum)}
                </div>
              </div>
              <div style={{ fontSize: 24, color: C.textLight }}>vs</div>
              <div>
                <div style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>
                  CON TU SALARIO (USD {fmtNum(salario)}/mes)
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: C.green }}>
                  {fmtUSD(fcvData.totalAccum)}
                </div>
              </div>
            </div>
          </Card>

          <SectionTitle>Desglose por Subcuenta</SectionTitle>
          <BarChart
            data={[
              {
                label: "Retiro (8%)",
                value: fcvData.accum.retiro,
                color: C.blue,
              },
              {
                label: "Salud (7%)",
                value: fcvData.accum.salud,
                color: C.green,
              },
              {
                label: "Vivienda (4%)",
                value: fcvData.accum.vivienda,
                color: C.gold,
              },
              {
                label: "Educacion (2%)",
                value: fcvData.accum.educacion,
                color: "#7B1FA2",
              },
              {
                label: "Cesantia (2%)",
                value: fcvData.accum.cesantia,
                color: C.red,
              },
            ]}
          />

          {fcvData.milestones.length > 0 && (
            <>
              <SectionTitle>Crecimiento por Edad</SectionTitle>
              <BarChart
                data={fcvData.milestones.map((m) => ({
                  label: `${m.age} anos`,
                  value: m.total,
                  color: m.age <= 40 ? C.blue : m.age <= 55 ? C.green : C.gold,
                }))}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TAB 4: NEGOCIACION (WAR GAME)
// ============================================================

const WAR_GAMES = {
  china: {
    title: "China: Acceso al Arco Minero",
    description:
      "China demanda acceso privilegiado al Arco Minero del Orinoco (coltan, tierras raras, oro) a cambio de reestructurar USD 50B en deuda. Representas a Venezuela S.A.",
    steps: [
      {
        id: "start",
        text: "China propone: acceso exclusivo a 3 zonas del Arco Minero por 30 anos a cambio de condonar USD 20B de deuda.",
        options: [
          {
            text: "Aceptar exclusividad",
            give: "Acceso exclusivo 30 anos a 3 zonas mineras",
            get: "Condonacion USD 20B deuda",
            risk: "Alto",
            riskColor: C.red,
            next: "china_accept",
            score: -2,
          },
          {
            text: "Contraproponer: JV con equity para Venezuela S.A.",
            give: "49% equity en JVs, acceso no-exclusivo a 2 zonas",
            get: "Reestructuracion USD 15B + transferencia tecnologica",
            risk: "Medio",
            riskColor: C.gold,
            next: "china_counter",
            score: 3,
          },
          {
            text: "Rechazar y ofrecer gas en su lugar",
            give: "Contratos de suministro GNL 15 anos",
            get: "Reestructuracion USD 10B",
            risk: "Bajo",
            riskColor: C.green,
            next: "china_gas",
            score: 1,
          },
        ],
      },
      {
        id: "china_accept",
        text: "China acepta rapidamente (mala senal). EE.UU. reacciona negativamente, condiciona rollback de sanciones. Los bonistas occidentales se alarman.",
        options: [
          {
            text: "Renegociar para incluir a EE.UU.",
            give: "Reducir exclusividad china a 1 zona",
            get: "EE.UU. no bloquea sanciones",
            risk: "Alto",
            riskColor: C.red,
            next: "end_mediocre",
            score: -1,
          },
          {
            text: "Mantener acuerdo con China",
            give: "Relacion con EE.UU. danada",
            get: "USD 20B condonados, pero sanciones persisten",
            risk: "Muy alto",
            riskColor: C.red,
            next: "end_malo",
            score: -4,
          },
        ],
      },
      {
        id: "china_counter",
        text: "China contraoferta: JV 51/49 (China mayoritario) con transferencia tecnologica parcial y USD 12B reestructurados.",
        options: [
          {
            text: "Aceptar 51/49 con clausula de reversion a 10 anos",
            give: "51% control chino por 10 anos, luego 50/50",
            get: "USD 12B reestructurados + tech transfer + empleos",
            risk: "Medio",
            riskColor: C.gold,
            next: "end_bueno",
            score: 4,
          },
          {
            text: "Insistir en 50/50 desde el inicio",
            give: "Posible quiebre de negociacion",
            get: "Control igualitario si aceptan",
            risk: "Medio-Alto",
            riskColor: C.gold,
            next: "end_bueno_plus",
            score: 3,
          },
        ],
      },
      {
        id: "china_gas",
        text: "China muestra interes moderado en gas pero insiste en acceso minero. Ofrece USD 8B en reestructuracion por gas + 1 zona minera no-exclusiva.",
        options: [
          {
            text: "Aceptar gas + 1 zona no-exclusiva",
            give: "GNL 15 anos + 1 zona minera compartida",
            get: "USD 8B reestructurados + relacion balanceada",
            risk: "Bajo",
            riskColor: C.green,
            next: "end_ok",
            score: 2,
          },
          {
            text: "Rechazar: solo gas",
            give: "Solo gas, sin acceso minero",
            get: "USD 5B reestructurados",
            risk: "Bajo",
            riskColor: C.green,
            next: "end_conservador",
            score: 1,
          },
        ],
      },
    ],
    endings: {
      end_malo: {
        title: "Resultado: Desfavorable",
        score: -4,
        color: C.red,
        text: "Cediste demasiado a China. EE.UU. mantiene sanciones, inversionistas occidentales huyen, y China controla activos estrategicos. Leccion: la exclusividad a 30 anos a una potencia sin contrapeso es una trampa.",
      },
      end_mediocre: {
        title: "Resultado: Rescate parcial",
        score: -1,
        color: "#E57373",
        text: "Lograste salvar la relacion con EE.UU. pero China queda insatisfecha y la renegociacion costo credibilidad. USD 10B netos reestructurados, pero futuras negociaciones seran mas dificiles.",
      },
      end_ok: {
        title: "Resultado: Aceptable",
        score: 2,
        color: C.blue,
        text: "Gas + 1 zona minera compartida es un acuerdo balanceado. USD 8B reestructurados sin comprometer la relacion con EE.UU. Leccion: diversificar lo que ofreces da mas flexibilidad.",
      },
      end_conservador: {
        title: "Resultado: Conservador",
        score: 1,
        color: C.textLight,
        text: "Solo gas por USD 5B reestructurados. Seguro pero no maximizas valor. El Arco Minero queda sin desarrollar con capital chino. Puedes buscar otros socios despues.",
      },
      end_bueno: {
        title: "Resultado: Favorable",
        score: 4,
        color: C.green,
        text: "JV 51/49 con reversion + tech transfer + USD 12B reestructurados. China obtiene acceso pero con limites, Venezuela S.A. obtiene capital + tecnologia + empleo. La clausula de reversion protege soberania a largo plazo.",
      },
      end_bueno_plus: {
        title: "Resultado: Muy Favorable (si no quiebra)",
        score: 3,
        color: C.green,
        text: "Si China acepta 50/50, es el mejor acuerdo posible. Pero hay ~40% probabilidad de que se retiren. Alto riesgo, alta recompensa. Si aceptan: USD 12B + tech + igualdad. Si no: vuelves a empezar.",
      },
    },
  },
  bonistas: {
    title: "Bonistas ICSID: Reestructuracion de Deuda",
    description:
      "Los bonistas internacionales (USD 60B en bonos defaulteados + intereses) demandan pago via ICSID. Venezuela S.A. negocia un acuerdo.",
    steps: [
      {
        id: "start",
        text: "Los bonistas ofrecen: pagar 100% del principal + 50% de intereses moratorios = USD 85B total. Amenazan con embargar activos petroleros.",
        options: [
          {
            text: "Ofrecer 30 centavos por dolar + bonos petroleros",
            give: "USD 18B cash + bonos indexados a produccion petrolera",
            get: "Cierre del litigio, liberacion de activos",
            risk: "Medio",
            riskColor: C.gold,
            next: "bonistas_30",
            score: 3,
          },
          {
            text: "Proponer swap deuda-por-equity en Venezuela S.A.",
            give: "Participacion minoritaria en infraestructura via bonos convertibles",
            get: "Reduccion de deuda a USD 25B + bonistas como socios alineados",
            risk: "Medio-Alto",
            riskColor: C.gold,
            next: "bonistas_swap",
            score: 2,
          },
          {
            text: "Pedir mediacion FMI con haircut del 65%",
            give: "USD 21B (35% del total)",
            get: "Legitimidad internacional + acceso a credito",
            risk: "Medio",
            riskColor: C.gold,
            next: "bonistas_fmi",
            score: 4,
          },
        ],
      },
      {
        id: "bonistas_30",
        text: "Los bonistas rechazan 30 centavos pero muestran interes en bonos petroleros. Contraofrecen 45 centavos + bonos con floor de produccion.",
        options: [
          {
            text: "Aceptar 45 centavos + bonos petroleros",
            give: "USD 27B + bonos indexados 5 anos",
            get: "Cierre definitivo, acceso a mercados",
            risk: "Medio",
            riskColor: C.gold,
            next: "end_bonistas_ok",
            score: 3,
          },
          {
            text: "Insistir en 35 centavos con bonos mejores",
            give: "USD 21B + bonos premium 10 anos",
            get: "Menor carga inicial, pero mayor compromiso futuro",
            risk: "Medio",
            riskColor: C.gold,
            next: "end_bonistas_bueno",
            score: 4,
          },
        ],
      },
      {
        id: "bonistas_swap",
        text: "Idea innovadora pero bonistas son conservadores. Aceptan parcialmente: swap del 30% de deuda + 70% en efectivo a 40 centavos.",
        options: [
          {
            text: "Aceptar hibrido swap + cash",
            give: "USD 24B cash + participacion en 3 proyectos infraestructura",
            get: "Bonistas alineados como socios, deuda manageable",
            risk: "Medio",
            riskColor: C.gold,
            next: "end_bonistas_bueno",
            score: 3,
          },
        ],
      },
      {
        id: "bonistas_fmi",
        text: "FMI acepta mediar. Propone haircut 55% (no 65%) con programa de reformas estructurales como condicion.",
        options: [
          {
            text: "Aceptar 55% haircut + reformas FMI",
            give: "USD 28B + compromisos de reforma fiscal",
            get: "Legitimidad total, acceso a credito a tasas bajas, rollback sanciones",
            risk: "Bajo",
            riskColor: C.green,
            next: "end_bonistas_excelente",
            score: 5,
          },
          {
            text: "Rechazar condiciones del FMI, negociar directo",
            give: "Perder mediador neutral",
            get: "Autonomia en reformas",
            risk: "Alto",
            riskColor: C.red,
            next: "end_bonistas_ok",
            score: 1,
          },
        ],
      },
    ],
    endings: {
      end_bonistas_ok: {
        title: "Resultado: Aceptable",
        score: 3,
        color: C.blue,
        text: "Deuda resuelta a ~40-45 centavos por dolar. Es el rango historico para reestructuraciones de petroestados. No es brillante, pero cierra el capitulo.",
      },
      end_bonistas_bueno: {
        title: "Resultado: Favorable",
        score: 4,
        color: C.green,
        text: "Deuda resuelta a ~35 centavos + instrumentos que alinean bonistas con el exito del plan. Carga fiscal manejable y bonistas motivados a que Venezuela crezca.",
      },
      end_bonistas_excelente: {
        title: "Resultado: Excelente",
        score: 5,
        color: C.gold,
        text: "Mediacion FMI + haircut 55% + reformas = la mejor combinacion posible. USD 28B en deuda vs USD 85B original. Acceso a credito barato. Credibilidad maxima ante inversionistas.",
      },
    },
  },
  fmi: {
    title: "FMI: Programa de Estabilizacion",
    description:
      "Venezuela solicita un programa Stand-By del FMI (SBA) para estabilizar la economia. El FMI pone condiciones.",
    steps: [
      {
        id: "start",
        text: "FMI ofrece: SBA de USD 15B a 3 anos, condicionado a reformas fiscales, monetarias y estructurales.",
        options: [
          {
            text: "Aceptar con todas las condiciones",
            give: "Reforma fiscal inmediata + eliminacion subsidios + independencia BCV",
            get: "USD 15B + credibilidad + acceso a mercados",
            risk: "Medio",
            riskColor: C.gold,
            next: "fmi_full",
            score: 3,
          },
          {
            text: "Negociar condiciones mas graduales",
            give: "Reforma en 5 anos (no 3) + subsidios focalizados (no eliminados)",
            get: "USD 10B + flexibilidad politica",
            risk: "Medio",
            riskColor: C.gold,
            next: "fmi_gradual",
            score: 4,
          },
          {
            text: "Rechazar: financiarse solo con petroleo",
            give: "No hay reformas impuestas",
            get: "Autonomia total, pero sin red de seguridad",
            risk: "Alto",
            riskColor: C.red,
            next: "fmi_reject",
            score: -1,
          },
        ],
      },
      {
        id: "fmi_full",
        text: "FMI aprueba el programa. Shock inicial: inflacion sube 3 meses, protestas por subsidios eliminados. Pero inversores celebran.",
        options: [
          {
            text: "Mantener curso + compensar vulnerables con FCV",
            give: "Dolor politico a corto plazo",
            get: "Estabilidad en 12-18 meses, rating mejora",
            risk: "Medio",
            riskColor: C.gold,
            next: "end_fmi_bueno",
            score: 4,
          },
          {
            text: "Revertir parcialmente ante protestas",
            give: "Credibilidad ante FMI danada",
            get: "Calma social temporal",
            risk: "Alto",
            riskColor: C.red,
            next: "end_fmi_mediocre",
            score: 0,
          },
        ],
      },
      {
        id: "fmi_gradual",
        text: "FMI acepta gradualismo pero reduce monto a USD 8B y extiende a 5 anos. Reforma fiscal en fases.",
        options: [
          {
            text: "Aceptar USD 8B graduales",
            give: "Menos capital inmediato, reformas mas lentas",
            get: "Flexibilidad + USD 8B + credibilidad parcial",
            risk: "Bajo",
            riskColor: C.green,
            next: "end_fmi_gradual_ok",
            score: 3,
          },
        ],
      },
      {
        id: "fmi_reject",
        text: "Sin FMI, los mercados desconfian. Los bonistas endurece su posicion. Solo el petroleo financia la transicion.",
        options: [
          {
            text: "Doblar apuesta: all-in en produccion petrolera",
            give: "Toda la apuesta en petroleo",
            get: "Independencia total, si funciona",
            risk: "Muy Alto",
            riskColor: C.red,
            next: "end_fmi_solo",
            score: -2,
          },
          {
            text: "Reconsiderar: volver al FMI con terminos propios",
            give: "Perdida de tiempo + posicion negociadora debilitada",
            get: "Programa eventual, pero en peores terminos",
            risk: "Medio",
            riskColor: C.gold,
            next: "end_fmi_mediocre",
            score: 1,
          },
        ],
      },
    ],
    endings: {
      end_fmi_bueno: {
        title: "Resultado: Favorable",
        score: 4,
        color: C.green,
        text: "Dolor a corto plazo, ganancia a largo. El programa FMI da credibilidad, rating mejora, inversion fluye. El FCV compensa a los mas vulnerables durante la transicion. En 2 anos, la economia esta estabilizada.",
      },
      end_fmi_mediocre: {
        title: "Resultado: Mediocre",
        score: 0,
        color: C.textLight,
        text: "Ni full reformas ni full autonomia. Credibilidad danada, programa parcial. Funciona, pero lento y con friccion constante.",
      },
      end_fmi_gradual_ok: {
        title: "Resultado: Bueno",
        score: 3,
        color: C.blue,
        text: "USD 8B en 5 anos con reformas graduales. Menos shock, menos resistencia social, mas tiempo para construir consenso. No es el maximo, pero es sostenible politicamente.",
      },
      end_fmi_solo: {
        title: "Resultado: Arriesgado",
        score: -2,
        color: C.red,
        text: "Sin FMI y dependiendo 100% del petroleo. Si el precio cae a USD 50, no hay colchon. Autonomia total pero vulnerabilidad maxima. Solo funciona si el petroleo esta por encima de USD 75 durante 10+ anos.",
      },
    },
  },
};

function TabNegociacion() {
  const [selectedGame, setSelectedGame] = useState("china");
  const [currentStep, setCurrentStep] = useState("start");
  const [history, setHistory] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [ended, setEnded] = useState(null);

  const game = WAR_GAMES[selectedGame];

  const resetGame = useCallback((gameKey) => {
    setSelectedGame(gameKey);
    setCurrentStep("start");
    setHistory([]);
    setTotalScore(0);
    setEnded(null);
  }, []);

  const chooseOption = useCallback(
    (option) => {
      setHistory((prev) => [...prev, { step: currentStep, option }]);
      setTotalScore((prev) => prev + option.score);
      if (option.next.startsWith("end_")) {
        setEnded(game.endings[option.next]);
      } else {
        setCurrentStep(option.next);
      }
    },
    [currentStep, game],
  );

  const step = game.steps.find((s) => s.id === currentStep);

  return (
    <div>
      <p style={{ color: C.textLight, fontSize: 14, marginBottom: 20 }}>
        Simulacion de negociacion tipo "war game". Elige un escenario, toma
        decisiones y ve el resultado. Cada opcion muestra que das, que recibes y
        el nivel de riesgo.
      </p>

      {/* Game selector */}
      <div
        style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}
      >
        {Object.entries(WAR_GAMES).map(([key, g]) => (
          <button
            key={key}
            onClick={() => resetGame(key)}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: `2px solid ${selectedGame === key ? C.blue : C.border}`,
              background: selectedGame === key ? C.blue : "#fff",
              color: selectedGame === key ? "#fff" : C.text,
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 14,
              transition: "all 0.2s",
            }}
          >
            {g.title.split(":")[0]}
          </button>
        ))}
      </div>

      <Card>
        <h4 style={{ margin: "0 0 8px", color: C.blue }}>{game.title}</h4>
        <p style={{ color: C.textLight, fontSize: 14, margin: "0 0 20px" }}>
          {game.description}
        </p>

        {/* History */}
        {history.map((h, i) => (
          <div
            key={i}
            style={{
              marginBottom: 16,
              paddingLeft: 16,
              borderLeft: `3px solid ${C.border}`,
              opacity: 0.7,
            }}
          >
            <div style={{ fontSize: 12, color: C.textLight, fontWeight: 600 }}>
              Paso {i + 1}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
              {h.option.text}
            </div>
            <div style={{ fontSize: 12, color: C.textLight }}>
              Das: {h.option.give} | Recibes: {h.option.get}
            </div>
          </div>
        ))}

        {/* Current step or ending */}
        {ended ? (
          <div
            style={{
              padding: 20,
              borderRadius: 8,
              border: `2px solid ${ended.color}`,
              background: `${ended.color}11`,
            }}
          >
            <h4 style={{ margin: "0 0 8px", color: ended.color }}>
              {ended.title}
            </h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600 }}>Puntuacion:</span>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background:
                      i < Math.max(0, ended.score) ? ended.color : C.border,
                    transition: "background 0.3s",
                  }}
                />
              ))}
              <span style={{ fontWeight: 700, color: ended.color }}>
                {ended.score}/5
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                color: C.text,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {ended.text}
            </p>
            <button
              onClick={() => resetGame(selectedGame)}
              style={{
                marginTop: 16,
                padding: "8px 20px",
                borderRadius: 6,
                border: `2px solid ${C.blue}`,
                background: C.blue,
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Jugar de nuevo
            </button>
          </div>
        ) : step ? (
          <div>
            <div
              style={{
                padding: 16,
                borderRadius: 8,
                background: C.bgSurface,
                marginBottom: 16,
                border: `1px solid ${C.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: C.blue,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                SITUACION
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: C.text,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {step.text}
              </p>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {step.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => chooseOption(opt)}
                  style={{
                    padding: 16,
                    borderRadius: 8,
                    border: `2px solid ${C.border}`,
                    background: "#fff",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = C.blue;
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(13,71,161,0.12)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: C.text,
                      marginBottom: 8,
                    }}
                  >
                    {opt.text}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr auto",
                      gap: 8,
                      fontSize: 12,
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 600, color: C.red }}>
                        Das:
                      </span>{" "}
                      <span style={{ color: C.textLight }}>{opt.give}</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, color: C.green }}>
                        Recibes:
                      </span>{" "}
                      <span style={{ color: C.textLight }}>{opt.get}</span>
                    </div>
                    <div
                      style={{
                        padding: "2px 10px",
                        borderRadius: 12,
                        background: `${opt.riskColor}22`,
                        color: opt.riskColor,
                        fontWeight: 700,
                        fontSize: 11,
                        alignSelf: "center",
                      }}
                    >
                      Riesgo: {opt.risk}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
}

// ============================================================
// TAB 5: SEGURIDAD → INVERSION
// ============================================================

function TabSeguridad() {
  const [presupuesto, setPresupuesto] = useState(8);
  const [velocidad, setVelocidad] = useState(2); // 1=lenta, 2=media, 3=rapida
  const [fanbCoopera, setFanbCoopera] = useState(2); // 1=no, 2=parcial, 3=si

  const velLabels = { 1: "Lenta", 2: "Media", 3: "Rapida" };
  const fanbLabels = { 1: "No", 2: "Parcial", 3: "Si" };

  const timeline = useMemo(() => {
    const modifier = (presupuesto / 8) * (velocidad / 2) * (fanbCoopera / 2);
    const years = [];

    for (let yr = 1; yr <= 10; yr++) {
      const progress = Math.min(1, yr * modifier * 0.12);
      const homicideStart = 35;
      const homicideTarget = 4;
      const homicideRate = Math.max(
        homicideTarget,
        homicideStart - (homicideStart - homicideTarget) * progress,
      );

      const policeDeployed = Math.min(200000, 20000 + yr * modifier * 20000);
      const territoryControlled = Math.min(100, 30 + progress * 70);
      const investmentAttracted = Math.min(50, yr * modifier * 5.5);

      years.push({
        year: yr,
        homicideRate: homicideRate.toFixed(1),
        policeDeployed: Math.round(policeDeployed),
        territoryControlled: territoryControlled.toFixed(0),
        investmentAttracted: investmentAttracted.toFixed(1),
      });
    }

    // When milestones are hit
    const dcSafe = years.findIndex(
      (y) => Number(y.homicideRate) < 15 && Number(y.territoryControlled) > 80,
    );
    const touristSafe = years.findIndex(
      (y) => Number(y.homicideRate) < 10 && Number(y.territoryControlled) > 90,
    );

    return {
      years,
      dcYear: dcSafe >= 0 ? dcSafe + 1 : ">10",
      touristYear: touristSafe >= 0 ? touristSafe + 1 : ">10",
    };
  }, [presupuesto, velocidad, fanbCoopera]);

  return (
    <div>
      <p style={{ color: C.textLight, fontSize: 14, marginBottom: 20 }}>
        Sin seguridad no hay inversion. Este simulador muestra como el
        presupuesto de seguridad, la velocidad de reforma policial y la
        cooperacion militar determinan cuando llegan los data centers y
        turistas. Referencia: Georgia elimino la corrupcion policial en 2 anos
        (2004-2006).
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 1fr) 2fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        <Card>
          <h4 style={{ margin: "0 0 16px", color: C.blue, fontWeight: 700 }}>
            Variables
          </h4>
          <SliderInput
            label="Presupuesto seguridad (ano 1-3)"
            min={3}
            max={15}
            step={0.5}
            value={presupuesto}
            onChange={setPresupuesto}
            prefix="USD "
            suffix="B"
          />

          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4,
                fontSize: 14,
              }}
            >
              <span style={{ fontWeight: 600, color: C.text }}>
                Velocidad reforma policial
              </span>
              <span style={{ fontWeight: 700, color: C.blue }}>
                {velLabels[velocidad]}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={1}
              value={velocidad}
              onChange={(e) => setVelocidad(Number(e.target.value))}
              style={{ width: "100%", accentColor: C.blue }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: C.textLight,
              }}
            >
              <span>Lenta</span>
              <span>Media</span>
              <span>Rapida</span>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4,
                fontSize: 14,
              }}
            >
              <span style={{ fontWeight: 600, color: C.text }}>
                FANB coopera
              </span>
              <span style={{ fontWeight: 700, color: C.blue }}>
                {fanbLabels[fanbCoopera]}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={1}
              value={fanbCoopera}
              onChange={(e) => setFanbCoopera(Number(e.target.value))}
              style={{ width: "100%", accentColor: C.blue }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: C.textLight,
              }}
            >
              <span>No</span>
              <span>Parcial</span>
              <span>Si</span>
            </div>
          </div>
        </Card>

        <div>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            <BigNumber
              label="Data center viable"
              value={`Ano ${timeline.dcYear}`}
              sub="Homicidios <15/100K + territorio >80%"
              color={typeof timeline.dcYear === "number" ? C.green : C.red}
            />
            <BigNumber
              label="Turismo masivo"
              value={`Ano ${timeline.touristYear}`}
              sub="Homicidios <10/100K + territorio >90%"
              color={typeof timeline.touristYear === "number" ? C.blue : C.red}
            />
          </div>

          <SimpleTable
            compact
            headers={[
              "Ano",
              "Homicidios/100K",
              "Policia desplegada",
              "Territorio %",
              "Inversion (USD B)",
            ]}
            rows={timeline.years.map((y) => [
              `Ano ${y.year}`,
              y.homicideRate,
              fmtNum(y.policeDeployed),
              `${y.territoryControlled}%`,
              `USD ${y.investmentAttracted}B`,
            ])}
          />

          <SectionTitle>Reduccion de Homicidios</SectionTitle>
          <BarChart
            data={timeline.years.map((y) => ({
              label: `Ano ${y.year}`,
              value: Number(y.homicideRate),
              display: `${y.homicideRate}/100K`,
              color:
                Number(y.homicideRate) > 20
                  ? C.red
                  : Number(y.homicideRate) > 10
                    ? C.gold
                    : C.green,
            }))}
            maxValue={40}
          />

          <SectionTitle>Inversion Atraida</SectionTitle>
          <BarChart
            data={timeline.years.map((y) => ({
              label: `Ano ${y.year}`,
              value: Number(y.investmentAttracted),
              display: `USD ${y.investmentAttracted}B`,
              color: C.blue,
            }))}
            maxValue={50}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

const TABS = [
  { id: "financiero", label: "Modelo Financiero", icon: null },
  { id: "montecarlo", label: "Monte Carlo", icon: null },
  { id: "ciudadano", label: "Mi FCV", icon: null },
  { id: "negociacion", label: "Negociacion", icon: null },
  { id: "seguridad", label: "Seguridad", icon: null },
];

export default function SimuladorPage() {
  const [activeTab, setActiveTab] = useState("financiero");

  return (
    <Layout
      title="Simulador Interactivo"
      description="Explora los modelos de Venezuela S.A. con simulaciones interactivas: financiero, Monte Carlo, FCV ciudadano, negociacion y seguridad."
    >
      <main
        style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px 60px" }}
      >
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: C.blue,
              borderBottom: `3px solid ${C.gold}`,
              paddingBottom: 8,
              marginBottom: 12,
              letterSpacing: "-0.02em",
            }}
          >
            Simulador Interactivo
          </h1>
          <p
            style={{
              fontSize: 16,
              color: C.textLight,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Herramienta interactiva para explorar las proyecciones del plan
            Venezuela S.A. Ajusta los supuestos y observa como cambian los
            resultados. Todos los modelos parten de la base conservadora del
            plan:{" "}
            <strong>
              USD 60/barril, 3M bpd en 15 anos (Rystad Energy), retorno 5,5%
            </strong>
            .
          </p>
        </div>

        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 28,
            borderBottom: `2px solid ${C.border}`,
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "12px 20px",
                fontSize: 14,
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? C.blue : C.textLight,
                background: "none",
                border: "none",
                borderBottom:
                  activeTab === tab.id
                    ? `3px solid ${C.blue}`
                    : "3px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                marginBottom: -2,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div>
          {activeTab === "financiero" && <TabFinanciero />}
          {activeTab === "montecarlo" && <TabMonteCarlo />}
          {activeTab === "ciudadano" && <TabCiudadano />}
          {activeTab === "negociacion" && <TabNegociacion />}
          {activeTab === "seguridad" && <TabSeguridad />}
        </div>

        {/* Footer disclaimer */}
        <div
          style={{
            marginTop: 48,
            padding: 20,
            borderRadius: 8,
            background: `rgba(13, 71, 161, 0.04)`,
            border: `1px solid ${C.border}`,
            fontSize: 13,
            color: C.textLight,
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: C.blue }}>Nota metodologica:</strong> Estas
          simulaciones son herramientas exploratorias, no predicciones. Los
          modelos usan simplificaciones (ramp-up lineal, retornos constantes,
          condiciones independientes). Los datos base provienen de fuentes
          verificables:{" "}
          <a
            href="https://www.rigzone.com/news/could_venezuela_production_get_back_to_3mm_barrels_per_day-08-jan-2026-182716-article/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.blue }}
          >
            Rystad Energy
          </a>
          ,{" "}
          <a
            href="https://www.opec.org/opec_web/en/publications/338.htm"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.blue }}
          >
            OPEP
          </a>
          ,{" "}
          <a
            href="https://www.imf.org/en/Countries/VEN"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.blue }}
          >
            FMI
          </a>
          ,{" "}
          <a
            href="https://www.cpf.gov.sg/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.blue }}
          >
            Singapur CPF
          </a>
          . Consulta el plan completo para fuentes detalladas y supuestos.
        </div>
      </main>
    </Layout>
  );
}
