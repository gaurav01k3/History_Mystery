import React, { useMemo, useState } from 'react';

function useApiBaseUrl() {
  const baseUrl = useMemo(() => {
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  }, []);
  return baseUrl;
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await response.json() : await response.text();
  return { ok: response.ok, status: response.status, body };
}

export default function App() {
  const apiBaseUrl = useApiBaseUrl();
  const [health, setHealth] = useState(null);
  const [hello, setHello] = useState(null);
  const [echoInput, setEchoInput] = useState('{"foo":"bar"}');
  const [echoResult, setEchoResult] = useState(null);

  const handleHealth = async () => {
    const res = await fetchJson(`${apiBaseUrl}/api/health`);
    setHealth(res);
  };

  const handleHello = async () => {
    const res = await fetchJson(`${apiBaseUrl}/api/hello`);
    setHello(res);
  };

  const handleEcho = async () => {
    let parsed;
    try {
      parsed = JSON.parse(echoInput);
    } catch (e) {
      setEchoResult({ ok: false, status: 0, body: { error: 'Invalid JSON in input' } });
      return;
    }
    const res = await fetchJson(`${apiBaseUrl}/api/echo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    });
    setEchoResult(res);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h1>History Mystery Client</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>Health</h2>
        <button onClick={handleHealth}>GET /api/health</button>
        {health && (
          <pre style={{ background: '#f6f8fa', padding: 12, overflow: 'auto' }}>{JSON.stringify(health, null, 2)}</pre>
        )}
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Hello</h2>
        <button onClick={handleHello}>GET /api/hello</button>
        {hello && (
          <pre style={{ background: '#f6f8fa', padding: 12, overflow: 'auto' }}>{JSON.stringify(hello, null, 2)}</pre>
        )}
      </section>

      <section>
        <h2>Echo</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
          <textarea
            value={echoInput}
            onChange={(e) => setEchoInput(e.target.value)}
            style={{ width: '100%', height: 120, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
          />
          <button onClick={handleEcho} style={{ minWidth: 140 }}>POST /api/echo</button>
        </div>
        {echoResult && (
          <pre style={{ background: '#f6f8fa', padding: 12, overflow: 'auto', marginTop: 12 }}>{JSON.stringify(echoResult, null, 2)}</pre>
        )}
      </section>
    </div>
  );
}


