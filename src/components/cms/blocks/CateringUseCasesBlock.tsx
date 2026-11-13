import { cn } from '@/lib/cn';
import type { CateringUseCasesBlock as CateringUseCasesBlockData } from '@/payload-types';

import { cateringIcon } from '../catering/icons';

const display =
  'font-display block text-[50px] leading-[0.95] tracking-[-0.04em] lg:text-[min(5.56vw,80px)] lg:tracking-[-0.0375em]';

export function CateringUseCasesBlock({ block }: { block: CateringUseCasesBlockData }) {
  const cases = block.cases ?? [];

  return (
    <section className="bg-blue border-ink border-b-2 py-12 lg:py-24">
      <div className="container-wide">
        <div className="ct-reveal flex items-end justify-between gap-8">
          <h2>
            {block.headingBold && (
              <span className={cn(display, 'text-sunny font-extrabold')}>{block.headingBold}</span>
            )}
            {block.headingLight && (
              <span className={cn(display, 'text-paper max-w-[6.5em] font-light lg:max-w-none')}>
                {block.headingLight}
              </span>
            )}
          </h2>
          {block.script && (
            <p className="font-script text-sunny shrink-0 text-right text-4xl leading-none whitespace-pre-line max-lg:hidden">
              {block.script}
            </p>
          )}
        </div>

        {cases.length > 0 && (
          <ul className="mt-7 grid grid-cols-2 gap-x-5 gap-y-7 lg:mt-14 lg:grid-cols-4 lg:gap-0">
            {cases.map((c, i) => {
              const Icon = cateringIcon(c.icon);
              return (
                <li
                  key={c.id ?? c.title}
                  className="ct-reveal group border-paper/20 flex flex-col gap-2.5 lg:gap-4 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0"
                >
                  <span
                    className={cn(
                      'bg-sunny border-ink grid size-[53px] place-items-center rounded-full border-2 transition-transform duration-300 group-hover:rotate-0 lg:size-[70px]',
                      i % 2 === 0 ? 'rotate-6' : '-rotate-6',
                    )}
                  >
                    <Icon aria-hidden="true" className="text-ink size-[22px] lg:size-7" />
                  </span>
                  <h3 className="font-display text-paper text-[19px] leading-[1.1] font-extrabold tracking-[-0.02em] lg:text-[26px]">
                    {c.title}
                  </h3>
                  {c.body && (
                    <p className="text-sunny-soft text-[13px] leading-normal lg:text-[15px] lg:leading-[1.55]">
                      {c.body}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

CateringUseCasesBlock.displayName = 'CateringUseCasesBlock';
