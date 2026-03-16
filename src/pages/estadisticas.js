import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import StatsPanel from '../components/StatsPanel';

export default function EstadisticasPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout
      title="Estadisticas de participacion"
      description="Secciones mas votadas, comentadas y debatidas del plan Venezuela S.A."
    >
      <main style={{ maxWidth: 720, margin: '2rem auto', padding: '0 1rem' }}>
        <h1>Estadisticas de participacion</h1>
        <p style={{ color: 'var(--ifm-font-color-secondary)', fontSize: '0.95rem' }}>
          Ranking en tiempo real de las secciones del plan segun la
          participacion de los lectores. Vota, comenta y pregunta en cualquier
          seccion para que se refleje aqui.
        </p>
        {mounted ? <StatsPanel /> : null}
      </main>
    </Layout>
  );
}
