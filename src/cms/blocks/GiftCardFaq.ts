import type { Block } from 'payload';

export const GiftCardFaq: Block = {
  slug: 'giftCardFaq',
  interfaceName: 'GiftCardFaqBlock',
  labels: { singular: 'Gift card FAQ', plural: 'Gift card FAQs' },
  admin: { group: 'Gift cards' },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      localized: true,
      admin: {
        rows: 2,
        placeholder: 'Good\nto know.',
        description: 'Line breaks apply on desktop only.',
      },
    },
    {
      name: 'items',
      type: 'array',
      maxRows: 6,
      admin: { initCollapsed: true },
      fields: [
        { name: 'question', type: 'text', localized: true },
        { name: 'answer', type: 'textarea', localized: true, admin: { rows: 2 } },
      ],
    },
  ],
};
