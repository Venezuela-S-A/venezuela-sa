import React, { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Eres el asistente IA del plan Venezuela S.A. — un plan de reconstrucción nacional tratado como startup con 40 millones de accionistas.

REGLAS:
1. Solo respondes basándote en el contenido del plan. Si algo no está cubierto, di: "Eso no está cubierto en el plan actual. Si crees que debería estarlo, abre un issue en https://github.com/Venezuela-S-A/venezuela-sa/issues con tu propuesta."
2. Cita secciones específicas cuando sea posible.
3. Sé directo y conciso. Datos primero, explicación después.
4. Si alguien propone algo que contradice los principios del plan (CLAUDE.md), señálalo.
5. Responde en el idioma en que te pregunten (español o inglés).

PRINCIPIOS INVIOLABLES DEL PLAN:
- Petróleo es combustible, tech es destino
- Precio base USD 60/barril
- Timeline Rystad Energy: 15 años para 3M bpd
- Apartidista: cero propaganda política
- Estado ≠ Venezuela S.A. (entidades separadas)
- Estado solo supervisa (5 funciones: gobierno, salud, justicia, educación, seguridad)
- Fondo Ciudadano Venezuela (FCV): cuenta unificada retiro 8% + salud 7% + vivienda 4% + educación 2% = 21%
- FCV desde nacimiento: VSA deposita USD 150/mes por niño
- Educación K-12: voucher universal con sistema de puntos (matrícula + comedor + transporte + 1 deporte + 1 arte)
- Universidad: voucher por mérito (escalonado 100→75→50→25→pierde)
- Salud: FONASA+Medisave gradual. Nadie queda fuera. Menores: automático
- 34→10 ministerios, 265K empleados (185K civiles + 80K militares)
- Venezuela S.A. es accionista en JVs, no dueña
- Nada es gratis — todo tiene financiamiento sostenible (FCV, vouchers, tarifas)
- Score actual: 7.4/10 (20 perspectivas)`;

const STORAGE_KEY = "vsa-chat-api-key";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Soy el asistente del plan Venezuela S.A. Pregúntame sobre el FCV, educación, salud, ministerios, financiamiento, o cualquier sección del plan.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setApiKey(saved);
    else setShowKeyInput(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveKey = () => {
    localStorage.setItem(STORAGE_KEY, apiKey);
    setShowKeyInput(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    if (!apiKey) {
      setShowKeyInput(true);
      return;
    }

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": window.location.origin,
          },
          body: JSON.stringify({
            model: "anthropic/claude-sonnet-4",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...messages.filter((m) => m.role !== "system"),
              userMessage,
            ],
            max_tokens: 2048,
            temperature: 0.3,
          }),
        },
      );

      const data = await response.json();
      const reply =
        data.choices?.[0]?.message?.content ||
        "Error: no se recibió respuesta.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${err.message}` },
      ]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#0D47A1",
          color: "#fff",
          border: "none",
          fontSize: 24,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title="Pregúntale al plan"
      >
        💬
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 380,
        height: 520,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#0D47A1",
          color: "#fff",
          padding: "12px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>Venezuela S.A. — Asistente IA</strong>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>

      {/* API Key input */}
      {showKeyInput && (
        <div style={{ padding: 12, background: "#FFF3E0", fontSize: 13 }}>
          <p style={{ margin: "0 0 8px" }}>
            Ingresa tu API key de{" "}
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noreferrer"
            >
              OpenRouter
            </a>
            :
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-..."
              style={{
                flex: 1,
                padding: 6,
                fontSize: 13,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={saveKey}
              style={{
                padding: "6px 12px",
                background: "#0D47A1",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user" ? "#0D47A1" : "#f0f0f0",
              color: msg.role === "user" ? "#fff" : "#333",
              padding: "8px 12px",
              borderRadius: 12,
              maxWidth: "85%",
              fontSize: 14,
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div
            style={{
              alignSelf: "flex-start",
              background: "#f0f0f0",
              padding: "8px 12px",
              borderRadius: 12,
              fontSize: 14,
            }}
          >
            Pensando...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: 12,
          borderTop: "1px solid #eee",
          display: "flex",
          gap: 8,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pregunta sobre el plan..."
          style={{
            flex: 1,
            padding: 10,
            border: "1px solid #ddd",
            borderRadius: 8,
            fontSize: 14,
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: "10px 16px",
            background: loading ? "#999" : "#0D47A1",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: loading ? "default" : "pointer",
            fontSize: 14,
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
