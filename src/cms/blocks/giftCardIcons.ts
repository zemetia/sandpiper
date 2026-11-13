import type { SelectField } from 'payload';

/** Icons offered by the gift-card blocks; rendered by `GiftCardIcon`. */
export const giftCardIconField = (defaultValue: string): SelectField => ({
  name: 'icon',
  type: 'select',
  defaultValue,
  options: [
    { label: 'Card', value: 'card' },
    { label: 'Mail', value: 'mail' },
    { label: 'Coffee', value: 'coffee' },
    { label: 'Gift', value: 'gift' },
    { label: 'Search', value: 'search' },
    { label: 'Heart', value: 'heart' },
  ],
});
