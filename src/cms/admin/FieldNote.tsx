import { Link } from '@payloadcms/ui';

export function SiteSettingsNote() {
  return (
    <p className="sp-note">
      Opening hours, address and map link are pulled from{' '}
      <Link href="/admin/globals/site-settings">Site settings</Link> — edit them once and every page
      updates.
    </p>
  );
}
