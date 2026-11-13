'use client';

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock,
  Coffee,
  ConciergeBell,
  Gift,
  House,
  Info,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShoppingBag,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { LinkTo } from '@/components/cms/LinkTo';
import { InstagramIcon } from '@/components/shared/Icons';
import { Logo } from '@/components/shared/Logo';
import type { NavIcon, NavigationVO, NavItemVO, SiteSettingsVO } from '@/types/value-objects';

export interface HeaderNavLabels {
  openMenu: string;
  closeMenu: string;
  menu: string;
  home: string;
  call: string;
  map: string;
  instagram: string;
}

export interface HeaderNavProps {
  siteName: string;
  nav: NavigationVO['header'];
  settings: Pick<SiteSettingsVO, 'address' | 'phone' | 'hours' | 'mapUrl' | 'socials'>;
  labels: HeaderNavLabels;
}

const ICONS: Record<NavIcon, LucideIcon> = {
  home: House,
  bag: ShoppingBag,
  cloche: ConciergeBell,
  gift: Gift,
  info: Info,
  mail: Mail,
  menu: BookOpen,
  coffee: Coffee,
  pin: MapPin,
};

const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

function DesktopLink({ link, active }: { link: NavItemVO; active: boolean }) {
  return (
    <LinkTo
      link={link}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'font-ui text-blue relative py-2 text-[15px] font-extrabold tracking-[0.1em] whitespace-nowrap uppercase',
        'after:bg-blue after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[3px] after:origin-left after:transition-transform',
        active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
      )}
    >
      {link.label}
    </LinkTo>
  );
}

export function HeaderNav({ siteName, nav, settings, labels }: HeaderNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const half = Math.ceil(nav.items.length / 2);
  const left = nav.items.slice(0, half);
  const right = nav.items.slice(half);

  // Drawer: the CTA is listed second, with its badge.
  const drawerItems: NavItemVO[] = nav.cta
    ? [
        ...nav.items.slice(0, 1),
        { ...nav.cta, icon: 'bag', badge: nav.ctaBadge },
        ...nav.items.slice(1),
      ]
    : nav.items;

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
      toggle?.focus();
    };
  }, [open]);

  const address = settings.address?.split('\n').join(', ');
  const hours = settings.hours.map((h) => `${h.days} · ${h.time}`).join(' / ');
  const instagram = settings.socials.find((s) => s.platform === 'instagram');

  return (
    <div className="bg-sunny">
      <div className="container-wide grid h-[72px] grid-cols-[1fr_auto] items-center gap-4 lg:h-[112px] lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        <nav aria-label={labels.menu} className="hidden items-center gap-10 lg:flex">
          {left.map((l) => (
            <DesktopLink key={l.href + l.label} link={l} active={isActive(l.href)} />
          ))}
        </nav>

        <Link
          href="/"
          aria-label={`${siteName} — ${labels.home}`}
          className="-ml-1 justify-self-start lg:ml-0 lg:justify-self-center"
        >
          <Logo className="h-[56px] w-auto lg:h-[100px]" />
        </Link>

        <div className="flex items-center justify-end gap-3 lg:gap-10">
          {right.length > 0 && (
            <nav aria-label={labels.menu} className="hidden items-center gap-10 lg:flex">
              {right.map((l) => (
                <DesktopLink key={l.href + l.label} link={l} active={isActive(l.href)} />
              ))}
            </nav>
          )}
          {nav.cta && (
            <LinkTo
              link={nav.cta}
              className="bg-blue text-sunny font-ui hover:bg-blue-deep inline-flex h-11 items-center gap-2.5 rounded-full px-5 text-[13px] font-extrabold tracking-[0.1em] whitespace-nowrap uppercase transition-colors lg:h-[46px] lg:px-7 lg:text-sm"
            >
              {nav.cta.label}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </LinkTo>
          )}
          <button
            ref={toggleRef}
            type="button"
            className="border-ink text-ink grid size-11 shrink-0 place-items-center rounded-full border-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={labels.openMenu}
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-[80] lg:hidden',
          open ? 'visible' : 'invisible transition-[visibility] delay-300',
        )}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label={labels.closeMenu}
          onClick={() => setOpen(false)}
          className={cn(
            'bg-ink/55 absolute inset-0 transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={labels.menu}
          className={cn(
            'bg-cream border-ink absolute inset-y-0 left-0 flex w-[min(328px,86vw)] flex-col overflow-y-auto rounded-r-[28px] border-y-2 border-r-2 px-4 pt-5 pb-6 transition-transform duration-300 ease-out',
            open ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="flex items-start justify-between pl-2">
            <Link href="/" onClick={() => setOpen(false)} aria-label={siteName}>
              <Logo className="h-[60px] w-auto" counterClassName="fill-cream" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={labels.closeMenu}
              className="border-ink text-ink grid size-12 place-items-center rounded-full border-2"
            >
              <X className="size-5" strokeWidth={2.5} />
            </button>
          </div>

          <nav aria-label={labels.menu} className="mt-6">
            <ul className="space-y-1">
              {drawerItems.map((item) => {
                const Icon = item.icon ? ICONS[item.icon] : ArrowRight;
                const active = item.href.startsWith('/') && isActive(item.href);
                return (
                  <li key={item.href + item.label}>
                    <LinkTo
                      link={item}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'font-display text-ink flex h-[52px] items-center gap-4 rounded-2xl border-2 px-4 text-[19px] font-extrabold',
                        active ? 'bg-sunny border-ink' : 'hover:bg-sunny-soft border-transparent',
                      )}
                    >
                      <Icon aria-hidden="true" className="text-blue size-5 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="bg-berry text-paper font-ui rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-[0.12em] uppercase">
                          {item.badge}
                        </span>
                      )}
                      {active && <ArrowRight aria-hidden="true" className="size-5" />}
                    </LinkTo>
                  </li>
                );
              })}
            </ul>
          </nav>

          {(address || hours || settings.phone) && (
            <div className="border-ink/15 mt-4 border-t px-2 pt-4">
              {nav.contactHeading && (
                <p className="font-ui text-blue text-xs font-extrabold tracking-[0.18em] uppercase">
                  {nav.contactHeading}
                </p>
              )}
              <ul className="text-ink mt-3 space-y-3 text-sm">
                {address && (
                  <li className="flex items-center gap-3">
                    <MapPin aria-hidden="true" className="size-[18px] shrink-0" />
                    {address}
                  </li>
                )}
                {hours && (
                  <li className="flex items-center gap-3">
                    <Clock aria-hidden="true" className="size-[18px] shrink-0" />
                    {hours}
                  </li>
                )}
                {settings.phone && (
                  <li>
                    <a href={telHref(settings.phone)} className="flex items-center gap-3">
                      <Phone aria-hidden="true" className="size-[18px] shrink-0" />
                      {settings.phone}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

          <div aria-hidden="true" className="min-h-6 flex-1" />

          {nav.promo && (
            <div className="bg-blue border-ink rounded-[20px] border-2 p-5">
              {nav.promo.eyebrow && (
                <p className="font-ui text-sunny text-xs font-extrabold tracking-[0.18em] uppercase">
                  {nav.promo.eyebrow}
                </p>
              )}
              {nav.promo.heading && (
                <p className="font-display text-paper mt-2 text-xl leading-tight font-extrabold">
                  {nav.promo.heading}
                </p>
              )}
              {nav.promo.link && (
                <LinkTo
                  link={nav.promo.link}
                  onClick={() => setOpen(false)}
                  className="bg-sunny text-ink font-ui mt-4 flex h-12 items-center justify-center rounded-full text-sm font-extrabold tracking-[0.12em] uppercase"
                >
                  {nav.promo.link.label}
                </LinkTo>
              )}
            </div>
          )}

          <div className="mt-5 flex items-center gap-3">
            {instagram && (
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={labels.instagram}
                className="border-ink text-ink grid size-12 place-items-center rounded-full border-2"
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
                className="border-ink text-ink grid size-12 place-items-center rounded-full border-2"
              >
                <MapPin aria-hidden="true" className="size-5" />
              </a>
            )}
            {settings.phone && (
              <a
                href={telHref(settings.phone)}
                aria-label={labels.call}
                className="border-ink text-ink grid size-12 place-items-center rounded-full border-2"
              >
                <Phone aria-hidden="true" className="size-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

HeaderNav.displayName = 'HeaderNav';
