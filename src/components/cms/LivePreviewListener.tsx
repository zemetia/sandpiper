'use client';

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react';

import { useRouter } from '@/i18n/navigation';

/** Re-renders the server page whenever an editor autosaves in the admin's Live Preview pane. */
export function LivePreviewListener() {
  const router = useRouter();
  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={process.env['NEXT_PUBLIC_APP_URL'] ?? ''}
    />
  );
}

LivePreviewListener.displayName = 'LivePreviewListener';
