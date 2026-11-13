import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import type { LinkVO, SiteSettingsVO } from '@/types/value-objects';

import { BrandMark } from '../Header/Header';

export interface FooterProps {
  settings: SiteSettingsVO;
  blurb: string | null;
  items: LinkVO[];
  labels: { hours: string; address: string; follow: string; rights: string };
  className?: string;
}

export function Footer({ settings, blurb, items, labels, className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn('border-border/60 bg-surface mt-8 border-t', className)}>
      <div className="container-page grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" className="text-foreground flex items-center gap-2.5">
            <BrandMark />
            <span className="font-display text-xl font-semibold">{settings.siteName}</span>
          </Link>
          {(blurb ?? settings.tagline) && (
            <p className="text-foreground-muted mt-4 text-sm leading-relaxed">
              {blurb ?? settings.tagline}
            </p>
          )}
          {items.length > 0 && (
            <nav aria-label="Footer" className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {items.map((l) =>
                l.href.startsWith('/') ? (
                  <Link
                    key={l.href + l.label}
                    href={l.href}
                    className="text-foreground-muted hover:text-foreground text-sm"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href + l.label}
                    href={l.href}
                    className="text-foreground-muted hover:text-foreground text-sm"
                  >
                    {l.label}
                  </a>
                ),
              )}
            </nav>
          )}
        </div>

        {settings.hours.length > 0 && (
          <div>
            <h2 className="text-primary mb-4 text-xs font-semibold tracking-[0.18em] uppercase">
              {labels.hours}
            </h2>
            <ul className="space-y-1.5 text-sm">
              {settings.hours.map((h) => (
                <li key={h.days} className="text-foreground-muted">
                  <span className="text-foreground">{h.days}</span> ·{' '}
                  <span className="tabular-nums">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {settings.address && (
          <div>
            <h2 className="text-primary mb-4 text-xs font-semibold tracking-[0.18em] uppercase">
              {labels.address}
            </h2>
            <address className="text-foreground-muted text-sm leading-relaxed whitespace-pre-line not-italic">
              {settings.address}
            </address>
            {settings.phone && <p className="text-foreground mt-3 text-sm">{settings.phone}</p>}
          </div>
        )}

        {settings.socials.length > 0 && (
          <div>
            <h2 className="text-primary mb-4 text-xs font-semibold tracking-[0.18em] uppercase">
              {labels.follow}
            </h2>
            <ul className="space-y-1.5 text-sm">
              {settings.socials.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-muted hover:text-foreground capitalize"
                  >
                    {s.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-border/60 border-t">
        <p className="container-page text-foreground-subtle py-6 text-xs">
          © {year} {settings.siteName}. {labels.rights}
        </p>
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';
