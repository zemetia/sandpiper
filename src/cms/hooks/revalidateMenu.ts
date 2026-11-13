import { revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

/** Cache tag of the published menu (`cmsService.getMenu`). */
export const MENU_TAG = 'menu';

/** Expire the cached menu so the very next visit reads fresh data from the database. */
const expireMenu = () => {
  try {
    revalidateTag(MENU_TAG, { expire: 0 });
  } catch {
    // Outside a Next.js request (standalone Payload script) there is no cache to expire.
  }
};

const afterChange: CollectionAfterChangeHook = ({ doc }) => {
  expireMenu();
  return doc;
};

const afterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  expireMenu();
  return doc;
};

/** Collection hooks for anything the menu renders: `hooks: { ...menuHooks }`. */
export const menuHooks = { afterChange: [afterChange], afterDelete: [afterDelete] };
