/**
 * Central "company brain" — single source of truth for all SEO, GEO, and LLMs.txt.
 * Edit this file first whenever you add a page or change brand/product details.
 * Every field here propagates to: metadata, sitemap, robots.txt, structured data, llms.txt.
 */

import type { MetadataRoute } from 'next';
import { appUrl } from './app-url';

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
  tagline: 'Breakfast, lunch & Lavazza coffee on South Street.',
  description:
    'Sandpiper Cafe is a corner café at 1640 South St, Philadelphia, serving all-day breakfast, sandwiches, smoothies and Lavazza coffee. Open every day from 7am to 4pm for dine in, takeout and online orders.',
  url: appUrl ?? 'https://sandpiper.cafe',

  // ─── Brand Assets ────────────────────────────────────────────────────────────
  ogImage: '/og.png',

  // ─── Company Details (drives Organization schema + LLMs.txt) ─────────────────
  company: {
    legalName: 'Sandpiper Cafe',
    foundedYear: 2024,
    industry: 'Food & beverage / Breakfast and coffee café',
    targetAudience:
      'South Philly neighbors, commuters and visitors on South Street looking for a quick, friendly breakfast, lunch or coffee.',
    problemSolved:
      'A fast, good breakfast and a proper coffee in the same stop — without a long wait.',
    solution:
      'Sandpiper makes breakfast plates, sandwiches and smoothies to order, pours Lavazza espresso, and has online ordering with pickup in about 15 minutes.',
    keyBenefits: [
      'Breakfast served all day: pancakes, bagels, breakfast sandos and house plates',
      'Lavazza espresso, cold brew, matcha and chai',
      'Smoothies and fresh juices blended to order',
      'Open every day 7am – 4pm; order ahead for pickup in about 15 minutes',
    ],
    contactEmail: 'hello@sandpiper.cafe',
    socialLinks: {},
  },

  // ─── SEO Settings ────────────────────────────────────────────────────────────
  seo: {
    titleTemplate: '%s · Sandpiper',
    defaultTitle: 'Sandpiper Cafe — Breakfast, lunch & Lavazza coffee in Philadelphia',
    locale: 'en_US',
  },

  // ─── Pages Registry ──────────────────────────────────────────────────────────
  // Core pages. Any other page published in the CMS is added to the sitemap automatically.
  // Path is locale-stripped (the sitemap helper adds locale prefixes).
  pages: {
    home: {
      path: '/',
      title: 'Sandpiper Cafe — Breakfast, lunch & Lavazza coffee in Philadelphia',
      description:
        'Corner café at 1640 South St, Philadelphia: all-day breakfast, sandwiches, smoothies and Lavazza coffee. Open daily 7am – 4pm. See the menu or order ahead.',
      changeFreq: 'weekly',
      priority: 1.0,
    },
    menu: {
      path: '/menu',
      title: 'Menu — breakfast, sandwiches, smoothies & coffee',
      description:
        'The full Sandpiper Cafe menu with prices: all-day breakfast, sandwiches, lunch, smoothies, juices and Lavazza coffee. Vegan and vegetarian options marked.',
      changeFreq: 'daily',
      priority: 0.9,
    },
    order: {
      path: '/order',
      title: 'Order online — pickup on Toast or delivery',
      description:
        'Order Sandpiper Cafe ahead for pickup at 1640 South St on Toast, ready in about 15 minutes, or get delivery through DoorDash, Uber Eats or Grubhub.',
      changeFreq: 'monthly',
      priority: 0.9,
    },
    about: {
      path: '/about',
      title: 'About Sandpiper — our story, hours & location',
      description:
        'The story of Sandpiper Cafe on South Street — the hand-drawn mural, the kitchen and the coffee — plus opening hours and address.',
      changeFreq: 'monthly',
      priority: 0.8,
    },
  },
};
