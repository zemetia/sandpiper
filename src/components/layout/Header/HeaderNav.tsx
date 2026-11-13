'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { CmsLink } from '@/components/cms/CmsLink';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import type { LinkVO } from '@/types/value-objects';

export interface HeaderNavProps {
  items: LinkVO[];
  cta: LinkVO | null;
  labels: { openMenu: string; closeMenu: string };
}

function NavItem({
  link,
  active,
  onNavigate,
  mobile,
}: {
  link: LinkVO;
  active: boolean;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const className = cn(
    'transition-colors',
    mobile ? 'block py-3 font-display text-2xl' : 'text-sm',
    active ? 'text-foreground' : 'text-foreground-muted hover:text-foreground',
  );
  const target = link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return link.href.startsWith('/') ? (
    <Link
      href={link.href}
      className={className}
      aria-current={active ? 'page' : undefined}
      onClick={onNavigate}
      {...target}
    >
      {link.label}
    </Link>
  ) : (
    <a href={link.href} className={className} {...target}>
      {link.label}
    </a>
  );
}

export function HeaderNav({ items, cta, labels }: HeaderNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
        {items.map((l) => (
          <NavItem key={l.href + l.label} link={l} active={isActive(l.href)} />
        ))}
      </nav>

      <button
        type="button"
        className="border-border text-foreground grid size-10 place-items-center rounded-full border md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? labels.closeMenu : labels.openMenu}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="bg-background fixed inset-x-0 top-16 bottom-0 z-40 px-6 py-8 md:hidden"
        >
          <nav aria-label="Main" className="divide-border divide-y">
            {items.map((l) => (
              <NavItem
                key={l.href + l.label}
                link={l}
                active={isActive(l.href)}
                onNavigate={() => setOpen(false)}
                mobile
              />
            ))}
          </nav>
          <div className="mt-8 flex items-center justify-between gap-4">
            <LanguageSwitcher />
            {cta && <CmsLink link={cta} size="md" />}
          </div>
        </div>
      )}
    </>
  );
}

HeaderNav.displayName = 'HeaderNav';
