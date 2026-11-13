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
  currency: 'IDR' | 'USD';
  email: string | null;
  phone: string | null;
  whatsappUrl: string | null;
  address: string | null;
  mapUrl: string | null;
  hours: { days: string; time: string }[];
  socials: { platform: string; url: string }[];
  announcement: { text: string; link: LinkVO | null } | null;
}

export interface NavigationVO {
  header: { items: LinkVO[]; cta: LinkVO | null };
  footer: { blurb: string | null; items: LinkVO[] };
}
