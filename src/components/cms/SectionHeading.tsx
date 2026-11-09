import { cn } from '@/lib/cn';

export interface SectionHeadingProps {
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = 'left',
  className,
}: SectionHeadingProps) {
  if (!eyebrow && !heading && !intro) return null;
  return (
    <div className={cn('mb-10 max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className="text-primary mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
      )}
      {heading && (
        <h2 className="font-display text-foreground text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl">
          {heading}
        </h2>
      )}
      {intro && <p className="text-foreground-muted mt-4 text-lg leading-relaxed">{intro}</p>}
    </div>
  );
}

SectionHeading.displayName = 'SectionHeading';
