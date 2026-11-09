'use client';

import { useState } from 'react';

export function SeedButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const run = async () => {
    setState('loading');
    const res = await fetch('/api/seed', { method: 'POST', credentials: 'include' });
    const body = (await res.json()) as { error?: string };
    if (res.ok) {
      setState('done');
      window.location.reload();
    } else {
      setState('error');
      setMessage(body.error ?? 'Something went wrong');
    }
  };

  return (
    <div className="sp-seed">
      <div>
        <h2 className="sp-panel__title">Start with Sandpiper starter content</h2>
        <p className="sp-empty">
          Creates the Home, Menu and About pages, 5 categories, 12 menu items and the header, footer
          and site settings — all editable. Only runs on an empty site.
        </p>
        {state === 'error' && <p className="sp-seed__error">{message}</p>}
      </div>
      <button
        type="button"
        className="sp-seed__btn"
        onClick={run}
        disabled={state === 'loading' || state === 'done'}
      >
        {state === 'loading' ? 'Creating…' : state === 'done' ? 'Done' : 'Load starter content'}
      </button>
    </div>
  );
}
