import type { ComponentPropsWithoutRef } from 'react';

import { Link } from '@/i18n/navigation';
import type { LinkVO } from '@/types/value-objects';

export interface LinkToProps extends Omit<ComponentPropsWithoutRef<'a'>, 'href'> {
  link: Pick<LinkVO, 'href' | 'newTab'>;
}

/** Unstyled CMS link: locale-aware `Link` for internal paths, plain `<a>` for everything else. */
export function LinkTo({ link, children, ...props }: LinkToProps) {
  const target = link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  if (link.href.startsWith('/')) {
    return (
      <Link href={link.href} {...target} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={link.href} {...target} {...props}>
      {children}
    </a>
  );
}

LinkTo.displayName = 'LinkTo';
