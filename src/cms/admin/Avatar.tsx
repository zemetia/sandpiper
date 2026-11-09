'use client';

import { useAuth } from '@payloadcms/ui';

/** Initials avatar for the top bar — replaces Payload's Gravatar placeholder. */
export function Avatar() {
  const { user } = useAuth<{ name?: string | null; email?: string }>();
  const source = user?.name?.trim() || user?.email || '?';
  const initials = source
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

  return (
    <span className="sp-avatar" title={user?.email}>
      {initials}
    </span>
  );
}
