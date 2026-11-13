import type { Field, FieldHook } from 'payload';

export const formatSlug = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9/]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^[-/]+|[-/]+$/g, '');

const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === 'string' && value.length > 0) return formatSlug(value);
    const source: unknown = data?.[fallback] ?? originalDoc?.[fallback];
    return typeof source === 'string' ? formatSlug(source) : value;
  };

/** URL slug derived from `fallback` when left empty. Supports nested paths like `about/team`. */
export const slugField = (
  fallback = 'title',
  description = `Leave empty to generate from ${fallback}.`,
): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description,
  },
  hooks: { beforeValidate: [formatSlugHook(fallback)] },
});
