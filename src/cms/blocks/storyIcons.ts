import type { GroupField, SelectField, TextareaField } from 'payload';

/** Lucide icons editors can pick on the About and Contact pages. Keys must match `STORY_ICONS` in the renderer. */
export const storyIconOptions = [
  { label: 'Sandwich', value: 'sandwich' },
  { label: 'Fork & knife', value: 'utensils' },
  { label: 'Coffee', value: 'coffee' },
  { label: 'Croissant', value: 'croissant' },
  { label: 'Phone', value: 'phone' },
  { label: 'Email', value: 'mail' },
  { label: 'Map pin', value: 'pin' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Sunrise', value: 'sunrise' },
  { label: 'Clock', value: 'clock' },
  { label: 'Bike', value: 'bike' },
  { label: 'Shopping bag', value: 'bag' },
  { label: 'Helping hand', value: 'handHeart' },
  { label: 'Heart', value: 'heart' },
  { label: 'Star', value: 'star' },
] as const;

export const storyIconField = (overrides: Partial<SelectField> = {}): SelectField =>
  ({
    name: 'icon',
    type: 'select',
    defaultValue: 'star',
    options: [...storyIconOptions],
    ...overrides,
  }) as SelectField;

/** Headline textarea shared by the About/Contact blocks: one line per row, `*line*` = accent colour. */
export const accentHeading = (placeholder?: string): TextareaField => ({
  name: 'heading',
  type: 'textarea',
  admin: {
    description:
      'Each line break starts a new line. Wrap a line in *asterisks* to colour it as the accent line.',
    ...(placeholder ? { placeholder } : {}),
  },
});

/** Round sticker with three stacked lines (small / big / small). */
export const stampGroup = (
  description: string,
  placeholders: [string, string, string],
): GroupField => ({
  name: 'stamp',
  type: 'group',
  admin: { description },
  fields: [
    {
      type: 'row',
      fields: (['top', 'value', 'bottom'] as const).map((name, i) => ({
        name,
        type: 'text' as const,
        admin: { width: '33%', placeholder: placeholders[i] },
      })),
    },
  ],
});
