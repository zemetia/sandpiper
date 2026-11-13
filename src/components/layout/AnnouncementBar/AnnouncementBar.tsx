import { Link } from '@/i18n/navigation';
import type { LinkVO } from '@/types/value-objects';

export interface AnnouncementBarProps {
  text: string;
  link: LinkVO | null;
}

export function AnnouncementBar({ text, link }: AnnouncementBarProps) {
  return (
    <div className="bg-sea-subtle text-foreground text-center text-sm">
      <p className="container-page py-2">
        {text}
        {link && (
          <>
            {' '}
            {link.href.startsWith('/') ? (
              <Link
                href={link.href}
                className="text-primary font-semibold underline-offset-4 hover:underline"
              >
                {link.label} →
              </Link>
            ) : (
              <a
                href={link.href}
                className="text-primary font-semibold underline-offset-4 hover:underline"
              >
                {link.label} →
              </a>
            )}
          </>
        )}
      </p>
    </div>
  );
}

AnnouncementBar.displayName = 'AnnouncementBar';
