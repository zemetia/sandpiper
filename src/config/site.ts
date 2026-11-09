/**
 * Central "company brain" — single source of truth for all SEO, GEO, and LLMs.txt.
 * Edit this file first whenever you add a page or change brand/product details.
 * Every field here propagates to: metadata, sitemap, robots.txt, structured data, llms.txt.
 */

import type { MetadataRoute } from 'next';

export type SitemapChangeFreq = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

export interface PageConfig {
  /** URL path relative to root, e.g. '/about' */
  path: string;
  /** <title> for this page */
  title: string;
  /** Meta description — be specific: include what the visitor gains */
  description: string;
  /** Sitemap change frequency hint */
  changeFreq: SitemapChangeFreq;
  /** Sitemap priority 0.0–1.0 */
  priority: number;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  company: {
    legalName: string;
    foundedYear: number;
    industry: string;
    targetAudience: string;
    problemSolved: string;
    solution: string;
    keyBenefits: string[];
    contactEmail: string;
    socialLinks: {
      twitter?: string;
      github?: string;
      linkedin?: string;
    };
  };
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    twitterHandle?: string;
    locale: string;
  };
  /** Registry of all public pages — drives sitemap + LLMs.txt page index */
  pages: Record<string, PageConfig>;
}

export const siteConfig: SiteConfig = {
  // ─── Core Identity ───────────────────────────────────────────────────────────
  // Brand copy for SEO/GEO/LLMs.txt. Visitor-facing contact details, hours and
  // navigation are edited in the CMS (Site settings / Header / Footer globals).
  name: 'Sandpiper',
  tagline: 'Specialty coffee and all-day kitchen by the shore.',
  description:
    'Sandpiper is a neighbourhood café serving single-origin Indonesian coffee, all-day breakfast and seasonal plates. Open daily from 7am, with Wi-Fi, vegan options and a view of the water.',
  url: process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://sandpiper.cafe',

  // ─── Brand Assets ────────────────────────────────────────────────────────────
  ogImage: '/og.png',

  // ─── Company Details (drives Organization schema + LLMs.txt) ─────────────────
  company: {
    legalName: 'Sandpiper Café',
    foundedYear: 2024,
    industry: 'Food & beverage / Specialty coffee café',
    targetAudience:
      'Locals, remote workers and travellers looking for great coffee, an all-day brunch menu and a relaxed place to sit by the water.',
    problemSolved:
      'Good specialty coffee and honest food in a calm setting are hard to find in one place — most cafés pick either the coffee or the kitchen.',
    solution:
      'Sandpiper roasts single-origin Indonesian beans weekly and runs a full kitchen from open to close, with clearly labelled vegan, vegetarian and gluten-free options.',
    keyBenefits: [
      'Single-origin Indonesian coffee (Aceh, Toraja, Flores) roasted in small weekly batches',
      'All-day breakfast and Indonesian classics, made in-house',
      'Vegan, vegetarian and gluten-free dishes tagged on every menu item',
      'Open daily from 07:00 with fast Wi-Fi and seating by the water',
    ],
    contactEmail: 'hello@sandpiper.cafe',
    socialLinks: {},
  },

  // ─── SEO Settings ────────────────────────────────────────────────────────────
  seo: {
    titleTemplate: '%s · Sandpiper',
    defaultTitle: 'Sandpiper — Specialty coffee & all-day kitchen',
    locale: 'en_US',
  },

  // ─── Pages Registry ──────────────────────────────────────────────────────────
  // Core pages. Any other page published in the CMS is added to the sitemap automatically.
  // Path is locale-stripped (the sitemap helper adds locale prefixes).
  pages: {
    home: {
      path: '/',
      title: 'Sandpiper — Specialty coffee & all-day kitchen',
      description:
        'Neighbourhood café serving single-origin Indonesian coffee, all-day breakfast and seasonal plates. See the menu, opening hours and how to find us.',
      changeFreq: 'weekly',
      priority: 1.0,
    },
    menu: {
      path: '/menu',
      title: 'Menu — coffee, breakfast & mains',
      description:
        'The full Sandpiper menu with prices: espresso and pour-over coffee, teas, all-day breakfast, Indonesian mains and house-baked pastry. Vegan and gluten-free options marked.',
      changeFreq: 'daily',
      priority: 0.9,
    },
    about: {
      path: '/about',
      title: 'About Sandpiper — our story, hours & location',
      description:
        'How Sandpiper sources and roasts its coffee, what the kitchen cooks, answers to common questions, and our opening hours and address.',
      changeFreq: 'monthly',
      priority: 0.8,
    },
  },
};
