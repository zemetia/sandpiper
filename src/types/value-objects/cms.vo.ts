export interface ImageVO {
  url: string;
  alt: string;
  width: number;
  height: number;
  /** Focal point as CSS object-position, e.g. "40% 60%" */
  position: string;
}

export interface LinkVO {
  href: string;
  label: string;
  newTab: boolean;
  appearance: 'primary' | 'outline' | 'link';
}

export type MenuTag =
  | 'signature'
  | 'new'
  | 'vegan'
  | 'vegetarian'
  | 'glutenFree'
  | 'dairyFree'
  | 'spicy'
  | 'nuts';

export interface MenuItemVO {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  price: string;
  compareAtPrice: string | null;
  variants: { label: string; price: string }[];
  tags: MenuTag[];
  image: ImageVO | null;
  availability: 'available' | 'soldOut' | 'seasonal';
  featured: boolean;
  /** Short editor label shown next to the price (FAVE, NEW, …). */
  badge: string | null;
}

export interface MenuCategoryVO {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  items: MenuItemVO[];
}

export interface SiteSettingsVO {
  siteName: string;
  tagline: string | null;
  logo: ImageVO | null;
  email: string | null;
  phone: string | null;
  whatsappUrl: string | null;
  address: string | null;
  mapUrl: string | null;
  hours: { days: string; time: string }[];
  socials: { platform: string; url: string }[];
  announcement: { text: string; link: LinkVO | null } | null;
}

export type NavIcon =
  | 'home'
  | 'bag'
  | 'cloche'
  | 'gift'
  | 'info'
  | 'mail'
  | 'menu'
  | 'coffee'
  | 'pin';

export interface NavItemVO extends LinkVO {
  icon: NavIcon | null;
  badge: string | null;
}

export interface NavigationVO {
  header: {
    items: NavItemVO[];
    cta: LinkVO | null;
    ctaBadge: string | null;
    infoBar: string[];
    ticker: string[];
    contactHeading: string | null;
    promo: { eyebrow: string | null; heading: string | null; link: LinkVO | null } | null;
  };
  footer: {
    blurb: string | null;
    items: LinkVO[];
    exploreHeading: string | null;
    visitHeading: string | null;
    copyright: string | null;
    note: string | null;
    wordmark: string | null;
    newsletter: {
      heading: string | null;
      body: string | null;
      placeholder: string | null;
      buttonLabel: string | null;
    } | null;
  };
}

/** A menu category prepared for the homepage menu board. */
export interface MenuBoardCategoryVO {
  id: number;
  slug: string;
  name: string;
  items: MenuItemVO[];
  image: ImageVO | null;
  featured: MenuItemVO | null;
}
