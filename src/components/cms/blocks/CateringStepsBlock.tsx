import { ArrowRight } from 'lucide-react';
import { Fragment } from 'react';

import type { CateringStepsBlock as CateringStepsBlockData } from '@/payload-types';

import { Eyebrow } from '../landing/primitives';

/** Hand-placed tilt for each desktop card, like index cards on a counter. */
const TILT = ['rotate-[1.5deg]', '-rotate-1', 'rotate-1', '-rotate-[1.5deg]'];

export function CateringStepsBlock({ block }: { block: CateringStepsBlockData }) {
  const steps = block.steps ?? [];
  if (steps.length === 0) return null;

  return (
    <section className="bg-sunny py-12 lg:py-24">
      <div className="container-wide">
        <header className="ct-reveal lg:text-center">
          {block.eyebrow && (
            <Eyebrow className="text-[13px] tracking-[0.15em] lg:text-sm lg:tracking-[0.14em]">
              {block.eyebrow}
            </Eyebrow>
          )}
          {block.heading && (
            <h2 className="font-display text-ink mt-6 max-w-[9em] text-[40px] leading-none font-extrabold tracking-[-0.04em] lg:mx-auto lg:mt-3 lg:max-w-none lg:text-[min(4.45vw,64px)] lg:leading-[1.2] lg:tracking-[-0.0375em]">
              {block.heading}
            </h2>
          )}
        </header>

        {/* Phone: numbered timeline */}
        <ol className="mt-6 lg:hidden">
          {steps.map((s, i) => (
            <li key={s.id ?? i} className="ct-reveal flex gap-4">
              <div className="flex w-12 shrink-0 flex-col items-center">
                <span className="bg-ink font-display text-sunny grid size-12 place-items-center rounded-full text-xl font-extrabold">
                  {i + 1}
                </span>
                {i < steps.length - 1 && (
                  <span aria-hidden="true" className="bg-ink w-0.5 flex-1" />
                )}
              </div>
              <div className={i < steps.length - 1 ? 'pt-2.5 pb-7' : 'pt-2.5'}>
                <h3 className="font-display text-ink text-[22px] leading-tight font-extrabold">
                  {s.title}
                </h3>
                {s.body && <p className="text-ink mt-1.5 text-sm leading-[1.55]">{s.body}</p>}
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop: tilted cards with arrows between */}
        <ol className="mt-14 flex items-center gap-5 max-lg:hidden">
          {steps.map((s, i) => (
            <Fragment key={s.id ?? i}>
              {i > 0 && (
                <li aria-hidden="true" className="shrink-0">
                  <ArrowRight className="text-ink size-8" />
                </li>
              )}
              <li
                className={`ct-reveal bg-cream border-ink min-h-[286px] flex-1 rounded-3xl border-2 p-8 transition-[rotate,translate] duration-300 hover:-translate-y-1 hover:rotate-0 ${TILT[i % TILT.length]}`}
              >
                <span className="bg-ink font-display text-sunny grid size-16 place-items-center rounded-full text-[32px] font-extrabold">
                  {i + 1}
                </span>
                <h3 className="font-display text-ink mt-3.5 text-[28px] leading-tight font-extrabold tracking-[-0.02em]">
                  {s.title}
                </h3>
                {s.body && <p className="text-slate mt-3.5 text-base leading-[1.55]">{s.body}</p>}
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}

CateringStepsBlock.displayName = 'CateringStepsBlock';
