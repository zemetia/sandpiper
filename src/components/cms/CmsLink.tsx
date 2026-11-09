import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/Button';
import type { LinkVO } from '@/types/value-objects';

export interface CmsLinkProps {
  link: LinkVO;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CmsLink({ link, size = 'lg', className }: CmsLinkProps) {
  const classes = cn(
    buttonVariants({
      variant:
        link.appearance === 'outline' ? 'outline' : link.appearance === 'link' ? 'link' : 'primary',
      size,
    }),
    link.appearance !== 'link' && 'rounded-full',
    className,
  );
  const target = link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  if (link.href.startsWith('/')) {
    return (
      <Link href={link.href} className={classes} {...target}>
        {link.label}
      </Link>
    );
  }
  return (
    <a href={link.href} className={classes} {...target}>
      {link.label}
    </a>
  );
}

CmsLink.displayName = 'CmsLink';
