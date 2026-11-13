import { ArrowRight, Navigation } from 'lucide-react';
import { copy } from '@/config/copy';

import type { VisitHoursBlock as VisitHoursBlockData } from '@/payload-types';
import { toImage } from '@/services/cms.mappers';
import { cmsService } from '@/services/cms.service';
import { Logo } from '@/components/shared/Logo';

import { CmsImage } from '../CmsImage';

/** Notch punched out of the ticket, coloured like the section behind it. */
function Notch({ side }: { side: 'top' | 'bottom' }) {
  return (
    <span
      aria-hidden="true"
      className={`bg-blue border-ink absolute left-0 size-6 -translate-x-1/2 rounded-full border-2 lg:size-10 ${side === 'top' ? '-top-3 lg:-top-5' : '-bottom-3 lg:-bottom-5'}`}
    />
  );
}

/** Illustrated street grid with the badge logo as the pin. */
function StreetMap({ street, label }: { street: string | null; label: string }) {
  const road = 'bg-paper border-ink/15 absolute';
  return (
    <div role="img" aria-label={label} className="bg-cream absolute inset-0">
      <span className={`${road} inset-y-0 left-[9%] w-[3.4%] border-x`} />
      <span className={`${road} inset-y-0 left-[40%] w-[7%] border-x`} />
      <span className={`${road} inset-y-0 left-[76%] w-[3.4%] border-x`} />
      <span className={`${road} inset-x-0 top-[44%] h-[6.5%] -rotate-2 border-y`} />
      <span className={`${road} inset-x-0 top-[78%] h-[3.4%] -rotate-2 border-y`} />
      {street && (
        <span className="font-ui text-slate absolute top-[52%] left-[49%] text-xs font-extrabold tracking-[0.2em] uppercase lg:text-[15px]">
          {street}
        </span>
      )}
      <Logo
        variant="badge"
        className="border-ink absolute top-[25%] left-[25%] aspect-square h-auto w-[30%] rounded-full border-2"
      />
    </div>
  );
}

export async function VisitHoursBlock({ block }: { block: VisitHoursBlockData }) {
  const settings = await cmsService.getSiteSettings();
  const address = block.address || settings.address?.split('\n')[0] || null;
  const mapImage = toImage(block.mapImage, 'card');
  const directions = block.directionsLabel || copy.directions;

  return (
    <section className="bg-blue relative overflow-hidden py-12 lg:min-h-[min(52.7vw,759px)] lg:py-0">
      <div className="container-wide relative lg:min-h-[min(52.7vw,759px)]">
        <p className="font-display text-sunny -ml-[0.04em] text-[clamp(150px,46vw,190px)] leading-[0.9] font-extrabold tracking-[-0.045em] whitespace-nowrap lg:absolute lg:top-[min(5vw,72px)] lg:-left-[min(1.4vw,20px)] lg:ml-0 lg:text-[min(29.3vw,422px)] lg:tracking-[-0.047em]">
          {block.bigText}
        </p>
        {block.script && (
          <p className="font-script text-paper mt-2 text-[34px] leading-none lg:absolute lg:top-[min(33vw,476px)] lg:mt-0 lg:text-[56px] lg:font-bold">
            {block.script}
          </p>
        )}

        {address && (
          <div className="border-ink relative mt-8 flex overflow-visible rounded-2xl border-2 lg:absolute lg:top-[min(39.1vw,563px)] lg:mt-0 lg:h-[155px] lg:w-[min(48.9vw,704px)]">
            <div className="bg-paper min-w-0 flex-1 rounded-l-[14px] px-[18px] py-6 lg:px-[34px] lg:py-0 lg:pt-[50px]">
              <p className="font-display text-ink text-[19px] leading-tight font-extrabold lg:text-[26px]">
                {address}
              </p>
              {block.details && (
                <p className="text-slate mt-1.5 text-xs lg:text-base">{block.details}</p>
              )}
            </div>
            {settings.mapUrl && (
              <a
                href={settings.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sunny border-ink hover:bg-warning-hover font-ui text-ink relative flex w-[100px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-r-[14px] border-l-2 text-xs font-extrabold tracking-[0.05em] uppercase transition-colors lg:w-[212px] lg:flex-row lg:text-base"
              >
                <Notch side="top" />
                <Notch side="bottom" />
                <Navigation aria-hidden="true" className="size-5 lg:hidden" />
                {directions}
                <ArrowRight aria-hidden="true" className="hidden size-4 lg:block" strokeWidth={3} />
              </a>
            )}
          </div>
        )}

        <div className="border-ink relative mx-auto mt-8 aspect-[372/300] max-w-[560px] -rotate-2 overflow-hidden rounded-[18px] border-2 lg:absolute lg:top-[min(6.5vw,94px)] lg:right-[min(2.4vw,34px)] lg:mt-0 lg:aspect-[530/560] lg:w-[min(36.8vw,530px)] lg:-rotate-3 lg:rounded-[22px]">
          {mapImage ? (
            <CmsImage image={mapImage} sizes="(min-width: 1024px) 530px, 90vw" />
          ) : (
            <StreetMap
              street={block.streetLabel ?? null}
              label={copy.mapAlt(block.streetLabel ?? address ?? '')}
            />
          )}
        </div>
      </div>
    </section>
  );
}

VisitHoursBlock.displayName = 'VisitHoursBlock';
