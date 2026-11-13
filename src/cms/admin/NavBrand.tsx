import { Link } from '@payloadcms/ui';

import { Icon } from './Brand';

/** Sidebar header — brand block that doubles as the dashboard link. */
export function NavBrand() {
  return (
    <Link className="sp-nav-brand" href="/admin" prefetch={false}>
      <Icon />
      <span className="sp-nav-brand__text">
        <span className="sp-nav-brand__name">Sandpiper</span>
        <span className="sp-nav-brand__sub">Content studio</span>
      </span>
    </Link>
  );
}
