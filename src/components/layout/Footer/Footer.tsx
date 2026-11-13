import { MapPin, Phone } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { LinkTo } from '@/components/cms/LinkTo';
import { InstagramIcon } from '@/components/shared/Icons';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Logo } from '@/components/shared/Logo';
import type { NavigationVO, SiteSettingsVO } from '@/types/value-objects';

import { NewsletterForm } from './NewsletterForm';
import type { NewsletterFormProps } from './NewsletterForm';

export interface FooterProps {
  settings: SiteSettingsVO;
  footer: NavigationVO['footer'];
  labels: {
    explore: string;
    visit: string;
    instagram: string;
    map: string;
    call: string;
    newsletter: NewsletterFormProps['labels'];
  };
  className?: string;
}

const heading = 'font-sans text-sunny mb-5 text-[13px] font-bold tracking-[0.2em] uppercase';
const social =
  'grid size-11 place-items-center rounded-full transition-transform hover:-translate-y-0.5 max-lg:border max-lg:border-sunny-soft/40 max-lg:text-sunny lg:bg-sunny lg:text-ink';

export function Footer({ settings, footer, labels, className }: FooterProps) {
  const year = new Date().getFullYear();
  const instagram = settings.socials.find((s) => s.platform === 'instagram');
  const visit = [
    ...(settings.address?.split('\n') ?? []),
    ...(settings.phone ? [settings.phone] : []),
    ...settings.hours.map((h) => `${h.days} ${h.time}`),
  ];
  const news = footer.newsletter;

  return (
    <footer className={cn('bg-blue-deep text-paper overflow-hidden', className)}>
      <div className="container-wide grid gap-x-10 gap-y-10 pt-14 lg:grid-cols-[1.35fr_1fr_1fr_1.45fr] lg:pt-14">
        <div className="max-w-sm">
          <Link href="/" aria-label={settings.siteName} className="inline-block">
            <Logo variant="badge" className="size-24 lg:size-[140px]" />
          </Link>
          {(footer.blurb ?? settings.tagline) && (
            <p className="text-sunny-soft mt-5 text-base leading-[1.55]">
              {footer.blurb ?? settings.tagline}
            </p>
          )}
          <div className="mt-5 flex gap-2.5">
            {instagram && (
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={labels.instagram}
                className={social}
              >
                <InstagramIcon className="size-5" />
              </a>
            )}
            {settings.mapUrl && (
              <a
                href={settings.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={labels.map}
                className={social}
              >
                <MapPin aria-hidden="true" className="size-5" />
              </a>
            )}
            {settings.phone && (
              <a
                href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
                aria-label={labels.call}
                className={social}
              >
                <Phone aria-hidden="true" className="size-5" />
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:contents">
          {footer.items.length > 0 && (
            <nav aria-label={footer.exploreHeading ?? labels.explore}>
              <h2 className={heading}>{footer.exploreHeading ?? labels.explore}</h2>
              <ul className="space-y-3 text-base">
                {footer.items.map((l) => (
                  <li key={l.href + l.label}>
                    <LinkTo link={l} className="hover:text-sunny transition-colors">
                      {l.label}
                    </LinkTo>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {visit.length > 0 && (
            <div>
              <h2 className={heading}>{footer.visitHeading ?? labels.visit}</h2>
              <address className="space-y-3 text-base not-italic">
                {visit.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </div>
          )}
        </div>

        {news && (
          <div className="max-lg:bg-blue/60 max-lg:border-sunny-soft/20 max-lg:rounded-[20px] max-lg:border max-lg:p-5">
            {news.heading && (
              <h2 className="font-display text-sunny text-[26px] leading-none font-extrabold lg:text-[32px]">
                {news.heading}
              </h2>
            )}
            {news.body && (
              <p className="text-sunny-soft mt-3 text-[15px] leading-normal">{news.body}</p>
            )}
            <NewsletterForm
              className="mt-5"
              placeholder={news.placeholder ?? ''}
              buttonLabel={news.buttonLabel ?? 'Sign up'}
              labels={labels.newsletter}
            />
          </div>
        )}
      </div>

      <div className="container-wide">
        <div className="border-sunny-soft/20 text-sunny-soft mt-12 flex flex-col gap-3 border-t pt-6 text-[13px] sm:flex-row sm:items-center sm:justify-between lg:mt-[72px]">
          <p>
            © {year} {footer.copyright ?? settings.siteName}
          </p>
          <div className="flex items-center gap-5">
            {footer.note && <p>{footer.note}</p>}
            <LanguageSwitcher tone="onDark" />
          </div>
        </div>
        {footer.wordmark && (
          <p
            aria-hidden="true"
            className="font-display text-sunny mt-10 translate-y-[16%] text-[min(18.6vw,280px)] leading-[0.8] font-extrabold tracking-[-0.035em] whitespace-nowrap select-none lg:mt-16"
          >
            {footer.wordmark}
          </p>
        )}
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';
