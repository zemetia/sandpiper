import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { CmsLink } from '@/components/cms/CmsLink';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import type { LinkVO } from '@/types/value-objects';

import { HeaderNav } from './HeaderNav';

export interface HeaderProps {
  siteName: string;
  items: LinkVO[];
  cta: LinkVO | null;
  labels: { openMenu: string; closeMenu: string };
  className?: string;
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-8', className)}>
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <path
        d="M7 19.5c2.6 0 4-1.6 5.5-3.4C14.4 13.8 16.4 11 21 11c2 0 3.4.6 4.5 1.4-1.6-.2-3 .4-3.9 1.6l-2.4 3.2c-1.6 2.1-3.7 3.3-6.7 3.3H7Z"
        className="fill-primary-foreground"
      />
      <path
        d="M8 23.5h16"
        strokeWidth="1.6"
        strokeLinecap="round"
        className="stroke-primary-foreground/50"
      />
    </svg>
  );
}

export function Header({ siteName, items, cta, labels, className }: HeaderProps) {
  return (
    <header
      className={cn(
        'border-border/60 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md',
        className,
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-18">
        <Link href="/" className="text-foreground flex items-center gap-2.5">
          <BrandMark />
          <span className="font-display text-xl font-semibold tracking-tight">{siteName}</span>
        </Link>

        <HeaderNav items={items} cta={cta} labels={labels} />

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          {cta && <CmsLink link={cta} size="sm" />}
        </div>
      </div>
    </header>
  );
}

Header.displayName = 'Header';
