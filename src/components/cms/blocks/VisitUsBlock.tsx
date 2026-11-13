import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import type { VisitUsBlock as VisitUsBlockData } from '@/payload-types';
import { cmsService } from '@/services/cms.service';

import { CmsLink } from '../CmsLink';
import { SectionHeading } from '../SectionHeading';

export async function VisitUsBlock({ block, locale }: { block: VisitUsBlockData; locale: Locale }) {
  const [s, t] = await Promise.all([cmsService.getSiteSettings(locale), getTranslations('site')]);

  return (
    <section className="container-page py-16 md:py-24">
      <div className="border-border bg-surface grid gap-10 overflow-hidden rounded-[2rem] border p-8 md:grid-cols-[1.1fr_1fr] md:p-12">
        <div>
          <SectionHeading heading={block.heading} intro={block.intro} className="mb-8" />
          <div className="flex flex-wrap gap-3">
            {s.mapUrl && (
              <CmsLink
                link={{
                  href: s.mapUrl,
                  label: t('directions'),
                  newTab: true,
                  appearance: 'primary',
                }}
              />
            )}
            {s.whatsappUrl && (
              <CmsLink
                link={{
                  href: s.whatsappUrl,
                  label: t('whatsapp'),
                  newTab: true,
                  appearance: 'outline',
                }}
              />
            )}
          </div>
        </div>

        <dl className="grid gap-8 sm:grid-cols-2">
          {s.hours.length > 0 && (
            <div>
              <dt className="text-primary mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
                {t('hours')}
              </dt>
              <dd>
                <ul className="space-y-2">
                  {s.hours.map((h) => (
                    <li key={h.days} className="text-foreground flex justify-between gap-4">
                      <span className="text-foreground-muted">{h.days}</span>
                      <span className="tabular-nums">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {s.address && (
            <div>
              <dt className="text-primary mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
                {t('address')}
              </dt>
              <dd className="text-foreground leading-relaxed whitespace-pre-line">{s.address}</dd>
            </div>
          )}
          {(s.phone || s.email) && (
            <div>
              <dt className="text-primary mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
                {t('contact')}
              </dt>
              <dd className="space-y-1">
                {s.phone && (
                  <a
                    href={`tel:${s.phone.replace(/\s/g, '')}`}
                    className="text-foreground hover:text-primary block"
                  >
                    {s.phone}
                  </a>
                )}
                {s.email && (
                  <a
                    href={`mailto:${s.email}`}
                    className="text-foreground hover:text-primary block"
                  >
                    {s.email}
                  </a>
                )}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}

VisitUsBlock.displayName = 'VisitUsBlock';
