import { Fragment } from 'react';
import { Sparkle } from 'lucide-react';

import { cn } from '@/lib/cn';
import { Marquee } from '@/components/shared/Marquee';
import type { NavigationVO, SiteSettingsVO } from '@/types/value-objects';

import { HeaderNav } from './HeaderNav';
import type { HeaderNavLabels } from './HeaderNav';

export interface HeaderProps {
  siteName: string;
  nav: NavigationVO['header'];
  settings: Pick<SiteSettingsVO, 'address' | 'phone' | 'hours' | 'mapUrl' | 'socials'>;
  labels: HeaderNavLabels & { ticker: string };
  className?: string;
}

/** Blue info strip (desktop) → yellow bar with the logo in the middle → ink ticker. */
export function Header({ siteName, nav, settings, labels, className }: HeaderProps) {
  return (
    <header className={cn('relative z-40', className)}>
      {nav.infoBar.length > 0 && (
        <div className="bg-blue hidden lg:block">
          <ul className="container-wide font-ui flex h-[38px] items-center justify-center gap-5 text-xs font-bold tracking-[0.13em] uppercase">
            {nav.infoBar.map((text, i) => (
              <Fragment key={text}>
                {i > 0 && <li aria-hidden="true" className="bg-sunny size-1.5 rounded-full" />}
                <li className={i % 2 === 0 ? 'text-sunny' : 'text-paper'}>{text}</li>
              </Fragment>
            ))}
          </ul>
        </div>
      )}

      <HeaderNav siteName={siteName} nav={nav} settings={settings} labels={labels} />

      {nav.ticker.length > 0 && (
        <Marquee
          items={nav.ticker}
          label={labels.ticker}
          duration={45}
          className="bg-ink border-ink border-y py-3 lg:py-3.5"
          itemClassName="text-sunny text-[13px] lg:text-sm font-semibold uppercase tracking-[0.14em]"
          separator={
            <Sparkle aria-hidden="true" className="text-berry mx-6 size-3.5 shrink-0 lg:mx-9" />
          }
        />
      )}
    </header>
  );
}

Header.displayName = 'Header';
