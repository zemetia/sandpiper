import type { SelectField } from 'payload';

/** Lucide icons editors can pick on the catering page. Keys must match `CATERING_ICONS` in the renderer. */
export const cateringIconOptions = [
  { label: 'Timer', value: 'timer' },
  { label: 'People', value: 'users' },
  { label: 'Truck', value: 'truck' },
  { label: 'Briefcase', value: 'briefcase' },
  { label: 'Party popper', value: 'party' },
  { label: 'Graduation cap', value: 'graduation' },
  { label: 'Coffee', value: 'coffee' },
  { label: 'Sandwich', value: 'sandwich' },
  { label: 'Croissant', value: 'croissant' },
  { label: 'Calendar', value: 'calendar' },
  { label: 'Leaf', value: 'leaf' },
  { label: 'Heart', value: 'heart' },
  { label: 'Star', value: 'star' },
] as const;

export const cateringIconField = (overrides: Partial<SelectField> = {}): SelectField =>
  ({
    name: 'icon',
    type: 'select',
    defaultValue: 'star',
    options: [...cateringIconOptions],
    ...overrides,
  }) as SelectField;
