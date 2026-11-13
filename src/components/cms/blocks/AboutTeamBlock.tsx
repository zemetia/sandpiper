import { ArrowRight, HandHeart } from 'lucide-react';

import { cn } from '@/lib/cn';
import type { AboutTeamBlock as AboutTeamBlockData } from '@/payload-types';
import { toImage, toLink } from '@/services/cms.mappers';

import { CmsImage } from '../CmsImage';
import { LinkTo } from '../LinkTo';
import { pillVariants } from '../landing/primitives';
import { StoryEyebrow } from '../story/primitives';

export function AboutTeamBlock({ block }: { block: AboutTeamBlockData }) {
  const members = block.members ?? [];
  const hiring = block.hiring;
  const hiringLink = hiring?.enableLink ? toLink(hiring.link) : null;

  return (
    <section className="bg-sunny py-16 lg:py-[min(8.3vw,120px)]">
      <div className="container-wide">
        <div className="ct-reveal flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          <div className="lg:max-w-[832px]">
            {block.eyebrow && <StoryEyebrow className="text-blue">{block.eyebrow}</StoryEyebrow>}
            {block.heading && (
              <h2 className="font-display text-ink mt-3 text-[40px] leading-none font-extrabold tracking-[-0.03em] lg:mt-4 lg:text-[min(5vw,72px)] lg:tracking-[-0.021em]">
                {block.heading}
              </h2>
            )}
          </div>
          {block.body && (
            <p className="text-ink text-base leading-[1.6] lg:max-w-[400px] lg:text-[17px]">
              {block.body}
            </p>
          )}
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5 lg:gap-5">
          {members.map((m) => (
            <li
              key={m.id ?? m.name}
              className="ct-reveal ct-lift bg-paper border-ink flex flex-col gap-3 rounded-[20px] border-2 p-2.5 shadow-[6px_6px_0_var(--color-ink)] lg:gap-4 lg:p-3.5"
            >
              <div className="relative aspect-[218/300] overflow-hidden rounded-xl">
                <CmsImage
                  image={toImage(m.photo, 'card')}
                  sizes="(min-width: 1024px) 220px, 45vw"
                />
                {m.role && (
                  <span
                    className={cn(
                      'font-ui text-paper absolute top-2 right-2 max-w-[calc(100%-1rem)] truncate rounded-full px-2.5 py-1 text-[9px] font-extrabold tracking-[0.1em] uppercase lg:top-3 lg:right-3 lg:px-3 lg:py-1.5 lg:text-[11px]',
                      m.tone === 'berry' ? 'bg-berry' : 'bg-blue',
                    )}
                  >
                    {m.role}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 px-1.5 pb-1.5">
                <p className="font-display text-ink text-lg leading-tight font-extrabold lg:text-[26px]">
                  {m.name}
                </p>
                {m.note && (
                  <p className="font-script text-blue text-lg leading-tight font-bold lg:text-2xl">
                    {m.note}
                  </p>
                )}
              </div>
            </li>
          ))}

          {hiring?.heading && (
            <li className="ct-reveal bg-ink col-span-2 flex flex-col justify-between gap-6 rounded-[20px] p-6 sm:col-span-1 lg:p-7">
              <HandHeart aria-hidden="true" className="text-sunny size-9 lg:size-11" />
              <div className="flex flex-col gap-3">
                <p className="font-display text-paper text-[28px] leading-[1.05] font-extrabold lg:text-[min(2.2vw,32px)]">
                  {hiring.heading}
                </p>
                {hiring.body && (
                  <p className="text-paper/80 text-[15px] leading-normal">{hiring.body}</p>
                )}
              </div>
              {hiringLink && (
                <LinkTo
                  link={hiringLink}
                  className={cn(
                    pillVariants({ variant: 'sunny', size: 'md' }),
                    'group h-11 self-start px-[22px] tracking-[0.07em] hover:-translate-y-0.5',
                  )}
                >
                  {hiringLink.label}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </LinkTo>
              )}
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

AboutTeamBlock.displayName = 'AboutTeamBlock';
